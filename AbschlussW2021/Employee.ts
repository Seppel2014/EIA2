namespace Abschlussarbeit {
    export class Employee extends Movable {
        assignedStock: Stock;
        startingTaskTime: number = 0;
        currentTaskTime: number = 0;
        inventory: Stock[] = [];
        newstock: Stock;

        startTask() {

            if (this.magnitude < 55) {
                if (this.startingTaskTime == 0) {
                    this.startingTaskTime = time;
                }
                this.doTask();
            } else {
                this.move(this.assignedStock.position)
            }
        }

        checkTime():boolean {
            let timegoneby: number = this.currentTaskTime - this.startingTaskTime;
            
            if (timegoneby >= 10) {
                return true;
            }else{
                let angle1: number = timegoneby / 10;
                let anglearc: number = angle1*2;
                
                crc2.beginPath();
                crc2.arc(this.position.x+30, this.position.y, 20, 0, 2*Math.PI);
                crc2.stroke();
                crc2.fillStyle="white";
                crc2.fill();

                crc2.beginPath();
                crc2.arc(this.position.x+30,this.position.y,20,0,anglearc*Math.PI);
                crc2.fillStyle="red";
                crc2.fill();
                
                return false;
            }
        }

        

        doTask() {
            this.currentTaskTime = time;
            let index: number;

            for (let i: number = 0; i < Stocks.length; i++) {
                if(this.assignedStock.name == Stocks[i].name) {
                    index = i;
                }
            }

            if(this.assignedStock.associatedTask == "cut" ) {
                if(this.checkTime()) { 
                    this.newstock= new Stock(this.assignedStock.name+"_cut", 5);
                    Stocks[index].decreaseStock(1);
                    console.log("cut")
                    this.finishTask();
                }return;
            }
            
            if(this.assignedStock.associatedTask == "cook") {
                if(this.checkTime()) {
                    this.newstock= new Stock(this.assignedStock.name+"_cook", 1)
                    Stocks[index].decreaseStock(1);
                    console.log("cook")
                    this.finishTask();
                    return;
                }
            }
            
            if(this.assignedStock.associatedTask == "use") {
                for(let i: number = 0; i < Orders.length; i++) {
                    if(this.assignedStock.name == Orders[i].stock.name) {
                        Orders[i].openMenu(this);
                    }
                }return;
            }

            if(this.assignedStock.associatedTask == "transport") {
                let pickup: boolean = true;
                
                
                for(let i: number = 0; i < this.inventory.length; i++) {
                    if(this.inventory[i].name == this.assignedStock.name) {
                        this.inventory[i].increaseStock();
                        this.inventory.splice(i,1);
                        
                        pickup = false;
                    } 
                    
                }

                if(pickup){
                    for (let i: number = 0; i < Stocks.length; i++) {
                        if(this.assignedStock.name == Stocks[i].name) {
                            if(Stocks[i].ammount > 0) {
                                this.newstock= new Stock(this.assignedStock.name, 1);
                                Stocks[i].decreaseStock(1);
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

            if(div2 !== null) {
                div.removeChild(div2);
            }
            
            let wrapper = document.createElement("div")
            wrapper.id = "inventory_employee_wrapper"

            if(this.inventory.length == 0) {
                let p: HTMLElement = document.createElement("p");
                p.innerText = "Das Inventar des Mitarbeiters ist leer";
                wrapper.appendChild(p);
            }

            for(let i: number = 0; i < this.inventory.length; i++) {                
                let inventory: string = this.inventory[i].name + " " + this.inventory[i].ammount;
                let p: HTMLElement = document.createElement("p");
                p.innerText = inventory;
                wrapper.appendChild(p);
            }
            div.appendChild(wrapper);
        }

        finishTask() {
            if(this.newstock !== undefined) {
                if(this.inventory.length > 0) {
                    for(let i: number = 0; i < this.inventory.length; i++) {
                        if(this.inventory[i].name == this.newstock.name) {
                            this.inventory[i].ammount += this.newstock.ammount;
                            i = this.inventory.length
                        }else if (this.inventory.length -1 == i) {
                            this.inventory.push(this.newstock);
                        }
                    }
                }else {
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
}    

