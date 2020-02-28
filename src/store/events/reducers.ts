import { EventState, EventActionTypes, ADD_EVENT } from './types';

const initialState: EventState = {
    events: [],
    notesPlaying: [],
};

export function eventReducer(state = initialState, action: EventActionTypes): EventState {
    switch (action.type) {
        case ADD_EVENT:
            if (action.event.type === 'noteon') {
            }

            return {
                ...state,
                events: [...state.events, action.event],
            };
        default:
            return state;
    }
}
