import { ACCENT_COLOR } from "../../constants";
import type { INodeVisual } from "../../INodeVisual";
import type { Color, Position } from "../../utils";

export class DoublyLinkedList implements INodeVisual {
    data: number;
    next: DoublyLinkedList | null;
    prev: DoublyLinkedList | null;

    // INodeVisual
    position: Position | null;
    radius: number;
    color: Color;
    borderColor: Color;

    constructor(
        data: number,
        next: DoublyLinkedList | null = null,
        prev: DoublyLinkedList | null = null,

        position: Position | null,
        radius: number,
        color: Color,
        borderColor: Color
    ) {
        this.data = data;
        this.next = next;
        this.prev = prev;

        this.position = position;
        this.radius = radius;
        this.color = color;
        this.borderColor = borderColor;
    }

    public getConnectedNodesVisuals(): INodeVisual[] {
        let connected : INodeVisual[] = []
        if (this.next) {
            connected.push(this.next)
        }
        if (this.prev) {
            connected.push(this.prev)
        }

        return connected;
    }

    public traverseForward = (): void => {
        let cur: DoublyLinkedList | null = this;
        console.log("Starting the traversal forward");

        while (cur) {
            console.log(cur.data);
            cur.color = ACCENT_COLOR;
            cur = cur.next;
        }

        console.log("Traversal complete");
    }

    public traverseBackwards = (): void => {
        let cur: DoublyLinkedList | null = this;
        console.log("Starting the traversal backwards");

        while (cur) {
            console.log(cur.data);
            cur.color = ACCENT_COLOR;
            cur = cur.prev;
        }

        console.log("Traversal complete");
    }
}