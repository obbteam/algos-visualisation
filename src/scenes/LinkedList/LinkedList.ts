import { ACCENT_COLOR } from "../../constants";
import type { INodeVisual } from "../../INodeVisual";
import type { Color, Position } from "../../utils";

export class LinkedListNode implements INodeVisual {
    data: number;
    next: LinkedListNode | null;

    // INodeVisual
    position: Position | null;
    radius: number;
    color: Color;
    borderColor: Color;

    constructor(
        data: number,
        next: LinkedListNode | null = null,

        position: Position | null,
        radius: number,
        color: Color,
        borderColor: Color
    ) {
        this.data = data;
        this.next = next;

        this.position = position;
        this.radius = radius;
        this.color = color;
        this.borderColor = borderColor;
    }

    public getConnectedNodesVisuals(): LinkedListNode[] {
        if (this.next) {
            return [this.next];
        }
        return [];
    }

    public traverse = (): void => {
        let cur : LinkedListNode | null = this;
        console.log("Starting the traversal");

        while (cur) {
            console.log(cur.data);
            cur.color = ACCENT_COLOR;
            cur = cur.next;
        }

        console.log("Traversal complete");
    }
}