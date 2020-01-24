import { Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import React, { useState } from 'react'
import { MIDIInputs } from '~/midi/midiInfo';
import { SupportedEvent } from '~/midi/event';
import MidiInputs from '~/components/MidiInputs'
import MidiEvents from '~/components/MidiEvents'
import Expansion from '~/components/Expansion'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, withStyles } from '@material-ui/core/styles';


interface Props {
    midiInputs: MIDIInputs
}

const useStyles = makeStyles(theme => ({
    eventListNewEvent: {
        backgroundColor: "red"
    },
    eventList: {
        transition: "background-color 0.2s"
    }
}));


export default function AppContainer(props: Props) {
    const classes = useStyles();
    const [hasNewEvent, setHasNewEvent] = useState(false)
    const onIncomingEvent: (event: SupportedEvent) => void = event => {
        console.log("nowy")
        !hasNewEvent && setHasNewEvent(true)
    }

    return <Container maxWidth="md">
        <Expansion summaryText="MIDI Inputs">
            <MidiInputs inputs={props.midiInputs}></MidiInputs>
        </Expansion>
        <ExpansionPanel>
            <div className={`${classes.eventList} ${hasNewEvent ? classes.eventListNewEvent : ""}`}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Incoming MIDI events</ExpansionPanelSummary>
            </div>
            <ExpansionPanelDetails><MidiEvents initialEvents={[]} midiInputs={props.midiInputs} onIncomingEvent={onIncomingEvent}></MidiEvents></ExpansionPanelDetails>
        </ExpansionPanel>
    </Container>
}