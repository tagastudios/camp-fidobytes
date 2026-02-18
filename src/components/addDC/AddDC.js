// CORE
import React, { useState, useEffect } from "react";
import { isEmpty, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import { useDemo } from "../../contexts/DemoContext";

// HELPERS
import fixDates from "../../helpers/fixDates";

// ICONS
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AddDC({ QRvalue, setQRvalue, camQR, setCamQR, setSearchDate }) {
  const { isDemoMode } = useDemo();
  const [petNID, setPetNID] = useState("");
  const [petInfo, setPetInfo] = useState({});
  const [customerInfo, setCustomerInfo] = useState({});
  const firestore = useFirestore();
  const { uid, displayName } = useSelector((state) => state.firebase.auth);

  const handleChanges = ({ currentTarget: { name, value } }) => {
    if (name === "addDC") {
      setPetNID(value);
      if (!isEmpty(value) && value !== "") {
        setPetInfo({});
        setCustomerInfo({});
        getDataPet(value);
      }
    }
  };

  // useEffect
  useEffect(() => {
    const getDataCust = (ID) => {
      // Matching PET NID with CUSTOMER ID
      firestore
        .collection("customers")
        .doc(ID)
        .get()
        .then(function (doc) {
          setCustomerInfo({
            customerID: doc.id,
            customerFirstName: doc.data().customerFirstName,
            customerLastName: doc.data().customerLastName,
            customerNID: doc.data().customerNID,
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    if (Object.keys(petInfo).length !== 0) {
      getDataCust(petInfo.customerID);
    }

    // ERROR WHILE RETURNING VALUE TO QRvalue
    if (camQR === true && QRvalue !== "") {
      //
      getDataPet(QRvalue);
      if (petInfo.petNID === parseInt(QRvalue)) {
        AddNewDC();
        setCamQR(false);
      }
    }
  });

  const getDataPet = (ID) => {
    // Looking for PET NID
    console.log(parseInt(ID));
    firestore
      .collection("pets")
      .where("petNID", "==", parseInt(ID))
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setPetInfo({
            petID: doc.id,
            petNID: parseInt(ID),
            customerID: doc.data().customerID,
            petName: doc.data().petName,
            petType: doc.data().petType,
            petBreed: doc.data().petBreed,
            petVax: doc.data().vax,
          });
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // Check VAX
  const checkVax = (vax, type) => {
    //
    const today = fixDates(new Date(), "parse");
    const soon = fixDates(new Date(Date.now() + 2592000000), "parse");

    let bordetella;
    let parvo;

    let vaxExp = [];
    let vaxSoon = [];
    let vaxMiss = [];

    if (vax.Bordetella !== undefined) {
      bordetella = fixDates(vax.Bordetella.due, "parse");
    } else if (vax.Bordettella !== undefined) {
      bordetella = fixDates(vax.Bordettella.due, "parse");
    } else {
      bordetella = today;
    }

    if (vax.Parvo !== undefined) {
      parvo = fixDates(vax.Parvo.due, "parse");
    } else {
      parvo = today;
    }

    const distemper = fixDates(vax.Distemper.due, "parse");
    const rabies = fixDates(vax.Rabies.due, "parse");

    // Special Vax EXPIRED!
    if (rabies < today) {
      vaxExp.push("R");
    }
    if (bordetella < today) {
      vaxExp.push("B");
    }
    if (distemper < today || parvo < today) {
      vaxExp.push("DP");
    }

    // Special Vax Expiring SOON
    if (rabies > today && rabies <= soon) {
      vaxSoon.push("R");
    }
    if (bordetella > today && bordetella <= soon) {
      vaxSoon.push("B");
    }
    if (
      (distemper > today && distemper <= soon) ||
      (parvo > today && parvo <= soon)
    ) {
      vaxSoon.push("DP");
    }

    // Special Vax Missing
    if (isNaN(rabies)) {
      vaxMiss.push("R");
    }
    if (isNaN(bordetella)) {
      vaxMiss.push("B");
    }
    if (isNaN(distemper) || isNaN(parvo)) {
      vaxMiss.push("DP");
    }

    if (type === "" || isEmpty(type) || type === undefined) {
      if (vaxSoon.length === 0 && vaxExp.length === 0 && vaxMiss.length === 0) {
        return "Here";
      } else if (vaxExp.length > 0) {
        return `Expired: ${vaxExp}`;
      } else if (vaxMiss.length > 0) {
        return `Missing Vax: ${vaxMiss}`;
      } else {
        return `Expiring Soon: ${vaxSoon}`;
      }
    } else if (type === "type") {
      if (vaxExp.length > 0) {
        return "expired";
      } else if (vaxMiss.length > 0) {
        return "expired";
      } else {
        return "soon";
      }
    }
  };

  // LOWER AND UPPER CASE FIX
  const fixLetters = (letter) => {
    return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase();
  };

  const AddNewDC = () => {
    if (
      Object.keys(petInfo).length !== 0 &&
      Object.keys(customerInfo).length !== 0
    ) {
      // ADDING THE NEW DAYCARE
      firestore
        .collection("daycare")
        .add({
          employeeID: uid,
          employeeName: displayName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          dcDate: fixDates("today", "format"),
          services: ["Daycare"],
          status: checkVax(petInfo.petVax),
          warning:
            checkVax(petInfo.petVax).length === 4
              ? 0
              : checkVax(petInfo.petVax, "type") === "soon"
              ? 1
              : 2,
          petID: petInfo.petID,
          petNID: petInfo.petNID,
          petName: fixLetters(petInfo.petName),
          petType: fixLetters(petInfo.petType),
          customerID: customerInfo.customerID,
          customerNID: customerInfo.customerNID,
          peopleFirstName: fixLetters(customerInfo.customerFirstName),
          peopleLastName: fixLetters(customerInfo.customerLastName),
        })
        .then((docRef) => {
          docRef.update({
            dcID: docRef.id,
          });
          setSearchDate(moment().utc());
        });
    } else {
      alert(
        "This pet number wasn't found! Please try again carefully or contact HelpDesk if this is an error."
      );
    }

    console.log("PET INFO: ", petInfo);
    console.log("CUST INFO: ", customerInfo);
    console.log("-------------------------------------------------------");

    setQRvalue("");
    setPetNID("");
    setPetInfo({});
    setCustomerInfo({});
  };

  if (isDemoMode) {
    return (
      <div className="Daycare_box_search_bar_input">
        <input
          type="text"
          disabled
          placeholder="Adding pets disabled in demo mode"
          style={{ opacity: 0.7, cursor: "not-allowed" }}
        />
      </div>
    );
  }

  return (
    <div>
      <form action="submit" className="Daycare_box_search_bar_input">
        <input
          type="number"
          name="addDC"
          id="addDC"
          placeholder="Type the pet number #..."
          value={petNID}
          onChange={handleChanges}
          required
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            AddNewDC();
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}

export default AddDC;
