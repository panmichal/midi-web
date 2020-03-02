import { SupportedEvent } from '~/midi/event';

export const ADD_EVENT = 'ADD_EVENT';

interface AddEventAction {
    type: typeof ADD_EVENT;
    event: SupportedEvent;
}

export interface PlayedNote {
    octave: number;
    noteName: string;
}

export interface EventState {
    events: SupportedEvent[];
    notesPlaying: PlayedNote[];
}

export type EventActionTypes = AddEventAction;
