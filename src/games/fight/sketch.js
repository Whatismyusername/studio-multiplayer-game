import { playerAction, playerLocation } from "./fight.js";
import { character, characterList } from "./character.js";

export default function sketchFactory(
  updateFirebase,
  data,
  getMyUser,
  thisCharacter
) {
  return function sketch(p) {
    let canvas;
    var p1;
    var p2;
    var char = "magician";
    p.setup = () => {
      canvas = p.createCanvas(1080, 720);
      p.noStroke();
      // p.frameRate(1);
      p.setupPlayerLocation();
      if (data().p1.characterType === "magician") {
        p1 = new p.Magician(
          data().p1.playerLocation.x,
          data().p1.playerLocation.y
        );
      } else if (data().p1.characterType === "warrior") {
        p1 = new p.Warrior(
          data().p1.playerLocation.x,
          data().p1.playerLocation.y
        );
      }
      if (data().p2.characterType === "magician") {
        p2 = new p.Magician(
          data().p2.playerLocation.x,
          data().p2.playerLocation.y
        );
      } else if (data().p2.characterType === "warrior") {
        p1 = new p.Warrior(
          data().p2.playerLocation.x,
          data().p2.playerLocation.y
        );
      }
      console.log(getMyUser());
    };

    p.draw = () => {
      p.background(0);
      //p.checkingAction();
      p1.update();
      p2.update();
      p.keyPressed();
    };

    p.setupPlayerLocation = () => {
      if (getMyUser() === "player 1") {
        console.log(getMyUser());
        playerLocation.x = data().p1.playerLocation.x;
        playerLocation.y = data().p1.playerLocation.y;
      }
      if (getMyUser() === "player 2") {
        console.log(getMyUser());
        playerLocation.x = data().p2.playerLocation.x;
        playerLocation.y = data().p2.playerLocation.y;
      }
      console.log(playerLocation);
    };

    p.Magician = function(x, y) {
      this.x = x;
      this.y = y;
      this.hp = character.magician.hp;
      this.attack = character.magician.attack;
      this.defense = character.magician.defense;
      this.speed = character.magician.speed;

      this.update = function() {
        p.rect(this.x, this.y, 70, 200);
      };
      this.action = function(action) {
        console.log("action");
        if (action === "moveLeft") {
          this.x -= this.speed;
        }
        if (action === "moveRight") {
          this.x += this.speed;
        }
        if (action === "jump") {
          this.y += 10;
        }
        if (action === "basic_attack") {
        }
      };
    };

    p.keyPressed = function() {
      playerAction.basic_attack = false;
      playerAction.ability_1 = false;
      playerAction.ability_2 = false;
      playerAction.ability_3 = false;

      if (p.keyIsDown(65)) {
        if (playerLocation.x > 0) {
          playerLocation.x -= thisCharacter().speed;
          console.log(playerLocation);
        }
      }
      if (p.keyIsDown(68)) {
        if (playerLocation.x < 1080) {
          playerLocation.x += thisCharacter().speed;
        }

        console.log(playerLocation);
      }
      if (p.keyIsDown(75)) {
        playerLocation.y -= 10;
      }
      if (p.keyIsDown(74)) {
        playerAction.basic_attack = true;
      }
      if (p.keyIsDown(85)) {
        playerAction.ability_1 = true;
      }
      updateFirebase();
    };

    p.checkingAction = function() {
      if (data().p1.playerAction) {
        if (data().p1.playerAction.left) {
          p1.action("moveLeft");
        }
        if (data().p1.playerAction.right) {
          p1.action("moveRight");
        }
      }
      if (data().p2.playerAction) {
        if (data().p2.playerAction.left) {
          p2.action("moveLeft");
        }
        if (data().p2.playerAction.right) {
          p2.action("moveRight");
        }
      }
    };
  };
}
