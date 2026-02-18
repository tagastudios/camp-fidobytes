// CORE
import React, { Component } from "react";
import QrReader from "react-qr-reader";

// CSS
import "./QReader.css";

class QReader extends Component {
  // FOR BETTER PERFORMANCE NEED TO SEND
  // THE USE STATE VALUE AND SET VIA PROPS, names are:
  // QRvalue / setQRvalue

  handleScan = (data) => {
    if (data) {
      this.props.setQRvalue(data);
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          className="Daycare_box_search_QR"
        />
        {/* <p className="Daycare_box_search_QR-text">
          Pet
          <br />#{this.props.QRvalue}
        </p> */}
      </div>
    );
  }
}

export default QReader;
