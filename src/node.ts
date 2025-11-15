import { Color, Position } from "./utils";

export class MyNode {
    position: Position | null;
    radius: number;
    color: Color;
    borderColor: Color;
    connectedNodes: MyNode[];

    constructor(position: Position | null, radius: number, color: Color, borderColor: Color, connectedNodes: MyNode[]) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.borderColor = borderColor;
        this.connectedNodes = connectedNodes;
    }
}
