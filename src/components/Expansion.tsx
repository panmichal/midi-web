import React, { FunctionComponent, ComponentProps, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

type Props = {
    summaryText: string,
    children?: any
}

export default function Expansion(props: Props) {
    const classes = useStyles();

    return <ExpansionPanel>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography className={classes.heading}>{props.summaryText}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            {props.children}
        </ExpansionPanelDetails>
    </ExpansionPanel>
}