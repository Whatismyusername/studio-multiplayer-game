import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

export default class fight extends GameComponent {
  constructor(props) {
    super(props);
    this.getSessionDatabaseRef().set({
      text: "Good bye, World!"
    });
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

    this.getSessionDatabaseRef().set({ text: "Hello, World!" });
    return (
      <div>
        <p>Session ID: {id}</p>
        <p>Session creator: {creator}</p>
        <p>Session users:</p>
        <ul>{users} </ul>
        <p>I am the {identity}!</p>
      </div>
    );
  }
}
