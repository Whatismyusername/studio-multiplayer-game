import { playerAction } from "./fight.js";
import { character } from "./character.js";
import { keyPressed } from "./keyPressed.js";

export default function sketchFactory(updateFirebase, data) {
  return function sketch(p) {
    let canvas;
    var p1;
    var p2;
    p.setup = () => {
      console.log("setup");
      canvas = p.createCanvas(1080, 720);
      p.noStroke();
      // p.frameRate(1);
      p1 = new p.Character(50, 520, "magician");
      p2 = new p.Character(960, 520, "magician");
    };

    p.draw = () => {
      p.background(0);
      //p.checkingAction();
      p1.update();
      p2.update();

      p.keyPressed();
    };

    p.Character = function(x, y, characterType) {
      this.x = x;
      this.y = y;
      //this.speed = character.charaterType.speed;

      this.update = function() {
        p.rect(this.x, this.y, 70, 200);
      };
      this.action = function(action) {
        console.log("action");
        if (action === "moveLeft") {
          this.x -= 10;
        }
        if (action === "moveRight") {
          this.x += 10;
        }
        if (action === "jump") {
          this.y += 10;
        }
        if (action === "basic_attack") {
        }
      };
    };

    p.keyPressed = function() {
      playerAction.left = false;
      playerAction.right = false;
      playerAction.jump = false;
      playerAction.basic_attack = false;
      playerAction.ability_1 = false;
      playerAction.ability_2 = false;
      playerAction.ability_3 = false;

      if (p.keyIsDown(65)) {
        playerAction.left = true;
      }
      if (p.keyIsDown(68)) {
        playerAction.right = true;
      }
      if (p.keyIsDown(75)) {
        playerAction.jump = true;
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
