import questions from './components/questions';

export const QUIZ_LENGTH = 10;
export const POINTS_PER_CORRECT = 100;
export const TIME_BONUS_PER_SECOND = 2;

export const MODES = [
  { id: 'beginner', label: 'Beginner', title: 'The fundamentals', description: 'Variables, arrays, strings, and the basics that make JavaScript tick.', seconds: 120, penalty: 5, number: '01' },
  { id: 'intermediate', label: 'Intermediate', title: 'Level up your logic', description: 'Modern syntax, array methods, closures, and everyday patterns.', seconds: 100, penalty: 8, number: '02' },
  { id: 'advanced', label: 'Advanced', title: 'The deep end', description: 'Event loops, references, coercion, promises, and tricky edge cases.', seconds: 90, penalty: 10, number: '03' }
];

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function buildDeck(modeId, random = Math.random) {
  const eligible = questions.filter(question => question.level === modeId);
  if (eligible.length < QUIZ_LENGTH) {
    throw new Error('Not enough questions for this mode');
  }
  return shuffle(eligible, random).slice(0, QUIZ_LENGTH).map(question => ({
    ...question,
    choices: shuffle(question.choices, random)
  }));
}

export function createGame(modeId, now = Date.now(), random = Math.random) {
  const mode = MODES.find(option => option.id === modeId);
  if (!mode) throw new Error('Unknown quiz mode');
  return {
    modeId,
    questions: buildDeck(modeId, random),
    index: 0,
    selected: null,
    correct: 0,
    answers: [],
    points: 0,
    endsAt: now + mode.seconds * 1000,
    status: 'active',
    reason: null,
    secondsLeft: null,
    totalScore: null,
    finishedAt: null
  };
}

export function secondsRemaining(game, now = Date.now()) {
  if (!game) return 0;
  if (game.status === 'finished') return game.secondsLeft;
  return Math.max(0, Math.ceil((game.endsAt - now) / 1000));
}

function finish(game, now, reason) {
  if (game.status === 'finished') return game;
  const secondsLeft = Math.max(0, Math.ceil((game.endsAt - now) / 1000));
  const bonus = reason === 'complete' ? secondsLeft * TIME_BONUS_PER_SECOND : 0;
  return {
    ...game,
    status: 'finished',
    reason,
    secondsLeft,
    totalScore: game.points + bonus,
    finishedAt: now
  };
}

export function expireGame(game, now = Date.now()) {
  if (!game || game.status !== 'active' || now < game.endsAt) return game;
  return finish(game, now, 'time');
}

export function answerGame(game, choice, now = Date.now()) {
  if (!game || game.status !== 'active' || game.selected !== null) return game;
  if (now >= game.endsAt) return finish(game, now, 'time');
  const question = game.questions[game.index];
  if (!question.choices.includes(choice)) return game;
  const correct = choice === question.answer;
  const mode = MODES.find(item => item.id === game.modeId);
  const updated = {
    ...game,
    selected: choice,
    correct: game.correct + (correct ? 1 : 0),
    points: game.points + (correct ? POINTS_PER_CORRECT : 0),
    endsAt: game.endsAt - (correct ? 0 : mode.penalty * 1000),
    answers: [...game.answers, {
      id: question.id,
      topic: question.topic,
      prompt: question.prompt,
      code: question.code,
      chosen: choice,
      answer: question.answer,
      explanation: question.explanation,
      correct
    }]
  };
  if (game.index === game.questions.length - 1) {
    return finish(updated, now, 'complete');
  }
  if (now >= updated.endsAt) return finish(updated, now, 'time');
  return updated;
}

export function nextQuestion(game, now = Date.now()) {
  if (!game || game.status !== 'active' || game.selected === null) return game;
  if (now >= game.endsAt) return finish(game, now, 'time');
  return { ...game, index: game.index + 1, selected: null };
}

export function scorePercent(game) {
  return game && game.questions.length ? Math.round(100 * game.correct / game.questions.length) : 0;
}
