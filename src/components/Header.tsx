import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { fontFamily } from '@material-ui/system';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black',
        color: 'white',
        height: 70,
        padding: '0 30px',
        margin: '0 0 30px 0',
        fontFamily: 'Futura',
        fontSize: '30',
        verticalAlign: 'middle',
        display: 'flex'
    },
    headerText: {
        alignSelf: 'center'
    }
});

export default function Header() {
    const classes = useStyles()
    return <div className={classes.root}><div className={classes.headerText}>🎹 MIDI TOOLS</div></div>
}