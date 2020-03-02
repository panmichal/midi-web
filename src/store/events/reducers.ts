import { EventState, EventActionTypes, ADD_EVENT, PlayedNote } from './types';

function updatePlayingNotes(currentNotes: PlayedNote[], action: EventActionTypes): PlayedNote[] {
    if (action.event.type === 'noteon') {
        const newNote = { noteName: action.event.noteName, octave: action.event.octave };
        return [...currentNotes, newNote];
    }

    if (action.event.type === 'noteoff') {
        const offName = action.event.noteName;
        const offOctave = action.event.octave;
        return currentNotes.filter(note => {
            return note.noteName !== offName || note.octave !== offOctave;
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
