import React, { Component } from "react";
import Input from "components/Input";
import "./styles.css";

class App extends Component {
  state = {
    isLoggedIn: localStorage.getItem("nickname") ? true : false
  };
  render() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      return <span>Hello you</span>;
    } else {
      return (
        <div>
          <Input placeholder="What is your nickname?" submitText={"👍🏻"} />
        </div>
      );
    }
  }
}

export default App;
