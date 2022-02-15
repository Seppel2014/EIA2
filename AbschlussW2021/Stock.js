"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    class Stock {
        name;
        ammount;
        icon;
        raw;
        position;
        associatedTask;
        queryTime;
        constructor(_name, _ammount, _icon, _raw, _position, _associatedTask, _queryTime) {
            this.name = _name;
            this.ammount = _ammount;
            this.icon = _icon;
            this.raw = _raw;
            this.position = _position;
            this.associatedTask = _associatedTask;
            this.queryTime = _queryTime;
        }
        select() {
            if (Abschlussarbeit.selectedEmployee !== undefined && Abschlussarbeit.selectedEmployee.active == false) {
                console.log(this);
                Abschlussarbeit.selectedEmployee.assignedStock = this;
                Abschlussarbeit.selectedEmployee.active = true;
            }
            else {
                console.log("select employee first ");
            }
        }
        checkQuery(_i) {
            if (this.queryTime < Abschlussarbeit.time) {
                this.increaseStock();
                Abschlussarbeit.StocksQuery.splice(_i, 1);
            }
        }
        increaseStock() {
            for (let i = 0; i < Abschlussarbeit.Stocks.length; i++) {
                if (this.name == Abschlussarbeit.Stocks[i].name) {
                    Abschlussarbeit.Stocks[i].ammount += this.ammount;
                    Abschlussarbeit.Stocks[i].drawStock();
                }
            }
        }
        decreaseStock(_ammount) {
            this.ammount -= _ammount;
            this.drawStock();
        }
        drawStock() {
            document.getElementById(this.name).innerHTML = this.ammount + " " + this.name;
            document.getElementById(this.name + "_storage_raw").innerHTML = this.ammount + "";
            let div = document.getElementById(this.name);
            let img = document.createElement("img");
            img.src = "img/" + this.name + ".png";
            img.width = 50;
            div.appendChild(img);
            if (this.raw == true) {
                let button = document.createElement("button");
                button.innerHTML = "Kaufe " + this.name;
                button.className = "buyingredientsbutton";
                button.addEventListener("click", do2, false);
                let stock = this;
                function do2() {
                    let queryStock = new Stock(stock.name, 1, "", false, new Abschlussarbeit.Vector(0, 0), "", Abschlussarbeit.time + 10);
                    Abschlussarbeit.StocksQuery.push(queryStock);
                }
                div.appendChild(button);
            }
            let div2 = document.getElementById(this.name + "_storage_raw");
            let img2 = document.createElement("img");
            img2.src = "img/" + this.name + ".png";
            img2.width = 25;
            div2.appendChild(img2);
        }
        createStockCanvas(_i) {
            let div = document.createElement("div");
            div.id = this.name;
            div.className = "ingredients_raw";
            div.innerHTML = this.ammount + " " + this.name;
            if (_i >= Abschlussarbeit.Stocks.length / 2) {
                div.style.left = "50%";
                div.style.bottom = "93.5%";
            }
            let img = document.createElement("img");
            img.src = this.icon;
            img.width = 50;
            div.appendChild(img);
            if (this.raw == true) {
                let button = document.createElement("button");
                button.innerHTML = "Kaufe " + this.name;
                button.className = "buyingredientsbutton";
                div.appendChild(button);
                button.addEventListener("click", do2, false);
                let stock = this;
                function do2() {
                    if (stock.ammount < Abschlussarbeit.maximumstock) {
                        let queryStock = new Stock(stock.name, 1, "", false, new Abschlussarbeit.Vector(0, 0), "", Abschlussarbeit.time + 10);
                        Abschlussarbeit.StocksQuery.push(queryStock);
                    }
                }
            }
            document.getElementById("stock_div").appendChild(div);
            this.createStorageCanvas();
        }
        createStorageCanvas() {
            let div = document.createElement("div");
            div.id = this.name + "_storage_raw";
            div.className = "ingredients_storage_raw";
            div.innerHTML = this.ammount + " ";
            div.style.position = "absolute";
            div.style.left = this.position.x + "px";
            div.style.top = this.position.y + "px";
            let img = document.createElement("img");
            img.src = this.icon;
            img.width = 25;
            div.appendChild(img);
            let stock = this;
            div.addEventListener("click", do2, false);
            function do2() {
                Abschlussarbeit.selectedStock = stock;
                stock.select();
            }
            document.getElementById("stock_canvas").appendChild(div);
        }
    }
    Abschlussarbeit.Stock = Stock;
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Stock.js.map