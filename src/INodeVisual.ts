import { Color, Position } from "./utils";

export interface INodeVisual {
    position: Position | null;
    radius: number;
    color: Color;
    borderColor: Color;

    getConnectedNodesVisuals() : INodeVisual[];
}
