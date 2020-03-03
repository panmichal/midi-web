import { connect } from 'react-redux';
import { RootState } from '~/store/index';
import Chords from '~/components/Chords';
import { findChords } from '~/chords/find';

export const mapStateToProps: (state: RootState) => { chords: string[] } = state => {
    const notes = state.event.notesPlaying.map(note => note.noteName);
    return { chords: findChords(notes) };
};

const ChordsContainer = connect(mapStateToProps)(Chords);
export default ChordsContainer;
