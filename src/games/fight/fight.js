import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import "./fight.css";
import P5Wrapper from "react-p5-wrapper";
import sketchFactory from "./sketch.js";

export default class fight extends GameComponent {
  constructor(props) {
    super(props);
    this.state = {
      p1: {
        characterType: "magician",
        playerAction: {
          left: false,
          right: false,
          jump: false,
          basic_attack: false,
          ability_1: false,
          ability_2: false,
          ability_3: false
        }
      },
      p2: {
        characterType: "magician",
        playerAction: {
          left: false,
          right: false,
          jump: false,
          basic_attack: false,
          ability_1: false,
          ability_2: false,
          ability_3: false
        }
      },
      sketch: sketchFactory(() => this.updateFirebase(), () => this.getState())
    };

    console.log(this.state.p1.playerAction.left);
    this.getSessionDatabaseRef().set({
      p1: {
        characterType: "magician",
        playerAction: {}
      },
      p2: {
        characterType: "magician",
        playerAction: {}
      }
    });
  }

  getState() {
    return this.state;
  }

  onSessionDataChanged(data) {
    this.setState(data);
    this.state.sketch.checkingAction();
  }

  handleButtonClick() {
    this.getSessionDatabaseRef().set({
      user_id: UserApi.getName(this.getMyUserId())
    });
  }
  getMyUser() {
    var myUserId = this.getMyUserId();
    var creatorUserId = this.getSessionCreatorUserId();
    if (myUserId === creatorUserId) {
      return "player 1";
    } else {
      return "player 2";
    }
  }

  updateFirebase() {
    if (this.getMyUser() === "player 1") {
      this.getSessionDatabaseRef()
        .child("p1")
        .update({
          playerAction: playerAction
        });
    }
    if (this.getMyUser() === "player 2") {
      this.getSessionDatabaseRef()
        .child("p2")
        .update({
          playerAction: playerAction
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
          <P5Wrapper sketch={this.state.sketch} />
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
}

export var playerAction = {
  left: false,
  right: false,
  jump: false,
  basic_attack: false,
  ability_1: false,
  ability_2: false,
  ability_3: false
};
