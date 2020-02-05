import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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

export default function DatatableToolbar(props: object) {
  const classes = useStyles();
  return (
    <div className={classes.toolbar}>
      <div className={classes.groupCheckbox}>
        <label>
          Group events
          <input type="checkbox" className={classes.inputCheckbox} />
        </label>
      </div>
    </div>
  );
}
