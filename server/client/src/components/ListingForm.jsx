import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePickerStart from "./DatePickerStart";
import DatePickerEnd from "./DatePickerEnd";

import "react-datepicker/dist/react-datepicker.css";

class ListingForm extends Component {
  render() {
    const {
      onAddressChange,
      onPriceChange,
      onStartTimeChange,
      onEndTimeChange,
      onSubmit
    } = this.props;

    return (
      <div className="container">
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
