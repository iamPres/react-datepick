import React, { useState, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ms from "ms";
import {
  Button,
  Box,
  Typography,
  GridList,
  GridListTile,
  TextField,
  Grid,
  Menu,
  MenuItem,
} from "@material-ui/core";
import DateRange from "./DateRange.tsx";

interface Inputs {
  termAnchorEl: any;
  intervalAnchorEl: any;
  timeIntervalText: string[][];
  terms: string[];
  intervals: string[];
  dateRange: DateRange;
  relativeSelectContent: string[];
  applyFn(j): void;
  setTermAnchorEl(x): void;
  setIntervalAnchorEl(y): void;
}

export function DateSelect(props: Inputs) {
  enum menu {
    term = 0,
    interval = 1,
  }

  function getAnchorEl(identifier) {
    if (identifier == menu.term) {
      return props.termAnchorEl;
    } else {
      return props.intervalAnchorEl;
    }
  }

  function setAnchorEl(identifier, item) {
    if (identifier == menu.term) {
      props.setTermAnchorEl(item);
    } else {
      props.setIntervalAnchorEl(item);
    }
  }

  function handleMenuClick(identifier, event) {
    setAnchorEl(identifier, event.currentTarget);
  }

  function handleClose(identifier, item) {
    setAnchorEl(identifier, null);
    var words = props.relativeSelectContent;
    words[identifier] = item;
    props.applyFn(words);
  }

  function renderdropdownMenu(identifier) {
    var term = props.terms;
    var interval = props.intervals;

    var list: string[] = [];
    if (identifier == menu.term) {
      list = term;
    } else if (identifier == menu.interval) {
      list = interval;
    }

    return (
      <div>
        <Button
          style={{ maxHeight: "40px", minHeight: "40px" }}
          aria-controls={String(identifier)}
          variant="outlined"
          color="primary"
          aria-haspopup="true"
          onClick={(event) => handleMenuClick(identifier, event)}
        >
          <Box style={{ display: "flex", flexDirection: "row" }}>
            {props.relativeSelectContent[identifier]}
            <Box ml={1} />
            <ExpandMoreIcon />
          </Box>
        </Button>
        <Menu
          id={String(identifier)}
          anchorEl={getAnchorEl(identifier)}
          keepMounted
          open={Boolean(getAnchorEl(identifier))}
          onClose={() =>
            handleClose(identifier, props.relativeSelectContent[identifier])
          }
        >
          {list.map((item) => (
            <MenuItem onClick={() => handleClose(identifier, item)}>
              {item}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  return (
    <Box style={{ display: "flex", flexDirection: "row" }}>
      <Box>{renderdropdownMenu(menu.term)}</Box>
      <Box ml={1}>{renderdropdownMenu(menu.interval)}</Box>
    </Box>
  );
}
