import run from '../src';

test('Basic function', () => {
  expect(run).toBeTruthy(); // Should export something
  expect(typeof run).toBe('function'); // Should export a function.
});
