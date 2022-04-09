export class Square {
    private color = 'red';
    private x = 0;
    private y = 0;
    private z = 30;

    constructor(private ctx: CanvasRenderingContext2D | any | undefined) {}

    public moveRight(): void {
        this.x++;
        this.draw();
    }

    public draw(): void {
        this.ctx?.fillRect(this.z * this.x, this.z * this.y, this.z, this.z);
    }
}
