let player;
let canvas;
let ctx;
let inputStates =  {};
let estPress = false;


class Game{

    constructor(level,p){
        this.level = level;
        this.player = p;
        this.time = new Chrono();
        this.obstacles = [];
        this.bonus = [];
        this.lifePlayerAtBeginning = this.player.life;
    }

    init(){
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");
        player = this.player;
        player.setPosition(canvas.width/2-player.largeur/2,400);

        this.creerObstacle();
        setInterval(()=> this.creerObstacle(), this.level.interval);
        //setInterval(()=> this.endLevel(), this.level.duree);
        this.creerBonus();

        /*
          37 : left
          38 : up
          39 : right
          40 : down
          32 : space
           */
        window.addEventListener('keydown', function(event) {
            if (event.keyCode === 37)
                inputStates.left = true;
            else if(event.keyCode === 38)
                inputStates.up = true;
            else if(event.keyCode === 39)
                inputStates.right = true;
            else if(event.keyCode === 40)
                inputStates.down = true;
            else if (event.keyCode === 32)
                inputStates.space = true;
        }, false);

        window.addEventListener('keyup', function(event) {
            if (event.keyCode === 37)
                inputStates.left = false;
            else if(event.keyCode === 38)
                inputStates.up = false;
            else if(event.keyCode === 39)
                inputStates.right = false;
            else if(event.keyCode === 40)
                inputStates.down = false;
            else if (event.keyCode === 32)
                inputStates.space = false;
        }, false);

        this.animation();
    }

    animation() {
        this.time.increment();
        player.score += Math.floor(100/60);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Checks inputStates
        if (inputStates.left) {
            if (player.x > 0)
                player.gauche();
        }
        if (inputStates.right) {
            if (player.x < canvas.width - player.largeur)
                player.droite();
        }
        if (inputStates.up) {
            if (player.y > 10)
                player.haut();
        }
        if (inputStates.down) {
            if (player.y < canvas.height - player.largeur)
                player.bas();
        }

        window.addEventListener('keydown', function (event) {
            if (event.keyCode === 32)
                estPress = true;
        }, false);

        if (estPress === true) {
            estPress = false;
            player.shoot();
        }


        // dessin fusée :
        this.player.draw(ctx);

        // dessin et animation des balles :
        for (let i = 0; i < player.arme.array_chargeur.length; i++) {
            let bullet = player.arme.array_chargeur[i];
            bullet.y -= player.arme.bulletspeed;
            bullet.draw(ctx);
            if (bullet.out(ctx)) {
                player.arme.array_chargeur.splice(i, 1);
            }
        }

        // dessin et animation des obstacles, collisions avec fusée :
        for (let i = 0; i < this.obstacles.length; i++) {
            let obstacle = this.obstacles[i];
            obstacle.draw(ctx);
            obstacle.animer();
            if (obstacle.out(ctx))
                this.obstacles.splice(i, 1);
            else if (this.collision(player, obstacle)) {
                this.obstacles.splice(i, 1);
                player.life -= obstacle.degat;
            }
            // collisions avec balles :

            for(let j=0; j<player.arme.array_chargeur.length; j++) {
				if(this.collision(obstacle,player.arme.array_chargeur[j])){
					obstacle.life -= player.arme.degat;
					if(player.arme.array_chargeur[j].out()){
						player.arme.array_chargeur.splice(j, 1);
					}
					else {
						if(obstacle.life <= 0){
							this.obstacles.splice(i,1);
							player.arme.array_chargeur.splice(j, 1);
						}
                    player.arme.array_chargeur.splice(j, 1);
                	}
            	}
        	}
            for (let j = 0; j < player.arme.array_chargeur.length; j++) {
                if (this.collision(obstacle, player.arme.array_chargeur[j])) {
                    obstacle.life -= player.arme.degat;
                    if (player.arme.array_chargeur[j].out()) {
                        player.arme.array_chargeur.splice(j, 1);
                    }
                    else {
                        if (obstacle.life <= 0) {
                            this.obstacles.splice(i, 1);
                            player.arme.array_chargeur.splice(j, 1);
                        }
                        player.arme.array_chargeur.splice(j, 1);
                    }
                }
            }
        }

            // dessin et animation des bonus :
            for (let k = 0; k < this.bonus.length; k++) {
                let bns = this.bonus[k];
                bns.animer();
                bns.draw(ctx);
                if (bns.out(ctx))
                    this.bonus.splice(k, 1);
                else if (this.collision(player, bns)) {
                    this.bonus.splice(k, 1);
                    // gain bonus
                    if(bns.constructor.name === "BonusVie"){
                        if(this.lifePlayerAtBeginning !== player.life){
                            player.life++;
                        }
                    }else if(bns.constructor.name === "BonusArme"){
                        player.arme.setPosition(player.x,player.y);
                        player.arme = bns.attachedGun;
                        console.log("arme !!");

                    }
                }
            }

            // affichage des stats :
            player.arme.drawStat(ctx);
            this.displayScore();
            this.displayLife();
            this.displayNiveau();
            //Fin du niveau

            if(this.endLevel(ctx) === false){

                // fin de la partie :
                if (player.life <= 0) {
                    this.gameOver();
                }
                else {
                    requestAnimationFrame(() => this.animation());
                }
            }
        }

    displayScore(){
        ctx.save();
        ctx.font = "20px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText(player.score, 10,50);
        ctx.restore();
    }

    displayNiveau(){
        ctx.save();
        ctx.font = "10px Calibri";
        ctx.fillStyle = "white";
        ctx.fillText("Niveau "+ this.level.id, 10,65);
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

    randomPosX() {
        var nbPosX = canvas.width/this.level.ecart;
        var rand = Math.floor(Math.random()*nbPosX);
        var posX = rand*this.level.ecart + this.level.ecart/2;
        return posX;
    }

    creerObstacle() {
        var posX = this.randomPosX();
        var nbObs = this.level.obstacles.length;
        var randObs = Math.floor(Math.random()*nbObs);
        var newObs;
        switch(this.level.obstacles[randObs]) {
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

    creerBonus() {
        var lvl = this.level.id;
        var dureeLvl = this.level.duree;
        var rd;

        // bonus vie :
        setTimeout(() => this.bonus.push(new BonusVie(this.randomPosX())), dureeLvl*2/3);

        if(lvl!=1) {
        	// bonus vie :
        	setTimeout(() => this.bonus.push(new BonusVie(this.randomPosX())), dureeLvl*1/3);
        	// bonus arme :
        	rd = (Math.random()*(dureeLvl/2 - 10000)) + 10000;							// [10 000 ; durée level / 2]
        	setTimeout(() => this.bonus.push(new BonusArme(this.randomPosX())), rd);
        }
        if(lvl==4 || lvl==5) {
        	// bonus arme :
        	rd = (Math.random()*(dureeLvl/2 - 10000)) + dureeLvl/2;						// [durée level / 2 ; durée level - 10000]
        	setTimeout(() => this.bonus.push(new BonusArme(this.randomPosX())), rd);
        }
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
        ctx.font = "70px Bebas";
        ctx.fillStyle = "white";
        ctx.translate(0,-50);
        ctx.fillText(texte,canvas.width/2 - ctx.measureText(texte).width/2,canvas.height/2);
        ctx.translate(0,70);

        ctx.shadowColor = "red";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 40;
        ctx.fillStyle = my_gradient2;
        ctx.font = "40px Bebas";
        ctx.fillText(player.score,canvas.width/2 - ctx.measureText(player.score).width/2,canvas.height/2);

        ctx.fillStyle = "white";
        let texte2 = "Back to menu in 3 seconds";
        ctx.font = "15px Arial";
        ctx.translate(0,50);
        ctx.fillText(texte2,canvas.width/2 - ctx.measureText(texte2).width/2,canvas.height/2);
        ctx.restore();
        let menu = new Menu();
        setTimeout(()=>menu.start(),3000);
    }


    endLevel(ctx){
        if(this.time.sec === this.level.duree){
            console.log("fin du niveau");
            //Affichage Transition
            ctx.save();
            let my_gradient2 = ctx.createLinearGradient(0, 0, 400, 0);
            my_gradient2.addColorStop(0.3, "rgb(27, 1, 145)");
            my_gradient2.addColorStop(0.5, "rgb(216, 21, 21)");
            my_gradient2.addColorStop(0.7, "rgb(27, 1, 145)");

            let texte = "LEVEL ENDED";
            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0,0.6)";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.font = "70px Bebas";
            ctx.fillStyle = "white";
            ctx.fillText(texte,canvas.width/2 - ctx.measureText(texte).width/2,canvas.height/2);
            ctx.fillStyle = "white";
            let texte2 = "Next level in 2 seconds";
            ctx.font = "15px Arial";
            ctx.translate(0,50);
            ctx.fillText(texte2,canvas.width/2 - ctx.measureText(texte2).width/2,canvas.height/2);
            ctx.restore();
            //Passage niveau suivant
            setTimeout(()=>new Game(levels[this.level.id++],player).init(),3000);
            return true;
        }
        return false;
    }
}
