import questions from './components/questions';
import { MODES, QUIZ_LENGTH, answerGame, buildDeck, createGame, expireGame, nextQuestion, secondsRemaining, shuffle } from './quizEngine';

test('question bank has unique, valid questions and enough for each mode', () => {
  expect(new Set(questions.map(q => q.id)).size).toBe(questions.length);
  for (const mode of MODES) expect(questions.filter(q => q.level === mode.id).length).toBeGreaterThanOrEqual(QUIZ_LENGTH);
  questions.forEach(q => {
    expect(q.choices).toHaveLength(4);
    expect(new Set(q.choices).size).toBe(4);
    expect(q.choices).toContain(q.answer);
    expect(q.explanation.length).toBeGreaterThan(10);
  });
});

test('shuffling does not mutate the original array', () => {
  const values = [1, 2, 3, 4];
  expect(shuffle(values, () => 0)).toHaveLength(4);
  expect(values).toEqual([1, 2, 3, 4]);
});

test('a run chooses unique questions from only its level', () => {
  const deck = buildDeck('advanced', () => 0.5);
  expect(deck).toHaveLength(QUIZ_LENGTH);
  expect(new Set(deck.map(q => q.id)).size).toBe(QUIZ_LENGTH);
  expect(deck.every(q => q.level === 'advanced')).toBe(true);
});

test('correct answers earn points and duplicate clicks are ignored', () => {
  const game = createGame('beginner', 1000, () => 0.4);
  const answer = game.questions[0].answer;
  const updated = answerGame(game, answer, 1000);
  expect(updated.correct).toBe(1);
  expect(updated.points).toBe(100);
  expect(updated.endsAt).toBe(game.endsAt);
  expect(answerGame(updated, answer, 1000)).toBe(updated);
  expect(nextQuestion(updated, 1000).index).toBe(1);
});

test('a wrong answer applies the level-specific penalty', () => {
  const game = createGame('intermediate', 1000, () => 0.4);
  const wrong = game.questions[0].choices.find(choice => choice !== game.questions[0].answer);
  const updated = answerGame(game, wrong, 1500);
  expect(updated.endsAt).toBe(game.endsAt - 8000);
  expect(updated.answers[0].correct).toBe(false);
});

test('the clock is deadline-based and never goes negative', () => {
  const game = createGame('advanced', 0, () => 0.4);
  expect(secondsRemaining(game, 0)).toBe(90);
  expect(secondsRemaining(game, 89999)).toBe(1);
  const expired = expireGame(game, 90000);
  expect(expired.status).toBe('finished');
  expect(expired.reason).toBe('time');
  expect(expired.secondsLeft).toBe(0);
  expect(expireGame(expired, 99999)).toBe(expired);
});

test('finishing all questions counts the last answer and time bonus', () => {
  let game = createGame('beginner', 0, () => 0.4);
  for (let index = 0; index < QUIZ_LENGTH; index += 1) {
    game = answerGame(game, game.questions[index].answer, index * 1000);
    if (index !== QUIZ_LENGTH - 1) game = nextQuestion(game, index * 1000);
  }
  expect(game.status).toBe('finished');
  expect(game.reason).toBe('complete');
  expect(game.correct).toBe(QUIZ_LENGTH);
  expect(game.answers).toHaveLength(QUIZ_LENGTH);
  expect(game.totalScore).toBe(1000 + 111 * 2);
});

test('invalid answers and early Next cannot change a run', () => {
  const game = createGame('beginner', 0, () => 0.4);
  expect(nextQuestion(game, 0)).toBe(game);
  expect(answerGame(game, 'not a choice', 0)).toBe(game);
  expect(() => createGame('imaginary')).toThrow('Unknown quiz mode');
});
