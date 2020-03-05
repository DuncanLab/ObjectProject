import React, { Component } from "react";
import { Link } from "react-router-dom";
const electron = window.require("electron");

export default class Output extends Component {
  render() {
    const { data } = this.props.location;

    const array = data ? JSON.parse(data) : [];
    return (
      <div className="pt-2 bg-purple-500 h-screen">
        <Link to="/form" className="m-2 p-2 font-bold">
          Back
        </Link>
        <div className="bg-white max-w-xl m-auto rounded  px-8 py-8 pt-8">
          {array.map(city => (
            <p key={city} className="mb-4">
              {city}
            </p>
          ))}
        </div>
      </div>
    );
  }
}
