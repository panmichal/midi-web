import { ADD_EVENT, EventActionTypes } from '~/store/events/types';
import { SupportedEvent } from '~/midi/event';

export function AddEvent(event: SupportedEvent): EventActionTypes {
    return {
        type: ADD_EVENT,
        event,
    };
}
