window.onload = init;

var menu;

function init(){
    menu = new Menu();

    menu.init();
}

function Menu() {
    let canvas, ctx;

    //Personnages
    let avatar1, avatar2, selected_avatar;
    let avatar_array = [];
    let index_selected_avatar = 0;

    //blur bouton
    let onMax = false;
    let blur = 5;

    //Bouton IHM
    let avs1, avs2;
    let button1;

    let GameEngine;


    function init() {
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");

        avatar1 = new Objet(document.getElementById("space1"), 0, 0, 4, 8, 125, 125);
        avatar2 = new Objet(document.getElementById("space2"), 0, 0, 7, 3, 125, 125);
        avs1 = new AvatarSelector(40, 110, 20, 20, 1, "white", document.getElementById("back"));
        avs2 = new AvatarSelector(canvas.width / 2 - 50, 110, 20, 20, 1, "white", document.getElementById("next"));

        let my_gradient = ctx.createLinearGradient(0, 0, 400, 0);
        my_gradient.addColorStop(0.10, "blue");
        my_gradient.addColorStop(0.5, "rgb(155, 0, 62)");
        my_gradient.addColorStop(0.90, "blue");

        let my_gradient2 = ctx.createLinearGradient(0, 0, 400, 0);
        my_gradient2.addColorStop(0.3, "rgb(27, 1, 145)");
        my_gradient2.addColorStop(0.5, "rgb(216, 21, 21)");
        my_gradient2.addColorStop(0.75, "rgb(27, 1, 145)");

        button1 = new PlayButton(0, 430, 1, my_gradient, "PLAY GAME", 25, 5);


        canvas.addEventListener('click', function (e) {
            let rect = canvas.getBoundingClientRect();
            let xmouse = e.clientX - rect.left;
            let ymouse = e.clientY - rect.top;
            if (xmouse > avs1.getX() * 2 && xmouse < (avs1.getX() * 2 + 20) && ymouse > avs1.getY() * 2 && ymouse < (avs1.getY() * 2 + 20)) {
                if (index_selected_avatar > 0) {
                    index_selected_avatar--;
                }
            }

            if (xmouse > avs2.getX() * 2 && xmouse < (avs2.getX() * 2 + 20) && ymouse > avs2.getY() * 2 && ymouse < (avs2.getY() * 2 + 20)) {
                if (index_selected_avatar < avatar_array.length - 1) {
                    index_selected_avatar++;
                }
            }
        });

        canvas.addEventListener('mousemove', function (e) {
            let rect = canvas.getBoundingClientRect();
            let xmouse = e.clientX - rect.left;
            let ymouse = e.clientY - rect.top;

            if (xmouse > avs1.getX() * 2 && xmouse < (avs1.getX() * 2 + 20) && ymouse > avs1.getY() * 2 && ymouse < (avs1.getY() * 2 + 20)) {
                avs1.setSize(25);
            } else {
                avs1.setSize(20);
            }

            if (xmouse > avs2.getX() * 2 && xmouse < (avs2.getX() * 2 + 20) && ymouse > avs2.getY() * 2 && ymouse < (avs2.getY() * 2 + 20)) {
                avs2.setSize(25);
            } else {
                avs2.setSize(20);
            }
        });


        canvas.addEventListener('mousemove', function (e) {
            let rect = canvas.getBoundingClientRect();
            let xmouse = e.clientX - rect.left;
            let ymouse = e.clientY - rect.top;
            let wText = button1.getPosX() + button1.getWidth();

            if (xmouse > button1.getPosX() && xmouse < wText && ymouse > button1.getY() - button1.getHeight() && ymouse < button1.getY() + button1.getHeight() / 2) {
                if (button1.fontsize < 26) {
                    button1.fontsize += 2;
                    button1.blur += 5;
                    button1.color = my_gradient2;
                }
            } else {
                if (button1.fontsize > 25) {
                    button1.fontsize -= 2;
                    button1.blur -= 5;
                    button1.color = my_gradient;
                }
            }
        });

        canvas.addEventListener('click', function (e) {
            let rect = canvas.getBoundingClientRect();
            let xmouse = e.clientX - rect.left;
            let ymouse = e.clientY - rect.top;
            let wText = button1.getPosX() + button1.getWidth();

            if (xmouse > button1.getPosX() && xmouse < wText && ymouse > button1.getY() - button1.getHeight() && ymouse < button1.getY() + button1.getHeight() / 2) {
               console.log("play game !!!");
               ctx = null;

                GameEngine = new GameEngine();
                GameEngine.init();

            }
        });



        avatar_array.push(avatar1);
        avatar_array.push(avatar2);

        Animation();

    }

    function Animation() {
        // 1 - on efface le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2 - on dessine dans le canvas
        /////BLUR FLICKER//////
        if (blur <= 25 && onMax === false) {
            blur = blur + 0.8;
            if (blur > 25) {
                onMax = true;
            }
        }
        if (blur >= 10 && onMax === true) {
            blur = blur - 0.25;
            if (blur < 10) {
                onMax = false;
            }
        }
        /////////  ////////
        if (index_selected_avatar === 0) {
            avs1.setColor("rgb(51, 51, 51)");
        } else {
            avs1.setColor("white");
        }

        if (index_selected_avatar === avatar_array.length - 1) {
            avs2.setColor("rgb(51, 51, 51)");
        } else {
            avs2.setColor("white");
        }

        selected_avatar = avatar_array[index_selected_avatar];
        drawTitle(blur);
        button1.setBlur(blur);
        button1.draw(ctx);
        avs1.draw(ctx);
        avs2.draw(ctx);
        selected_avatar.drawStat(ctx);
        selected_avatar.draw(ctx);

        // 3 - on met à jour les objets à dessiner

        // 4 - On rapelle 60 fois par seconde la fonction
        requestAnimationFrame(Animation);
    }


    function drawTitle(blursize) {
        let txt = "SPACERUNNER";

        let my_gradient = ctx.createLinearGradient(0, 0, 400, 0);
        my_gradient.addColorStop(0.10, "blue");
        my_gradient.addColorStop(0.5, "rgb(155, 0, 62)");
        my_gradient.addColorStop(0.90, "blue");
        ctx.save();

        //ctx.font = "40px Retro Stereo Wide";
        ctx.font = "35px Monoton";
        ctx.strokeStyle = "red";
        ctx.translate(0, -180);
        ctx.strokeText(txt, canvas.width / 2 - ctx.measureText(txt).width / 2, canvas.height / 2 - 5);

        ctx.shadowColor = "red";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blursize;
        ctx.fillStyle = my_gradient;
        ctx.fillText(txt, canvas.width / 2 - ctx.measureText(txt).width / 2, canvas.height / 2 - 5);

        ctx.translate(0, 25);
        let txt2 = "スペースランナー";
        ctx.font = "25px Arial";
        ctx.fillStyle = my_gradient;
        ctx.fillText(txt2, canvas.width / 2 - ctx.measureText(txt).width / 2, canvas.height / 2 - 5);

        ctx.restore();

    }

    return {
        init: init

    }

}



