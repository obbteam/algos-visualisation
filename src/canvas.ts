import { NODE_COLOR, WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants";
import type { MyNode } from "./node";
import { Color } from "./utils";

export class MyCanvas {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    backgroundColor: Color;
    nodeList: MyNode[];

    constructor(
        canvas: HTMLCanvasElement,
        width: number,
        height: number,
        backgroundColor: Color,
        nodeList: MyNode[]
    ) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.nodeList = nodeList;
    }


    public draw = (): void => {
        this.canvas.width = WINDOW_WIDTH;
        this.canvas.height = WINDOW_HEIGHT;

        this.canvas.style.backgroundColor = this.backgroundColor.convertToString();

        const ctx = this.canvas.getContext("2d");
        if (!ctx) return
        for (let i = 0; i < this.nodeList.length; ++i) {
            let node = this.nodeList[i]
            console.log(node);
            ctx.beginPath();
            ctx.arc(node.position.x, node.position.y, node.radius, 0, 2 * Math.PI);
            ctx.fillStyle = node.color.convertToString();
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = node.borderColor.convertToString();
            ctx.stroke();
        }
    }
}