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

  onSubmit = () => {
    this.props.createListing(this.state.address, this.state.price);
  };

  render() {
    return (
      <ListingForm
        onAddressChange={this.onAddressChange}
        onPriceChange={this.onPriceChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default connect(null, actionCreators)(CreateListing);
