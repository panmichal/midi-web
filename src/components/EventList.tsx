import { connect } from 'react-redux';
import { RootState } from '~/store/index';
import MidiEventTable from '~/components/MidiEventTable';
import { SupportedEvent } from '~midi/event';
import { AddEvent } from '~/store/events/actions';

export const mapStateToProps: (state: RootState) => { events: SupportedEvent[] } = state => {
    return { events: state.event.events };
};

export const dispatchProps = {
    onNewEvent: AddEvent,
};

const EventList = connect(mapStateToProps, dispatchProps)(MidiEventTable);
export default EventList;
