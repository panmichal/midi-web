import { findChord } from './find';

test('finds major chord with C root', () => {
    expect(findChord(['C', 'E', 'G'])).toBe('C major');
});

test('finds minor chord with D root', () => {
    expect(findChord(['D', 'F', 'A'])).toBe('D minor');
});

test('finds chord for notes in different order', () => {
    expect(findChord(['A', 'D', 'F'])).toBe('D minor');
});

test('returns empty string when no chord found', () => {
    expect(findChord(['D', 'F'])).toBe('');
});
