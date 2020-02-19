import { SupportedEvent } from '~/midi/event';

export const ADD_EVENT = 'ADD_EVENT';

interface AddEventAction {
    type: typeof ADD_EVENT;
    event: SupportedEvent;
}

export interface EventState {
    events: SupportedEvent[];
}

export type EventActionTypes = AddEventAction;
