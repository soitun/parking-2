import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions";

import ListingForm from "./ListingForm";

class CreateListing extends Component {
  state = {
    address: "",
    price: null,
    startTime: null,
    endTime: null
  };

  onAddressChange = inputValue => {
    this.setState({ address: inputValue });
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
        onAddressChange={this.onAddressChange}
        onPriceChange={this.onPriceChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default connect(null, actionCreators)(CreateListing);
