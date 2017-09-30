import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as actionCreators from "../actions";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

// Dashboard renders a composed component that displays all the parking
// spots stored in the database.
class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchListings();
  }

  createMarker = () => {
    if (!this.props.listings) {
      return null;
    }

    return this.props.listings.map((listing, index) => {
      return (
        <Marker key={index} position={{ lat: listing.lat, lng: listing.lng }} />
      );
    });
  };

  render() {
    const MapWithAMarker = compose(withGoogleMap)(props => (
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: 25.703, lng: -80.334 }}>
        {this.createMarker()}
      </GoogleMap>
    ));

    return (
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

function mapStateToProps({ listings }) {
  return { listings };
}

export default connect(mapStateToProps, actionCreators)(Dashboard);
