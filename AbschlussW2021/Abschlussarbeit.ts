namespace Abschlussarbeit {
    window.addEventListener("load", handleLoad);

    let run: number = 0;
    export let time: number = 0;
    export let orderid: number = 0;

    let employeenumber: number = 1;
    export let happiness_employees: number = 0;

    let customerspermin: number = 10;
    let orderlastcreated: number = 0 - (60/customerspermin);

    export let maximumstock: number = 10;

    export let happiness_customers: number = 100;
    export let happiness_customers_done: number = 0;
    export let orders_done_number: number = 0;

    let statistics_time: HTMLElement;
    let statistics_employee_happiness: HTMLElement;
    export let statistics_happiness_customer: HTMLElement;
    let statistics_customer: HTMLElement;
    let statistics_employee: HTMLElement;
    let statistics_customer_happiness: HTMLElement;
    let statistics_orders_done: HTMLElement;
    export let happiness: number = 100;

    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    export let Stocks: Stock[] = []
    export let Employees: Employee[] = [];
    export let Orders: Order[] = [];
    export let Orders_done: Order[] = [];
    export let StocksQuery: Stock[] = [];

    export let selectedEmployee: Employee;
    export let selectedStock: Stock;

    function handleLoad(_event: Event): void {
        console.log("Handleload")
        let startbutton = document.getElementById("startbutton");
        startbutton.addEventListener("click", startSimulation);
    }
    
    function startSimulation() {
        employeenumber = document.getElementById("numberEmployee").value;
        customerspermin = document.getElementById("customerPerMin").value;
        maximumstock = document.getElementById("inventorycapacity").value;

        document.body.removeChild(document.getElementById("settings"));
        
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");

        statistics_time = document.querySelector("#statistics_time");
        statistics_employee_happiness = document.querySelector("#statistics_employee_happiness");
        statistics_customer = document.querySelector("#statistics_customer");
        statistics_employee = document.querySelector("#statistics_employee");
        statistics_customer_happiness = document.querySelector("#statistics_customer_happiness")
        statistics_orders_done = document.querySelector("#statistics_orders_done");

        drawBackground();
        createStock();

        for (let i: number = 0; i<employeenumber; i++) {
            let position: Vector = new Vector(randomNumber(200,580),randomNumber(150,230))
            
            let employee = new Employee(position);
            Employees.push(employee);
        }

        canvas.addEventListener("mousedown", handleInput, false);
        setInterval(runSimulation,100);
    }

    function handleInput(_event: MouseEvent): void {
        let mouseposition: Vector = new Vector(_event.x,_event.y)

        for(let i: number = 0; i < Employees.length; i++) {
            if (Employees[i].position.x+60 >= mouseposition.x && Employees[i].position.x <= mouseposition.x) {
                if (Employees[i].position.y+60 >= mouseposition.y && Employees[i].position.y <= mouseposition.y) {
                console.log(Employees[i]);
                selectedEmployee = Employees[i];
                }
            }
        }
    }

    function createStock(): void {
        let position: Vector;

        position = new Vector(50, 20);
        let onion: Stock = new Stock("onion",10,"img/onion.png",true, position, "cut");

        position = new Vector(150, 20);
        let salad: Stock = new Stock("salad",10,"img/salad.png",true, position, "cut");

        position = new Vector(250, 20);
        let tomato: Stock = new Stock("tomato",10,"img/tomato.png",true, position, "cut");

        position = new Vector(350, 20);
        let egg: Stock = new Stock("egg", 10,"img/egg.png",true, position, "cut")

        position = new Vector (550,20)
        let chicken_meat: Stock = new Stock("chicken_meat",10,"img/chicken_meat.png",true,position, "cook");

        position = new Vector (650,20)
        let cow_meat: Stock = new Stock("cow_meat",10,"img/cow_meat.png",true,position, "cook");

        position = new Vector (750,20)
        let minced_meat: Stock = new Stock("minced_meat",10,"img/minced_meat.png",true,position, "cook"); 

        position = new Vector(50, 300);
        let onion_cut: Stock = new Stock("onion_cut",0,"img/onion_cut.png",false, position, "transport");

        position = new Vector(150, 300);
        let salad_cut: Stock = new Stock("salad_cut",0,"img/salad_cut.png",false, position, "transport");

        position = new Vector(250, 300);
        let tomato_cut: Stock = new Stock("tomato_cut",0,"img/tomato_cut.png",false, position, "transport");

        position = new Vector(350, 300);
        let egg_cut: Stock = new Stock("egg_cut",0,"img/egg_cut.png",false, position, "transport");

        position = new Vector(450, 300)
        let corn: Stock = new Stock("corn",10,"img/corn.png",true, position, "transport");

        position = new Vector (50,350)
        let sauce: Stock = new Stock("sauce",10,"img/sauce.png",true,position, "transport");

        position = new Vector (150,350)
        let hotsauce: Stock = new Stock("hotsauce",10,"img/hotsauce.png",true,position, "transport");

        position = new Vector (250,350)
        let chicken_meat_cook: Stock = new Stock("chicken_meat_cook",0,"img/chicken_meat.png",false,position, "transport");

        position = new Vector (350,350)
        let cow_meat_cook: Stock = new Stock("cow_meat_cook",0,"img/cow_meat.png",false,position, "transport");

        position = new Vector (450,350)
        let minced_meat_cook: Stock = new Stock("minced_meat_cook",0,"img/minced_meat.png",false,position, "transport"); 
        
        
        
        Stocks.push(onion,corn,salad,tomato,egg,onion_cut,salad_cut,tomato_cut,egg_cut,chicken_meat,cow_meat,minced_meat,sauce,hotsauce,chicken_meat_cook,cow_meat_cook,minced_meat_cook);

       
        for (let i: number = 0; i < Stocks.length; i++) {
            Stocks[i].createStockCanvas(i);
        }
    }

    function runSimulation(): void {
        clearBackground();
        drawBackground();

        if(selectedEmployee !== undefined) {
        selectedEmployee.displayInventory();
        }
        

        for(let i: number = 0; i < StocksQuery.length; i++) {
            StocksQuery[i].checkQuery(i);
        }

        happiness_customers = 0;
        happiness_employees=0;
        for (let i:number = 0; i < Employees.length; i++) {
            if (Employees[i].assignedStock !== undefined) {
                Employees[i].startTask();
                Employees[i].active = true;
            }else{ 
                Employees[i].active = false;
            }
            
            happiness_employees += Employees[i].happiness;
            Employees[i].update();
            Employees[i].draw();
        }Math.floor(happiness_employees/= Employees.length);
        
        if(Orders.length < 3) {
            if(orderlastcreated + (60/customerspermin) < time){
                let order: Order = new Order();
                orderlastcreated = time;
                Orders.push(order);
                console.log(Orders);
                orderid++;
            }
        }

        for(let i: number = 0; i < Orders.length; i++) {
            Orders[i].customer.update();
            Orders[i].customer.draw();
            happiness_customers += Orders[i].customer.happiness;

            Orders[i].startOrder();
        }

        for(let i: number = 0; i < Orders_done.length; i++) {
            Orders_done[i].customer.draw();
            Orders_done[i].customer.move(new Vector(1200,400))
            
        }

        run++

        if(run==10) {
            run = 0;
            time++;
        }
        
        statistics_time.innerText = "Zeit = " + time + " Sekunden";
        statistics_employee_happiness.innerText = "MitarbeiterZufriedenheit = " + happiness_employees + " %";
        statistics_employee.innerText = "Mitarbeiter = " + Employees.length;
        statistics_customer.innerText = "Kunden = " + Orders.length;
        statistics_customer_happiness.innerText = "Kundenzufriedenheit = " + happiness_customers_done + " %";
        statistics_orders_done.innerText = "Bestellungen fertig " + orders_done_number;
    }
}



