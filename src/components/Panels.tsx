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
    progress: {
        margin: 'auto',
        width: 100,
        padding: 100,
    },
}));

interface Props {
    inputsTable: React.ReactNode;
    eventsTable: React.ReactNode;
}

const Panels: React.FC<Props> = props => {
    const [hasNewEvent, setHasNewEvent] = useState(false);
    const classes = useStyles();
    const [hasRecentInputListChange, setRecentInputListChange] = useState(false);
    const [expandedPanel, setExpandedPanel] = useState<'inputs' | 'events' | undefined>(undefined);
    const onEventPanelTransitionEnd = () => {
        setHasNewEvent(false);
    };

    const onInputListTransitionEnd = () => {
        setRecentInputListChange(false);
    };

    const handleExpansionChange = (panel: 'inputs' | 'events') => (
        event: React.ChangeEvent<{}>,
        expanded: boolean,
    ): void => {
        setExpandedPanel(expanded ? panel : undefined);
    };
    return (
        <>
            <ExpansionPanel expanded={expandedPanel === 'inputs'} onChange={handleExpansionChange('inputs')}>
                <div
                    className={`${classes.inputList} ${hasRecentInputListChange ? classes.inputListChanged : ''}`}
                    onTransitionEnd={onInputListTransitionEnd}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>MIDI Inputs</ExpansionPanelSummary>
                </div>
                <ExpansionPanelDetails>{props.inputsTable}</ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expandedPanel === 'events'} onChange={handleExpansionChange('events')}>
                <div
                    className={`${classes.eventList} ${hasNewEvent ? classes.eventListNewEvent : ''}`}
                    onTransitionEnd={onEventPanelTransitionEnd}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Incoming MIDI events</ExpansionPanelSummary>
                </div>
                <ExpansionPanelDetails>{props.eventsTable}</ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    );
};

export default Panels;
