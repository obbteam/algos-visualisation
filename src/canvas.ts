import { DEFAULT_EDGE_LENGTH, WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants";
import type { MyNode } from "./node";
import { Color, Position } from "./utils";

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
            this.drawNode(ctx, this.nodeList[i])

        }
    }

    public pushNode = (node: MyNode) => {
        this.nodeList.push(node)
        this.centerNodes()
    }

    private centerNodes = () => {
        let startNode = this.nodeList[0]
        let chainWidth = this.nodeList.length * (startNode.radius * 2 + DEFAULT_EDGE_LENGTH) - DEFAULT_EDGE_LENGTH

        startNode.position = new Position ((WINDOW_WIDTH - chainWidth) / 2 + startNode.radius, WINDOW_HEIGHT / 2)
        let prevPos = startNode.position
        console.log(`${chainWidth} - ${WINDOW_WIDTH} - ${prevPos.x}`)

        
        for (let i = 1; i < this.nodeList.length; ++i) {
            let node = this.nodeList[i]
            node.position = new Position(prevPos.x + node.radius * 2 + DEFAULT_EDGE_LENGTH, prevPos.y)
            prevPos = node.position
        }
    }

    private drawNode = (ctx: CanvasRenderingContext2D, node: MyNode): void => {
        if (node.position == null) {
            console.log("Can not draw a node with a null position")
            return
        }

        ctx.beginPath();
        ctx.arc(node.position.x, node.position.y, node.radius, 0, 2 * Math.PI);
        ctx.fillStyle = node.color.convertToString();
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = node.borderColor.convertToString();
        ctx.stroke();
    }
}