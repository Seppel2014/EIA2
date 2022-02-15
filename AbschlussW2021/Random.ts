namespace Abschlussarbeit {
    export function randomNumber(_min: number, _max: number) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    }
}
