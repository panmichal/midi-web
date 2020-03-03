import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 400,
        borderColor: theme.palette.common.black,
    },
    header: {
        borderBottom: '2px solid',
        marginBottom: '5px',
        fontFamily: "'Playfair Display', serif",
    },
}));

interface Props {
    chords: string[];
}

function chord(chord: string): React.ReactNode {
    return <div key={chord}>{chord}</div>;
}

const Chords: React.FC<Props> = props => {
    return <div>{props.chords.map(chord)}</div>;
};

export default Chords;
