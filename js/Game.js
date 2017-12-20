let player;
let canvas;
let ctx;
let inputStates =  {};
let estPress = false;



class Game{

    constructor(level,p){
        this.levelData = level;
        this.player = p;
        this.time = new Chrono();
        this.palierNiveau = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000];
        this.niveauActuel = 0;
        this.obstacles = [];
    }

    init(){
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");
        player = this.player;
        player.setPosition(canvas.width/2-player.largeur/2,400);


        this.creerObstacle();
        setInterval(()=> this.creerObstacle(), this.levelData["interval"]);

        /*
          37 : left
          38 : up
          39 : right
          40 : down
          32 : space
           */
        window.addEventListener('keydown', function(event) {
            if (event.keyCode === 37) {
                inputStates.left = true;

            }else if(event.keyCode === 38){
                inputStates.up = true;
            }else if(event.keyCode === 39){
                inputStates.right = true;
            }else if(event.keyCode === 40){
                inputStates.down = true;
            } else if (event.keyCode === 32) {
                inputStates.space = true;
            }
        }, false);


        window.addEventListener('keyup', function(event) {
            if (event.keyCode === 37) {
                inputStates.left = false;

            }else if(event.keyCode === 38){
                inputStates.up = false;
            }else if(event.keyCode === 39){
                inputStates.right = false;
            }else if(event.keyCode === 40){
                inputStates.down = false;
            }else if (event.keyCode === 32) {
                inputStates.space = false;
            }
        }, false);

        this.animation();

    }
    animation(){
        for(let i = 0;i<this.palierNiveau.length;i++){
            if(player.score >= this.palierNiveau[i]){
                this.niveauActuel = i+1;
            }
        }
        this.time.increment();
        player.score = this.time.sec * 187;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Checks inputStates
        if (inputStates.left) {
           if(player.x > 0){
               player.gauche();
           }
        }

        if (inputStates.right) {
            if(player.x < canvas.width-player.largeur){
               player.droite();
            }
        }

        if(inputStates.up){
            if(player.y >10){
                player.haut();
            }

        }
        if(inputStates.down){
            if(player.y < canvas.height-player.largeur){
                player.bas();
            }

        }


        window.addEventListener('keydown', function(event) {

            if (event.keyCode === 32) {
                estPress = true;
            }
        }, false);


        if(estPress === true){
            estPress = false;
            player.shoot();

        }

        if(player.arme.array_chargeur.length !== 0) {
            for (let i = 0; i<player.arme.array_chargeur.length; i++) {
                let bullet = player.arme.array_chargeur[i];
                bullet.y -= player.arme.bulletspeed;
                bullet.draw(ctx);

                if (bullet.out(ctx)){
                    player.arme.array_chargeur.splice(i, 1);
                }

            }
        }

        this.player.draw(ctx);
        player.arme.drawStat(ctx);
        this.displayScore();
        this.displayLife();
        this.displayNiveau();

        for(let i=0; i<this.obstacles.length; i++) {
            let obstacle = this.obstacles[i];
            obstacle.draw(ctx);
            obstacle.animer();
            if(obstacle.out(ctx))
                this.obstacles.splice(i,1);
            else if(this.collision(player, obstacle)){
                this.obstacles.splice(i,1);
                console.log("collision");
                player.looseLife();

            }

            for(let j=0; j<player.arme.array_chargeur.length; j++) {
                if(this.collision(obstacle,player.arme.array_chargeur[j])){
                    this.obstacles.splice(i,1);
                    player.arme.array_chargeur.splice(i, 1);
                    console.log("boum");
                }
            }


        }
        if(player.life === 0) {
            this.gameOver();

            
        }else{
            requestAnimationFrame(()=> this.animation());
        }


    }


    displayScore(){
        ctx.save();
        ctx.font = "20px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText(player.score, 10,50);
        ctx.restore();
    }

    displayTime(){
        ctx.save();
        ctx.font = "20px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("" + this.time.sec, 10,50);
        ctx.restore();
    }

    displayNiveau(){
        ctx.save();
        ctx.font = "10px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("Niveau "+ this.niveauActuel, 10,65);
        ctx.restore();
    }

    displayLife(){
        ctx.save();
        let x = 5;
        let y = 10;
        let heart;
        for(let i  = 0; i<10;i++){
            if(i < player.life){
                heart = new Heart(x,y,0.15,"rgb(237, 16, 53)");
                heart.draw(ctx);
            }


            x = x + 17.5;
        }

        ctx.restore();
    }

    creerObstacle() {
        var posX = Math.floor((Math.random()*(canvas.width-50)) + 50);

        var nbObs = this.levelData["obstacles"].length;
        var randObs = Math.floor(Math.random()*nbObs);
        var newObs;

        switch(this.levelData["obstacles"][randObs]) {
            case "easy":
                newObs = new ObstacleEasy(posX);
                break;
            case "medium":
                newObs = new ObstacleMedium(posX);
                break;
            case "hard":
                newObs = new ObstacleHard(posX);
                break;
        }

        this.obstacles.push(newObs);
    }

    collision(obj1,obj2) {
        var x1 = obj1.x;
        var y1 = obj1.y;
        var l1 = obj1.largeur;
        var h1 = obj1.hauteur;

        var x2 = obj2.x;
        var y2 = obj2.y;
        var l2 = obj2.largeur;
        var h2 = obj2.hauteur;

        if ((x1 + l1 <= x2) || (x2 + l2 <= x1) || (y1 + h1 <= y2) || (y2 + h2 <= y1))
            return false;
        return true;
    }

    gameOver(){
        let my_gradient2 = ctx.createLinearGradient(0, 0, 400, 0);
        my_gradient2.addColorStop(0.3, "rgb(27, 1, 145)");
        my_gradient2.addColorStop(0.5, "rgb(216, 21, 21)");
        my_gradient2.addColorStop(0.7, "rgb(27, 1, 145)");

        let texte = "GAME OVER";
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0,0.6)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
       // this.drawRectArrondi(ctx,canvas.width/2-150,canvas.height/2-50,300,100,20,"rgb(255, 255, 255)");
        ctx.font = "70px Bebas";
        ctx.fillStyle = "white";
        ctx.translate(0,-50);
        ctx.fillText(texte,canvas.width/2 - ctx.measureText(texte).width/2,canvas.height/2);
        ctx.translate(0,70);
        ctx.font = "40px True Lies";

        ctx.shadowColor = "red";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 40;
        ctx.fillStyle = my_gradient2;
        ctx.fillText(player.score,canvas.width/2 - ctx.measureText(player.score).width/2,canvas.height/2);

        ctx.fillStyle = "white";
        let texte2 = "Press 'Space'";
        ctx.font = "15px Arial";
        ctx.translate(0,50);
        ctx.fillText(texte2,canvas.width/2 - ctx.measureText(texte2).width/2,canvas.height/2);
        ctx.restore();
    }


    drawRectArrondi(ctx, x, y, width, height, radius, style) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x+radius, y);
        ctx.arcTo(x+width, y, x+width, y+radius, radius);
        ctx.arcTo(x+width, y+height, x+width-radius, y+height, radius);
        ctx.arcTo(x, y+height, x, y+height-radius, radius);
        ctx.arcTo(x, y, x+radius, y, radius);
        ctx.fillStyle = style;
        ctx.fill();
        ctx.restore();
    }


}
