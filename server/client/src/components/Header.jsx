import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  renderNavContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li>
            <a href="/auth/google">Sign in with Google</a>
          </li>
        );

      default:
        return [
          <li key="0">
            <Link to="/list-spot" className="nav-route">
              List Spot
            </Link>
          </li>,

          <li key="1">
            <Link to="/dashboard" className="nav-route">
              Dashboard
            </Link>
          </li>,

          <li key="2">
            <a href="/api/logout" className="nav-route">
              Log Out
            </a>
          </li>
        ];
    }
  }

  render() {
    return (
      <header>
        <nav>
          <div className="nav-wrapper light-green darken-3">
            <Link to="/" className="left brand-logo logo-header">
              Pocket Park
            </Link>

            <ul className="right nav-links">{this.renderNavContent()}</ul>
          </div>
        </nav>
      </header>
    );
  }
}

// Destructure the auth key from the state object in the Redux store.
function mapStateToProps({ auth }) {
  return { auth };
}

// Hook up the Header component to the Redux store.
export default connect(mapStateToProps)(Header);
