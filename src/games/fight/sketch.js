import { playerAction } from "./fight.js";
import { character } from "./character.js";
import { keyPressed } from "./keyPressed.js";

export default function sketchFactory(updateFirebase) {
  return function sketch(p) {
    let canvas;

    p.setup = () => {
      canvas = p.createCanvas(1080, 720);
      p.noStroke();
    };

    p.draw = () => {
      p.background(0);
      p1.update();
      p2.update();

      if (p.keyIsDown(68)) {
        p1.action("moveRight");
        playerAction.right = true;
        updateFirebase();
      }
      if (playerAction.right) {
        if (!p.keyIsDown(68)) {
          playerAction.right = false;
          updateFirebase();
        }
      }
    };

    p.Character = function(x, y, characterType) {
      this.x = x;
      this.y = y;
      //this.speed = character.charaterType.speed;

      this.update = function() {
        p.rect(this.x, this.y, 70, 200);
      };
      this.action = function(action) {
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
      if (p.keyIsDown(68)) {
        p1.action("moveRight");
        playerAction.right = true;
        updateFirebase();
      } else {
        // playerAction.right = false;
        // updateFirebase();
      }

      if (p.keyIsDown(65)) {
        p1.action("moveLeft");
        playerAction.left = true;
        updateFirebase();
      } else {
        playerAction.left = false;
        updateFirebase();
      }

      if (p.keyIsDown(75)) {
        p1.action("jump");
        playerAction.jump = true;
        updateFirebase();
      } else {
        playerAction.jump = false;
        updateFirebase();
      }

      if (p.keyIsDown(74)) {
        p1.action("basic_attack");
        playerAction.basic_attack = true;
        updateFirebase();
      } else {
        playerAction.basic_attack = false;
        updateFirebase();
      }

      if (p.keyIsDown(85)) {
        p1.action("ability_1");
        playerAction.ability_1 = true;
        updateFirebase();
      } else {
        playerAction.ability_1 = false;
        updateFirebase();
      }
    };

    var p1 = new p.Character(50, 520, "magician");
    var p2 = new p.Character(960, 520, "magician");
  };
}

export function firebase(data) {
  // console.log(data);
}
