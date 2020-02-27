import { connect } from 'react-redux';
import { RootState } from '~/store/index';
import Chords from '~/components/Chords';

const mapStateToProps: (state: RootState) => { chords: string[] } = state => {
    return {
        chords: ['F#', 'Cm'],
    };
};

const RecentChords = connect(mapStateToProps)(Chords);
export default RecentChords;
