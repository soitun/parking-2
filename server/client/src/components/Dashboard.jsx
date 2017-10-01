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
        // Because the InfoWindow component has some strong CSS bindings
        // that prevent us from styling it properly (i.e. width).
        const addressArr = listing.address.split(",");

        return (
          <Marker
            key={index}
            position={{ lat: listing.lat, lng: listing.lng }}
            onClick={props.onToggleOpen}
          >
            {props.isOpen && (
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                  <div className="listing-address">
                    <div>{addressArr[0]}</div>
                    <div>{addressArr[1]}</div>
                  </div>

                  <div className="listing-price">
                    <strong>Price:</strong> ${listing.price}/h
                  </div>

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
      <GoogleMap defaultZoom={12} defaultCenter={{ lat: 25.766, lng: -80.196 }}>
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
