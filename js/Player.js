class Player extends Objet{
    constructor(img,x,y,life,speed,long,larg){
       super(img,x,y,life,speed,speed,long,larg);
       this.score = 0;
       this.arme = new Arme(0,0,0,0);
       this.Maxlife = life;
    }
/*
    0 = up
    1 = down
    0 = left
    1 = right
  */
    gauche(){
        this.x = this.x - this.vitesseX;
    }
    droite(){
        this.x = this.x + this.vitesseX;
    }
    haut(){
        this.y = this.y - this.vitesseY;
    }
    bas(){
        this.y = this.y + this.vitesseY;
    }

    drawStatInMenu(ctx){
        let heart;
        let speedcircle;
        let xmove =15;
        let x = (ctx.canvas.width - 10 * xmove)/2;
        let y = 340;
        let scale = 0.12;

        ctx.save();
        for(let i  = 0; i<10;i++){
            if(i < this.life){
                heart = new Heart(x,y,scale,"rgb(237, 16, 53)");
            }else{
                heart = new Heart(x,y,scale,"rgb(51, 51, 51)");
            }

            if(i<this.vitesseX){
                speedcircle = new SpeedCircle(x,y,scale,"rgb(255, 214, 68)");
            }else{
                speedcircle = new SpeedCircle(x,y,scale,"rgb(51, 51, 51)");
            }


            speedcircle.draw(ctx);
            heart.draw(ctx);

            x = x + xmove;

        }

        ctx.restore();
    }

    drawInMenu(ctx){
        ctx.save();
        ctx.translate(ctx.canvas.width/2 - this.largeur/2-17.5,ctx.canvas.height/2 - this.hauteur/2 - 30 );
        ctx.scale(1.5,1.5);
        ctx.drawImage(this.image,0,0,this.largeur,this.hauteur);
        ctx.restore();
    }

    drawStatArme(ctx){
       this.arme.drawStat(ctx);
    }


    shoot(){

        let px = (this.hauteur-this.arme.taillebullet)/2;
        let py = (this.largeur-this.arme.taillebullet)/2;

        if(this.arme.munition > 0 ){
            this.arme.index++;
            this.arme.array_chargeur.push(new Bullet(this.x+px,this.y+py,this.arme.taillebullet));
            this.arme.munition--;
        }
    }



}