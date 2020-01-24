import React, { useState, useEffect, useCallback } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as midiInfo from '~/midi/midiInfo'
import * as midiEvent from '~/midi/event'
import throttle from '~/utility/throttle'

const NUM_OF_EVENTS = 15;

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 400
    },
}));

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        height: 33,
        fontSize: 14
    },
}))(TableCell);



interface MidiInputsProps {
    initialEvents: Array<midiEvent.SupportedEvent>
    onIncomingEvent: (e: midiEvent.SupportedEvent) => void,
    midiInputs: midiInfo.MIDIInputs
}

function assertNever(event: never): never {
    throw new Error("Unexpected event: " + event);
}
const getEventValue: (event: midiEvent.SupportedEvent) => string = (event) => {
    switch (event.type) {
        case "noteon": return event.noteName + event.octave;
        case "noteoff": return event.noteName + event.octave;
        case "other": return "-";
        default: return assertNever(event);
    }
};

const MidiEvents: React.FC<MidiInputsProps> = props => {
    const classes = useStyles();
    const [events, setEvents] = useState(props.initialEvents);
    const [hasNewEvent, setHasNewEvent] = useState(false);

    const throttledOnIncomingEvent = useCallback(throttle(props.onIncomingEvent), []);

    useEffect(() => {
        props.midiInputs.forEach((input) => {
            input.onmidimessage = (e) => {
                const newEvent = midiEvent.createFromRawData(e, input);
                if (newEvent !== null) {
                    throttledOnIncomingEvent(newEvent)
                    setEvents(currentEvents => {
                        const sliceIndex = currentEvents.length - NUM_OF_EVENTS >= 0 ? currentEvents.length - NUM_OF_EVENTS : 0;
                        return [...currentEvents.slice(sliceIndex), newEvent]
                    })
                }
            }
        });
    })

    const emptyRow: (key: number) => JSX.Element = (key) => {
        return <TableRow key={key}>
            <StyledTableCell component="th" scope="row">
            </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
        </TableRow>
    }

    return <TableContainer>
        <Table className={classes.table} size="small" aria-label="MIDI input list">
            <TableHead>
                <TableRow>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Values</StyledTableCell>
                    <StyledTableCell>Input</StyledTableCell>
                    <StyledTableCell>Timestamp</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {[...Array(NUM_OF_EVENTS)].map((row: number, index: number) => {
                    if (events.length - 1 < index) {
                        return emptyRow(index);
                    } else {
                        return <TableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {events[index].type}
                            </StyledTableCell>
                            <StyledTableCell>{getEventValue(events[index])}</StyledTableCell>
                            <StyledTableCell>{events[index].input.name}</StyledTableCell>
                            <StyledTableCell>{new Date(events[index].timestamp).toUTCString()}</StyledTableCell>
                        </TableRow>
                    }
                })}
            </TableBody>
        </Table>
    </TableContainer>

}

export default MidiEvents;