namespace Abschlussarbeit {
    export function drawBackground(): void {
        crc2.fillStyle="#EEDEDE"
        crc2.fillRect(0,0,1000,50);
        
        crc2.fillRect(0,280,1000,100);
    }

    export function clearBackground(): void {
        crc2.clearRect(0,0,canvas.width,canvas.height);
    }
}