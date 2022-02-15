"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Movable {
        happiness = 100;
        position;
        direction = new Abschlussarbeit.Vector(0, 0);
        active = false;
        timeactivecount = 0;
        magnitude;
        constructor(_position) {
            this.position = _position;
        }
        move(_position) {
            var directionX = _position.x - this.position.x;
            var directionY = _position.y - this.position.y;
            this.magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
            directionX /= this.magnitude;
            directionY /= this.magnitude;
            this.direction.x = directionX * 10;
            this.direction.y = directionY * 10;
            this.position.x += this.direction.x;
            this.position.y += this.direction.y;
        }
        draw() {
            let img = new Image();
            if (this.happiness > 66) {
                img.src = "img/happy_icon.png";
            }
            if (this.happiness <= 66 && this.happiness >= 33) {
                img.src = "img/neutral_icon.png";
            }
            if (this.happiness < 33 && this.happiness > 0) {
                img.src = "img/sad_icon.png";
            }
            Abschlussarbeit.crc2.fillStyle = "red";
            Abschlussarbeit.crc2.drawImage(img, this.position.x, this.position.y);
        }
        update() {
            if (this.active == true) {
                this.timeactivecount += 1;
            }
            if (this.active == false) {
                this.timeactivecount -= 1;
            }
            if (this.timeactivecount == 100) {
                this.timeactivecount = 0;
                this.happiness -= 1;
                if (this.happiness < 0) {
                    this.happiness = 0;
                }
            }
            if (this.timeactivecount == -100) {
                this.timeactivecount = 0;
                this.happiness += 1;
                if (this.happiness > 100) {
                    this.happiness = 100;
                }
            }
        }
    }
    Abschlussarbeit.Movable = Movable;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Movable.js.map