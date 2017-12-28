import React, { Component } from "react";
import Input from "components/Input";
import io from "socket.io-client";
import "./styles.css";

const client = io("http://localhost:8000");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem("nickname") ? true : false,
      nickname: "",
      online: []
    };
    client.on("online change", msg => this._updateConnectedList(msg.online));
  }
  componentDidMount() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      this._logIn(localStorage.getItem("nickname"));
    }
  }
  render() {
    const { isLoggedIn, nickname, online } = this.state;
    if (isLoggedIn) {
      return (
        <div className="loggedIn">
          <div className="online">
            <h3>Online Users</h3>
            <ul>
              {online.map(socket => <li key={socket.id}>{socket.nickname}</li>)}
            </ul>
          </div>
        </div>
      );
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
    this.setState({
      isLoggedIn: true,
      nickname
    });
    client.emit("login", { nickname, loggedIn: true });
  };
  _updateConnectedList = list => {
    this.setState({
      online: list
    });
  };
}

export default App;
