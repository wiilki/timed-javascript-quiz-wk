import React, { useEffect, useState } from 'react';
import { MODES, QUIZ_LENGTH, createGame, answerGame, nextQuestion, expireGame, secondsRemaining, scorePercent } from './quizEngine';
import './App.css';

const SCORE_KEY = 'syntax-sprint-scores-v1';

function loadScores() {
  try {
    const value = JSON.parse(window.localStorage.getItem(SCORE_KEY) || '[]');
    return Array.isArray(value)
      ? value.filter(item => item && typeof item.name === 'string' && Number.isFinite(item.score) && MODES.some(mode => mode.id === item.modeId))
      : [];
  } catch {
    return [];
  }
}

function sortedScores(items) {
  return [...items].sort((a, b) => b.score - a.score || b.correct - a.correct || b.date - a.date);
}

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  return String(Math.floor(safe / 60)).padStart(2, '0') + ':' + String(safe % 60).padStart(2, '0');
}

function getMode(id) {
  return MODES.find(mode => mode.id === id) || MODES[1];
}

function SectionEyebrow({ children }) {
  return <div className="eyebrow"><span className="eyebrow-dot" />{children}</div>;
}

function App() {
  const [view, setView] = useState('home');
  const [modeId, setModeId] = useState('intermediate');
  const [game, setGame] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [scores, setScores] = useState(loadScores);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [scoreFilter, setScoreFilter] = useState('all');

  useEffect(() => {
    if (view !== 'quiz' || !game || game.status !== 'active') return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 200);
    return () => window.clearInterval(timer);
  }, [view, game]);

  useEffect(() => {
    if (view === 'quiz' && game && game.status === 'active' && now >= game.endsAt) {
      setGame(previous => expireGame(previous, now));
    }
  }, [view, game, now]);

  useEffect(() => {
    if (view === 'quiz' && game && game.status === 'finished') {
      setView('results');
    }
  }, [view, game]);

  function begin(selectedMode = modeId) {
    const start = Date.now();
    setModeId(selectedMode);
    setNow(start);
    setGame(createGame(selectedMode, start));
    setSaved(false);
    setName('');
    setStorageWarning(false);
    setView('quiz');
    window.scrollTo(0, 0);
  }

  function selectAnswer(choice) {
    const time = Date.now();
    setNow(time);
    setGame(previous => answerGame(previous, choice, time));
  }

  function goNext() {
    const time = Date.now();
    setNow(time);
    setGame(previous => nextQuestion(previous, time));
  }

  useEffect(() => {
    if (view !== 'quiz' || !game || game.status !== 'active') return undefined;
    const onKey = event => {
      if (event.altKey || event.metaKey || event.ctrlKey || (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]'))) return;
      if (game.selected !== null && event.key === 'Enter') {
        event.preventDefault();
        const time = Date.now();
        setNow(time);
        setGame(previous => nextQuestion(previous, time));
        return;
      }
      if (game.selected === null && /^[1-4]$/.test(event.key)) {
        event.preventDefault();
        const time = Date.now();
        setNow(time);
        setGame(previous => answerGame(previous, game.questions[game.index].choices[Number(event.key) - 1], time));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // The listener is rebound for each question so the latest selection and choices are used.
  }, [view, game]);

  function navigateHome() {
    if (view === 'quiz' && game && game.status === 'active') {
      if (!window.confirm('Leave this challenge? Your current run will not be saved.')) return;
      setGame(null);
    }
    setView('home');
    window.scrollTo(0, 0);
  }

  function leaveQuiz() {
    navigateHome();
  }

  function saveScore(event) {
    event.preventDefault();
    const cleaned = name.trim().replace(/\s+/g, ' ').slice(0, 24);
    if (!game || game.status !== 'finished' || !cleaned || saved) return;
    const record = {
      id: String(Date.now()) + '-' + Math.random().toString(36).slice(2, 7),
      name: cleaned,
      modeId: game.modeId,
      score: game.totalScore,
      correct: game.correct,
      total: QUIZ_LENGTH,
      date: Date.now()
    };
    const updated = sortedScores([...scores, record]).slice(0, 100);
    setScores(updated);
    try {
      window.localStorage.setItem(SCORE_KEY, JSON.stringify(updated));
    } catch {
      setStorageWarning(true);
    }
    setSaved(true);
  }

  function clearScores() {
    if (!window.confirm('Delete all saved scores on this device? This cannot be undone.')) return;
    try {
      window.localStorage.removeItem(SCORE_KEY);
    } catch {
      setStorageWarning(true);
    }
    setScores([]);
  }

  function openScores() {
    setScoreFilter('all');
    setView('scores');
    window.scrollTo(0, 0);
  }

  const currentMode = getMode(game ? game.modeId : modeId);
  const currentQuestion = game && game.questions[game.index];
  const seconds = game ? secondsRemaining(game, now) : 0;
  const answered = Boolean(game && game.selected !== null);
  const correctSelection = answered && game.selected === currentQuestion.answer;
  const recentBest = sortedScores(scores.filter(item => item.modeId === modeId))[0];
  const displayedScores = sortedScores(scores.filter(item => scoreFilter === 'all' || item.modeId === scoreFilter));

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar page-width">
        <button type="button" className="brand" onClick={navigateHome} aria-label="Syntax Sprint home">
          <span className="brand-symbol">{'{ }'}</span>
          <span>syntax<span className="brand-accent">sprint</span><span className="brand-period">.</span></span>
        </button>
        <nav className="nav-actions" aria-label="Main navigation">
          <button type="button" className={view === 'home' ? 'nav-link is-current' : 'nav-link'} onClick={navigateHome}>Home</button>
          <button type="button" className={view === 'scores' ? 'nav-link is-current' : 'nav-link'} onClick={openScores}>Leaderboard</button>
          {view === 'home' && <button type="button" className="nav-cta" onClick={() => begin()}>Play now <span aria-hidden="true">↗</span></button>}
        </nav>
      </header>

      <main id="main-content" className="page-width">
        {view === 'home' && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <SectionEyebrow>THE JAVASCRIPT CHALLENGE</SectionEyebrow>
                <h1>Think in code.<br /><span>Beat the clock.</span></h1>
                <p className="hero-description">A quick-fire quiz for curious developers. Sharpen your JavaScript skills, race the timer, and see how far you can go.</p>
                <div className="hero-actions">
                  <button type="button" className="button button-primary button-large" onClick={() => begin()}>Start the challenge <span aria-hidden="true">↗</span></button>
                  <button type="button" className="button button-text" onClick={openScores}>View leaderboard <span aria-hidden="true">→</span></button>
                </div>
                <div className="hero-proof">
                  <span className="tiny-orbit" aria-hidden="true">✦</span>
                  <span><strong>45 hand-picked questions</strong><br />Made to test real JavaScript knowledge</span>
                </div>
              </div>
              <div className="hero-visual" aria-hidden="true">
                <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
                <div className="code-window">
                  <div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span>challenge.js</span><span className="window-code">JS</span></div>
                  <div className="window-body">
                    <div className="window-comment">// Ready for a challenge?</div>
                    <div><span className="syntax-purple">const</span> developer = {'{'}</div>
                    <div className="indent">curiosity: <span className="syntax-blue">true</span>,</div>
                    <div className="indent">skills: <span className="syntax-yellow">'growing'</span>,</div>
                    <div className="indent">limit: <span className="syntax-purple">Infinity</span></div>
                    <div>{'}'};</div>
                    <div className="window-spacer" />
                    <div><span className="syntax-purple">if</span> (developer.curiosity) {'{'}</div>
                    <div className="indent">startChallenge();<span className="cursor-block">▌</span></div>
                    <div>{'}'}</div>
                  </div>
                  <div className="window-bottom"><span className="status-pip" /> READY TO COMPILE <span>01 / 10</span></div>
                </div>
                <div className="floating-tag">⚡ <strong>+100</strong> XP</div>
              </div>
            </section>

            <section className="modes-section" aria-labelledby="mode-heading">
              <div className="section-topline">
                <div><SectionEyebrow>CHOOSE YOUR CHALLENGE</SectionEyebrow><h2 id="mode-heading">Pick your level<span className="orange-dot">.</span></h2></div>
                <p>Every level has 10 random questions. Pick your pace and push your limits.</p>
              </div>
              <div className="mode-grid">
                {MODES.map(mode => (
                  <button type="button" key={mode.id} aria-pressed={modeId === mode.id} className={'mode-card ' + (modeId === mode.id ? 'mode-card-selected' : '')} onClick={() => setModeId(mode.id)}>
                    <div className="mode-card-top"><span className="mode-index">{mode.number} / LEVEL</span><span className="selection-ring">{modeId === mode.id ? '✓' : ''}</span></div>
                    <div className={'mode-glyph mode-glyph-' + mode.id}>{mode.id === 'beginner' ? '</>' : mode.id === 'intermediate' ? '{ }' : '⚡'}</div>
                    <div className="mode-name">{mode.label}</div>
                    <h3>{mode.title}</h3>
                    <p>{mode.description}</p>
                    <div className="mode-meta"><span>◷ {mode.seconds}s</span><span>−{mode.penalty}s / miss</span></div>
                  </button>
                ))}
              </div>
              <div className="challenge-start">
                <div><span className="challenge-label">YOUR SELECTED CHALLENGE</span><strong>{getMode(modeId).label} <span>·</span> 10 questions <span>·</span> {getMode(modeId).seconds} seconds</strong></div>
                <button type="button" className="button button-primary" onClick={() => begin()}>Let's do this <span aria-hidden="true">→</span></button>
              </div>
            </section>
            <section className="how-section">
              <div><span className="how-number">01</span><h3>Choose a level</h3><p>Start with the fundamentals or jump into advanced JavaScript.</p></div>
              <div><span className="how-number">02</span><h3>Race the clock</h3><p>Earn 100 points per correct answer. Wrong answers cost precious seconds.</p></div>
              <div><span className="how-number">03</span><h3>Learn and improve</h3><p>Read explanations, review your run, and save scores on this device.</p></div>
            </section>
            {recentBest && <p className="home-best">Highest {getMode(modeId).label.toLowerCase()} score on this device: <strong>{recentBest.score.toLocaleString()} points</strong> by {recentBest.name}</p>}
          </>
        )}

        {view === 'quiz' && game && (
          <section className="quiz-page">
            <div className="quiz-heading"><div><SectionEyebrow>CHALLENGE IN PROGRESS</SectionEyebrow><h1>{currentMode.label}<span className="orange-dot">.</span></h1></div><button type="button" className="quiet-button" onClick={leaveQuiz}>✕ &nbsp; Exit challenge</button></div>
            <div className="quiz-dashboard">
              <div className="progress-card">
                <div className="progress-card-top"><span>YOUR PROGRESS</span><strong>{String(game.index + 1).padStart(2, '0')} <span>/ {QUIZ_LENGTH}</span></strong></div>
                <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={QUIZ_LENGTH} aria-valuenow={game.answers.length} aria-label="Questions answered"><div style={{ width: (game.answers.length / QUIZ_LENGTH * 100) + '%' }} /></div>
                <p>Keep going — you've got this.</p>
              </div>
              <div className={'timer-card ' + (seconds <= 15 ? 'timer-danger' : '')}>
                <span>TIME REMAINING</span><strong aria-live={seconds <= 10 ? 'assertive' : 'off'}>{formatTime(seconds)}</strong><small>Every second counts</small>
              </div>
              <div className="points-card"><span>YOUR POINTS</span><strong>{game.points.toLocaleString()}</strong><small>{game.correct} correct answer{game.correct === 1 ? '' : 's'}</small></div>
            </div>
            <div className="quiz-layout">
              <div className="question-card">
                <div className="question-top"><span className="question-pill">QUESTION {String(game.index + 1).padStart(2, '0')}</span><span className="question-topic">{currentQuestion.topic}</span></div>
                <h2>{currentQuestion.prompt}</h2>
                {currentQuestion.code && <div className="question-code"><div className="code-caption"><span>JS</span> JAVASCRIPT <span className="code-caption-right">● ● ●</span></div><pre><code>{currentQuestion.code}</code></pre></div>}
                <div className="answers-heading"><span>SELECT ONE ANSWER</span><span className="keyboard-hint">Use keys 1–4</span></div>
                <div className="answer-grid">
                  {currentQuestion.choices.map((choice, index) => {
                    let style = 'answer-option';
                    if (answered && choice === currentQuestion.answer) style += ' answer-correct';
                    else if (answered && choice === game.selected) style += ' answer-wrong';
                    else if (answered) style += ' answer-muted';
                    return <button type="button" key={choice} disabled={answered} className={style} onClick={() => selectAnswer(choice)}><span className="choice-key">{index + 1}</span><span className="choice-copy">{choice}</span><span className="choice-state">{answered && choice === currentQuestion.answer ? '✓' : answered && choice === game.selected ? '✕' : '↗'}</span></button>;
                  })}
                </div>
                {answered && (
                  <div className={'feedback ' + (correctSelection ? 'feedback-success' : 'feedback-error')} role="status">
                    <div className="feedback-title">{correctSelection ? '✓  Nailed it!' : '✕  Not quite — here is why.'}</div>
                    <p>{currentQuestion.explanation}</p>
                    <button type="button" className="button button-primary" onClick={goNext}>Next question <span aria-hidden="true">→</span></button>
                  </div>
                )}
              </div>
              <aside className="quiz-sidebar">
                <div className="sidebar-card"><SectionEyebrow>THE RULES</SectionEyebrow><h3>Stay sharp.</h3><div className="rule-row"><span>✓</span><div><strong>Correct answer</strong><small>+100 points</small></div></div><div className="rule-row"><span>−</span><div><strong>Wrong answer</strong><small>−{currentMode.penalty} seconds</small></div></div><div className="rule-row"><span>↗</span><div><strong>Finish early</strong><small>+2 points per second left</small></div></div></div>
                <div className="sidebar-tip"><span className="tip-bolt">✦</span><h3>Quick tip</h3><p>Read the code carefully. Tiny differences in JavaScript can change everything.</p><span>PRESS ENTER TO CONTINUE</span></div>
              </aside>
            </div>
          </section>
        )}

        {view === 'results' && game && (
          <section className="results-page">
            <SectionEyebrow>CHALLENGE COMPLETE</SectionEyebrow>
            <div className="results-heading"><div><h1>{game.reason === 'complete' ? 'Nicely done.' : 'Time is up.'}<br /><span>Here's how you did.</span></h1><p>Every run makes you a little sharper. Review your answers below and go again when you're ready.</p></div><div className="result-emblem" aria-hidden="true">✦</div></div>
            <div className="results-grid">
              <div className="result-feature"><span>FINAL SCORE</span><strong>{game.totalScore.toLocaleString()}</strong><small>POINTS EARNED · {currentMode.label.toUpperCase()}</small><div className="feature-line" /></div>
              <div className="result-stat"><span>CORRECT ANSWERS</span><strong>{game.correct}<small> / {QUIZ_LENGTH}</small></strong><p>Questions answered correctly</p></div>
              <div className="result-stat"><span>ACCURACY</span><strong>{scorePercent(game)}<small>%</small></strong><p>Across all {QUIZ_LENGTH} questions</p></div>
              <div className="result-stat"><span>TIME LEFT</span><strong>{formatTime(game.secondsLeft)}</strong><p>{game.reason === 'complete' ? 'Bonus included in score' : 'Challenge timed out'}</p></div>
            </div>
            <div className="results-actions">
              <div className="save-card">
                <div><h2>Claim your spot <span>↗</span></h2><p>Save this run to the leaderboard on this device.</p></div>
                {saved ? <div className="saved-message" role="status">✓ {storageWarning ? 'Saved for this session only — storage is unavailable.' : 'Score saved! Nice work.'}</div> : (
                  <form onSubmit={saveScore} className="save-form"><label htmlFor="player-name" className="sr-only">Your display name</label><input id="player-name" type="text" value={name} onChange={event => setName(event.target.value)} placeholder="Enter your name" maxLength={24} required /><button className="button button-primary" type="submit">Save score <span aria-hidden="true">→</span></button></form>
                )}
              </div>
              <div className="replay-card"><p>Think you can beat it?</p><button type="button" className="button button-outline" onClick={() => begin(game.modeId)}>Try again ↗</button><button type="button" className="button button-text" onClick={openScores}>Leaderboard →</button></div>
            </div>
            <section className="review-section" aria-labelledby="review-heading"><div className="section-topline"><div><SectionEyebrow>LEARN FROM THE RUN</SectionEyebrow><h2 id="review-heading">Answer review<span className="orange-dot">.</span></h2></div><p>Tap any question to see the explanation.</p></div><div className="review-list">{game.answers.map((item, index) => (
              <details key={item.id} className="review-item"><summary><span className={'review-mark ' + (item.correct ? 'review-right' : 'review-incorrect')}>{item.correct ? '✓' : '✕'}</span><span className="review-name"><small>{String(index + 1).padStart(2, '0')} / {item.topic}</small><strong>{item.prompt}</strong></span><span className="review-chevron">⌄</span></summary><div className="review-details">{item.code && <pre><code>{item.code}</code></pre>}<p><strong>Your answer:</strong> {item.chosen}</p>{!item.correct && <p><strong>Correct answer:</strong> {item.answer}</p>}<p>{item.explanation}</p></div></details>
            ))}</div>{game.reason === 'time' && <p className="unanswered-note">You answered {game.answers.length} of {QUIZ_LENGTH} questions before time ran out.</p>}</section>
          </section>
        )}

        {view === 'scores' && (
          <section className="scores-page">
            <SectionEyebrow>THE HALL OF FAME</SectionEyebrow><div className="scores-heading"><div><h1>Leaderboard<span className="orange-dot">.</span></h1><p>Every second matters. Every answer counts. These scores are stored locally in this browser.</p></div><button type="button" className="button button-primary" onClick={() => begin()}>New challenge ↗</button></div>
            <div className="scores-panel"><div className="scores-toolbar"><div className="filters" role="group" aria-label="Filter leaderboard by difficulty">{[{id:'all',label:'All levels'},...MODES].map(item => <button type="button" key={item.id} aria-pressed={scoreFilter === item.id} onClick={() => setScoreFilter(item.id)} className={scoreFilter === item.id ? 'filter-active' : ''}>{item.label}</button>)}</div>{scores.length > 0 && <button type="button" className="clear-link" onClick={clearScores}>Clear scores</button>}</div>
              {displayedScores.length === 0 ? <div className="empty-scores"><div>✦</div><h2>No scores yet.</h2><p>Be the first to make the board. Start a challenge, finish it, and save your result.</p><button type="button" className="button button-primary" onClick={() => begin()}>Take the challenge →</button></div> : (
                <div className="leaderboard-table-wrapper"><table className="leaderboard-table"><thead><tr><th scope="col">RANK</th><th scope="col">PLAYER</th><th scope="col">LEVEL</th><th scope="col">CORRECT</th><th scope="col">SCORE</th></tr></thead><tbody>{displayedScores.map((item, index) => <tr key={item.id}><td><span className={'rank ' + (index < 3 ? 'rank-top' : '')}>{String(index + 1).padStart(2, '0')}</span></td><td><strong>{item.name}</strong><small>{Number.isFinite(item.date) ? new Date(item.date).toLocaleDateString() : ''}</small></td><td><span className={'level-tag level-' + item.modeId}>{getMode(item.modeId).label}</span></td><td>{item.correct} / {item.total}</td><td className="score-number">{item.score.toLocaleString()}</td></tr>)}</tbody></table></div>
              )}</div>
          </section>
        )}
      </main>
      <footer className="site-footer page-width"><div className="footer-brand">syntax<span>sprint</span><b>.</b></div><p>Small challenges. Sharper thinking. Built for curious minds.</p><span>MADE WITH JAVASCRIPT + REACT</span></footer>
    </div>
  );
}

export default App;
