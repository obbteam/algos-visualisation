import { ACCENT_COLOR } from "../../constants";
import type { INode } from "../../INode";
import { sleep, type Color, type Position } from "../../utils";

export class LinkedListNode implements INode {
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

    public traverse = async (sleepTimeMS: number) : Promise<void> => {
        let cur : LinkedListNode | null = this;
        console.log("Starting the traversal");

        while (cur) {
            console.log(cur.data);
            cur.color = ACCENT_COLOR;
            cur = cur.next;
            await sleep(sleepTimeMS);
        }

        console.log("Traversal complete");
    }
}