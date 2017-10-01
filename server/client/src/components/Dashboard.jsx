import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, withProps, withStateHandlers } from "recompose";
import * as actionCreators from "../actions";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

// Dashboard renders a composed component that displays all the parking
// spots stored in the database.
class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchListings();
  }

  // Creates a map marker component that can toggles an InfoWindow component.
  createMarker = props => {
    if (!this.props.listings) {
      return null;
    }

    // Map over all listings fetched from the db, and create a Marker and
    // InfoWindow components for each.
    return this.props.listings.map((listing, index) => {
      return (
        <Marker
          key={index}
          position={{ lat: listing.lat, lng: listing.lng }}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && (
            <InfoWindow onCloseClick={props.onToggleOpen}>
              <span>{listing.price}</span>
            </InfoWindow>
          )}
        </Marker>
      );
    });
  };

  render() {
    const MapWithAMarkerInfoWindow = compose(
      withStateHandlers(
        () => ({
          isOpen: false
        }),
        {
          onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen
          })
        }
      ),
      withGoogleMap
    )(props => (
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: 25.703, lng: -80.334 }}>
        {this.createMarker(props)}
      </GoogleMap>
    ));

    return (
      <MapWithAMarkerInfoWindow
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
