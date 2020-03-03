import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        fontFamily: 'Cinzel, serif',
        fontSize: 45,
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
    const classes = useStyles();
    return <div className={classes.container}>{props.chords.map(chord)}</div>;
};

export default Chords;
