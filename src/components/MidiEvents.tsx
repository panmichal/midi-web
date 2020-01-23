import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as midiInfo from '~/midi/midiInfo'
import * as midiEvent from '~/midi/event'

const NUM_OF_EVENTS = 10;

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 400,
        borderLeft: '1px solid',
        borderRight: '1px solid',
        borderColor: theme.palette.common.black
    },
}));

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14,
        borderBottom: '1px solid',
        borderLeft: '1px solid'
    },
}))(TableCell);



interface MidiInputsProps {
    initialEvents: Array<midiEvent.MidiEvent>
    midiInputs: midiInfo.MIDIInputs
}

const MidiEvents: React.FC<MidiInputsProps> = props => {
    const classes = useStyles();
    const [events, setEvents] = useState(props.initialEvents)
    useEffect(() => {
        props.midiInputs.forEach((input) => {
            input.onmidimessage = (e) => {
                const newEvent = midiEvent.createFromRawData(e);
                if (newEvent !== null) {
                    setEvents(currentEvents => {
                        const sliceIndex = currentEvents.length - 10 >= 0 ? currentEvents.length - 10 : 0;
                        return [...currentEvents.slice(sliceIndex), newEvent]
                    })
                }
            }
        });
    })

    const emptyRow: (key: number) => JSX.Element = (key) => {
        return <TableRow key={key}>
            <StyledTableCell component="th" scope="row">
                EMPTY
            </StyledTableCell>
            <StyledTableCell>EMPTY</StyledTableCell>
        </TableRow>
    }

    return <TableContainer>
        <Table className={classes.table} aria-label="MIDI input list">
            <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>State</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {[...Array(NUM_OF_EVENTS)].map((row: number, index: number) => {
                    if (events.length - 1 < index) {
                        return emptyRow(index);
                    } else {
                        return <TableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                                {events[index].command}
                            </StyledTableCell>
                            <StyledTableCell>{events[index].channel}</StyledTableCell>
                        </TableRow>
                    }
                })}
            </TableBody>
        </Table>
    </TableContainer>

}

export default MidiEvents;