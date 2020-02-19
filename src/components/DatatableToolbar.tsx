/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';
import React, { ChangeEvent } from 'react';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles({
    toolbar: {
        height: 35,
        width: '100%',
        marginBottom: 15,
        float: 'right',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: 500,
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'flex-end',
    },

    groupCheckbox: {
        marginBottom: '2px',
        // margin: "auto auto",
        display: 'flex',
        border: '2px solid #f7f7f7',
        paddingLeft: 26,
        paddingRight: 26,
        alignItems: 'center',
        justifyContent: 'flex-end',

        // height: "100%"
    },
    searchContainer: {
        display: 'flex',
        paddingLeft: 5,
        paddingRight: 5,
        marginRight: 10,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    searchBox: {
        textTransform: 'uppercase',
        marginBottom: '2px',
        marginRight: '10px',
        height: '100%',
        border: 0,
        paddingLeft: 15,
        // margin: "auto auto",
        display: 'flex',
        // border: '2px solid #f7f7f7',
        backgroundColor: '#f7f7f7',
    },
    inputCheckbox: {
        marginLeft: 5,
    },
});

interface Props {
    groupEvents: boolean;
    onGroupEventsChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onFilterChange: (e: string) => void;
}

const onFilterChangee: (parentCallback: (e: string) => void, e: ChangeEvent<HTMLInputElement>) => void = (cb, e) =>
    cb(e.currentTarget.value);

const DatatableToolbar: React.FC<Props> = props => {
    const classes = useStyles();
    return (
        <div className={classes.toolbar}>
            <div className={classes.searchContainer}>
                <SearchIcon />
                <input
                    type="text"
                    className={classes.searchBox}
                    placeholder="filter"
                    onChange={onFilterChangee.bind(null, props.onFilterChange)}
                />
            </div>
            <div className={classes.groupCheckbox}>
                <label>
                    Group events
                    <input type="checkbox" className={classes.inputCheckbox} onChange={props.onGroupEventsChange} />
                </label>
            </div>
        </div>
    );
};

export default DatatableToolbar;
