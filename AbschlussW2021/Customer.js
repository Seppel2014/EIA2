"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Customer extends Abschlussarbeit.Movable {
        updateHappiness(_percentagecorrect) {
            Abschlussarbeit.happiness_customers_done += _percentagecorrect;
            Abschlussarbeit.happiness_customers_done /= 2;
            Abschlussarbeit.happiness_customers = Abschlussarbeit.happiness_customers_done;
        }
    }
    Abschlussarbeit.Customer = Customer;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Customer.js.map