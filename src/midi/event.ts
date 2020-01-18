const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

interface MidiEvent {
    command: number,
    channel: number
}

interface NoteOnEvent extends MidiEvent {
    note: number
    velocity: number
}

interface NoteOffEvent extends MidiEvent {
    note: number
    velocity: number
}

export function createEvent(): MidiEvent {
    return <NoteOnEvent>{
        command: 1,
        channel: 2,
        note: 2,
        velocity: 5
    }
}

