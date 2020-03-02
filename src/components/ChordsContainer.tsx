import { connect } from 'react-redux';
import { RootState } from '~/store/index';
import { PlayedNote } from '~/store/events/types';
import Chords from '~/components/Chords';
import { chordType } from '@tonaljs/chord-dictionary';
import { pcset } from '@tonaljs/pcset';

export const mapStateToProps: (state: RootState) => { chords: string[] } = state => {
    const notes = state.event.notesPlaying.map(note => note.noteName);
    console.log(chordType(pcset(notes).chroma));
    return { chords: [chordType(pcset(notes).chroma).name] };
};

const ChordsContainer = connect(mapStateToProps)(Chords);
export default ChordsContainer;
