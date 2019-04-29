import playerAction from "./fight.js";
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
      p1.x += 10;
    }
    if (p.keyIsDown(65)) {
      // p1.x -= 10;
      playerAction("x");
    }
  };

  p.Character = function(x, y) {
    this.x = x;
    this.y = y;

    this.update = function() {
      p.rect(this.x, this.y, 70, 200);
    };
  };

  p.eventListener = function() {};
  p.eventListener();

  var p1 = new p.Character(50, 520);
  var p2 = new p.Character(960, 520);

  // p.keyPressed = () => {
  //   if (key === "d") {
  //     p1.x += 1;
  //   }
  // };
}
