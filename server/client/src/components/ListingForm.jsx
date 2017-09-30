import React, { Component } from "react";
import { Link } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import DatePickerStart from "./DatePickerStart";
import DatePickerEnd from "./DatePickerEnd";

class ListingForm extends Component {
  state = { address: '', lat: null, lng: null }

  handleSelect = address => {
    this.setState({ address });

    // Geocode address in order to get to the lat and long.
    // We only want the first element in the array as it is likely the most
    // relevant result.

    // set the state now for lat and long
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(data => this.setState({ lat: data.lat, lng: data.lng }, () => {console.log(this.state.lat, this.state.lng)}))
      .catch(err => console.log(err))
  }

  render() {
    const {
      onAddressChange,
      onPriceChange,
      onStartTimeChange,
      onEndTimeChange,
      onSubmit
    } = this.props;

    const inputProps = {
      value: this.state.address,
      onChange: address => { this.setState({ address })}
    }

    return (
      <div className="container">
        <PlacesAutocomplete inputProps={inputProps} onSelect={this.handleSelect} />
        
        <form className="col s12">
          <div className="row">
            <div className="input-field col s8">
              <label htmlFor="address">Address</label>
              <input
                onChange={event => onAddressChange(event.target.value)}
                id="address"
                type="text"
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s8">
              <label htmlFor="price">Price</label>
              <input
                onChange={event => onPriceChange(event.target.value)}
                id="price"
                type="number"
              />
            </div>
          </div>

          <div className="row">
            Start time:<DatePickerStart onStartTimeChange={onStartTimeChange} />
            End time:<DatePickerEnd onEndTimeChange={onEndTimeChange} />
          </div>

          <Link
            to="/"
            onClick={onSubmit}
            className="waves-effect waves-light btn"
          >
            Submit
          </Link>
        </form>
      </div>
    );
  }
}

export default ListingForm;
