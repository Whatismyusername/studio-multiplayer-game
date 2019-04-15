export default function sketch(p) {
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(300, 200);
    p.noStroke();
  };

  p.draw = () => {
    p.background("red");
  };
}
