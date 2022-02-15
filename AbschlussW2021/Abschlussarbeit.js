"use strict";
var Abschlussarbeit;
(function (Abschlussarbeit) {
    window.addEventListener("load", handleLoad);
    let run = 0;
    Abschlussarbeit.time = 0;
    Abschlussarbeit.orderid = 0;
    let employeenumber = 1;
    Abschlussarbeit.happiness_employees = 0;
    let customerspermin = 10;
    let orderlastcreated = 0 - (60 / customerspermin);
    Abschlussarbeit.maximumstock = 10;
    Abschlussarbeit.happiness_customers = 100;
    Abschlussarbeit.happiness_customers_done = 0;
    Abschlussarbeit.orders_done_number = 0;
    let statistics_time;
    let statistics_employee_happiness;
    let statistics_customer;
    let statistics_employee;
    let statistics_customer_happiness;
    let statistics_orders_done;
    Abschlussarbeit.happiness = 100;
    Abschlussarbeit.Stocks = [];
    Abschlussarbeit.Employees = [];
    Abschlussarbeit.Orders = [];
    Abschlussarbeit.Orders_done = [];
    Abschlussarbeit.StocksQuery = [];
    function handleLoad(_event) {
        console.log("Handleload");
        let startbutton = document.getElementById("startbutton");
        startbutton.addEventListener("click", startSimulation);
    }
    function startSimulation() {
        employeenumber = document.getElementById("numberEmployee").value;
        customerspermin = document.getElementById("customerPerMin").value;
        Abschlussarbeit.maximumstock = document.getElementById("inventorycapacity").value;
        document.body.removeChild(document.getElementById("settings"));
        Abschlussarbeit.canvas = document.querySelector("canvas");
        Abschlussarbeit.crc2 = Abschlussarbeit.canvas.getContext("2d");
        statistics_time = document.querySelector("#statistics_time");
        statistics_employee_happiness = document.querySelector("#statistics_employee_happiness");
        statistics_customer = document.querySelector("#statistics_customer");
        statistics_employee = document.querySelector("#statistics_employee");
        statistics_customer_happiness = document.querySelector("#statistics_customer_happiness");
        statistics_orders_done = document.querySelector("#statistics_orders_done");
        Abschlussarbeit.drawBackground();
        createStock();
        for (let i = 0; i < employeenumber; i++) {
            let position = new Abschlussarbeit.Vector(Abschlussarbeit.randomNumber(200, 580), Abschlussarbeit.randomNumber(150, 230));
            let employee = new Abschlussarbeit.Employee(position);
            Abschlussarbeit.Employees.push(employee);
        }
        Abschlussarbeit.canvas.addEventListener("mousedown", handleInput, false);
        setInterval(runSimulation, 100);
    }
    function handleInput(_event) {
        let mouseposition = new Abschlussarbeit.Vector(_event.x, _event.y);
        for (let i = 0; i < Abschlussarbeit.Employees.length; i++) {
            if (Abschlussarbeit.Employees[i].position.x + 60 >= mouseposition.x && Abschlussarbeit.Employees[i].position.x <= mouseposition.x) {
                if (Abschlussarbeit.Employees[i].position.y + 60 >= mouseposition.y && Abschlussarbeit.Employees[i].position.y <= mouseposition.y) {
                    console.log(Abschlussarbeit.Employees[i]);
                    Abschlussarbeit.selectedEmployee = Abschlussarbeit.Employees[i];
                }
            }
        }
    }
    function createStock() {
        let position;
        position = new Abschlussarbeit.Vector(50, 20);
        let onion = new Abschlussarbeit.Stock("onion", 10, "img/onion.png", true, position, "cut");
        position = new Abschlussarbeit.Vector(150, 20);
        let salad = new Abschlussarbeit.Stock("salad", 10, "img/salad.png", true, position, "cut");
        position = new Abschlussarbeit.Vector(250, 20);
        let tomato = new Abschlussarbeit.Stock("tomato", 10, "img/tomato.png", true, position, "cut");
        position = new Abschlussarbeit.Vector(350, 20);
        let egg = new Abschlussarbeit.Stock("egg", 10, "img/egg.png", true, position, "cut");
        position = new Abschlussarbeit.Vector(550, 20);
        let chicken_meat = new Abschlussarbeit.Stock("chicken_meat", 10, "img/chicken_meat.png", true, position, "cook");
        position = new Abschlussarbeit.Vector(650, 20);
        let cow_meat = new Abschlussarbeit.Stock("cow_meat", 10, "img/cow_meat.png", true, position, "cook");
        position = new Abschlussarbeit.Vector(750, 20);
        let minced_meat = new Abschlussarbeit.Stock("minced_meat", 10, "img/minced_meat.png", true, position, "cook");
        position = new Abschlussarbeit.Vector(50, 300);
        let onion_cut = new Abschlussarbeit.Stock("onion_cut", 0, "img/onion_cut.png", false, position, "transport");
        position = new Abschlussarbeit.Vector(150, 300);
        let salad_cut = new Abschlussarbeit.Stock("salad_cut", 0, "img/salad_cut.png", false, position, "transport");
        position = new Abschlussarbeit.Vector(250, 300);
        let tomato_cut = new Abschlussarbeit.Stock("tomato_cut", 0, "img/tomato_cut.png", false, position, "transport");
        position = new Abschlussarbeit.Vector(350, 300);
        let egg_cut = new Abschlussarbeit.Stock("egg_cut", 0, "img/egg_cut.png", false, position, "transport");
        position = new Abschlussarbeit.Vector(450, 300);
        let corn = new Abschlussarbeit.Stock("corn", 10, "img/corn.png", true, position, "transport");
        position = new Abschlussarbeit.Vector(50, 350);
        let sauce = new Abschlussarbeit.Stock("sauce", 10, "img/sauce.png", true, position, "transport");
        position = new Abschlussarbeit.Vector(150, 350);
        let hotsauce = new Abschlussarbeit.Stock("hotsauce", 10, "img/hotsauce.png", true, position, "transport");
        position = new Abschlussarbeit.Vector(250, 350);
        let chicken_meat_cook = new Abschlussarbeit.Stock("chicken_meat_cook", 0, "img/chicken_meat.png", false, position, "transport");
        position = new Abschlussarbeit.Vector(350, 350);
        let cow_meat_cook = new Abschlussarbeit.Stock("cow_meat_cook", 0, "img/cow_meat.png", false, position, "transport");
        position = new Abschlussarbeit.Vector(450, 350);
        let minced_meat_cook = new Abschlussarbeit.Stock("minced_meat_cook", 0, "img/minced_meat.png", false, position, "transport");
        Abschlussarbeit.Stocks.push(onion, corn, salad, tomato, egg, onion_cut, salad_cut, tomato_cut, egg_cut, chicken_meat, cow_meat, minced_meat, sauce, hotsauce, chicken_meat_cook, cow_meat_cook, minced_meat_cook);
        for (let i = 0; i < Abschlussarbeit.Stocks.length; i++) {
            Abschlussarbeit.Stocks[i].createStockCanvas(i);
        }
    }
    function runSimulation() {
        Abschlussarbeit.clearBackground();
        Abschlussarbeit.drawBackground();
        if (Abschlussarbeit.selectedEmployee !== undefined) {
            Abschlussarbeit.selectedEmployee.displayInventory();
        }
        for (let i = 0; i < Abschlussarbeit.StocksQuery.length; i++) {
            Abschlussarbeit.StocksQuery[i].checkQuery(i);
        }
        Abschlussarbeit.happiness_customers = 0;
        Abschlussarbeit.happiness_employees = 0;
        for (let i = 0; i < Abschlussarbeit.Employees.length; i++) {
            if (Abschlussarbeit.Employees[i].assignedStock !== undefined) {
                Abschlussarbeit.Employees[i].startTask();
                Abschlussarbeit.Employees[i].active = true;
            }
            else {
                Abschlussarbeit.Employees[i].active = false;
            }
            Abschlussarbeit.happiness_employees += Abschlussarbeit.Employees[i].happiness;
            Abschlussarbeit.Employees[i].update();
            Abschlussarbeit.Employees[i].draw();
        }
        Math.floor(Abschlussarbeit.happiness_employees /= Abschlussarbeit.Employees.length);
        if (Abschlussarbeit.Orders.length < 3) {
            if (orderlastcreated + (60 / customerspermin) < Abschlussarbeit.time) {
                let order = new Abschlussarbeit.Order();
                orderlastcreated = Abschlussarbeit.time;
                Abschlussarbeit.Orders.push(order);
                console.log(Abschlussarbeit.Orders);
                Abschlussarbeit.orderid++;
            }
        }
        for (let i = 0; i < Abschlussarbeit.Orders.length; i++) {
            Abschlussarbeit.Orders[i].customer.update();
            Abschlussarbeit.Orders[i].customer.draw();
            Abschlussarbeit.happiness_customers += Abschlussarbeit.Orders[i].customer.happiness;
            Abschlussarbeit.Orders[i].startOrder();
        }
        for (let i = 0; i < Abschlussarbeit.Orders_done.length; i++) {
            Abschlussarbeit.Orders_done[i].customer.draw();
            Abschlussarbeit.Orders_done[i].customer.move(new Abschlussarbeit.Vector(1200, 400));
        }
        run++;
        if (run == 10) {
            run = 0;
            Abschlussarbeit.time++;
        }
        statistics_time.innerText = "Zeit = " + Abschlussarbeit.time + " Sekunden";
        statistics_employee_happiness.innerText = "MitarbeiterZufriedenheit = " + Abschlussarbeit.happiness_employees + " %";
        statistics_employee.innerText = "Mitarbeiter = " + Abschlussarbeit.Employees.length;
        statistics_customer.innerText = "Kunden = " + Abschlussarbeit.Orders.length;
        statistics_customer_happiness.innerText = "Kundenzufriedenheit = " + Abschlussarbeit.happiness_customers_done + " %";
        statistics_orders_done.innerText = "Bestellungen fertig " + Abschlussarbeit.orders_done_number;
    }
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=Abschlussarbeit.js.map