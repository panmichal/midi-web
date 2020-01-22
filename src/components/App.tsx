import React, { useState, useEffect } from 'react'
import AppContainer from '~/components/AppContainer';
import Header from '~/components/Header';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

    return <div><Header /> <main><AppContainer midiInputs={midiInputs} /></main></div>
}