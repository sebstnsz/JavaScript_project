let player;
let canvas;
let ctx;
let inputStates =  {};
let estPress = false;


class Game{

    constructor(p){
        this.player = p;
        this.time = new Chrono();
        this.palierNiveau = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000];
        this.niveauActuel = 0;
    }

    init(){
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");
        player = this.player;
        player.setPosition(canvas.width/2-player.larg/2,400);
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

        this.Animation();

    }
    Animation(){
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
            if(player.x < canvas.width-player.larg){
               player.droite();
            }
        }

        if(inputStates.up){
            if(player.y >10){
                player.haut();
            }

        }
        if(inputStates.down){
            if(player.y < canvas.height-player.larg){
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


        //Boucle For()
        if(player.arme.array_chargeur.length !== 0) {
            for (let i = 0; i<player.arme.array_chargeur.length; i++) {
                let bullet = player.arme.array_chargeur[i];
                bullet.posY -= player.arme.bulletspeed;
                bullet.draw(ctx);

            }
        }
        player.arme.drawStat(ctx);
        this.displayScore();
        this.displayLife();
        this.displayNiveau();
        this.player.draw(ctx);
        requestAnimationFrame(()=> this.Animation());


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
            }else{
                heart = new Heart(x,y,0.15,"rgb(51, 51, 51)");
            }

            heart.draw(ctx);

            x = x + 17.5;
        }

        ctx.restore();
    }



}
