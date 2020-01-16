import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core';
import AppContainer from '~/components/AppContainer';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MidiInputs from './MidiInputs'
import * as midiInfo from '~/midi/midiInfo'

function removeMidiInput(input: WebMidi.MIDIPort, inputs: midiInfo.MIDIInputs): midiInfo.MIDIInputs {
    return inputs.filter((i) => (i.id !== input.id))
}

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 400,
        borderColor: theme.palette.common.white
    },
}));

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

    return <AppContainer midiInputs={midiInputs} />
}