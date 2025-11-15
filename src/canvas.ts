import { ACCENT_COLOR, BORDER_WIDTH, DEFAULT_EDGE_LENGTH, EDGE_WIDTH } from "./constants";
import type { INode } from "./INode";
import type { LinkedListNode } from "./scenes/LinkedList/LinkedList";
import { Color, Position } from "./utils";

export class MyCanvas {
    canvas: HTMLCanvasElement;
    backgroundColor: Color;
    nodeList: LinkedListNode[];
    width: number = 0;
    height:number = 0;
    ctx: CanvasRenderingContext2D;


    constructor(
        canvas: HTMLCanvasElement,
        backgroundColor: Color,
        nodeList: LinkedListNode[]
    ) {
        this.canvas = canvas;
        this.backgroundColor = backgroundColor;
        this.nodeList = nodeList;
        
        const context = this.canvas.getContext("2d", { alpha: false });
        if (!context) {
            throw new Error("Could not get canvas context");
        }
        this.ctx = context;

        // Set initial size and listen for resizes
        this.resize();
        window.addEventListener("resize", this.resize);
    }
    
    /**
     * Handles resizing the canvas to fill the window
     * and correcting for high-DPI (Retina) displays.
     */
    public resize = (): void => {
        const dpr = window.devicePixelRatio || 1;
        
        // Use the window's size for a full-screen app
        this.width = window.innerWidth;
        this.height = window.innerHeight - 200;

        // Set the internal bitmap size (scaled by DPR)
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;

        // Set the display size (CSS pixels)
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;

        // Scale the context to match
        this.ctx.scale(dpr, dpr);

        // Recenter nodes whenever the window resizes
        this.centerNodes();
    }


    public draw = (): void => {
        this.ctx.fillStyle = this.backgroundColor.convertToString();
        this.ctx.fillRect(0, 0, this.width, this.height);

        for (let i = 0; i < this.nodeList.length; ++i) {
            this.drawNode(this.nodeList[i])
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

        let startX = (this.width - chainWidth) / 2 + startNode.radius;
        startNode.position = new Position(startX, this.height / 2)

        let prevPos = startNode.position

        for (let i = 1; i < this.nodeList.length; ++i) {
            let node = this.nodeList[i]
            node.position = new Position(prevPos.x + node.radius * 2 + DEFAULT_EDGE_LENGTH, prevPos.y)
            prevPos = node.position
        }
    }

    private drawNode = (node: INode): void => {
        if (node.position == null) {
            console.log("Can not draw a node with a null position");
            return;
        }

        // draw connections
        this.ctx.beginPath();
        this.ctx.lineWidth = EDGE_WIDTH;
        this.ctx.strokeStyle = ACCENT_COLOR.convertToString();

        node.getConnectedNodesVisuals().forEach((connectedNode: INode) => {
            if (connectedNode.position == null) return;
            this.ctx.moveTo(node.position!.x, node.position!.y);
            this.ctx.lineTo(connectedNode.position.x, connectedNode.position.y)
        })

        this.ctx.stroke();

        // draw circle
        this.ctx.beginPath();
        this.ctx.arc(node.position.x, node.position.y, node.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = node.color.convertToString();
        this.ctx.fill();

        // draw border
        this.ctx.lineWidth = BORDER_WIDTH;
        this.ctx.strokeStyle = node.borderColor.convertToString();
        this.ctx.stroke();

        // draw data
        this.ctx.fillStyle = "black";
        this.ctx.font = "16px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillText(node.data.toString(), node.position.x, node.position.y);
    }
}