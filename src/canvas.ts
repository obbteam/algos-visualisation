import { ACCENT_COLOR, BORDER_WIDTH, DEFAULT_EDGE_LENGTH, EDGE_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH } from "./constants";
import type { INodeVisual } from "./INodeVisual";
import type { LinkedListNode } from "./scenes/LinkedList/LinkedList";
import { Color, Position } from "./utils";

export class MyCanvas {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    backgroundColor: Color;
    nodeList: LinkedListNode[];


    constructor(
        canvas: HTMLCanvasElement,
        width: number,
        height: number,
        backgroundColor: Color,
        nodeList: LinkedListNode[]
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

        requestAnimationFrame(this.draw);
    }

    public pushNode = (node: LinkedListNode) => {
        if (this.nodeList.length > 0) {
            const lastNode = this.nodeList[this.nodeList.length - 1];
            lastNode.next = node;
        }

        this.nodeList.push(node);
        this.centerNodes();
    }

    private centerNodes = () => {
        if (this.nodeList.length == 0) return;

        let startNode = this.nodeList[0];
        let chainWidth = this.nodeList.length * (startNode.radius * 2 + DEFAULT_EDGE_LENGTH) - DEFAULT_EDGE_LENGTH;

        let startX = (WINDOW_WIDTH - chainWidth) / 2 + startNode.radius;
        startNode.position = new Position(startX, WINDOW_HEIGHT / 2)

        let prevPos = startNode.position

        for (let i = 1; i < this.nodeList.length; ++i) {
            let node = this.nodeList[i]
            node.position = new Position(prevPos.x + node.radius * 2 + DEFAULT_EDGE_LENGTH, prevPos.y)
            prevPos = node.position
        }
    }

    private drawNode = (ctx: CanvasRenderingContext2D, node: INodeVisual): void => {
        if (node.position == null) {
            console.log("Can not draw a node with a null position");
            return;
        }

        ctx.beginPath();
        ctx.lineWidth = EDGE_WIDTH;
        ctx.strokeStyle = ACCENT_COLOR.convertToString();

        node.getConnectedNodesVisuals().forEach((connectedNode: INodeVisual) => {
            if (connectedNode.position == null) return;
            ctx.moveTo(node.position!.x, node.position!.y);
            ctx.lineTo(connectedNode.position.x, connectedNode.position.y)
        })

        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.position.x, node.position.y, node.radius, 0, 2 * Math.PI);
        ctx.fillStyle = node.color.convertToString();
        ctx.fill();

        ctx.lineWidth = BORDER_WIDTH;
        ctx.strokeStyle = node.borderColor.convertToString();
        ctx.stroke();
    }
}