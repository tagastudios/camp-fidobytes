// CORE
import React, { useState } from "react";
import firebase from "firebase";
import "firebase/firestore";

// MIGRATIONS DATA
// import boca_cust_01_25_21 from "../../configs/imports/boca_cust_01_25_21.json";
// import boca_pets_01_25_21 from "../../configs/imports/boca_pets_01_25_21.json";
// import DB_Cust_01_27_21 from "../../configs/imports/DB_Cust_01_27_21.json";
import DB_Pets_01_27_21 from "../../configs/imports/DB_Pets_01_27_21.json";
// import test from "../../configs/imports/test.json";

function Uploader() {
  //
  const db = firebase.firestore();
  const [active, setActive] = useState(false);
  const [counter, setCounter] = useState(1);

  // IF CUSTOMER DATA
  // const migrate = () => {
  //   setActive(true);
  //   //
  //   DB_Cust_01_27_21.forEach(function (obj) {
  //     db.collection("customers")
  //       .doc(obj.customerID)
  //       .set({
  //         customerFirstName: obj.customerFirstName,
  //         customerLastName: obj.customerLastName,
  //         createdAt: obj.createdAt,
  //         address: obj.address,
  //         petList: obj.petList,
  //         phoneNumber: obj.phoneNumber,
  //         email: obj.email,
  //         customerID: obj.customerID,
  //         customerNID: obj.customerNID,
  //       })
  //       .then(function () {
  //         setCounter(counter + 1);
  //       })
  //       .catch(function (error) {
  //         console.error("Error adding document: ", error);
  //       });
  //   });
  //   //
  //   console.log("Documents added successfully: ", counter);
  //   setCounter(1);
  //   setActive(false);
  // };

  // IF PETS AND VAX DATA
  const migrate = () => {
    setActive(true);
    //
    DB_Pets_01_27_21.forEach(function (obj) {
      db.collection("pets")
        .doc(obj.petID)
        .set(
          {
            petName: obj.petName,
            petBreed: obj.petBreed,
            petType: obj.petType,
            createdAt: obj.createdAt,
            petID: obj.petID,
            petNID: obj.petNID,
            customerID: obj.customerID,
            vax: {
              [obj.petShot]: {
                created: obj.petShotCreated,
                due: obj.petShotDue,
              },
            },
          },
          { merge: true }
        )
        .then(function () {
          setCounter(counter + 1);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    });
    //
    console.log("Documents added successfully: ", counter);
    setCounter(1);
    setActive(false);
  };

  return (
    <div className="uploader">
      <button onClick={() => migrate()}>
        {active ? "Loading..." : "Migrate Database"}
      </button>
    </div>
  );
}

export default Uploader;
