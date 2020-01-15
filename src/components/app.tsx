import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core';
import MidiInputs from './midiInputs'
import * as midiInfo from '../midiInfo'

interface AppState {
    midiInputs: midiInfo.MIDIInputs
}

function removeMidiInput(input: WebMidi.MIDIPort, inputs: midiInfo.MIDIInputs): midiInfo.MIDIInputs {
    return inputs.filter((i) => (i.id !== input.id))
}

export default function App() {
    const [midiInputs, setMidiInputs] = useState<midiInfo.MIDIInputs>([])
    const [midiAccess, setMidiAccess] = useState<WebMidi.MIDIAccess | null>(null)
    useEffect(() => {
        midiInfo.getMIDIAccess(window.navigator).then((access) => {
            setMidiAccess(access)
            setMidiInputs(midiInfo.getMidiInputs(access))
            midiInfo.onStateChange(access, (p) => {
                setMidiInputs(midiInfo.getMidiInputs(access))
            });
        })
    }, []);

    return <Container maxWidth="md">
        <MidiInputs inputs={midiInputs}></MidiInputs>
    </Container>
}