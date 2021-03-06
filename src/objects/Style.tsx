import { makeStyles } from "@material-ui/core/styles";

export const style = makeStyles(_ => ({
  layout: {
    width: "600px",
    height: "600px"
  },
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column"
  },
  headerIconButton: {
    minHeight: "35px",
    maxHeight: "35px",
    minWidth: "80px",
    maxWidth: "80px"
  },
  headerApplyButton: {
    minHeight: "35px",
    maxHeight: "35px",
    minWidth: "150px",
    maxWidth: "150px"
  },
  bodyHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  bodyList: {
    maxWidth: "100px",
    maxHeight: "30px",
    minWidth: "100px",
    minHeight: "30px"
  },
  bodyListContainer: {
    overflow: "auto",
    maxHeight: 350,
    maxWidth: 120
  },
  bodyTabButton: {
    minHeight: "35px",
    maxHeight: "35px",
    minWidth: "100px",
    maxWidth: "100px"
  },
  bodytabList: {
    width: "400px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    listStyle: "none",
    height: "25px"
  },
  bodyTabHeader: { height: "10px" },
  bodyAbsoluteTab: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "400px"
  },
  calendarButton: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px"
  },
  calendar: {
    maxWidth: "300px",
    maxHeight: "200px",
    minWidth: "300px",
    minHeight: "200px"
  },
  bodyTextField: {
    width: 125
  },
  bodyDateSelectDropdown: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "400px",
    height: "225px"
  },
  bodyDateSelectDropdownButton: {
    maxHeight: "40px",
    minHeight: "40px"
  },
  bodySetNow: {
    width: "300px"
  },
  bodySetNowButton: { width: "200px", height: "40px" },
  quickSelectApplyButton: {
    maxWidth: "80px",
    minWidth: "80px",
    maxHeight: "40px",
    minHeight: "40px"
  },
  quickSelectContainerButton: {
    backgroundColor: "transparent",
    maxWidth: "150px",
    minWidth: "150px",
    maxHeight: "30px",
    minHeight: "30px"
  },
  menuTimerStateButton: {
    maxHeight: "40px",
    minHeight: "40px",
    maxWidth: "80px",
    minWidth: "80px"
  },
  menuEnableButton: {
    maxHeight: "40px",
    minHeight: "40px"
  },
  menuTimerButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    width: "400px"
  },
  box: {
    marginTop: "10px",
    marginLeft: "40px",
    opacity: "1",
    width: "400px",
    height: "500px",
    borderRadius: "10px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "left"
  },
  menu: {
    marginTop: "10px",
    marginLeft: "40px",
    opacity: "1",
    width: "400px",
    height: "175px",
    borderRadius: "10px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "left"
  },
  menuClosed: {
    marginTop: "10px",
    marginLeft: "40px",
    opacity: "0",
    width: "400px",
    height: "175px",
    borderRadius: "10px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "left"
  },
  boxClosed: {
    marginTop: "10px",
    marginLeft: "40px",
    opacity: "0",
    width: "400px",
    height: "500px",
    borderRadius: "10px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "left"
  },
  boxWide: {
    marginTop: "10px",
    marginLeft: "40px",
    width: "600px",
    height: "500px",
    borderRadius: "10px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "left"
  },
  boxTiny: {
    marginTop: "10px",
    marginLeft: "40px",
    width: "400px",
    height: "225px",
    borderRadius: "10px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "left"
  }
}));
