import { Color, Position } from "./utils";

export interface INode {
    position: Position | null;
    radius: number;
    color: Color;
    borderColor: Color;

    data: number;

    getConnectedNodesVisuals() : INode[];
}
