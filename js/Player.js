class Player extends Objet{
    constructor(img,x,y,life,speed,long,larg,s){
       super(img,x,y,life,speed,speed,speed,long,larg,s);
       this.score = 0;
    }
/*
    0 = up
    1 = down

    0 = left
    1 = right
  */
    gauche(){
        this.x = this.x - this.speed;
    }
    droite(){
        this.x = this.x + this.speed;
    }
    haut(){
        this.y = this.y - this.speed;
    }
    bas(){
        this.y = this.y + this.speed;
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

            if(i<this.speed){
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
        ctx.translate(ctx.canvas.width/2 - this.long/2,ctx.canvas.height/2 - this.larg/2 - 20 );
        ctx.drawImage(this.image,0,0,this.larg,this.long);
        ctx.restore();
    }

}