export type MIDIInputs = Array<WebMidi.MIDIInput>

export enum MIDIInputState {
    connected = "connected"
}

export function getMidiInputs(access: WebMidi.MIDIAccess): MIDIInputs {
    return [...access.inputs.values()]
}

export async function getMIDIAccess(navigator: Navigator): Promise<WebMidi.MIDIAccess> {
    return navigator.requestMIDIAccess()
}

export function onStateChange(access: WebMidi.MIDIAccess, f: (newPort: WebMidi.MIDIConnectionEvent) => void): void {
    access.onstatechange = f
}   