import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as midiInfo from '~/midi/midiInfo'
import * as midiEvent from '~/midi/event'

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
}

const createRandomEvents: () => Array<midiEvent.MidiEvent> = () => {
    return [midiEvent.createEvent(), midiEvent.createEvent(), midiEvent.createEvent(), midiEvent.createEvent(), midiEvent.createEvent(), midiEvent.createEvent()];
}

const MidiEvents: React.FC<MidiInputsProps> = props => {
    const classes = useStyles();
    const [events, setEvents] = useState(createRandomEvents())
    // setEvents(createRandomEvents());
    return <TableContainer>
        <Table className={classes.table} aria-label="MIDI input list">
            <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>State</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {events.map(row => (
                    <TableRow key={row.command}>
                        <StyledTableCell component="th" scope="row">
                            {row.command}
                        </StyledTableCell>
                        <StyledTableCell>{row.channel}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>

}

export default MidiEvents;