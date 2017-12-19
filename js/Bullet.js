class Bullet{
    constructor(x,y,tb){
        this.x = x;
        this.y =y;
        this.largeur = tb;
        this.hauteur = tb;
    }

    draw(ctx){
        ctx.fillStyle = "white";
        ctx.fillRect(this.x,this.y,this.largeur,this.hauteur);
    }

    out() {
        return (this.y+this.hauteur < 0);
    }

}