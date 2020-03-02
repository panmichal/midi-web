import { EventState, EventActionTypes, ADD_EVENT } from './types';

function updatePlayingNotes(currentNotes: string[], action: EventActionTypes): string[] {
    if (action.event.type === 'noteon' && !currentNotes.includes(action.event.noteName)) {
        return [...currentNotes, action.event.noteName];
    }

    if (action.event.type === 'noteoff' && currentNotes.includes(action.event.noteName)) {
        const offName = action.event.noteName;
        return currentNotes.filter(noteName => {
            return noteName !== offName;
        });
    }

    return currentNotes;
}

const initialState: EventState = {
    events: [],
    notesPlaying: [],
};

export function eventReducer(state = initialState, action: EventActionTypes): EventState {
    switch (action.type) {
        case ADD_EVENT:
            return {
                notesPlaying: updatePlayingNotes(state.notesPlaying, action),
                events: [...state.events, action.event],
            };
        default:
            return state;
    }
}
