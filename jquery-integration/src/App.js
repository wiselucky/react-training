import React, { Component } from "react";
import "./App.css";
import $ from "jquery";
import "chosen-js/chosen.css";
import "chosen-js/chosen.jquery.js";

class Chosen extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.chosen();

    this.handleChange = this.handleChange.bind(this);
    this.$el.on("change", this.handleChange);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      //this.$el.trigger("chosen:updated");
    }
  }

  componentWillUnmount() {
    this.$el.off("change", this.handleChange);
    this.$el.chosen("destroy");
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => (this.el = el)}>
          {this.props.children}
        </select>
      </div>
    );
  }
}

class App extends Component {
  constructor(prpps) {
    super(prpps);

    this.state = {
      items: ["one", "two", "three"]
    };
  }

  handleAddList = () => {
    this.setState({ items: this.state.items.concat(["four"]) });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.handleAddList}>追加</button>

        {/* Reactの守備範囲外 */}
        <Chosen onChange={value => console.log(value)}>
          {this.state.items.map(item => (
            <option key={item}>{item}</option>
          ))}
        </Chosen>

        {/* Reactの守備範囲 */}
        <select>
          {this.state.items.map(item => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default App;
