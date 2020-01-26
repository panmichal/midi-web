import React from 'react'
import { makeStyles } from '@material-ui/styles';
import GitHub from '@material-ui/icons/GitHub'
import Link from '@material-ui/core/Link'

const GITHUB_URL = "https://github.com/panmichal/midi-web";

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
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerText: {
        alignSelf: 'center'
    },
    headerRight: {
        a: {
            color: "white"
        },
        alignSelf: 'center'
    },
    headerRightLink: {
        color: "white",
        '&:hover': {
            color: "grey"
        }
    }
});

export default function Header() {
    const classes = useStyles()
    return <div className={classes.root}>
        <div className={classes.headerText}>🎹 MIDI TOOLS</div>
        <div className={classes.headerRight}><Link target="black" className={classes.headerRightLink} href={GITHUB_URL}><GitHub /></Link></div>
    </div>
}