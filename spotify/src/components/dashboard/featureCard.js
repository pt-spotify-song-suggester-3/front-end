import React, { Component } from 'react';

var Spinner = require('react-spinkit');

class FeatureCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true
      };
    }
  hideSpinner = () => {
      this.setState({
        loading: false
      });
    };
  render() {
      return (
        <div className="container rsvp-wrapper">
          {this.state.loading ? (
            <Spinner
              className="loading text-center"
              name="circle"
              fadeIn="none"
            />
          ) : null}
          <iframe
            src="https://featurecard.herokuapp.com/"
            width="100%"
            height="700"
            onLoad={this.hideSpinner}
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          />
        </div>
      );
    }
  }

export default FeatureCard;