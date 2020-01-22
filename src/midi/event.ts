export type NoteName = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

export interface MidiEvent {
    command: number,
    channel: number
}

export interface NoteOnEvent extends MidiEvent {
    note: number
    noteName: NoteName
    velocity: number
}

export interface NoteOffEvent extends MidiEvent {
    note: number
    noteName: NoteName
    velocity: number
}

export function createEvent(): MidiEvent {
    return <NoteOnEvent>{
        command: 1,
        channel: 2,
        note: 2,
        noteName: "F#",
        velocity: 5
    }
}

