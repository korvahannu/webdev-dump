/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */

const app = require('./app');

test('5+2=7', () => {
  expect(app.add(5, 2)).toBe(7);
});

test('5-2=3', () => {
  expect(app.substract(5, 2)).toBe(3);
});