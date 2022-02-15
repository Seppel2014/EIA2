"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    function drawBackground() {
        Abschlussarbeit.crc2.fillStyle = "#EEDEDE";
        Abschlussarbeit.crc2.fillRect(0, 0, 1000, 50);
        Abschlussarbeit.crc2.fillRect(0, 280, 1000, 100);
    }
    Abschlussarbeit.drawBackground = drawBackground;
    function clearBackground() {
        Abschlussarbeit.crc2.clearRect(0, 0, Abschlussarbeit.canvas.width, Abschlussarbeit.canvas.height);
    }
    Abschlussarbeit.clearBackground = clearBackground;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Background.js.map