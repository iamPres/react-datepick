import React, { useState } from "react";
import { Button, Box } from "@material-ui/core";
import ms from "ms";

import { DateRange } from "./DateRange";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Body } from "./Body";
import { MenuView } from "./Menu";
import { TimerUI } from "./Timer";
import { QuickSelect } from "./QuickSelect";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RefreshIcon from "@material-ui/icons/Refresh";
import { makeStyles } from "@material-ui/styles";
import "./Styling.css";

var locale = require("browser-locale")();
import humanize from "humanize-duration";

interface Inputs {
  resetFn(): void;
  getDateRange(dates: Date[]): void;
  dateFormatter?: Intl.DateTimeFormat;
  theme?: any;
  commonlyUsedText?: number[];
  quickSelectTerms?: string[];
  quickSelectIntervals?: number[];
  relativeTerms?: string[];
  relativeIntervals?: number[];
  timeFormat?: string;
  nowText?: string;
  minimumYearValue?: number;
  maximumYearValue?: number;
  humanizer?: any;
  setStoredRange?(dateRange: string[]): void;
  storedRange: string[] | null;
}

const commonlyUsedTextDefault: number[] = [
  -ms("15 Minutes"),
  -ms("30 Minutes"),
  -ms("1 Hour"),
  -ms("24 hours"),
  -ms("7 days"),
  -ms("30 days"),
  -ms("90 days"),
  -ms("1 year"),
];

const quickSelectTermsDefault: string[] = ["Last", "Next"];

const timeFormatDefault: string = locale.slice(0, 2);

const quickSelectIntervalsDefault: number[] = [
  ms("1 minute"),
  ms("15 minutes"),
  ms("30 minutes"),
  ms("1 hour"),
  ms("6 hours"),
  ms("12 hours"),
  ms("1 day"),
  ms("7 days"),
  ms("30 days"),
  ms("90 days"),
  ms("1 year"),
];

const relativeTermsDefault: string[] = ["ago", "from now"];

const dateFormatterDefault: Intl.DateTimeFormat = new Intl.DateTimeFormat(
  "en",
  {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  }
);

const themeDefault: any = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 16,
      fontWeight: 600,
    },
    subtitle2: {
      color: "primary",
    },
    button: {
      fontWeight: 500,
    },
  },
});

const nowTextDefault: string = "now";

const minimumYearValueDefault: number = 100;

const maximumYearValueDefault: number = 3000;

export const Layout: React.FC<Inputs> = (props) => {
  // OPTIONAL

  const timeFormat: string = props.timeFormat || timeFormatDefault;

  const commonlyUsedText: number[] =
    props.commonlyUsedText || commonlyUsedTextDefault;

  const quickSelectTerms: string[] =
    props.quickSelectTerms || quickSelectTermsDefault;

  const quickSelectIntervals: number[] =
    props.quickSelectIntervals || quickSelectIntervalsDefault;

  const relativeIntervals: number[] =
    props.relativeIntervals || quickSelectIntervalsDefault;

  const relativeTerms: string[] = props.relativeTerms || relativeTermsDefault;

  const nowText: string = props.nowText || nowTextDefault;

  const dateFormatter: Intl.DateTimeFormat =
    props.dateFormatter || dateFormatterDefault;

  const theme: any = props.theme || themeDefault;

  const minimumYearValue: number =
    props.minimumYearValue || minimumYearValueDefault;

  const maximumYearValue: number =
    props.maximumYearValue || maximumYearValueDefault;

  const humanizer: any =
    props.humanizer ||
    humanize.humanizer({
      language: timeFormat,
    });

  const localeObj = {
    localeString: timeFormat,
    quickSelectTerms,
    quickSelectIntervals,
    relativeTerms,
    relativeIntervals,
    nowText,
    humanizer,
  };

  const setStoredRange:
    | ((dateRange: DateRange) => void)
    | (() => null) = props.setStoredRange
    ? (dateRange) => {
        let dates: string[] = [
          String(dateRange.finalDates[0].getTime()),
          String(dateRange.finalDates[1].getTime()),
        ];
        for (let i = 0; i < dates.length; i++) {
          if (dateRange.isAbsolute(i)) {
            dates[i] = dates[i] + "A";
          } else {
            dates[i] = dateRange.relativeMS[i] + "R";
          }
        }
        return props.setStoredRange!(dates);
      }
    : () => {
        return null;
      };

  let storedRange = new DateRange(localeObj);
  {
    let data = props.storedRange;
    if (data) {
      let identifier = [data[0].slice(-1), data[1].slice(-1)];
      data = [data[0].slice(0, -1), data[1].slice(0, -1)];
      for (let p = 0; p < data.length; p++) {
        if (identifier[p] === "A") {
          let out = new Date(parseInt(data[p]));
          storedRange.setDate(out, p, dateFormatter, timeFormat);
        } else {
          storedRange.setRelative(parseInt(data[p]), p);
        }
      }
      storedRange.applyChanges();
    }
  }

  // DATES
  const [propertySelected, setPropertySelected] = useState<number>(-1);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
  ]);
  const [dateRange, setDateRange] = useState<DateRange>(storedRange);

  // TAB LOGIC
  const [tabSelected, setTabSelected] = useState<number>(-1);
  const [bodySubTabIndex, setBodySubTabIndex] = useState<number>(0);

  // DROPDOWN DATA
  const [termAnchorEl, setTermAnchorEl] = useState<EventTarget | null>(null);
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
  const [intervalAnchorEl, setIntervalAnchorEl] = useState<EventTarget | null>(
    null
  );
  const [quickSelectContent, setQuickSelectContent] = useState<number[]>([
    -1,
    quickSelectIntervals[0],
  ]);
  const [relativeSelectContent, setRelativeSelectContent] = useState<number[]>([
    -1,
    relativeIntervals[0],
  ]);

  // QUICK SELECT
  const [recentlySelected, setRecentlySelected] = useState<number[]>([]);

  // TEXT FIELD INPUT
  const [dateTextContents, setDateTextContents] = useState<string[]>([
    DateRange.formatAbsoluteDate(new Date(), dateFormatter),
    DateRange.formatAbsoluteDate(new Date(), dateFormatter),
  ]);
  const [timeTextContents, setTimeTextContents] = useState<string[]>([
    new Date().toLocaleTimeString(timeFormat),
    new Date().toLocaleTimeString(timeFormat),
  ]);

  // STYLING
  const [menuClass, setMenuClass] = useState<string>("menu-closed");
  const [boxClass, setBoxClass] = useState<string>("box-closed");

  // TIMER
  const [refreshIntervalUnits, setRefreshIntervalUnits] = useState<string>(
    "Minutes"
  );
  const [refreshInterval, setRefreshInterval] = useState<number>(-1);
  const [refreshIntervalEnabled, setRefreshIntervalEnabled] = useState<boolean>(
    false
  );
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // TEXT FIELD ERRORS
  const [menuError, setMenuError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean[]>([false, false]);
  const [timeError, setTimeError] = useState<boolean[]>([false, false]);

  const useStyles = makeStyles((_) => ({
    layout: {
      width: "600px",
      height: "600px",
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
    },
    headerIconButton: {
      minHeight: "35px",
      maxHeight: "35px",
      minWidth: "80px",
      maxWidth: "80px",
    },
    headerApplyButton: {
      minHeight: "35px",
      maxHeight: "35px",
      minWidth: "150px",
      maxWidth: "150px",
    },
    bodyHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    bodyList: {
      maxWidth: "100px",
      maxHeight: "30px",
      minWidth: "100px",
      minHeight: "30px",
    },
    bodyListContainer: {
      overflow: "auto",
      maxHeight: 350,
      maxWidth: 120,
    },
    bodyTabButton: {
      minHeight: "35px",
      maxHeight: "35px",
      minWidth: "100px",
      maxWidth: "100px",
    },
    bodytabList: {
      width: "400px",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      listStyle: "none",
      height: "25px",
    },
    bodyTabHeader: { height: "10px" },
    bodyAbsoluteTab: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      width: "400px",
    },
    calendarButton: {
      maxWidth: "30px",
      maxHeight: "30px",
      minWidth: "30px",
      minHeight: "30px",
    },
    calendar: {
      maxWidth: "300px",
      maxHeight: "200px",
      minWidth: "300px",
      minHeight: "200px",
    },
    bodyTextField: {
      width: 125,
    },
    bodyDateSelectDropdown: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      width: "400px",
      height: "225px",
    },
    bodyDateSelectDropdownButton: {
      maxHeight: "40px",
      minHeight: "40px",
    },
    bodySetNow: {
      width: "300px",
    },
    bodySetNowButton: { width: "200px", height: "40px" },
    quickSelectApplyButton: {
      maxWidth: "80px",
      minWidth: "80px",
      maxHeight: "40px",
      minHeight: "40px",
    },
    quickSelectContainerButton: {
      backgroundColor: "transparent",
      maxWidth: "150px",
      minWidth: "150px",
      maxHeight: "30px",
      minHeight: "30px",
    },
    menuTimerStateButton: {
      maxHeight: "40px",
      minHeight: "40px",
      maxWidth: "80px",
      minWidth: "80px",
    },
    menuEnableButton: {
      maxHeight: "40px",
      minHeight: "40px",
    },
    menuTimerButtonsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      width: "400px",
    },
  }));

  let classes = useStyles();

  const toggleDropdown = (num: number): void => {
    if (num != 1 && tabSelected != num) {
      if (boxClass == "box-closed" || boxClass == "box-tiny") {
        setBoxClass("box");
        setMenuClass("menu-closed");
      }
      setTabSelected(num);
    } else if (tabSelected == num) {
      if (boxClass == "box-closed") {
        setBoxClass("box");
        setMenuClass("menu-closed");
      } else {
        setBoxClass("box-closed");
      }
    }
    if (num == 1) {
      if (menuClass == "menu-closed") {
        setMenuClass("menu");
        setBoxClass("box-closed");
        setTabSelected(num);
      } else {
        setMenuClass("menu-closed");
      }
    }
  };

  function getMenuObj() {
    return {
      menuError,
      classes,
      setMenuError,
      timerRunning,
      setTimerRunning,
      refreshInterval,
      setRefreshInterval,
      anchorEl,
      setAnchorEl,
      refreshIntervalUnits,
      setRefreshIntervalUnits,
      refreshIntervalEnabled,
      setRefreshIntervalEnabled,
      menuClass,
    };
  }

  function getBodyObj(index: number) {
    return {
      relativeSelectContent,
      setRelativeSelectContent,
      classes,
      applyMasterChanges: applyChanges,
      daysInMonth,
      setDaysInMonth,
      propertySelected,
      setPropertySelected,
      boxClass,
      setBoxClass,
      index,
      minimumYearValue,
      maximumYearValue,
      timeTextContents,
      setTimeTextContents,
      setDateTextContents,
      dateTextContents,
      dateError,
      setDateError,
      formatDateTextField,
      formatTimeTextField,
      timeError,
      setTimeError,
      timeFormat,
      bodySubTabIndex,
      setBodySubTabIndex,
      dateFormatter,
      dateRange,
      relativeTerms,
      relativeIntervals,
      setDateRange: resetDateRange,
    };
  }

  function getQuickSelectObj() {
    return {
      dateRange,
      classes,
      applyChanges,
      quickSelectContent,
      setQuickSelectContent,
      setDateRange: resetDateRange,
      boxClass,
      formatDateTextField,
      formatTimeTextField,
      recentlySelected,
      setRecentlySelected,
      setTermAnchorEl,
      quickSelectTerms,
      quickSelectIntervals,
      termAnchorEl,
      setIntervalAnchorEl,
      intervalAnchorEl,
      getDateRange: props.getDateRange,
      commonlyUsedText,
      timeFormat,
    };
  }

  function getDateSelectObj() {
    return {
      termAnchorEl,
      intervalAnchorEl,
      commonlyUsedText,
      setTermAnchorEl,
      setIntervalAnchorEl,
    };
  }

  function formatDateTextField(): void {
    setDateTextContents([
      DateRange.formatAbsoluteDate(dateRange.dates[0], dateFormatter),
      DateRange.formatAbsoluteDate(dateRange.dates[1], dateFormatter),
    ]);
  }

  function formatTimeTextField(datesProp?: DateRange): void {
    const dates = datesProp || dateRange;
    setTimeTextContents([
      DateRange.formatAbsoluteTime(dates.dates[0], timeFormat),
      DateRange.formatAbsoluteTime(dates.dates[1], timeFormat),
    ]);
  }

  function resetDateRange(previous: DateRange): void {
    let newObject = new DateRange(localeObj);
    newObject.load(previous);
    setDateRange(newObject);
  }

  function applyChanges(dr: DateRange): void {
    dr.applyChanges();
    resetDateRange(dr);
    props.getDateRange(dr.dates);
    setStoredRange(dr);

    if (timerRunning) {
      setTimerRunning(false);
    }
    setBoxClass("box-closed");
  }

  function refreshTime(): void {
    dateRange.refreshDates();
    resetDateRange(dateRange);

    props.getDateRange(dateRange.dates);
    setTimerRunning(false);
    setTimerRunning(true);
  }

  function getApplyText(): JSX.Element {
    if (timerRunning) {
      return (
        <Box className={classes.flexRow}>
          <RefreshIcon />
          <Box ml={1} />
          Refresh
        </Box>
      );
    } else {
      return (
        <Box className={classes.flexRow}>
          <KeyboardTabIcon />
          <Box ml={1} />
          Update
        </Box>
      );
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.layout}>
        <Tabs onSelect={(index: number) => toggleDropdown(index)}>
          <TabList
            style={{
              width: "800px",
              height: "30px",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              listStyle: "none",
            }}
          >
            <Tab>
              <Button
                color="primary"
                variant="contained"
                className={classes.headerIconButton}
              >
                <CalendarTodayIcon />
                <ExpandMoreIcon />
              </Button>
            </Tab>
            <Tab>
              <Box ml={1}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.headerIconButton}
                >
                  <TimerUI
                    timerRunning={timerRunning}
                    refreshInterval={refreshInterval}
                    refreshIntervalUnits={refreshIntervalUnits}
                    resetFn={props.resetFn}
                    applyFn={refreshTime}
                  />
                </Button>
              </Box>
            </Tab>
            <Box ml={1}>
              <Button
                onClick={() => applyChanges(dateRange)}
                variant="contained"
                color="primary"
                className={classes.headerApplyButton}
              >
                {getApplyText()}
              </Button>
            </Box>
            <Tab>
              <Box ml={2}>
                <Button color="primary" variant="text">
                  {dateRange.finalDisplayText[0]}
                </Button>
              </Box>
            </Tab>
            <span>&#10230;</span>
            <Tab>
              <Button color="primary" variant="text">
                {dateRange.finalDisplayText[1]}
              </Button>
            </Tab>
          </TabList>
          <TabPanel>
            <QuickSelect {...getQuickSelectObj()} />
          </TabPanel>
          <TabPanel>
            <MenuView {...getMenuObj()} />
          </TabPanel>
          <TabPanel>
            <Body {...getBodyObj(0)} {...getDateSelectObj()} />
          </TabPanel>
          <TabPanel>
            <Body {...getBodyObj(1)} {...getDateSelectObj()} />
          </TabPanel>
        </Tabs>
      </div>
      ,
    </MuiThemeProvider>
  );
};
