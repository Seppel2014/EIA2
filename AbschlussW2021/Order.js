"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    Abschlussarbeit.foodtypes = ["döner", "yufka", "pide"];
    let döneringredients = ["onion_cut", "salad_cut", "tomato_cut", "corn", "cow_meat_cook", "chicken_meat_cook", "sauce"];
    let yufkaingredients = ["onion_cut", "salad_cut", "tomato_cut", "cow_meat_cook", "sauce"];
    let pideingredients = ["onion_cut", "salad_cut", "tomato_cut", "minced_meat_cook", "egg_cut"];
    let workstations = [new Abschlussarbeit.Vector(600, 300), new Abschlussarbeit.Vector(700, 300), new Abschlussarbeit.Vector(800, 300)];
    let i;
    let freeindex = 0;
    class Order {
        id;
        type;
        specialwish;
        contains = [];
        shouldcontain;
        correct = 0;
        customer;
        index;
        stock;
        done;
        constructor() {
            i = Abschlussarbeit.randomNumber(0, Abschlussarbeit.foodtypes.length);
            this.id = Abschlussarbeit.orderid;
            this.type = Abschlussarbeit.foodtypes[i];
            let customerpos = new Abschlussarbeit.Vector(680, 820);
            this.customer = new Abschlussarbeit.Customer(customerpos);
            this.customer.active = true;
            this.index = freeindex;
            freeindex += 1;
            let contains_temp;
            this.stock = new Abschlussarbeit.Stock(this.type + this.id, 1, "", false, workstations[this.index], "use");
            if (this.type == "döner") {
                i = Abschlussarbeit.randomNumber(0, döneringredients.length - 1);
                this.specialwish = döneringredients[i];
                contains_temp = döneringredients;
                contains_temp.splice(i, 1);
                this.shouldcontain = contains_temp;
            }
            if (this.type == "yufka") {
                i = Abschlussarbeit.randomNumber(0, yufkaingredients.length - 1);
                this.specialwish = yufkaingredients[i];
                contains_temp = yufkaingredients;
                contains_temp.splice(i, 1);
                this.shouldcontain = contains_temp;
            }
            if (this.type == "pide") {
                i = Abschlussarbeit.randomNumber(0, pideingredients.length - 1);
                this.specialwish = pideingredients[i];
                contains_temp = pideingredients;
                contains_temp.splice(i, 1);
                this.shouldcontain = contains_temp;
            }
        }
        startOrder() {
            if (this.customer.magnitude > 25 || this.customer.magnitude == undefined) {
                let waitingpos = new Abschlussarbeit.Vector(680, 400 + this.index * 75);
                this.customer.move(waitingpos);
            }
            else {
                this.createOrderHTML();
                this.createWorkstation();
            }
        }
        createWorkstation() {
            let ordercanvas;
            ordercanvas = document.getElementById("ordercanvas" + this.id);
            if (ordercanvas == null || undefined) {
                let div = document.createElement("div");
                div.id = "ordercanvas" + this.id;
                div.style.position = "absolute";
                div.style.left = workstations[this.index].x + "px";
                div.style.top = workstations[this.index].y + "px";
                let img = document.createElement("img");
                img.src = "img/bread.png";
                img.width = 35;
                div.appendChild(img);
                div.addEventListener("click", do2, false);
                let order = this;
                function do2() {
                    Abschlussarbeit.selectedEmployee.assignedStock = order.stock;
                    this.employee = Abschlussarbeit.selectedEmployee;
                }
                document.getElementById("stock_canvas").appendChild(div);
            }
        }
        openMenu(_employee) {
            _employee.active = true;
            let openmenu = document.getElementById("ordercanvasmenu" + this.id);
            let order = this;
            if (openmenu == null || undefined) {
                let div = document.createElement("div");
                div.id = "ordercanvasmenu" + this.id;
                div.innerText = "Entnehme aus Inventar";
                let ul = document.createElement("ul");
                for (let i = 0; i < _employee.inventory.length; i++) {
                    if (!this.contains.includes(_employee.inventory[i].name)) {
                        let li = document.createElement("li");
                        li.innerText = _employee.inventory[i].name;
                        let button = document.createElement("button");
                        button.addEventListener("click", do2, false);
                        function do2() {
                            _employee.inventory[i].ammount -= 1;
                            button.disabled = true;
                            order.contains.push(_employee.inventory[i].name);
                        }
                        li.appendChild(button);
                        ul.appendChild(li);
                    }
                }
                div.appendChild(ul);
                let button = document.createElement("button");
                button.innerText = "Menü schließen";
                button.addEventListener("click", do2, false);
                function do2() {
                    _employee.finishTask();
                    Abschlussarbeit.selectedEmployee = undefined;
                    document.getElementById("order" + order.id).removeChild(div);
                }
                div.appendChild(button);
                let button2 = document.createElement("button");
                button2.innerText = "Bestellung beenden";
                button2.addEventListener("click", do3, false);
                function do3() {
                    _employee.finishTask();
                    Abschlussarbeit.selectedEmployee = undefined;
                    document.getElementById("orders_div").removeChild(document.getElementById("order" + order.id));
                    Abschlussarbeit.Orders.splice(order.index, 1);
                    Abschlussarbeit.Orders_done.push(order);
                    order.checkOrder();
                    Abschlussarbeit.orders_done_number++;
                    freeindex = order.index;
                    order.removeWorkstation();
                }
                div.appendChild(button2);
                document.getElementById("order" + this.id).appendChild(div);
            }
        }
        removeWorkstation() {
            let stock_canvas = document.getElementById("stock_canvas");
            stock_canvas.removeChild(document.getElementById("ordercanvas" + this.id));
        }
        createOrderHTML() {
            let divticket;
            divticket = document.getElementById("order" + this.id);
            if (divticket == null || undefined) {
                let div = document.createElement("div");
                let pos = this.index * 30 + 5;
                div.id = "order" + this.id;
                div.className = "ticket";
                div.innerHTML = this.type + this.id + " ohne " + this.specialwish;
                div.style.position = "absolute";
                div.style.left = pos + "%";
                div.style.width = "25%";
                div.style.height = "90%";
                div.style.margin = "1%";
                div.style.top = "1%";
                let button = document.createElement("button");
                button.innerText = "Bestellung öffnen";
                button.addEventListener("click", do2, false);
                let order = this;
                function do2() {
                    Abschlussarbeit.selectedEmployee.assignedStock = order.stock;
                }
                div.appendChild(button);
                document.getElementById("orders_div").appendChild(div);
            }
        }
        checkOrder() {
            let found = false;
            for (let i = 0; i < this.contains.length; i++) {
                found = this.shouldcontain.includes(this.contains[i]);
                if (found) {
                    this.correct += 1;
                    found = false;
                }
            }
            console.log(this.correct);
            let percentagefound = (this.correct / this.shouldcontain.length) * 100;
            this.customer.updateHappiness(percentagefound);
            this.done = true;
        }
    }
    Abschlussarbeit.Order = Order;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Order.js.map