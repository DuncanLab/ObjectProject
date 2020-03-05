import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

import CustomSlider from "../components/CustomSlider";
import "rc-slider/assets/index.css";

const electron = window.require("electron");
const { ipcRenderer } = electron;

class Form extends Component {
  state = {
    city1: "",
    city2: "",
    memory: 0.5,
    emotion: 0.5,
    nameable: 0.5,
    orientation: "",
    unique: false,
    groups: 1,
    items: 1,
    message: []
  };
  componentDidMount() {
    // setting up an event listener to read data that background process
    // will send via the main process after processing the data we
    // send from visiable renderer process
    ipcRenderer.on("MESSAGE_FROM_BACKGROUND_VIA_MAIN", (event, args) => {
      this.props.history.push({
        pathname: "/output",
        data: args
      });
    });
  }

  onSubmit = e => {
    e.preventDefault();
    // trigger event to start background process
    // can be triggered pretty much from anywhere after
    // you have set up a listener to get the information
    // back from background process, as I have done in line 13
    const { city1, city2 } = this.state;
    ipcRenderer.send("START_BACKGROUND_VIA_MAIN", { city1, city2 });
  };

  // Handles changes to state from slider component
  handler = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  checkChange = e => {
    if (this.state.orientation) {
      this.setState({ orientation: "" });
    } else {
      this.setState({ orientation: e.target.name });
    }
  };

  uniqueChange = e => {
    if (this.state.unique) {
      this.setState({ unique: false });
    } else {
      this.setState({ unique: true });
    }
  };

  change = e => {
    if (e.target.type === "number") {
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    return (
      <div className="bg-purple-500 pt-2 pb-12 xl:h-screen">
        <Link to="/" className="m-2 p-2 font-bold">
          Back
        </Link>
        <img src={logo} alt="" className="w-24 m-auto" />
        <div className="flex justify-center items-center mt-4">
          <div className="w-full max-w-lg bg-gray-800">
            <form
              className="bg-white shadow-md rounded px-8 py-8 pt-8"
              onSubmit={this.onSubmit}
            >
              <div className="px-4 pb-4 mb-8">
                <label className="text-sm block font-bold pb-2">
                  Memorability
                </label>
                <CustomSlider
                  name="memory"
                  handler={this.handler}
                  value={this.state.memory}
                />
              </div>
              <div className="px-4 pb-4 my-8">
                <label className="text-sm block font-bold pb-2">
                  Emotional
                </label>
                <CustomSlider
                  name="emotion"
                  handler={this.handler}
                  value={this.state.emotion}
                />
              </div>
              <div className="px-4 pb-4 my-8">
                <label className="text-sm block font-bold pb-2">
                  Nameability
                </label>
                <CustomSlider
                  name="nameable"
                  handler={this.handler}
                  value={this.state.nameable}
                />
              </div>
              <div className="px-4 pb-4 my-8">
                <label className="text-sm block font-bold pb-2">
                  Orientation Question (please choose only one)
                </label>
                <div className="flex flex-col">
                  <span>
                    <input
                      type="checkbox"
                      name="shoebox"
                      onChange={this.checkChange}
                      disabled={
                        this.state.orientation !== "shoebox" &&
                        this.state.orientation !== ""
                          ? "disabled"
                          : null
                      }
                      className="mr-2"
                    />
                    <label>Smaller vs Larger than a Shoebox</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="natural"
                      onChange={this.checkChange}
                      disabled={
                        this.state.orientation !== "natural" &&
                        this.state.orientation !== ""
                          ? "disabled"
                          : null
                      }
                      className="mr-2"
                    />
                    <label>Natural vs Artifical</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      name="doors"
                      onChange={this.checkChange}
                      disabled={
                        this.state.orientation !== "doors" &&
                        this.state.orientation !== ""
                          ? "disabled"
                          : null
                      }
                      className="mr-2"
                    />
                    <label>Indoors vs Outdoors</label>
                  </span>
                </div>
              </div>
              <div className="px-4 pb-4 my-8 flex items-center ">
                <label className="text-sm block font-bold mr-8">
                  Unique images?
                </label>
                <input
                  type="checkbox"
                  name="unique"
                  onChange={this.uniqueChange}
                  className="mr-2"
                />
                <label>Yes</label>
              </div>
              <div className="px-4 pb-4 my-8">
                <label className="text-sm block font-bold pb-2">
                  Output Format
                </label>
                <div className="flex justify-around">
                  <span>
                    <label>Groups</label>
                    <input
                      type="number"
                      name="groups"
                      value={this.state.groups}
                      onChange={this.change}
                      min={1}
                      className="shadow appearance-none border rounded w-20 py-2 px-3 ml-2 text-gray-700 focus:outline-none focus:shadow-outline border-blue-300"
                    />
                  </span>
                  <span>
                    <label>Items</label>
                    <input
                      type="number"
                      name="items"
                      value={this.state.items}
                      onChange={this.change}
                      min={1}
                      className="shadow appearance-none border rounded w-20 py-2 px-3 ml-2 text-gray-700 focus:outline-none focus:shadow-outline border-blue-300"
                    />
                  </span>
                </div>
              </div>
              <div className="px-4 pb-4 my-8">
                <label className="text-sm block font-bold pb-2">City 1</label>
                <input
                  type="text"
                  name="city1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                  onChange={this.change}
                />
              </div>
              <div className="px-4 pb-4 my-8">
                <label className="text-sm block font-bold pb-2">City 2</label>
                <input
                  type="text"
                  name="city2"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                  onChange={this.change}
                />
              </div>
              <button className=" mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
