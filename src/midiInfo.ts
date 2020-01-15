namespace MIDI {
    type MIDIInputs = Array<WebMidi.MIDIInput>

    export async function getMidiInputs(navigator: Navigator): Promise<MIDIInputs> {
        return navigator.requestMIDIAccess()
            .then((midiAccess) => {
                console.log("MIDI Ready!");
                let inputs: Array<WebMidi.MIDIInput> = [];
                for (let entry of midiAccess.inputs) {
                    console.log("MIDI input device: " + entry[1].id)
                    inputs.push(entry[1])

                }
                return inputs
            })
            .catch((error) => {
                console.log("Error accessing MIDI devices: " + error);
                return []
            });

    }
}