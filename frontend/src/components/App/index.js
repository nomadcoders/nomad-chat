import React, { Component } from "react";
import Input from "components/Input";
import io from "socket.io-client";
import "./styles.css";

const client = io("http://localhost:8000");

class App extends Component {
  state = {
    isLoggedIn: localStorage.getItem("nickname") ? true : false,
    nickname: ""
  };
  componentDidMount() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      this._logIn(localStorage.getItem("nickname"));
    }
  }
  render() {
    const { isLoggedIn, nickname } = this.state;
    if (isLoggedIn) {
      return <span>Hello you</span>;
    } else {
      return (
        <div className="loggedOut">
          <Input
            placeholder="What is your nickname?"
            submitText={"👍🏻"}
            onSubmit={this._handleNicknameSubmit}
            value={nickname}
            onChange={this._onNicknameChange}
          />
        </div>
      );
    }
  }
  _handleNicknameSubmit = event => {
    const { nickname } = this.state;
    event.preventDefault();
    this._logIn(nickname);
    localStorage.setItem("nickname", nickname);
  };
  _onNicknameChange = event => {
    const { target: { value } } = event;
    this.setState({
      nickname: value
    });
  };
  _logIn = nickname => {
    client.emit("fuck");
    this.setState({
      isLoggedIn: true,
      nickname
    });
  };
}

export default App;
