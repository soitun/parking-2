import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import DatePickerStart from "./DatePickerStart";
import DatePickerEnd from "./DatePickerEnd";

class ListingForm extends Component {
  state = { address: "", lat: null, lng: null };

  handleSelect = address => {
    this.setState({ address });

    // Geocode the address in order to get to the lat and lng.
    // We only want the first element in the array as it is likely the most
    // relevant result.
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(data =>
        this.setState({ lat: data.lat, lng: data.lng }, () => {
          this.props.updateCoordsAndAddress(
            this.state.address,
            this.state.lat,
            this.state.lng
          );
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const {
      onPriceChange,
      onStartTimeChange,
      onEndTimeChange,
      onSubmit
    } = this.props;

    // inputProps are required for the PlacesAutocomplete component.
    const inputProps = {
      value: this.state.address,
      onChange: address => {
        this.setState({ address });
      }
    };

    return (
      <div className="container">
        <div style={{ marginTop: "50px", marginLeft: "-15px" }} className="row">
          <h3 style={{ fontWeight: "300" }}>Enter Parking Details</h3>
        </div>

        <form className="col s12">
          <div style={{ paddingTop: "20px" }} className="row">
            <label htmlFor="address">Address</label>
            <PlacesAutocomplete
              inputProps={inputProps}
              onSelect={this.handleSelect}
            />
          </div>

          <div style={{ marginBottom: "80px" }} className="row">
            <label htmlFor="price">Price</label>
            <input
              onChange={event => onPriceChange(event.target.value)}
              id="price"
              type="number"
              className="validate"
            />
          </div>

          <div className="row">
            <label>Start Time</label>
            <DatePickerStart onStartTimeChange={onStartTimeChange} />

            <label>End Time</label>
            <DatePickerEnd onEndTimeChange={onEndTimeChange} />
          </div>

          <div className="row">
            <Link
              to="/dashboard"
              onClick={onSubmit}
              style={{ marginBottom: "80px" }}
              className="waves-effect waves-light btn"
            >
              Submit
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default ListingForm;
