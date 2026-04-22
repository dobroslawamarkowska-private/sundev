import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getThemeLabels,
  nextThemeMode,
  normalizeThemeMode,
} from '../src/utils/theme-mode.js';

test('normalizeThemeMode returns known mode values', () => {
  assert.equal(normalizeThemeMode('system'), 'system');
  assert.equal(normalizeThemeMode('light'), 'light');
  assert.equal(normalizeThemeMode('dark'), 'dark');
});

test('normalizeThemeMode falls back to system for invalid values', () => {
  assert.equal(normalizeThemeMode(''), 'system');
  assert.equal(normalizeThemeMode('invalid'), 'system');
  assert.equal(normalizeThemeMode(null), 'system');
  assert.equal(normalizeThemeMode(undefined), 'system');
});

test('nextThemeMode cycles through system -> light -> dark -> system', () => {
  assert.equal(nextThemeMode('system'), 'light');
  assert.equal(nextThemeMode('light'), 'dark');
  assert.equal(nextThemeMode('dark'), 'system');
});

test('nextThemeMode starts from system for invalid values', () => {
  assert.equal(nextThemeMode('invalid'), 'light');
});

test('getThemeLabels returns current and next labels', () => {
  assert.deepEqual(getThemeLabels('system'), {
    currentMode: 'system',
    nextMode: 'light',
    currentLabel: 'System',
    nextLabel: 'Light',
  });

  assert.deepEqual(getThemeLabels('light'), {
    currentMode: 'light',
    nextMode: 'dark',
    currentLabel: 'Light',
    nextLabel: 'Dark',
  });

  assert.deepEqual(getThemeLabels('dark'), {
    currentMode: 'dark',
    nextMode: 'system',
    currentLabel: 'Dark',
    nextLabel: 'System',
  });
});
