export function keyPressed() {
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
}
