import { transpose, distance } from '@tonaljs/tonal';
import { chordType } from '@tonaljs/chord-dictionary';
import { pcset } from '@tonaljs/pcset';
import { getPermutations } from '~/utility/permutation';

function findForPermutation(notes: string[]): string {
    const [root] = notes;
    const interval = distance(root, 'C');
    const transposed = notes.map(note => transpose(note, interval));
    const chordName = chordType(pcset(transposed).chroma).name;
    if (chordName === '') {
        return '';
    }

    return `${root} ${chordName}`;
}

export const findChord: (notes: string[]) => string = notes => {
    // const permutations
    const chord = getPermutations(notes)
        .map(p => findForPermutation(p))
        .filter(chord => chord !== '')
        .shift();

    return chord !== undefined ? chord : '';
};
