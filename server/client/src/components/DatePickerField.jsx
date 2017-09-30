import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

// fix css: this one comes after the amterial design one, so that's why
// it's fucked uppppp
import "react-datepicker/dist/react-datepicker.css";

class DatePickerField extends Component {
  state = { startDate: moment() };

  handleChange = date => {
    this.setState({ startDate: date }, () => {
      // console.log(this.state.startDate._d);
    });
  };

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        showTimeSelect
        timeIntervals={15}
        dateFormat="LLL"
      />
    );
  }
}

export default DatePickerField;
