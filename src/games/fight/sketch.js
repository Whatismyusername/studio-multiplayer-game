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
    var magicianPic;
    var p1MagicBall;
    var p2MagicBall;

    p.preload = () => {
      // magicianPic = p.loadImage(".images/magician/wand.png");
    };

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
      console.log();
      // p.image(magicianPic, 50, 520, 70, 200);
    };

    p.draw = () => {
      p.background(0);
      p.checkingAction();
      p1.x = data().p1.playerLocation.x;
      p1.update();
      p2.x = data().p2.playerLocation.x;
      p2.update();
      p.keyPressed();
      if (p1MagicBall) {
        p1MagicBall.display();
      }
      if (p2MagicBall) {
        p2MagicBall.display();
      }
      // p.image(magicianPic, 50, 520, 70, 200);
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
      this.attack_damage = character.magician.attack_damage;
      this.defense = character.magician.defense;
      this.speed = character.magician.speed;
      this.basic_attack_disabled = false;

      this.update = function() {
        p.rect(this.x, this.y, 70, 200);
      };
      this.action = function(enemy, action, facing) {
        if (action === "basic_attack") {
          if (!this.basic_attack_disabled) {
            console.log("basic attcak!");
            p1MagicBall = new p.MagicBall(
              enemy,
              this.x,
              this.y,
              facing,
              this.attack_damage
            );
            console.log(enemy, this.x, this.y, facing);
          }
        }
      };
    };

    p.MagicBall = function(enemy, x, y, facing, damage) {
      this.x = x;
      this.y = y + (720 - y) / 2;
      this.radius = 80;
      this.disappear = false;
      setTimeout(function() {
        this.disappear = true;
      }, 3000);
      this.display = function() {
        if (!this.disappear) {
          this.update();
          p.arc(this.x, this.y, this.radius, this.radius, 0, Math.PI * 2);
        }
      };

      this.update = function() {
        if (facing === "right") {
          this.x += 30;
        }
        if (facing === "left") {
          this.x -= 30;
        }
      };

      this.collision = function() {
        if (
          this.x + this.radius >= enemy.x &&
          this.x - this.radius <= enemy.x
        ) {
          enemy.damaged(damage);
          this.disappear = true;
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
          playerAction.facing = "left";
        }
        console.log(data().p1.playerLocation.x, data().p1.playerAction.facing);
      }
      if (p.keyIsDown(68)) {
        if (playerLocation.x < 1080) {
          playerLocation.x += thisCharacter().speed;
          playerAction.facing = "right";
        }
        console.log(data().p1.playerLocation.x, data().p1.playerAction.facing);
      }
      if (p.keyIsDown(75)) {
        playerLocation.y -= 10;
      }
      if (p.keyIsDown(74)) {
        playerAction.basic_attack = true;
        console.log(data().p1.playerAction.basic_attack);
      }
      if (p.keyIsDown(85)) {
        playerAction.ability_1 = true;
      }
      updateFirebase();
    };

    p.checkingAction = function() {
      if (data().p1.playerAction.basic_attack === true) {
        p1.action(p2, "basic_attack", data().p1.playerAction.facing);
      }

      if (data().p2.playerAction.basic_attack === true) {
        p2.action(p1, "basic_attack", data().p2.playerAction.facing);
      }
    };

    p.checkLocation = function() {
      console.log(data().p1.playerLocation.x);
    };
  };
}
