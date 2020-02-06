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
  children?: SupportedEvent[];
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

type AvailableTypes<T> = T extends SupportedEvent ? T["type"] : never;

export interface EventContainer {
  type: AvailableTypes<SupportedEvent>;
  children: SupportedEvent[];
}

type NoteEvent = NoteOffEvent | NoteOnEvent;
type EventGroup = NoteEvent | ControlChangeEvent | OtherEvent;

type EventRequiredData<T extends SupportedEvent> = Omit<T, "type">;

export type SupportedEvent =
  | NoteOnEvent
  | NoteOffEvent
  | ControlChangeEvent
  | OtherEvent;

function createEvent<T extends SupportedEvent>(
  data: EventRequiredData<T>,
  type: T["type"]
): T {
  return {
    ...data,
    type
  } as T;
}

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
        return createEvent<NoteOnEvent>(
          {
            ...baseProperties,
            velocity: data[2],
            note: data[1],
            noteName: getNoteName(data[1]),
            octave: Math.trunc(data[1] / 12)
          },
          "noteon"
        );

      case 0x8:
        return createEvent<NoteOffEvent>(
          {
            ...baseProperties,
            velocity: data[2],
            note: data[1],
            noteName: getNoteName(data[1]),
            octave: Math.trunc(data[1] / 12)
          },
          "noteoff"
        );
      case 0xb:
        return createEvent<ControlChangeEvent>(
          {
            ...baseProperties,
            controllerNumber: data[1],
            controllerValue: data[2]
          },
          "control change"
        );
      default:
        return createEvent<OtherEvent>(baseProperties, "other");
    }
  }

  return null;
}
