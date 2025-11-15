import { MyCanvas } from "./canvas";
import { CANVAS_COLOR, NODE_BORDER_COLOR, NODE_COLOR, NODE_COUNT, NODE_RADIUS, WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants";
import { MyNode } from "./node";

const canvas: HTMLCanvasElement | any = document.getElementById("canvas")

const myCanvas: MyCanvas = new MyCanvas(canvas, WINDOW_WIDTH, WINDOW_HEIGHT, CANVAS_COLOR, [])

for (let i = 0; i < NODE_COUNT; ++i) {
  myCanvas.pushNode(new MyNode(null, NODE_RADIUS, NODE_COLOR, NODE_BORDER_COLOR, []));
}

requestAnimationFrame(myCanvas.draw)


console.log("asd");