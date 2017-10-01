import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions";

import ListingForm from "./ListingForm";

// This Component is responsive for rendering the ListingForm component -
// the actual form used to list a new parking spot.
class CreateListing extends Component {
  state = {
    address: "",
    lat: null,
    lng: null,
    price: null,
    startTime: null,
    endTime: null
  };

  updateCoordsAndAddress = (address, lat, lng) => {
    this.setState({ address, lat, lng });
  };

  onPriceChange = inputValue => {
    this.setState({ price: inputValue });
  };

  onStartTimeChange = date => {
    this.setState({ startTime: date });
  };

  onEndTimeChange = date => {
    this.setState({ endTime: date });
  };

  onSubmit = () => {
    this.props.createListing(
      this.state.address,
      this.state.lat,
      this.state.lng,
      this.state.price,
      this.state.startTime,
      this.state.endTime
    );
  };

  render() {
    return (
      <ListingForm
        onStartTimeChange={this.onStartTimeChange}
        onEndTimeChange={this.onEndTimeChange}
        updateCoordsAndAddress={this.updateCoordsAndAddress}
        onPriceChange={this.onPriceChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default connect(null, actionCreators)(CreateListing);
