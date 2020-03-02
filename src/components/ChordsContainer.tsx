import { connect } from 'react-redux';
import { RootState } from '~/store/index';
import Chords from '~/components/Chords';

export const mapStateToProps: (state: RootState) => { chords: string[] } = state => {
    return { chords: ['A#', 'C'] };
};

const ChordsContainer = connect(mapStateToProps)(Chords);
export default ChordsContainer;
