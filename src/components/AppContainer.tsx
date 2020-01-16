import { Container } from '@material-ui/core';
import React from 'react'
import { MIDIInputs } from '~/midi/midiInfo';
import MidiInputs from '~/components/MidiInputs'

interface Props {
    midiInputs: MIDIInputs
}

export default function AppContainer(props: Props) {

    return <Container maxWidth="md">
        <MidiInputs inputs={props.midiInputs}></MidiInputs>
    </Container>
}