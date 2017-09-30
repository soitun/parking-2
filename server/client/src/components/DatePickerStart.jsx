import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

class DatePickerStart extends Component {
  state = { startDate: moment() };

  handleChange = date => {
    this.setState({ startDate: date }, () => {
      this.props.onStartTimeChange(this.state.startDate._d);
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

export default DatePickerStart;
