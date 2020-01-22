import React, { useState, useEffect } from 'react'
import AppContainer from '~/components/AppContainer';
import Header from '~/components/Header';
import * as midiInfo from '~/midi/midiInfo'

export default function App() {
    const [midiInputs, setMidiInputs] = useState<midiInfo.MIDIInputs>([])
    useEffect(() => {
        midiInfo.getMIDIAccess(window.navigator).then((access) => {
            setMidiInputs(midiInfo.getMidiInputs(access))
            midiInfo.onStateChange(access, (p) => {
                setMidiInputs(midiInfo.getMidiInputs(access))
            });
        })
    }, []);

    return <div><Header /> <main><AppContainer midiInputs={midiInputs} /></main></div>
}