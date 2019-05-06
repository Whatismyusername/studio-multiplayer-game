import { playerAction } from "./fight.js";
import { character } from "./character.js";

export default function sketch(p) {
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
      playerAction(68);
    }
    if (p.keyIsDown(65)) {
      p1.action("moveLeft");
      playerAction(65);
    }
    if (p.keyIsDown(87)) {
      p1.action("moveUp");
      playerAction(87);
    }
  };

  p.Character = function(x, y, characterType) {
    this.x = x;
    this.y = y;
    this.speed = character.charaterType.speed;

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
      if (action === "moveUp") {
        this.y += 10;
      }
    };
  };

  p.eventListener = function() {};
  p.eventListener();

  var p1 = new p.Character(50, 520, "magician");
  var p2 = new p.Character(960, 520, "magician");

  // p.keyPressed = () => {
  //   if (key === "d") {
  //     p1.x += 1;
  //   }
  // };
}
