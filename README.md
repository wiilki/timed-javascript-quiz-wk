# Syntax Sprint

A redesigned, responsive JavaScript quiz built with React. **Think in code. Beat the clock.**

## What's new

- Three difficulty levels: **Beginner** (120 seconds, 5-second wrong-answer penalty), **Intermediate** (100 seconds, 8-second penalty), and **Advanced** (90 seconds, 10-second penalty).
- 45 carefully reviewed JavaScript questions, including code samples, randomized into ten-question rounds with shuffled choices.
- A deadline-based timer, repeat-click protection, and consistent last-answer scoring.
- 100 points per correct answer; completing all ten questions earns 2 bonus points per remaining second.
- Immediate answer explanations, keyboard shortcuts (**1–4** to choose, **Enter** to continue), and a post-game review.
- A local leaderboard with per-difficulty filtering and confirmation before clearing saved scores.
- Responsive interface, accessible focus styling, reduced-motion support, and no external image dependencies.

## Run locally

Node.js 20+ and npm are recommended.

~~~sh
npm ci
npm start
~~~

Open http://localhost:3000.

## Test and build

~~~sh
CI=true npm test -- --watch=false --runInBand
npm run build
~~~

## Live site

https://wiilki.github.io/timed-javascript-quiz-wk/

The homepage in package.json ensures assets resolve under the GitHub Pages repository subpath. The deployment workflow builds the site and updates gh-pages after tests pass on main.

## Scoring and privacy

- Accuracy on the results screen is correct answers divided by ten possible questions.
- Unanswered questions earn no points. Time bonus is available only when all ten are answered.
- Scores live **only in this browser's localStorage**. They do not sync across browsers or devices.
- Old scores are not imported, since the previous quiz used a different scoring system.

## Code

- src/App.js: screens, flow, score history, accessible interactions
- src/App.css: responsive design
- src/quizEngine.js: pure question selection, scoring, timer, and lifecycle
- src/components/questions.js: curated question bank
- src/quizEngine.test.js and src/App.test.js: automated tests

Built for learning.
