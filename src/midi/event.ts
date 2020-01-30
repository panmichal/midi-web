import {} from "~/midi/midiInfo";

// export type NoteName = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

export type NoteName =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";
export interface MidiEvent {
  command: number;
  channel: number;
  input: WebMidi.MIDIInput;
  timestamp: DOMHighResTimeStamp;
}

export interface NoteOnEvent extends MidiEvent {
  type: "noteon";
  note: number;
  noteName: NoteName;
  velocity: number;
  octave: number;
}

export interface NoteOffEvent extends MidiEvent {
  type: "noteoff";
  note: number;
  noteName: NoteName;
  velocity: number;
  octave: number;
}

export interface ControlChangeEvent extends MidiEvent {
  type: "control change";
  controllerNumber: number;
  controllerValue: number;
}

export interface OtherEvent extends MidiEvent {
  type: "other";
}

export function createEvent(): MidiEvent {
  return <NoteOnEvent>{
    command: 1,
    channel: 2,
    note: 2,
    noteName: "D",
    velocity: 5
  };
}

type EventRequiredData<T extends MidiEvent> = Omit<T, "type">;

const noteOnEvent: (
  data: EventRequiredData<NoteOnEvent>
) => NoteOnEvent = data => {
  return {
    ...data,
    type: "noteon"
  };
};
const noteOffEvent: (
  data: EventRequiredData<NoteOffEvent>
) => NoteOffEvent = data => {
  return {
    ...data,
    type: "noteoff"
  };
};
const controlChangeEvent: (
  data: EventRequiredData<ControlChangeEvent>
) => ControlChangeEvent = data => {
  return {
    ...data,
    type: "control change"
  };
};
const otherEvent: (
  data: EventRequiredData<OtherEvent>
) => OtherEvent = data => {
  return {
    ...data,
    type: "other"
  };
};

export type SupportedEvent =
  | NoteOnEvent
  | NoteOffEvent
  | OtherEvent
  | ControlChangeEvent;

function getNoteName(noteValue: number): NoteName {
  switch (noteValue % 12) {
    case 0:
      return "C";
    case 1:
      return "C#";
    case 2:
      return "D";
    case 3:
      return "D#";
    case 4:
      return "E";
    case 5:
      return "F";
    case 6:
      return "F#";
    case 7:
      return "G";
    case 8:
      return "G#";
    case 9:
      return "A";
    case 10:
      return "A#";
    case 11:
      return "B";
    default:
      throw new Error("Invalid note value");
  }
}

const navigationStartTimestamp = window.performance.timing.navigationStart;

export function createFromRawData(
  event: WebMidi.MIDIMessageEvent,
  input: WebMidi.MIDIInput
): SupportedEvent | null {
  const data: Uint8Array = event.data;
  if (data.length === 3) {
    // status is the first byte.
    const status = data[0];
    // command is the four most significant bits of the status byte.
    const command = status >>> 4;
    // channel 0-15 is the lower four bits.
    const channel = status & 0xf;
    const baseProperties = {
      input,
      command,
      channel,
      timestamp: navigationStartTimestamp + event.timeStamp
    };

    switch (command) {
      case 0x9:
        return noteOnEvent({
          ...baseProperties,
          velocity: data[2],
          note: data[1],
          noteName: getNoteName(data[1]),
          octave: Math.trunc(data[1] / 12)
        });

      case 0x8:
        return noteOffEvent({
          ...baseProperties,
          velocity: data[2],
          note: data[1],
          noteName: getNoteName(data[1]),
          octave: Math.trunc(data[1] / 12)
        });
      case 0xb:
        return controlChangeEvent({
          ...baseProperties,
          controllerNumber: data[1],
          controllerValue: data[2]
        });
      default:
        return otherEvent(baseProperties);
    }
  }

  return null;
}
