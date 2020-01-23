import { } from '~/midi/midiInfo';

// export type NoteName = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

export type NoteName = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B"
export interface MidiEvent {
    command: number
    channel: number
    input: WebMidi.MIDIInput
    timestamp: DOMHighResTimeStamp
}

export interface NoteOnEvent extends MidiEvent {
    type: "noteon"
    note: number
    noteName: NoteName
    velocity: number
    octave: number
}

export interface NoteOffEvent extends MidiEvent {
    type: "noteoff"
    note: number
    noteName: NoteName
    velocity: number
    octave: number
}

export interface OtherEvent extends MidiEvent {
    type: "other"
}


export function createEvent(): MidiEvent {
    return <NoteOnEvent>{
        command: 1,
        channel: 2,
        note: 2,
        noteName: "D",
        velocity: 5
    }
}
type NoteOnData = Omit<NoteOnEvent, 'type'>;
type NoteOffData = Omit<NoteOffEvent, 'type'>;
type OtherData = MidiEvent;

const noteOnEvent: (data: NoteOnData) => NoteOnEvent = data => {
    return {
        ...data,
        type: "noteon"
    }
}
const noteOffEvent: (data: NoteOffData) => NoteOffEvent = data => {
    return {
        ...data,
        type: "noteoff"
    }
}
const otherEvent: (data: OtherData) => OtherEvent = data => {
    return {
        ...data,
        type: "other"
    }
}

export type Event = NoteOnEvent | NoteOffEvent | OtherEvent

function getNoteName(noteValue: number): NoteName {
    switch (noteValue % 12) {
        case 0:
            return "C";
        case 1:
            return "C#"
        case 2:
            return "D";
        case 3:
            return "D#"
        case 4:
            return "E";
        case 5:
            return "F"
        case 6:
            return "F#";
        case 7:
            return "G"
        case 8:
            return "G#";
        case 9:
            return "A"
        case 10:
            return "A#";
        case 11:
            return "B"
        default:
            throw new Error("Invalid note value");
    }
}

export function createFromRawData(event: WebMidi.MIDIMessageEvent, input: WebMidi.MIDIInput): MidiEvent | null {
    const data: Uint8Array = event.data;
    if (data.length === 3) {
        // status is the first byte.
        const status = data[0];
        // command is the four most significant bits of the status byte.
        const command = status >>> 4;
        // channel 0-15 is the lower four bits.
        const channel = status & 0xF;
        console.log(`$Command: ${command.toString(16)}, Channel: ${channel.toString(16)} `);
        console.log(event.timeStamp)
        const baseProperties = {
            input,
            command,
            channel,
            timestamp: event.timeStamp
        }

        switch (command) {
            case 0x9:
                return noteOnEvent({
                    ...baseProperties,
                    velocity: data[2],
                    note: data[1],
                    noteName: getNoteName(data[1]),
                    octave: data[1] / 12
                });

            case 0x8:
                return noteOffEvent({
                    ...baseProperties,
                    velocity: data[2],
                    note: data[1],
                    noteName: getNoteName(data[1]),
                    octave: data[1] / 12
                });
            default:
                return otherEvent(baseProperties)

        }
        // just look at note on and note off messages.
        // if (command === 0x9 || command === 0x8) {
        //     // note number is the second byte.
        //     let note = data[1];
        //     // velocity is the thrid byte.
        //     let velocity = data[2];
        //     let commandName = command === 0x9 ? "Note On " : "Note Off";
        //     // calculate octave and note name.
        //     let octave = Math.trunc(note / 12);
        //     let noteName = noteNames[note % 12];
        //     console.log(`${commandName} ${noteName}${octave} ${velocity}`);
        // }
    }

    return null;
}

