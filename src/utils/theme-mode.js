export const THEME_KEY = 'theme';
export const THEME_MODES = ['system', 'light', 'dark'];

/**
 * @param {string | null | undefined} value
 * @returns {'system' | 'light' | 'dark'}
 */
export function normalizeThemeMode(value) {
  return THEME_MODES.includes(value ?? '') ? value : 'system';
}

/**
 * @param {'system' | 'light' | 'dark'} mode
 * @returns {'system' | 'light' | 'dark'}
 */
export function nextThemeMode(mode) {
  const currentMode = normalizeThemeMode(mode);
  return currentMode === 'system'
    ? 'light'
    : currentMode === 'light'
      ? 'dark'
      : 'system';
}

/**
 * @param {'system' | 'light' | 'dark'} mode
 * @returns {{ currentMode: 'system' | 'light' | 'dark', nextMode: 'system' | 'light' | 'dark', currentLabel: string, nextLabel: string }}
 */
export function getThemeLabels(mode) {
  const currentMode = normalizeThemeMode(mode);
  const nextMode = nextThemeMode(currentMode);

  return {
    currentMode,
    nextMode,
    currentLabel: currentMode.charAt(0).toUpperCase() + currentMode.slice(1),
    nextLabel: nextMode.charAt(0).toUpperCase() + nextMode.slice(1),
  };
}
