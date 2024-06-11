// lib/shapes.test.js
const { Circle, Triangle, Square } = require('./shapes');

test('Circle renders correctly', () => {
  const shape = new Circle('blue');
  expect(shape.render()).toBe('<circle cx="150" cy="100" r="80" fill="blue" />');
});

test('Triangle renders correctly', () => {
  const shape = new Triangle('blue');
  expect(shape.render()).toBe('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
});

test('Square renders correctly', () => {
  const shape = new Square('blue');
  expect(shape.render()).toBe('<rect x="90" y="40" width="120" height="120" fill="blue" />');
});
