import React from "react";

const MarkerHours = props => {
  return (
    <div className="listing-hours">
      <span>Hours:</span>
      <div className="input-field inline">
        <input
          onChange={event => props.onInputChange(event.target.value)}
          id="hours"
          type="text"
          className="validate"
          disabled
        />
      </div>
    </div>
  );
};

export default MarkerHours;
