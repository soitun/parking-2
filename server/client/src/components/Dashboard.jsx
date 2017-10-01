import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, withStateHandlers } from "recompose";
import * as actionCreators from "../actions";
import StripePayments from "./StripePayments";
import MarkerHours from "./MarkerHours";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

// Dashboard renders a composed component that displays all the parking
// spots stored in the database.
class Dashboard extends Component {
  state = { totalPrice: 0 };

  componentDidMount() {
    this.props.fetchListings();
  }

  onInputChange = value => {
    this.setState({ totalPrice: value });
  };

  // Creates a map marker component that can toggle an InfoWindow component.
  createMarkerInfoWindow = props => {
    if (!this.props.listings) {
      return null;
    }

    // Filter all the listings fetched from the db, and create a Marker and
    // InfoWindow components for each. We only show the listings that are
    // not marked as "booked" in our back-end.
    return this.props.listings
      .filter(listing => listing.booked === false)
      .map((listing, index) => {
        return (
          <Marker
            key={index}
            position={{ lat: listing.lat, lng: listing.lng }}
            onClick={props.onToggleOpen}
          >
            {props.isOpen && (
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                  <div className="listing-price">Price: ${listing.price}/h</div>

                  <MarkerHours onInputChange={this.onInputChange} />

                  <div>
                    <StripePayments
                      listingId={listing._id}
                      price={listing.price}
                    />
                  </div>
                </div>
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
        {this.createMarkerInfoWindow(props)}
      </GoogleMap>
    ));

    return (
      <MapWithAMarkerInfoWindow
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className="map-container" />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

function mapStateToProps({ listings }) {
  return { listings };
}

export default connect(mapStateToProps, actionCreators)(Dashboard);
