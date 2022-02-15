namespace Abschlussarbeit {
    export class Customer extends Movable {
        updateHappiness(_percentagecorrect: number) {
            happiness_customers_done += _percentagecorrect;
            happiness_customers_done /= 2;
            happiness_customers = happiness_customers_done;
        }
    }
}