namespace Abschlussarbeit {
    export class Movable {
        happiness: number = 100;
        position: Vector;
        direction: Vector = new Vector(0,0)
        active: boolean = false;
        timeactivecount: number = 0;
        magnitude: number;

        constructor(_position: Vector){
            this.position = _position;
        }

        move(_position: Vector) {
            var directionX: number = _position.x - this.position.x;
            var directionY: number = _position.y - this.position.y;

            this.magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
            directionX /= this.magnitude;
            directionY /= this.magnitude;

            this.direction.x = directionX * 10;
            this.direction.y = directionY * 10;

            this.position.x += this.direction.x;
            this.position.y += this.direction.y;
            
        }

        draw() {
            let img = new Image()
            if (this.happiness > 66) {
                img.src = "img/happy_icon.png";
            }

            if (this.happiness <= 66 && this.happiness >= 33) {
                img.src = "img/neutral_icon.png";
            }
            
            if (this.happiness < 33 && this.happiness > 0) {
                img.src = "img/sad_icon.png";
            }
            
            crc2.fillStyle="red";
            crc2.drawImage(img,this.position.x,this.position.y);
        }

        update() {
            if (this.active == true){
            this.timeactivecount+=1;
            }
            if (this.active == false) {
            this.timeactivecount-=1;
            }
            if (this.timeactivecount == 100) {
                this.timeactivecount = 0;
                this.happiness -= 1;
                if(this.happiness < 0) {
                    this.happiness = 0;
                }
            }
            if (this.timeactivecount == -100) {
                this.timeactivecount = 0;
                this.happiness += 1;
                if(this.happiness > 100) {
                    this.happiness = 100;
                }
            }
        }
    }
}