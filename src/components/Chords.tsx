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
    chordsPlayed: string[];
}

const Chords: React.FC<Props> = props => {
    return <div>{props.chordsPlayed.map(chord => chord)}</div>;
};

export default Chords;
