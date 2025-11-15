import { MyCanvas } from "./canvas";
import { CANVAS_COLOR, NODE_BORDER_COLOR, NODE_COLOR, NODE_COUNT, NODE_RADIUS, WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants";
import { LinkedListNode } from "./scenes/LinkedList/LinkedList";

const canvas: HTMLCanvasElement | any = document.getElementById("canvas");

const myCanvas: MyCanvas = new MyCanvas(canvas, WINDOW_WIDTH, WINDOW_HEIGHT, CANVAS_COLOR, []);


for (let i = 0; i < NODE_COUNT; ++i) {
  myCanvas.pushNode(new LinkedListNode(i, null, null, NODE_RADIUS, NODE_COLOR, NODE_BORDER_COLOR));
}

myCanvas.draw();


setTimeout(() => {
    console.log("Triggering traversal...");
    // We can access the head of the list
    // and call its traverse method
    if (myCanvas.nodeList.length > 0) {
        myCanvas.nodeList[0].traverse();
    }
}, 2000);