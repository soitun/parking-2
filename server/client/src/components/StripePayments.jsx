import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions";

// This module wraps the Stripe Checkout API to create a React component to
// display the button that displays the payment modal. In the backend, we use
// the stripe module to exchange the token we receive from this module for an
// actual charge to the user's credit card.
import StripeCheckout from "react-stripe-checkout";

// StripeCheckout defaults to US dollars. Amount is in cents.
// Token takes a callback that returns an object representing the entire charge.
class StripePayments extends Component {
  render() {
    const { listingId } = this.props;
    const adjustedPrice = this.props.price * 100;

    return (
      <StripeCheckout
        name="Pocket Park"
        description="Reserve this parking spot."
        amount={adjustedPrice}
        token={token => this.props.handleToken(token, listingId, adjustedPrice)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Reserve</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actionCreators)(StripePayments);
