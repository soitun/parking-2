import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePickerField from "./DatePickerField";

import "react-datepicker/dist/react-datepicker.css";

class ListingForm extends Component {
  render() {
    const { onAddressChange, onPriceChange, onSubmit } = this.props;

    return (
      <div className="container">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s8">
              <input
                onChange={event => onAddressChange(event.target.value)}
                id="address"
                type="text"
                className="validate"
              />
              <label htmlFor="address">Address</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s8">
              <input
                onChange={event => onPriceChange(event.target.value)}
                id="price"
                type="number"
                className="validate"
              />
              <label htmlFor="price">Price</label>
            </div>
          </div>

          <div className="row">
            Start time: <DatePickerField />
            End time: <DatePickerField />
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
