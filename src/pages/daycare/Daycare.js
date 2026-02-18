// CORE
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useDemo } from "../../contexts/DemoContext";

// COMPONENTS
import AppBar from "../../components/appBar/AppBar";
import AddDC from "../../components/addDC/AddDC";
import QReader from "../../components/qrReader/QReader";
// import Uploader from "../../components/test/Uploader";

// HELPERS
import fixDates from "../../helpers/fixDates";

// CSS AND ICONS
import "./Daycare.css";
import "../../index.css";
import arrowURL from "../../images/common/arrow.png";
import {
  faDog,
  faCat,
  faChevronRight,
  faChevronLeft,
  faQrcode,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const DEMO_DAYCARE_DATA = [
  {
    dcID: "demo-1",
    petName: "Max",
    peopleFirstName: "John",
    peopleLastName: "Doe",
    services: ["Daycare"],
    status: "Here",
    warning: 0,
    petType: "Dog",
  },
  {
    dcID: "demo-2",
    petName: "Whiskers",
    peopleFirstName: "Jane",
    peopleLastName: "Smith",
    services: ["Daycare"],
    status: "Expiring Soon: B",
    warning: 1,
    petType: "Cat",
  },
  {
    dcID: "demo-3",
    petName: "Buddy",
    peopleFirstName: "Mike",
    peopleLastName: "Johnson",
    services: ["Daycare"],
    status: "Expired: R",
    warning: 2,
    petType: "Dog",
  },
  {
    dcID: "demo-4",
    petName: "Luna",
    peopleFirstName: "Sarah",
    peopleLastName: "Williams",
    services: ["Daycare"],
    status: "Here",
    warning: 0,
    petType: "Cat",
  },
  {
    dcID: "demo-5",
    petName: "Charlie",
    peopleFirstName: "David",
    peopleLastName: "Brown",
    services: ["Daycare"],
    status: "Expiring Soon: DP",
    warning: 1,
    petType: "Dog",
  },
];

function Daycare() {
  const { isDemoMode } = useDemo();
  // Initial Setup and Variables
  const today = moment().format();

  const green = "#2C840C";
  const yellow = "#E8D015";
  const gold = "#D1B000";
  const red = "#B50209";
  const dateOffsetBy1 = 24 * 60 * 60 * 1000;
  const [searchDate, setSearchDate] = useState(moment(today).utc());
  const [camQR, setCamQR] = useState(false);
  const [QRvalue, setQRvalue] = useState("");

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // --------------------- Functions ---------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  const handleDate = (date) => {
    if (date === "right") {
      // setSearchDate(Date.parse(new Date(searchDate)) + dateOffsetBy1);
      setSearchDate(searchDate + moment(dateOffsetBy1).utc());
    }
    if (date === "left") {
      // setSearchDate(Date.parse(new Date(searchDate)) - dateOffsetBy1);
      setSearchDate(searchDate - moment(dateOffsetBy1).utc());
    }
  };

  // QR CODE READER
  const handleQR = () => {
    //
    setCamQR(!camQR);
  };

  // Calling Database (skip when demo mode)
  useFirestoreConnect(
    isDemoMode
      ? []
      : [
          {
            collection: `daycare`,
            storeAs: "daycare",
            where: ["dcDate", "==", fixDates(searchDate, "format")],
            orderBy: ["petName", "asc"],
          },
        ]
  );

  const firestoreDaycare = useSelector(
    (state) => state.firestore.ordered.daycare
  );
  const daycareList = isDemoMode ? DEMO_DAYCARE_DATA : firestoreDaycare;

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // ---------------------- Display ----------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  return (
    <div className="Daycare_pattern bg_pattern">
      {/* <Uploader /> */}
      <AppBar />
      <main className="Daycare bg_pattern-color1">
        <h1 className="Daycare_title only-mobile">Daycare</h1>
        <section className="Daycare_box">
          <div className="Daycare_box_search">
            <div className="Daycare_box_search_bar">
              <p>Search:</p>
              <AddDC
                QRvalue={QRvalue}
                setQRvalue={setQRvalue}
                camQR={camQR}
                setCamQR={setCamQR}
                setSearchDate={setSearchDate}
              />
            </div>
            <div className="Daycare_box_search_scan">
              <p>
                Or Scan
                <br />
                here
              </p>
              <button onClick={() => handleQR()}>
                <FontAwesomeIcon icon={faQrcode} />
              </button>
              <img src={arrowURL} alt="Arrow" />
              {camQR ? (
                <QReader QRvalue={QRvalue} setQRvalue={setQRvalue} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="Daycare_box_daily">
            <div className="Daycare_box_daily_date">
              <div>
                {" "}
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  onClick={() => handleDate("left")}
                  className="Daycare_box_daily_date_arrow-1 noselect"
                />
              </div>
              <div>{moment(searchDate).format("dddd - MMMM Do, YYYY")}</div>
              <div>
                {" "}
                <FontAwesomeIcon
                  icon={faChevronRight}
                  onClick={() => handleDate("right")}
                  className="Daycare_box_daily_date_arrow-2 noselect"
                />
              </div>
            </div>
            <div className="Daycare_box_daily_stats">
              <div className="Daycare_box_daily_stat_1">
                Boarding
                <br />
                <b>0</b>
              </div>
              <div className="Daycare_box_daily_stat_2">
                Daycare
                <br />
                <b> {daycareList && daycareList.length} </b>
              </div>
            </div>

            <table className="Daycare_box_daily_list">
              <thead className="Daycare_box_daily_list_title">
                <tr>
                  <th></th>
                  <th>Pet</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th className="hide-on-xsmall">Actions</th>
                </tr>
              </thead>
              <tbody className="Daycare_box_daily_list_data">
                {daycareList &&
                  Object.values(daycareList).map((dcLine) => (
                    <tr key={dcLine.dcID || Math.random()}>
                      <td
                        className="Daycare_box_daily_list_color"
                        style={{
                          backgroundColor:
                            dcLine.warning === 0
                              ? green
                              : dcLine.warning === 1
                              ? yellow
                              : dcLine.warning === 2
                              ? red
                              : "#777",
                        }}
                      ></td>
                      <td>
                        <span>
                          <FontAwesomeIcon
                            icon={dcLine.petType === "Dog" ? faDog : faCat}
                          />
                        </span>
                        <span>
                          <p className="Daycare_box_daily_list_data_dog">
                            {dcLine.petName}
                          </p>
                          <p className="Daycare_box_daily_list_data_people">
                            {dcLine.peopleFirstName +
                              " " +
                              dcLine.peopleLastName}
                          </p>
                        </span>
                      </td>
                      <td>
                        {dcLine.services &&
                          Object.values(dcLine.services).map((service) => (
                            <div key={Math.random()}>
                              {service}
                              <br />
                            </div>
                          ))}
                      </td>
                      {/* <td>{fixedDates(dcLine.createdAt, "format")}</td> */}
                      <td
                        className="Daycare_box_daily_list_vax"
                        style={
                          dcLine.warning === 1
                            ? { color: gold, fontWeight: "600" }
                            : dcLine.warning === 2
                            ? { color: red, fontWeight: "600" }
                            : { color: "black" }
                        }
                      >
                        {dcLine.status}
                      </td>
                      <td className="hide-on-xsmall Daycare_box_daily_list_actions">
                        {" "}
                        <button>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Daycare;
