import { makeStyles } from "@material-ui/core/styles";
import React, { ChangeEvent } from "react";

const useStyles = makeStyles(theme => ({
  toolbar: {
    height: 35,
    width: "100%",
    marginBottom: 15,
    float: "right",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 500,
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "flex-end"
  },
  groupCheckbox: {
    marginBottom: "2px",
    // margin: "auto auto",
    display: "flex",
    border: "2px solid #f6f6f6",
    paddingLeft: 26,
    paddingRight: 26,
    alignItems: "center",
    justifyContent: "flex-end"

    // height: "100%"
  },
  inputCheckbox: {
    marginLeft: 5
  }
}));

interface IProps {
  groupEvents: boolean;
  onGroupEeventsChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function DatatableToolbar(props: IProps) {
  const classes = useStyles();
  return (
    <div className={classes.toolbar}>
      <div className={classes.groupCheckbox}>
        <label>
          Group events
          <input
            type="checkbox"
            className={classes.inputCheckbox}
            onChange={props.onGroupEeventsChange}
          />
        </label>
      </div>
    </div>
  );
}
