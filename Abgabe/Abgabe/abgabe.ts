namespace Abgabe {
    window.addEventListener("load", handleLoad);
    
    var goalcounter1 = document.getElementById("goalcounter1");
    var goalcounter2 = document.getElementById("goalcounter2");
    var ballownership = document.getElementById("ballownership");
    var ballownershipnumber: number = 0;

    var exchangeplayerteam1 = document.getElementById("exchangeplayerteam1");
    var exchangeplayerteam2 = document.getElementById("exchangeplayerteam2");

    var newprecision;

    var canvas: HTMLCanvasElement = document.querySelector("canvas");
    var c: CanvasRenderingContext2D = canvas.getContext("2d");

    var npcPrecision: number = 0.95;


    canvas.addEventListener("mousedown", function(e) {
        getMousePosition(canvas, e);
    });

    var positions: number[] = [200,200,/**/200,350,/**/200,500,/**/450,150,/**/450,250,/**/450,450,/**/450,550,/**/750,200,/**/750,350,/**/750,500,
            /*team2*/250,200,/**/250,350,/**/250,500,/**/550,150,/**/550,250,/**/550,450,/**/550,550,/**/800,200,/**/800,350,/**/800,500,
            /*exchangeplayers1*/-2000,-2000,/**/-2000,-2000,/**/-2000,-2000,/**/500,25,/**/500,canvas.height-25,/**/600,350];


    var coordinates: coordinate[] = [];
       
    var counterTeam1: number = 0;
    var counterTeam2: number = 0;

    var firstExecution: number = 0;
    var interval: number = 400;

    var npcs: npc[] = [];
    var teamcolor1: string = "yellow";
    var teamcolor2: string = "purple";
    var teamcolor3: string = "grey";

    var npcRange: number = 140;
    
    var mouseX: number = 0;
    var mouseY: number = 0;
    
    var paused: boolean = false;

    //after first load
    function handleLoad():void {
        fillCoordinates(); //uses positions array to fill coordinate array
        newNpcs();
        updateStats(); //updates speed precision and teamcolor according to user selection

        drawBackground(50, 50, "green", "white");
        drawPlayer(); //draws player and calls move player for position updates
    }

    function play() {
        drawBackground(50, 50, "green", "white"); //draws the background
        renderBall(); 
        drawPlayer(); 

        goalcounter1.innerHTML = "Tore Team 1: " + counterTeam1;
        goalcounter2.innerHTML = "Tore Team 2: " + counterTeam2;
        ballownership.innerHTML = "Team in Ballbesitz: " + ballownershipnumber;
    }

    function randomNumber(min: number, max: number) {

        return Math.floor((Math.random() * max) + min);
    }



    const ball = {
        x: 500,
        y: 350,
        xVel: 0,
        yVel: 0,
        size: 10,
        speed: 7,
        checksize: 10,
    }

    class coordinate {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }
    }

    class npc {
        x: number;
        y: number;
        xVel: number = 0;
        yVel: number = 0;
        range: number;
        speed: number;
        precision: number;
        color: string;
        type: number; //1 and 2 are players, 3 is linejudge, 4 is refere
        active: boolean;
        id:number;
        drawsize: number;
        checksize: number;
        ogx: number;
        ogy: number;


        constructor(_x: number, _y: number, _speed: number, _precision: number, _color: string, _active: boolean, _id: number, _type: number, _drawsize: number, _checksize: number, _ogx: number, _ogy :number, _range: number) {
            this.x = _x;
            this.y = _y;
            this.speed = _speed;
            this.precision = _precision;
            this.color = _color;
            this.active = _active;
            this.id = _id;
            this.type = _type;
            this.drawsize = _drawsize;
            this.checksize = _checksize;
            this.ogx = _ogx;
            this.ogy = _ogy;
            this.range = _range;
        }
    }

    //makes new coordinate for coordinates[]
    function fillCoordinates() {
        for (let i: number = 1; coordinates.length < 27; i+=2) {
            let x: number = positions[i-1];
            let y: number = positions[i];

            var Coordinate: coordinate = new coordinate(x,y);

            coordinates.push(Coordinate);
        }
    }

    //makes new npc for npcs[]
    function newNpcs() {
        for (let i: number = 0; npcs.length < 26; i++) {
            let x: number = coordinates[i].x;
            let y: number = coordinates[i].y;

            let speed: number = randomNumber(1,1.2);
            let size: number = randomNumber(12,14);

            //team 1
            if (i <= 9) {
            var Npc: npc = new npc(x,y,speed,npcPrecision,teamcolor1,true,i,1,size,size,x,y,npcRange);    
            }
            //team2
            if (i >= 10 && i <= 20) {
            var Npc: npc = new npc(x,y,speed,npcPrecision,teamcolor2,true,i,2,size,size,x,y,npcRange);
            }
            //exchangeplayer for team1
            if (i > 20 && i < 22) {
            var Npc: npc = new npc(x,y,speed,npcPrecision,teamcolor1,false,i,1,size,size,x,y,npcRange);
                exchangeplayerteam1.innerHTML += "Spieler " + i
            }
            //exchangeplayer for team2
            if (i >= 22 && i < 23) {
                var Npc: npc = new npc(x,y,speed,npcPrecision,teamcolor2,false,i,2,size,size,x,y,npcRange);
                exchangeplayerteam2.innerHTML += "Spieler " + i
            }
            //linejudge
            if (i >= 23 && i < 25) {
                var Npc: npc = new npc(x,y,speed*5,npcPrecision,teamcolor3,true,i,3,size,0,x,y,1500);
            }
            //refere
            if (i >= 25 && i < 27) {
                var Npc: npc = new npc(x,y,speed,npcPrecision,teamcolor3,true,i,4,size,0,x,y,1500);
            }


            npcs.push(Npc);
            generateCards(i);

        }
    }

    function updateStats() {
        let playerprecisionmin: HTMLInputElement = <HTMLInputElement>document.getElementById("precisionmin");

        let playerprecisionmax: HTMLInputElement = <HTMLInputElement>document.getElementById("precisionmax");
        
        let playerspeedmin: HTMLInputElement = <HTMLInputElement>document.getElementById("speedmin");
        
        let playerspeedmax: HTMLInputElement = <HTMLInputElement>document.getElementById("speedmax");
        
        let colorteam1: HTMLInputElement = <HTMLInputElement>document.getElementById("colorteam1");
        
        let colorteam2: HTMLInputElement = <HTMLInputElement>document.getElementById("colorteam2");

            newprecision = ((Math.random() * (playerprecisionmax.valueAsNumber - playerprecisionmin.valueAsNumber)) + playerprecisionmin.valueAsNumber) /100;
            
            npcPrecision = newprecision;
        
            for (let i = 0; i < npcs.length; i++){
            let newspeed: number = randomNumber(playerspeedmin.valueAsNumber, playerspeedmax.valueAsNumber); 

            npcs[i].speed = newspeed;

            if(npcs[i].type == 1) {
            npcs[i].color = colorteam1.value;
            }

            if(npcs[i].type == 2) {
                npcs[i].color = colorteam2.value;
            }

            let cardTitle: string = "Spieler " + i;
            document.getElementById(cardTitle).outerHTML = ""
            generateCards(i);
        }

    }


    function generateCards(i: number){
        if(npcs[i].type == 1 || npcs[i].type == 2 ) {
        let cardTitle:string = "Spieler " + i;
        let team: string = " Team " + npcs[i].type;
        let speed: string = " Geschwindigkeit " + npcs[i].speed;
        let active: string;

        if(npcs[i].active == true) {
            active = " auf Feld";
        } else {
            active = " Ersatzbank"
        }
        
        var cardWrapper: HTMLElement = document.createElement("div");
        cardWrapper.setAttribute("id", cardTitle);
        cardWrapper.setAttribute("class", "cards");
        var text: Node = document.createTextNode(cardTitle);
        cardWrapper.addEventListener("click", function() {
            exchangeplayer(i);
        })
        cardWrapper.append(text);
        cardWrapper.append(team);
        cardWrapper.append(speed);
        cardWrapper.append(active);
        var element: HTMLElement = document.getElementById("playerboxes");
        element.append(cardWrapper);
    }
}

    //i is active Player
    function exchangeplayer(i) {
        console.log(i);
        for (let n: number = 0; n < npcs.length; n++) {
            if (npcs[n].type == npcs[i].type && npcs[n].active == false && npcs[i].active == true) {
                npcs[n].ogx = npcs[i].ogx;
                npcs[n].ogy = npcs[i].ogy;
                npcs[n].x = npcs[i].x;
                npcs[n].y = npcs[i].y;
                npcs[n].active = true;

                let cardTitleI: string = "Spieler " + i;
                let cardTitleN: string = "Spieler " + n;
                
                npcs[i].ogx = 2000;
                npcs[i].ogy = 2000;
                npcs[i].x = 2000;
                npcs[i].y = 2000;
                npcs[i].active = false;
                drawPlayer();

                document.getElementById(cardTitleI).outerHTML = ""
                generateCards(i);
                document.getElementById(cardTitleN).outerHTML = ""
                generateCards(n);

            }
        }
        if(npcs[i].type == 1) {
            exchangeplayerteam1.innerHTML = "Ersatzspieler Team 1 = Spieler " + i;
        }
        if(npcs[i].type == 2) {
            exchangeplayerteam2.innerHTML = "Ersatzspieler Team 2 = Spieler " + i;
        }
    }
    
    

    function drawPlayer() {
        c.strokeStyle = "black";
        c.lineWidth = 3;

        for (let i: number = 0; i < npcs.length; i++) {
            movePlayer(i);
            c.beginPath();
            
            c.fillStyle = npcs[i].color;
            c.arc(npcs[i].x,npcs[i].y,npcs[i].drawsize,0,Math.PI*2);
            c.stroke();
            c.fill();
            c.closePath();
            
            c.beginPath();
            c.fillStyle = "black"
            c.fillText(""+ npcs[i].id, npcs[i].x - 5, npcs[i].y + 5 , 20);
            c.fill();
            c.stroke();
            c.closePath();
        }
    }setInterval(drawPlayer, 25);



    function movePlayer(i:number){
        
        var directionX: number = ball.x - npcs[i].x;
        var directionY: number = ball.y - npcs[i].y;

        var magnitude: number = Math.sqrt(directionX * directionX + directionY * directionY);

        checksPlayerBallCollision(magnitude, i);

        if (magnitude < npcs[i].range && paused == false) {
        directionX /= magnitude;
        directionY /= magnitude;

        npcs[i].xVel = directionX * npcs[i].speed;
        npcs[i].yVel = directionY * npcs[i].speed;
        
        npcs[i].x += npcs[i].xVel;
        npcs[i].y += npcs[i].yVel;

        if (npcs[i].type == 3) {
        npcs[i].y -= npcs[i].yVel;
        }
        if (npcs[i].type == 4 && magnitude < 100) {
        npcs[i].x -= npcs[i].xVel;
        npcs[i].y -= npcs[i].yVel;
        }
        }
    }
    
    


    function checksPlayerBallCollision(magnitude: number, i: number) {
        if (paused == false) {
            

        if (magnitude < ball.size + npcs[i].drawsize && npcs[i].type == 1  || magnitude < ball.size + npcs[i].drawsize && npcs[i].type == 2) {
            checkTime(i);
        

        if (magnitude < ball.checksize + npcs[i].checksize) {

            paused = true;
            
            clearInterval(intervalmoveBall)
            
            
            ball.checksize =0;
            ball.yVel = 0;
            ball.xVel = 0;
            
            for (let n: number = 0; n < npcs.length ; n++) {
                npcs[n].xVel = 0;
                npcs[n].yVel = 0;
                npcs[n].checksize = 0;
            }
            
        }
        }
    }
}

    function checkTime(i: number) {
        // current date
        var date: Date = new Date();
        var milliseconds: number = date.getTime(); 
        if((milliseconds - firstExecution) > interval){
          firstExecution = milliseconds;

          

            clearInterval(intervalmoveBall)
            ball.checksize = ball.size;
            
            ballownershipnumber = npcs[i].type;
            
            
            ballownership.innerHTML = "Team in Ballbesitz: " + ballownershipnumber;

            for (let n: number = 0; n < npcs.length; n++) {
                npcs[n].checksize = npcs[n].drawsize;
                npcs[n].xVel = 0;
                npcs[n].yVel = 0;
            }

            ball.yVel = 0;
            ball.xVel = 0;
            paused = true;
            intervalcheckPause = setInterval(checkPause, 25);
            
        } else {
        mouseX = 0;
        mouseY = 0;

        }
    }
    
    

    function checkPause() {
        if (paused == true) {
        if (mouseX > 50 && mouseY > 50 && mouseX < 950 && mouseY < 650) {


            canvas.removeEventListener("mousedown", function(e) {
                getMousePosition(canvas, e);
                
            });
                paused = false;

                intervalmoveBall = setInterval(moveBall, 25);

                var directionX: number = (mouseX - ball.x);
                var directionY: number = (mouseY - ball.y);
        
                var magnitude: number = Math.sqrt(directionX * directionX + directionY * directionY);
        
                directionX /= magnitude;
                directionY /= magnitude;

                ball.xVel = directionX * ball.speed;
                ball.yVel = directionY * ball.speed;

                clearInterval(intervalcheckPause);
            }
        }
    }
    var intervalcheckPause = setInterval(checkPause, 25);
    
    function getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent) {
        let rect: ClientRect = canvas.getBoundingClientRect();

            mouseX = (event.clientX * newprecision) - rect.left;
            mouseY = (event.clientY * newprecision) - rect.top;
            
            console.log("Coordinate x: " + mouseX, 
                        "Coordinate y: " + mouseY);
    }
    
    

    //create Background (canvas size 1000x 700y, fieldsize 900x 600y)
    function drawBackground(_x: number, _y: number, _fillColor: string, _strokeColor: string) {
        c.fillStyle = _fillColor;
        c.strokeStyle = _strokeColor;
        c.lineWidth = 5;

        //green background
        c.fillRect(0, 0, c.canvas.width, c.canvas.height);

        //White lines first
        c.beginPath();
        c.moveTo(_x, _y);
        c.lineTo(_x + 900, _y + 0);
        c.lineTo(_x + 900, _y + 600);
        c.lineTo(_x + 0, _y + 600);
        c.lineTo(_x + 0, _y + 0);
        c.lineTo(_x + 450, _y +0);
        c.lineTo(_x + 450, _y + 600);

        //goal left
        c.moveTo(_x + 0, _y + 200);
        c.lineTo(_x + 30, _y + 200);
        c.lineTo(_x + 30, _y + 400);
        c.lineTo(_x + 0, _y + 400);

        //goal right
        c.moveTo(_x + 900, _y + 200);
        c.lineTo(_x + 870, _y + 200);
        c.lineTo(_x + 870, _y + 400);
        c.lineTo(_x + 900, _y + 400);
        c.stroke();
        c.closePath();
        
        //circle in middle
        c.beginPath();
        c.arc(_x + 450, _y + 300, 100, 0, 2 * Math.PI);
        c.stroke();
        c.closePath(); 
    }
    
    function renderBall(){
        c.beginPath();
        c.strokeStyle = "black";
        c.fillStyle = "white";
        c.arc(ball.x,ball.y,ball.size,0,Math.PI*2);
        c.stroke();
        c.fill();
        c.closePath();

    }

    function moveBall(){
        c.clearRect(0, 0, canvas.width, canvas.height);

        ball.x += ball.xVel;
        ball.y += ball.yVel;
        
        if(ball.x + ball.xVel > canvas.width-ball.size-50 || ball.x + ball.xVel < canvas.width-ball.size-950) {
            if(ball.y + ball.yVel < canvas.height - 230 && ball.y + ball.yVel > canvas.height - 470 && ball.x < canvas.width - 700 || ball.y + ball.yVel < canvas.height - 230 && ball.y + ball.yVel > canvas.height - 470 && ball.x + ball.xVel > canvas.width - 500 ){
                if (ball.x > canvas.width - 200) {
                    counterTeam1 += 1;
                    console.log("Tore Team 1 =" + counterTeam1);
                    resetBall();
                    }
                
                if (ball.x < canvas.width - 800) {
                counterTeam2 += 1;
                console.log("Tore Team 2 =" + counterTeam2);
                resetBall();
                }
        }
        }
        
        if(ball.y + ball.yVel > canvas.height-ball.checksize-50 || ball.y + ball.yVel < canvas.height-ball.checksize-650) {
            resetBall();
        }
        if(ball.x + ball.xVel > canvas.width-ball.size-50 || ball.x + ball.xVel < ball.size/2) {
            resetBall();
        }
        play();
    }
    var intervalmoveBall = setInterval(moveBall, 25);
        

    function resetBall() {
        for (let n: number = 0; n < npcs.length; n++) {
            npcs[n].checksize = npcs[n].drawsize;
            npcs[n].x = npcs[n].ogx;
            npcs[n].y = npcs[n].ogy;
        }

        ball.checksize = ball.size;
        ball.x = 500;
        ball.y = 350;
        ball.xVel = 0;
        ball.yVel = 0;
        mouseY = 0;
        mouseX = 0;
        ballownershipnumber = 0;
        updateStats();


        console.log("resetBall");
        
    }
}



