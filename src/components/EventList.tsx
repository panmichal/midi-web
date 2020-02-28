import { connect } from 'react-redux';
import { RootState } from '~/store/index';
import MidiEventTable from '~/components/MidiEventTable';
import { SupportedEvent } from '~midi/event';

const mapStateToProps: (state: RootState) => { events: SupportedEvent[] } = state => {
    return { events: state.event.events };
};

const EventList = connect(mapStateToProps)(MidiEventTable);
export default EventList;
