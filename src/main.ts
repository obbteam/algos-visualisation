import { MyCanvas } from "./canvas";
import { CANVAS_COLOR, NODE_BORDER_COLOR, NODE_COLOR, NODE_COUNT, NODE_RADIUS, WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants";
import { MyNode } from "./node";
import { Position } from "./utils";

const container: HTMLElement | any = document.getElementById("app")
const canvas: HTMLCanvasElement | any = document.getElementById("canvas")

let nodeList: MyNode[] = []

for (let i = 0; i < NODE_COUNT; ++i) {
  let pos = new Position((i + 1) * 100, 200);
  nodeList.push(new MyNode(pos, NODE_RADIUS, NODE_COLOR, NODE_BORDER_COLOR, []));
}

const myCanvas: MyCanvas = new MyCanvas(canvas, 1000, 400, CANVAS_COLOR, nodeList)
myCanvas.draw()


console.log("asd");