import {
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { MIDIInputs } from "~/midi/midiInfo";
import { SupportedEvent } from "~/midi/event";
import MidiInputs from "~/components/MidiInputs";
import MidiEvents from "~/components/MidiEvents";
import Expansion from "~/components/Expansion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import throttle from "~/utility/throttle";

interface Props {
  midiInputs: MIDIInputs;
}

type Panel = "inputs" | "events";

const useStyles = makeStyles(theme => ({
  eventListNewEvent: {
    backgroundColor: "#e6f9ff"
  },
  eventList: {
    transition: "background-color 0.1s"
  },
  inputListChanged: {
    backgroundColor: "#e6f9ff"
  },
  inputList: {
    transition: "background-color 0.3s"
  },
  progress: {
    margin: "auto",
    width: 100,
    padding: 100
  }
}));

export default function AppContainer(props: Props) {
  const classes = useStyles();
  const [hasNewEvent, setHasNewEvent] = useState(false);
  const [hasRecentInputListChange, setRecentInputListChange] = useState(false);
  const [isMIDIReady, setIsMIDIReady] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<Panel | undefined>(
    undefined
  );
  const onIncomingEvent: (event: SupportedEvent) => void = event => {
    if (!hasNewEvent) {
      setHasNewEvent(true);
    }
  };

  const onInputListChange: () => void = () => {
    if (!hasRecentInputListChange) {
      setRecentInputListChange(true);
    }
  };

  // useEffect(() => {
  //     return () => setRecentInputListChange(false);
  // })

  useEffect(() => {
    if (props.midiInputs.length > 0) {
      setIsMIDIReady(true);
    }
    if (isMIDIReady) {
      throttle(onInputListChange, 500)();
    }
  }, [props.midiInputs]);

  const onEventPanelTransitionEnd = () => {
    setHasNewEvent(false);
  };

  const onInputListTransitionEnd = () => {
    setRecentInputListChange(false);
  };

  const handleExpansionChange = (panel: Panel) => (
    event: React.ChangeEvent<{}>,
    expanded: boolean
  ) => {
    setExpandedPanel(expanded ? panel : undefined);
  };

  if (isMIDIReady) {
    return (
      <Container maxWidth="md">
        <ExpansionPanel
          expanded={expandedPanel === "inputs"}
          onChange={handleExpansionChange("inputs")}
        >
          <div
            className={`${classes.inputList} ${
              hasRecentInputListChange ? classes.inputListChanged : ""
            }`}
            onTransitionEnd={onInputListTransitionEnd}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              MIDI Inputs
            </ExpansionPanelSummary>
          </div>
          <ExpansionPanelDetails>
            <MidiInputs inputs={props.midiInputs}></MidiInputs>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expandedPanel === "events"}
          onChange={handleExpansionChange("events")}
        >
          <div
            className={`${classes.eventList} ${
              hasNewEvent ? classes.eventListNewEvent : ""
            }`}
            onTransitionEnd={onEventPanelTransitionEnd}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              Incoming MIDI events
            </ExpansionPanelSummary>
          </div>
          <ExpansionPanelDetails>
            <MidiEvents
              initialEvents={[]}
              midiInputs={props.midiInputs}
              onIncomingEvent={onIncomingEvent}
            ></MidiEvents>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="md">
        {" "}
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      </Container>
    );
  }
}
