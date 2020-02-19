import { EventState, EventActionTypes, ADD_EVENT } from './types';

const initialState: EventState = {
    events: [],
};

export function eventReducer(state = initialState, action: EventActionTypes): EventState {
    switch (action.type) {
        case ADD_EVENT:
            return {
                events: [...state.events, action.event],
            };
    }
}
