import { findChord } from './find';

test('finds major chord with C root', () => {
    expect(findChord(['C', 'E', 'G'])).toStrictEqual(['C major']);
});

test('finds minor chord with D root', () => {
    expect(findChord(['D', 'F', 'A'])).toStrictEqual(['D minor']);
});

test('finds chord for notes in different order', () => {
    expect(findChord(['A', 'D', 'F'])).toStrictEqual(['D minor']);
});

test('finds 7th chord', () => {
    expect(findChord(['A', 'C', 'E', 'G'])).toStrictEqual(['A minor seventh', 'C sixth']);
});

test('finds 7th chord for not ordered notes', () => {
    expect(findChord(['E', 'C', 'A', 'G'])).toStrictEqual(['C sixth', 'A minor seventh']);
});

test('returns empty string when no chord found', () => {
    expect(findChord(['D', 'F'])).toStrictEqual([]);
});
