import { findChords } from './find';

test('finds major chord with C root', () => {
    expect(findChords(['C', 'E', 'G'])).toStrictEqual(['C major']);
});

test('finds minor chord with D root', () => {
    expect(findChords(['D', 'F', 'A'])).toStrictEqual(['D minor']);
});

test('finds chord for notes in different order', () => {
    expect(findChords(['A', 'D', 'F'])).toStrictEqual(['D minor']);
});

test('finds 7th chord', () => {
    expect(findChords(['A', 'C', 'E', 'G'])).toStrictEqual(['A minor seventh', 'C sixth']);
});

test('finds 7th chord for not ordered notes', () => {
    expect(findChords(['E', 'C', 'A', 'G'])).toStrictEqual(['C sixth', 'A minor seventh']);
});

test('returns empty string when no chord found', () => {
    expect(findChords(['D', 'F'])).toStrictEqual([]);
});
