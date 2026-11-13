/** Curated JavaScript questions. Every answer has one unambiguous option. */
const questions = [
  {
    "id": "b01",
    "level": "beginner",
    "topic": "Types",
    "prompt": "What does this expression produce?",
    "code": "console.log(3 + \"2\");",
    "choices": [
      "5",
      "32",
      "NaN",
      "undefined"
    ],
    "answer": "32",
    "explanation": "When one operand is a string, + performs string concatenation."
  },
  {
    "id": "b02",
    "level": "beginner",
    "topic": "Variables",
    "prompt": "What will be logged?",
    "code": "let count = 1;\ncount += 2;\nconsole.log(count);",
    "choices": [
      "1",
      "2",
      "3",
      "12"
    ],
    "answer": "3",
    "explanation": "The += operator adds 2 to count and assigns the result."
  },
  {
    "id": "b03",
    "level": "beginner",
    "topic": "Types",
    "prompt": "What does typeof return here?",
    "code": "console.log(typeof true);",
    "choices": [
      "\"boolean\"",
      "\"true\"",
      "\"object\"",
      "\"number\""
    ],
    "answer": "\"boolean\"",
    "explanation": "typeof returns the type name as a string."
  },
  {
    "id": "b04",
    "level": "beginner",
    "topic": "Arrays",
    "prompt": "Which value is printed?",
    "code": "const colors = [\"red\", \"blue\"];\nconsole.log(colors[0]);",
    "choices": [
      "red",
      "blue",
      "0",
      "undefined"
    ],
    "answer": "red",
    "explanation": "Array indexes begin at 0."
  },
  {
    "id": "b05",
    "level": "beginner",
    "topic": "Comparisons",
    "prompt": "What is the output?",
    "code": "console.log(5 === \"5\");",
    "choices": [
      "true",
      "false",
      "5",
      "TypeError"
    ],
    "answer": "false",
    "explanation": "Strict equality compares both type and value."
  },
  {
    "id": "b06",
    "level": "beginner",
    "topic": "Objects",
    "prompt": "What does dot notation retrieve?",
    "code": "const user = { name: \"Ada\" };\nconsole.log(user.name);",
    "choices": [
      "user",
      "name",
      "Ada",
      "undefined"
    ],
    "answer": "Ada",
    "explanation": "user.name accesses the name property of the object."
  },
  {
    "id": "b07",
    "level": "beginner",
    "topic": "Strings",
    "prompt": "What is logged?",
    "code": "console.log(\"hello\".toUpperCase());",
    "choices": [
      "Hello",
      "HELLO",
      "hello",
      "undefined"
    ],
    "answer": "HELLO",
    "explanation": "toUpperCase returns a new string containing uppercase letters."
  },
  {
    "id": "b08",
    "level": "beginner",
    "topic": "Arrays",
    "prompt": "How many items are in this array?",
    "code": "const items = [1, 2, 3];\nconsole.log(items.length);",
    "choices": [
      "2",
      "3",
      "4",
      "undefined"
    ],
    "answer": "3",
    "explanation": "The length property gives the number of elements."
  },
  {
    "id": "b09",
    "level": "beginner",
    "topic": "Variables",
    "prompt": "What does the increment operator do here?",
    "code": "let n = 4;\nn++;\nconsole.log(n);",
    "choices": [
      "3",
      "4",
      "5",
      "8"
    ],
    "answer": "5",
    "explanation": "n++ increases n by one."
  },
  {
    "id": "b10",
    "level": "beginner",
    "topic": "Truthiness",
    "prompt": "What does Boolean return for an empty string?",
    "code": "console.log(Boolean(\"\"));",
    "choices": [
      "true",
      "false",
      "null",
      "undefined"
    ],
    "answer": "false",
    "explanation": "An empty string is falsy."
  },
  {
    "id": "b11",
    "level": "beginner",
    "topic": "Variables",
    "prompt": "Which declaration prevents reassignment?",
    "code": "// Choose one keyword.",
    "choices": [
      "let",
      "var",
      "const",
      "function"
    ],
    "answer": "const",
    "explanation": "A const binding cannot be reassigned, although referenced objects can still be mutated."
  },
  {
    "id": "b12",
    "level": "beginner",
    "topic": "Functions",
    "prompt": "What does this function return?",
    "code": "function double(n) {\n  return n * 2;\n}\nconsole.log(double(4));",
    "choices": [
      "2",
      "4",
      "6",
      "8"
    ],
    "answer": "8",
    "explanation": "The argument 4 is multiplied by 2."
  },
  {
    "id": "b13",
    "level": "beginner",
    "topic": "Operators",
    "prompt": "What is the result of ** ?",
    "code": "console.log(2 ** 3);",
    "choices": [
      "6",
      "8",
      "9",
      "23"
    ],
    "answer": "8",
    "explanation": "** is the exponentiation operator: 2 cubed equals 8."
  },
  {
    "id": "b14",
    "level": "beginner",
    "topic": "Control flow",
    "prompt": "Which branch runs?",
    "code": "const score = 80;\nif (score >= 70) {\n  console.log('pass');\n} else {\n  console.log('retry');\n}",
    "choices": [
      "pass",
      "retry",
      "both",
      "neither"
    ],
    "answer": "pass",
    "explanation": "80 is greater than or equal to 70, so the if block runs."
  },
  {
    "id": "b15",
    "level": "beginner",
    "topic": "Arrays",
    "prompt": "What is the new array length?",
    "code": "const letters = ['a', 'b'];\nletters.push('c');\nconsole.log(letters.length);",
    "choices": [
      "2",
      "3",
      "c",
      "undefined"
    ],
    "answer": "3",
    "explanation": "push appends an item, increasing the array length."
  },
  {
    "id": "i01",
    "level": "intermediate",
    "topic": "Array methods",
    "prompt": "What does map return?",
    "code": "const result = [1, 2, 3].map(n => n * 2);\nconsole.log(result);",
    "choices": [
      "[2, 4, 6]",
      "[1, 2, 3]",
      "[1, 4, 9]",
      "6"
    ],
    "answer": "[2, 4, 6]",
    "explanation": "map creates a new array from the callback's return values."
  },
  {
    "id": "i02",
    "level": "intermediate",
    "topic": "Array methods",
    "prompt": "Which values survive this filter?",
    "code": "const result = [1, 2, 3, 4].filter(n => n % 2 === 0);\nconsole.log(result);",
    "choices": [
      "[1, 3]",
      "[2, 4]",
      "[1, 2, 3, 4]",
      "[]"
    ],
    "answer": "[2, 4]",
    "explanation": "filter keeps values where the callback returns true."
  },
  {
    "id": "i03",
    "level": "intermediate",
    "topic": "Destructuring",
    "prompt": "What value is assigned to role?",
    "code": "const { role = 'guest' } = { name: 'Sam' };\nconsole.log(role);",
    "choices": [
      "Sam",
      "undefined",
      "guest",
      "null"
    ],
    "answer": "guest",
    "explanation": "Destructuring defaults apply when the property is undefined or missing."
  },
  {
    "id": "i04",
    "level": "intermediate",
    "topic": "Optional chaining",
    "prompt": "What is logged?",
    "code": "const user = {};\nconsole.log(user.profile?.city);",
    "choices": [
      "null",
      "undefined",
      "TypeError",
      "{}"
    ],
    "answer": "undefined",
    "explanation": "Optional chaining stops safely when an intermediate value is nullish."
  },
  {
    "id": "i05",
    "level": "intermediate",
    "topic": "Spread syntax",
    "prompt": "What happens to original?",
    "code": "const original = [1, 2];\nconst copy = [...original];\ncopy.push(3);\nconsole.log(original.length);",
    "choices": [
      "2",
      "3",
      "1",
      "TypeError"
    ],
    "answer": "2",
    "explanation": "Spreading creates a new array, so pushing to copy does not affect original."
  },
  {
    "id": "i06",
    "level": "intermediate",
    "topic": "Nullish values",
    "prompt": "What is the result?",
    "code": "const count = 0;\nconsole.log(count ?? 10);",
    "choices": [
      "0",
      "10",
      "false",
      "null"
    ],
    "answer": "0",
    "explanation": "?? uses its fallback only for null or undefined, not for 0."
  },
  {
    "id": "i07",
    "level": "intermediate",
    "topic": "Closures",
    "prompt": "What will be logged?",
    "code": "function makeCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst next = makeCounter();\nnext();\nconsole.log(next());",
    "choices": [
      "0",
      "1",
      "2",
      "undefined"
    ],
    "answer": "2",
    "explanation": "The returned function retains access to its own count variable."
  },
  {
    "id": "i08",
    "level": "intermediate",
    "topic": "Iteration",
    "prompt": "What does for...of iterate over?",
    "code": "for (const item of ['a', 'b']) {\n  console.log(item);\n}",
    "choices": [
      "Array indexes",
      "Array values",
      "Object keys",
      "Nothing"
    ],
    "answer": "Array values",
    "explanation": "for...of visits iterable values, unlike for...in which visits property names."
  },
  {
    "id": "i09",
    "level": "intermediate",
    "topic": "Scope",
    "prompt": "What does the inner block print?",
    "code": "let value = 'outer';\n{\n  let value = 'inner';\n  console.log(value);\n}",
    "choices": [
      "outer",
      "inner",
      "undefined",
      "SyntaxError"
    ],
    "answer": "inner",
    "explanation": "let is block scoped; the inner variable shadows the outer one."
  },
  {
    "id": "i10",
    "level": "intermediate",
    "topic": "JSON",
    "prompt": "What type does JSON.stringify return?",
    "code": "const result = JSON.stringify({ x: 1 });\nconsole.log(typeof result);",
    "choices": [
      "\"object\"",
      "\"string\"",
      "\"number\"",
      "\"undefined\""
    ],
    "answer": "\"string\"",
    "explanation": "JSON.stringify serializes a value into a JSON string."
  },
  {
    "id": "i11",
    "level": "intermediate",
    "topic": "Sorting",
    "prompt": "What is the default sort result?",
    "code": "console.log([2, 10, 1].sort());",
    "choices": [
      "[1, 2, 10]",
      "[1, 10, 2]",
      "[2, 10, 1]",
      "[10, 2, 1]"
    ],
    "answer": "[1, 10, 2]",
    "explanation": "Without a comparator, sort compares elements as strings."
  },
  {
    "id": "i12",
    "level": "intermediate",
    "topic": "Array methods",
    "prompt": "What will reduce calculate?",
    "code": "const total = [1, 2, 3].reduce((sum, n) => sum + n, 0);\nconsole.log(total);",
    "choices": [
      "3",
      "6",
      "0",
      "[1, 2, 3]"
    ],
    "answer": "6",
    "explanation": "reduce accumulates 1 + 2 + 3 starting from 0."
  },
  {
    "id": "i13",
    "level": "intermediate",
    "topic": "Objects",
    "prompt": "What will Object.keys return?",
    "code": "const user = { name: 'Ada', age: 30 };\nconsole.log(Object.keys(user));",
    "choices": [
      "['Ada', 30]",
      "['name', 'age']",
      "2",
      "{ name: 'Ada', age: 30 }"
    ],
    "answer": "['name', 'age']",
    "explanation": "Object.keys returns an array of the object's own enumerable string keys."
  },
  {
    "id": "i14",
    "level": "intermediate",
    "topic": "Functions",
    "prompt": "What is logged?",
    "code": "const add = (a, b = 5) => a + b;\nconsole.log(add(3));",
    "choices": [
      "3",
      "5",
      "8",
      "NaN"
    ],
    "answer": "8",
    "explanation": "The second parameter uses its default value of 5."
  },
  {
    "id": "i15",
    "level": "intermediate",
    "topic": "Arrays",
    "prompt": "What does includes return?",
    "code": "console.log(['red', 'blue'].includes('green'));",
    "choices": [
      "true",
      "false",
      "-1",
      "undefined"
    ],
    "answer": "false",
    "explanation": "includes checks whether the array contains a matching value."
  },
  {
    "id": "a01",
    "level": "advanced",
    "topic": "Equality",
    "prompt": "What is the surprising result?",
    "code": "console.log([] == false);",
    "choices": [
      "true",
      "false",
      "TypeError",
      "undefined"
    ],
    "answer": "true",
    "explanation": "Loose equality coerces [] to an empty string and then to 0; 0 equals false after coercion."
  },
  {
    "id": "a02",
    "level": "advanced",
    "topic": "Event loop",
    "prompt": "In what order do these log?",
    "code": "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');",
    "choices": [
      "A, B, C, D",
      "A, D, B, C",
      "A, D, C, B",
      "A, C, D, B"
    ],
    "answer": "A, D, C, B",
    "explanation": "Synchronous code runs first, then promise microtasks, then the timer callback."
  },
  {
    "id": "a03",
    "level": "advanced",
    "topic": "Async functions",
    "prompt": "What does an async function always return?",
    "code": "async function answer() {\n  return 42;\n}",
    "choices": [
      "42 directly",
      "A Promise",
      "undefined",
      "A generator"
    ],
    "answer": "A Promise",
    "explanation": "An async function wraps its returned value in a Promise."
  },
  {
    "id": "a04",
    "level": "advanced",
    "topic": "Spread syntax",
    "prompt": "What does the original object's x remain?",
    "code": "const original = { x: 1 };\nconst copy = { ...original };\ncopy.x = 2;\nconsole.log(original.x);",
    "choices": [
      "1",
      "2",
      "undefined",
      "TypeError"
    ],
    "answer": "1",
    "explanation": "Object spreading creates a new top-level object."
  },
  {
    "id": "a05",
    "level": "advanced",
    "topic": "References",
    "prompt": "What is logged after a shallow copy?",
    "code": "const original = { inner: { x: 1 } };\nconst copy = { ...original };\ncopy.inner.x = 2;\nconsole.log(original.inner.x);",
    "choices": [
      "1",
      "2",
      "undefined",
      "TypeError"
    ],
    "answer": "2",
    "explanation": "Nested objects are still shared by reference after a shallow spread."
  },
  {
    "id": "a06",
    "level": "advanced",
    "topic": "Numbers",
    "prompt": "What does strict equality say about NaN?",
    "code": "console.log(NaN === NaN);",
    "choices": [
      "true",
      "false",
      "undefined",
      "TypeError"
    ],
    "answer": "false",
    "explanation": "NaN is not equal to itself under ===. Use Number.isNaN to test for it."
  },
  {
    "id": "a07",
    "level": "advanced",
    "topic": "Equality",
    "prompt": "What does Object.is return here?",
    "code": "console.log(Object.is(NaN, NaN));",
    "choices": [
      "true",
      "false",
      "undefined",
      "TypeError"
    ],
    "answer": "true",
    "explanation": "Object.is considers NaN to be the same value as NaN."
  },
  {
    "id": "a08",
    "level": "advanced",
    "topic": "Array methods",
    "prompt": "What does reduce do here?",
    "code": "[].reduce((sum, n) => sum + n);",
    "choices": [
      "Returns 0",
      "Returns undefined",
      "Throws a TypeError",
      "Returns []"
    ],
    "answer": "Throws a TypeError",
    "explanation": "An empty array with no initial accumulator value causes reduce to throw."
  },
  {
    "id": "a09",
    "level": "advanced",
    "topic": "Destructuring",
    "prompt": "What does this rename syntax log?",
    "code": "const { name: label } = { name: 'Grace' };\nconsole.log(label);",
    "choices": [
      "name",
      "label",
      "Grace",
      "undefined"
    ],
    "answer": "Grace",
    "explanation": "The value of name is assigned to a new variable named label."
  },
  {
    "id": "a10",
    "level": "advanced",
    "topic": "Collections",
    "prompt": "What is the Set size?",
    "code": "console.log(new Set([1, 1, 2, 3, 3]).size);",
    "choices": [
      "2",
      "3",
      "5",
      "undefined"
    ],
    "answer": "3",
    "explanation": "Set stores unique values, so duplicates are removed."
  },
  {
    "id": "a11",
    "level": "advanced",
    "topic": "Fallbacks",
    "prompt": "What does the expression log?",
    "code": "const value = 0;\nconsole.log(value || 42, value ?? 42);",
    "choices": [
      "0 0",
      "42 42",
      "42 0",
      "0 42"
    ],
    "answer": "42 0",
    "explanation": "|| falls back on falsy values; ?? falls back only on nullish values."
  },
  {
    "id": "a12",
    "level": "advanced",
    "topic": "Promises",
    "prompt": "What happens when one input rejects?",
    "code": "Promise.all([Promise.resolve(1), Promise.reject('error')]);",
    "choices": [
      "Resolves to [1]",
      "Rejects",
      "Waits forever",
      "Returns null"
    ],
    "answer": "Rejects",
    "explanation": "Promise.all rejects as soon as any input rejects."
  },
  {
    "id": "a13",
    "level": "advanced",
    "topic": "Hoisting",
    "prompt": "What happens when this code runs?",
    "code": "console.log(value);\nlet value = 10;",
    "choices": [
      "Logs 10",
      "Logs undefined",
      "Throws a ReferenceError",
      "Logs null"
    ],
    "answer": "Throws a ReferenceError",
    "explanation": "A let binding is in the temporal dead zone until its declaration executes."
  },
  {
    "id": "a14",
    "level": "advanced",
    "topic": "Closures",
    "prompt": "What value is logged?",
    "code": "function outer() {\n  const x = 7;\n  return () => x + 1;\n}\nconsole.log(outer()());",
    "choices": [
      "7",
      "8",
      "undefined",
      "TypeError"
    ],
    "answer": "8",
    "explanation": "The returned arrow function closes over x, then adds one."
  },
  {
    "id": "a15",
    "level": "advanced",
    "topic": "Array methods",
    "prompt": "Which comparison is correct?",
    "code": "const a = [1, 2];\nconst b = [1, 2];\nconsole.log(a === b);",
    "choices": [
      "true",
      "false",
      "undefined",
      "TypeError"
    ],
    "answer": "false",
    "explanation": "Arrays are reference values; two separately created arrays are not strictly equal."
  }
];

export default questions;
