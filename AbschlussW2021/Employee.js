"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Employee extends Abschlussarbeit.Movable {
        assignedStock;
        startingTaskTime = 0;
        currentTaskTime = 0;
        inventory = [];
        newstock;
        startTask() {
            if (this.magnitude < 55) {
                if (this.startingTaskTime == 0) {
                    this.startingTaskTime = Abschlussarbeit.time;
                }
                this.doTask();
            }
            else {
                this.move(this.assignedStock.position);
            }
        }
        checkTime() {
            let timegoneby = this.currentTaskTime - this.startingTaskTime;
            if (timegoneby >= 10) {
                return true;
            }
            else {
                let angle1 = timegoneby / 10;
                let anglearc = angle1 * 2;
                Abschlussarbeit.crc2.beginPath();
                Abschlussarbeit.crc2.arc(this.position.x + 30, this.position.y, 20, 0, 2 * Math.PI);
                Abschlussarbeit.crc2.stroke();
                Abschlussarbeit.crc2.fillStyle = "white";
                Abschlussarbeit.crc2.fill();
                Abschlussarbeit.crc2.beginPath();
                Abschlussarbeit.crc2.arc(this.position.x + 30, this.position.y, 20, 0, anglearc * Math.PI);
                Abschlussarbeit.crc2.fillStyle = "red";
                Abschlussarbeit.crc2.fill();
                return false;
            }
        }
        doTask() {
            this.currentTaskTime = Abschlussarbeit.time;
            let index;
            for (let i = 0; i < Abschlussarbeit.Stocks.length; i++) {
                if (this.assignedStock.name == Abschlussarbeit.Stocks[i].name) {
                    index = i;
                }
            }
            if (this.assignedStock.associatedTask == "cut") {
                if (this.checkTime()) {
                    this.newstock = new Abschlussarbeit.Stock(this.assignedStock.name + "_cut", 5);
                    Abschlussarbeit.Stocks[index].decreaseStock(1);
                    console.log("cut");
                    this.finishTask();
                }
                return;
            }
            if (this.assignedStock.associatedTask == "cook") {
                if (this.checkTime()) {
                    this.newstock = new Abschlussarbeit.Stock(this.assignedStock.name + "_cook", 1);
                    Abschlussarbeit.Stocks[index].decreaseStock(1);
                    console.log("cook");
                    this.finishTask();
                    return;
                }
            }
            if (this.assignedStock.associatedTask == "use") {
                for (let i = 0; i < Abschlussarbeit.Orders.length; i++) {
                    if (this.assignedStock.name == Abschlussarbeit.Orders[i].stock.name) {
                        Abschlussarbeit.Orders[i].openMenu(this);
                    }
                }
                return;
            }
            if (this.assignedStock.associatedTask == "transport") {
                let pickup = true;
                for (let i = 0; i < this.inventory.length; i++) {
                    if (this.inventory[i].name == this.assignedStock.name) {
                        this.inventory[i].increaseStock();
                        this.inventory.splice(i, 1);
                        pickup = false;
                    }
                }
                if (pickup) {
                    for (let i = 0; i < Abschlussarbeit.Stocks.length; i++) {
                        if (this.assignedStock.name == Abschlussarbeit.Stocks[i].name) {
                            if (Abschlussarbeit.Stocks[i].ammount > 0) {
                                this.newstock = new Abschlussarbeit.Stock(this.assignedStock.name, 1);
                                Abschlussarbeit.Stocks[i].decreaseStock(1);
                            }
                        }
                    }
                }
                pickup = true;
                this.finishTask();
            }
        }
        displayInventory() {
            let div = document.getElementById("inventory_employee");
            let div2 = document.getElementById("inventory_employee_wrapper");
            if (div2 !== null) {
                div.removeChild(div2);
            }
            let wrapper = document.createElement("div");
            wrapper.id = "inventory_employee_wrapper";
            if (this.inventory.length == 0) {
                let p = document.createElement("p");
                p.innerText = "Das Inventar des Mitarbeiters ist leer";
                wrapper.appendChild(p);
            }
            for (let i = 0; i < this.inventory.length; i++) {
                let inventory = this.inventory[i].name + " " + this.inventory[i].ammount;
                let p = document.createElement("p");
                p.innerText = inventory;
                wrapper.appendChild(p);
            }
            div.appendChild(wrapper);
        }
        finishTask() {
            if (this.newstock !== undefined) {
                if (this.inventory.length > 0) {
                    for (let i = 0; i < this.inventory.length; i++) {
                        if (this.inventory[i].name == this.newstock.name) {
                            this.inventory[i].ammount += this.newstock.ammount;
                            i = this.inventory.length;
                        }
                        else if (this.inventory.length - 1 == i) {
                            this.inventory.push(this.newstock);
                        }
                    }
                }
                else {
                    this.inventory.push(this.newstock);
                }
            }
            this.active = false;
            this.newstock = undefined;
            this.assignedStock = undefined;
            this.magnitude = undefined;
            this.currentTaskTime = 0;
            this.startingTaskTime = 0;
        }
    }
    Abschlussarbeit.Employee = Employee;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Employee.js.map