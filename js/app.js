window.onload = init;

var gf;
function init() {
    gf = new GameFramework();

    gf.init();
}
function GameFramework() {
    let canvas, ctx, w, h;
    let tabAllObjet = [];
    let tabBonhomme = [];
    let barre1 = new Barre(0, 45, "black", 400, 10);

    createScene();

    let displayMuscle = false;
    let nbsTractionTotal = null;

    function init() {
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
        requestAnimationFrame(anime);
    }

    function anime(timmeElapsed) {
        ctx.clearRect(0, 0, w, h);
        for (k = 0; k < tabBonhomme.length; k++) {
            if (nbsTractionTotal - tabBonhomme[k].getNbsTraction() > 0 || nbsTractionTotal === null) {
                for (i = 0; i < tabAllObjet.length; i++) {
                    Avatar.draw(ctx);
                    tabAllObjet[i].update();
                }
                barre1.draw(ctx);
                drawNumberTraction(470, 100);
            } else {
                NextExo(200, 150);

            }
        }
        requestAnimationFrame(anime);
    }

    function drawNumberTraction(x,y){
        ctx.save();
        ctx.translate(x,y);
        ctx.font = "10pt Calibri,Geneva,Arial";
        ctx.fillStyle = "rgb(0,20,180)";
        ctx.fillText("Nbs tactions", 0, 0);
        ctx.translate(30,30);
        ctx.font = "20pt Calibri,Geneva,Arial";
        ctx.fillStyle = "rgb(0,20,180)";

        for (k = 0; k < tabBonhomme.length; k++) {
            ctx.fillText(tabBonhomme[k].getNbsTraction(), 0, 0);
            if (nbsTractionTotal > tabBonhomme[k].getNbsTraction()) {
                ctx.translate(-40, 60);
                ctx.font = "8pt Calibri,Geneva,Arial";
                ctx.fillStyle = "rgb(0,20,180)";
                ctx.fillText("Tractions restantes", 0, 0);
                ctx.translate(40, 30);
                ctx.font = "20pt Calibri,Geneva,Arial";
                ctx.fillStyle = "rgb(0,20,180)";
                ctx.fillText(nbsTractionTotal - tabBonhomme[k].getNbsTraction(), 0, 0);
            } else {
                ctx.translate(-40, 60);
                ctx.font = "8pt Calibri,Geneva,Arial";
                ctx.fillStyle = "rgb(0,20,180)";
                ctx.fillText("Tractions restantes", 0, 0);
                ctx.translate(15, 30);
                ctx.font = "10pt Calibri,Geneva,Arial";
                ctx.fillStyle = "rgb(0,20,180)";
                ctx.fillText("Non définie", 0, 0);
            }
        }
        ctx.restore();
    }

    function NextExo(x,y) {
        ctx.save();
        ctx.translate(x,y);
        ctx.font = "20pt Calibri,Geneva,Arial";
        ctx.fillStyle = "rgb(0,20,180)";
        ctx.fillText("Exercice finit", 0, 0);

        ctx.translate(0,20);
        ctx.font = "8pt Calibri,Geneva,Arial";
        ctx.fillStyle = "rgb(0,20,180)";
        ctx.fillText("Prochain exercice dans X temps", 0, 0);
        ctx.restore();
    }

    function reset() {
        tabAllObjet = [];
        tabBonhomme = [];
        createScene();
        nbsTractionTotal = null;
    }

    function createScene(){
        let b1 = new Bonhomme(150, 100, "royalblue", 1.6, 4.2, 0.1, 2, 0.5);
        let bras1 = new Bras(200, 110, 1.6, 4.3, 0.9, 5);

        tabAllObjet.push(b1);
        tabAllObjet.push(bras1);

        tabBonhomme.push(b1);
    }

    function setNbsT(nbs) {
        nbsTractionTotal = nbs;
    }

    function getTabObj(){
        return tabAllObjet;
    }

    function setdisplayMuscle() {
        displayMuscle = !displayMuscle;
    }

    function getdisplayMuscle() {
        return displayMuscle;
    }

    return {
        init: init,
        setNbsT:setNbsT,
        getTabObj: getTabObj,
        reset: reset,
        setdisplayMuscle: setdisplayMuscle,
        getdisplayMuscle: getdisplayMuscle,

    }

}

class Bonhomme {
    constructor(posx, posy, coulTete, abd, aabd, abg, aabg, scale) {
        this.x = posx;
        this.y = posy;
        this.couleurTete = coulTete;
        this.angleBrasDroit = abd;
        this.angleAvantBrasDroit = aabd;
        this.angleBrasGauche = abg;
        this.angleAvantBrasGauche = aabg;
        this.translateupdown = 10;
        this.mouvEpaule = 10; //35 for down
        this.updown = 1;
        this.scale = scale;
        this.nbs_traction = 0;

        this.skinColor = "#FAAC58";
        this.shirtColor = "#585858";
        this.pantColor = "#0080FF";
        this.beltColor = "black";
    }


    draw(ctx) {
        //bonne pratique: sauver au debut et restaurer le contect a la fin
        ctx.save();
        //BP : Pour dessiner en x et y on deplace le repere et on dessine comme si on etait en 0,0
        ctx.scale(this.scale, this.scale);

        ctx.font = "20pt Calibri,Geneva,Arial";
        ctx.fillStyle = "rgb(0,20,180)";
        ctx.fillText("Exercice 1 : Traction", 80, 500);
        ctx.translate(this.x, this.y + this.translateupdown);


        ctx.fillStyle = this.shirtColor;
        ctx.fillRect(0, 0, 100, 100);
        this.drawCouTete(ctx);
        this.epauleDroite(ctx);
        this.epauleGauche(ctx);
        this.dessineBrasGauche(this.angleBrasGauche, ctx);
        this.dessineBrasDroit(this.angleBrasDroit, ctx);
        this.dessineBasCorps(ctx);

        ctx.restore();
    }

    drawCouTete(ctx) {
        ctx.save();
        ctx.translate(35, -20);
        //le cou
        ctx.fillStyle = this.skinColor;
        ctx.fillRect(0, 0, 30, 20);

        //la tete
        ctx.translate(-10, -40);
        ctx.fillStyle = "#3B0B0B";
        ctx.fillRect(0, 0, 50, 30);

        //le visage
        ctx.translate(5, 10);
        ctx.fillStyle = this.skinColor;
        ctx.fillRect(0, 0, 40, 40);

        ctx.restore();
    }

    dessineBasCorps(ctx) {
        ctx.save();
        ctx.translate(0, 90);
        ctx.fillStyle = this.beltColor;
        ctx.fillRect(0, 0, 100, 10);

        ctx.translate(0, 10);
        ctx.fillStyle = this.pantColor;
        ctx.fillRect(0, 0, 100, 30);
        this.dessineJambeGauche(ctx);
        this.dessineJambeDroite(ctx);
        ctx.restore();
    }

    dessineJambeGauche(ctx) {
        ctx.save();
        ctx.translate(0, 30);
        ctx.fillStyle = this.pantColor;
        ctx.fillRect(0, 0, 40, 50);

        ctx.translate(0, 40);
        ctx.fillStyle = this.skinColor;
        ctx.fillRect(0, 0, 40, 50);


        ctx.restore();
    }

    dessineJambeDroite(ctx) {

        ctx.save();
        ctx.translate(60, 30);
        ctx.fillStyle = this.pantColor;
        ctx.fillRect(0, 0, 40, 50);

        ctx.translate(0, 40);
        ctx.fillStyle = this.skinColor;
        ctx.fillRect(0, 0, 40, 50);


        ctx.restore();
    }

    dessineBrasGauche(angle, ctx) {
        ctx.save();
        ctx.translate(0, 0);
        ctx.rotate(0.5 + this.angleBrasGauche);
        ctx.fillStyle = this.shirtColor;
        ctx.fillRect(0, 0, 25, 60);
        this.dessineBrasAvantGauche(this.angleAvantBrasGauche, ctx);
        ctx.restore()
    }

    dessineBrasAvantGauche(angle, ctx) {
        ctx.save();
        ctx.translate(10, 50);
        ctx.rotate(angle);
        ctx.translate(-10, 0);
        ctx.fillStyle = this.skinColor;
        ctx.fillRect(0, 0, 22, 60);
        this.dessineMainGauche(ctx);
        ctx.restore()
    }

    dessineMainGauche(ctx) {
        ctx.save();
        ctx.fillStyle = this.skinColor;
        ctx.beginPath();
        ctx.arc(10, 75, 18, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    epauleDroite(ctx) {
        ctx.save();
        ctx.translate(80, 0);
        ctx.fillStyle = this.shirtColor;
        ctx.fillRect(0, 0, 30, 30);
        ctx.restore();
    }

    epauleGauche(ctx) {
        ctx.save();
        ctx.fillStyle = this.shirtColor;
        ctx.translate(-10, 0);
        ctx.fillRect(0, 0, 30, 30);
        ctx.restore();
    }


    dessineBrasDroit(angle, ctx) {
        ctx.save();
        ctx.translate(75 + this.mouvEpaule, 25);
        ctx.rotate(180 + this.angleBrasDroit);
        ctx.fillStyle = this.shirtColor;
        ctx.fillRect(0, 0, 25, 60);
        this.dessineBrasAvantDroit(this.angleAvantBrasDroit, ctx);
        ctx.restore()
    }


    dessineBrasAvantDroit(angle, ctx) {
        ctx.save();
        ctx.translate(10, 50);
        ctx.rotate(angle);
        ctx.translate(-10, 0);
        ctx.fillStyle = this.skinColor;
        ctx.fillRect(0, 0, 22, 60);
        this.dessineMainDroite(ctx);
        ctx.restore()
    }

    dessineMainDroite(ctx) {
        ctx.save();
        ctx.fillStyle = this.skinColor;
        ctx.beginPath();
        ctx.arc(10, 76, 18, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }

    update() {
        if (this.updown === 1) {
            this.translateupdown += 0.5;
            this.angleBrasDroit -= 0.01
            this.angleAvantBrasDroit += 0.01

            this.angleBrasGauche += 0.01
            this.angleAvantBrasGauche -= 0.01

            this.mouvEpaule += 0.15
            if (this.translateupdown === 90) {
                this.updown = 0
            }
        }


        if (this.updown === 0) {
            this.translateupdown -= 0.5;
            this.mouvEpaule -= 0.15
            this.angleAvantBrasDroit -= 0.01
            this.angleBrasDroit += 0.01

            this.angleAvantBrasGauche += 0.01
            this.angleBrasGauche -= 0.01

            if (this.translateupdown === 40) {
                this.updown = 1
                this.nbs_traction++;
            }
        }

    }

    getNbsTraction(){
        return this.nbs_traction;
    }

}

class Materiel {

    constructor(posx, posy, coul, w, h) {
        this.x = posx;
        this.y = posy;
        this.couleur = coul;
        this.width = w;
        this.height = h;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

}

class Barre extends Materiel {
    constructor(posx, posy, coul, w, h) {
        super(posx, posy, coul, w, h);

    }

    draw(ctx) {
        ctx.save();
        ctx.scale(0.5, 0.5);
        ctx.translate(this.x, this.y);
        super.draw(ctx);
        ctx.restore();

    }
}

class Sol extends Materiel {

    constructor(posx, posy, coul, w, h) {
        super(posx, posy, coul, w, h);
    }

    draw(ctx) {
        ctx.save();
        ctx.scale(0.5, 0.5);
        ctx.translate(this.x, this.y);
        super.draw(ctx);
        ctx.restore();

    }
}

class Bras extends Bonhomme {

    constructor(posx, posy, abd, aabd, scale, tm) {
        super(posx, posy, "", abd, aabd, 0, 0, scale);
        this.taille_muscle = tm;
    }

    draw(ctx) {



        //bonne pratique: sauver au debut et restaurer le contect a la fin
        ctx.save();
        //BP : Pour dessiner en x et y on deplace le repere et on dessine comme si on etait en 0,0


        ctx.font = "10pt Calibri,Geneva,Arial";
        ctx.fillStyle = "rgb(0,20,180)";
        ctx.fillText("Zone d'action du muscle", 250, 250);


        ctx.translate(this.x+10, this.y+20)


        ctx.scale(this.scale, this.scale);
        this.dessineBrasDroit(this.angleBrasDroit, ctx);
        if (this.updown === 1) {
            this.taille_muscle = 0;
        } else {
            this.taille_muscle = 5;
        }
        ctx.restore();
    }

    dessineBrasDroit(angle, ctx) {
        ctx.save();
        ctx.translate(75 + this.mouvEpaule, 25);
        ctx.rotate(180 + this.angleBrasDroit);
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 25, 60);
        this.dessineBrasAvantDroit(this.angleAvantBrasDroit, ctx);
        ctx.restore();

        this.dessineMuscle(ctx);

    }


    dessineBrasAvantDroit(angle, ctx) {
        super.dessineBrasAvantDroit(angle, ctx)
    }

    dessineMainDroite(ctx) {
        super.dessineMainDroite(ctx);
    }

    dessineMuscle(ctx, taille_muscle) {
        if(gf.getdisplayMuscle()) {
            ctx.save();
            ctx.translate(75 + this.mouvEpaule, 25);
            ctx.rotate(180 + this.angleBrasDroit);
            ctx.fillStyle = this.shirtColor;
            ctx.fillRect(0, 0, 25 - this.taille_muscle, 60);
            ctx.restore()
        }else{
            ctx.save();
            ctx.translate(75 + this.mouvEpaule, 25);
            ctx.rotate(180 + this.angleBrasDroit);
            ctx.fillStyle = this.shirtColor;
            ctx.fillRect(0, 0, 25, 60);
            ctx.restore()
        }
    }


}

//Utiliser au moins 3 ou 4 elements input de HTML5 (color, range, number par exemple) pour paramétrer votre jeu (vitesse, taille, nombre, couleur etc)

function changeColorPant(c) {
    for(let i=0;i<gf.getTabObj().length;i++){
        gf.getTabObj()[i].pantColor = c
    }
}

function changeColorSkin(c) {
    for(let i=0;i<gf.getTabObj().length;i++){
        gf.getTabObj()[i].skinColor = c
    }
}

function changeColorShirt(c) {
    for(let i=0;i<gf.getTabObj().length;i++){
        gf.getTabObj()[i].shirtColor = c
    }
}

function changeColorBelt(c){
    for(let i=0;i<gf.getTabObj().length;i++){
        gf.getTabObj()[i].beltColor = c
    }
}

function nbsTraction(nbs) {
    gf.setNbsT(nbs);
}

function reset(){
    gf.reset();
}

function check() {
    gf.setdisplayMuscle();
}