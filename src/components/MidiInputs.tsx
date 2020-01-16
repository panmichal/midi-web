import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as midiInfo from '~/midi/midiInfo'

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
    inputs: midiInfo.MIDIInputs
}

export default function MidiInputs(props: MidiInputsProps) {
    const classes = useStyles();

    return <TableContainer>
        <Table className={classes.table} aria-label="MIDI input list">
            <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>State</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.inputs.map(row => (
                    <TableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell>{row.state}</StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>

}