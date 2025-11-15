export class Color {
    red: number;
    green: number;
    blue: number;

    constructor(red:number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public convertToString = () : string => `rgb(${this.red}, ${this.green}, ${this.blue})`
}

export class Position {
    x: number;
    y: number;

    constructor(x:number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
