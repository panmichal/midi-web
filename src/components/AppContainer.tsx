import { Container } from '@material-ui/core';
import React from 'react'
import { MIDIInputs } from '~/midi/midiInfo';
import MidiInputs from '~/components/MidiInputs'
import MidiEvents from '~/components/MidiEvents'
import Expansion from '~/components/Expansion'

interface Props {
    midiInputs: MIDIInputs
}

export default function AppContainer(props: Props) {
    return <Container maxWidth="md">
        <Expansion summaryText="MIDI Inputs">
            <MidiInputs inputs={props.midiInputs}></MidiInputs>
        </Expansion>
        <Expansion summaryText="MIDI Events">
            <MidiEvents initialEvents={[]}></MidiEvents>
        </Expansion>
    </Container>
}