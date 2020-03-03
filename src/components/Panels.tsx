import React, { useState } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
    eventListNewEvent: {
        backgroundColor: '#e6f9ff',
    },
    eventList: {
        transition: 'background-color 0.1s',
    },
    inputListChanged: {
        backgroundColor: '#e6f9ff',
    },
    inputList: {
        transition: 'background-color 0.3s',
    },
    panelSummary: {
        fontFamily: 'Playfair Display',
        fontSize: 15,
    },
}));

interface Props {
    inputsTable: React.ReactNode;
    eventsTable: React.ReactNode;
    chordsTable: React.ReactNode;
    onDigestNewEvent: () => void;
    hasNewEvent: boolean;
    hasRecentInputListChange: boolean;
    onDigestInputListChange: () => void;
}

type AvailablePanels = 'inputs' | 'events' | 'chords';

const Panels: React.FC<Props> = props => {
    const classes = useStyles();
    const [expandedPanel, setExpandedPanel] = useState<AvailablePanels | undefined>(undefined);

    const handleExpansionChange = (panel: AvailablePanels) => (
        event: React.ChangeEvent<{}>,
        expanded: boolean,
    ): void => {
        setExpandedPanel(expanded ? panel : undefined);
    };
    return (
        <>
            <ExpansionPanel expanded={expandedPanel === 'inputs'} onChange={handleExpansionChange('inputs')}>
                <div
                    className={`${classes.inputList} ${props.hasRecentInputListChange ? classes.inputListChanged : ''}`}
                    onTransitionEnd={props.onDigestInputListChange}
                >
                    <ExpansionPanelSummary className={classes.panelSummary} expandIcon={<ExpandMoreIcon />}>
                        MIDI Inputs
                    </ExpansionPanelSummary>
                </div>
                <ExpansionPanelDetails>{props.inputsTable}</ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expandedPanel === 'events'} onChange={handleExpansionChange('events')}>
                <div
                    className={`${classes.eventList} ${props.hasNewEvent ? classes.eventListNewEvent : ''}`}
                    onTransitionEnd={props.onDigestNewEvent}
                >
                    <ExpansionPanelSummary className={classes.panelSummary} expandIcon={<ExpandMoreIcon />}>
                        Incoming MIDI events
                    </ExpansionPanelSummary>
                </div>
                <ExpansionPanelDetails>{props.eventsTable}</ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expandedPanel === 'chords'} onChange={handleExpansionChange('chords')}>
                <div className={`${classes.eventList}`} onTransitionEnd={props.onDigestNewEvent}>
                    <ExpansionPanelSummary className={classes.panelSummary} expandIcon={<ExpandMoreIcon />}>
                        Chords
                    </ExpansionPanelSummary>
                </div>
                <ExpansionPanelDetails>{props.chordsTable}</ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    );
};

export default Panels;
