import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import "./fight.css";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketch.js";

export default class fight extends GameComponent {
  constructor(props) {
    super(props);
    this.getSessionDatabaseRef().set({
      player1Health: 100,
      player1XPosition: 0,
      player1YPosition: 0,
      player1Charactertype: "magician",
      player2Health: 100,
      player2XPosition: 50,
      player2YPosition: 0,
      player2Charactertype: "magician"
    });
  }

  onSessionDataChanged(data) {
    console.log(data.user_id);
    console.log(data);
  }
  handleButtonClick() {
    this.getSessionDatabaseRef().set({
      user_id: UserApi.getName(this.getMyUserId())
    });
  }
  getMyUser() {
    var myUserId = this.getGetMyUserId;
    var creatorUserId = this.getSessionCreatorUserId();
    if (myUserId === creatorUserId) {
      return "player 1";
    } else {
      return "player 2";
    }
  }
  handleButtonClick(action) {
    var player2NewX = this.state.player2XPosition;
    var player2NewY = this.stateplayer2YPosition;
    var player1NewX = this.stateplayer1XPosition;
    var player1NewY = this.stateplayer1YPosition;
    if (this.getMyUser() === "player 1" && action === RIGHTARROW) {
      this.getSessionDatabaseRef().update({
        player1XPosition: player2NewX
      });
    }
  }

  render() {
    //Identify the Users
    var id = this.getSessionId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>
        <img key={user_id} src={UserApi.getPhotoUrl(user_id)} height="50px" />
        {UserApi.getName(user_id)}
      </li>
    ));
    var creator = UserApi.getName(this.getSessionCreatorUserId());
    var identity;
    if (this.getMyUserId() === this.getSessionCreatorUserId()) {
      identity = "host";
    } else {
      identity = "guest";
    }

    if (true) {
      return (
        <div>
          {/* <canvas ref="game" /> */}
          <P5Wrapper sketch={sketch} />
        </div>
      );
    } else {
      return (
        <div>
          <div id="logInPage">
            <p>Session ID: {id}</p>
            <p>Session creator: {creator}</p>
            <p>Session users:</p>
            <ul>{users} </ul>
            <p>I am the {identity}!</p>
          </div>
        </div>
      );
    }
  }

  // componentDidMount() {
  //   const canvas = this.refs.game;
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;

  //   const ctx = canvas.getContext("2d");

  //   //user 1 character
  //   ctx.beginPath();
  //   ctx.rect(0, 0, 10, 10);
  //   ctx.fillStyle = "white";
  //   ctx.fill();

  //   window.addEventListener("keypress", function() {});

  //   //user 2 character
  //   ctx.beginPath();
  //   ctx.rect(100, 0, 10, 10);
  //   ctx.fillStyle = "red";
  //   ctx.fill();
  // }
}
// }
// }
export function playerAction(key) {}
