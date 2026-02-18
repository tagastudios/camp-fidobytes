import moment from "moment";
import "moment-timezone";

export default function fixDates(initialDate, type) {
  //Var
  let formatDate;
  let midVal;
  let endVal;

  // midVal parse dates coming as Strings '01-01-2020'
  // formatDate transform dates parsed or || firebase firestamp dates which comes in seconds and nanoseconds to a more human readable date
  // endVal parses again dates to compareable numbers for Filter/Queries

  if (initialDate === "today") {
    // midVal = Date.parse(new Date().toString());
    midVal = moment().tz("America/New_York");
    formatDate = moment(midVal).format("MM/DD/YYYY");
    // Test
    // console.log("Today: ", formatDate);
    // console.log("---------------------------------");
  } else {
    // midVal = Date.parse(initialDate.toString());
    midVal = moment(initialDate);
    // formatDate = moment(
    //   midVal || initialDate.seconds * 1000 + initialDate.nanoseconds / 1000000
    // ).format("MM/DD/YYYY");
    formatDate = moment(midVal).format("MM/DD/YYYY");
    // Test
    // console.log("Query Date: ", formatDate);
    // console.log("---------------------------------");
  }
  endVal = Date.parse(formatDate);

  // Results!
  if (type === "parse") {
    return endVal;
  } else if (type === "format") {
    return formatDate;
  } else {
    return endVal;
  }
}
