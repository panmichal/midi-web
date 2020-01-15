import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core';
import MidiInputs from './midiInputs'
import * as midiInfo from '../midiInfo'

interface AppState {
    midiInputs: midiInfo.MIDIInputs
}

export default function App() {
    const [midiInputs, setMidiInputs] = useState<midiInfo.MIDIInputs>([])

    useEffect(() => {
        midiInfo.getMidiInputs(window.navigator).then((inputs: midiInfo.MIDIInputs) => {
            setMidiInputs(inputs)
        })
    });

    return <Container maxWidth="md">
        <MidiInputs inputs={midiInputs}></MidiInputs>
    </Container>
}