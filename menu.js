window.onload = init;

// Variable globales
let canvas, ctx;

function init(){

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    AnimeBonHomme();

}

function AnimeBonHomme(){
    // 1 - on efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 - on dessine dans le canvas
    drawTitle(5);

    // 3 - on met à jour les objets à dessiner

    // 4 - On rapelle 60 fois par seconde la fonction
    requestAnimationFrame(AnimeBonHomme);
}


function drawTitle(blursize){
    ctx.save();
    ctx.translate(100,90);
    ctx.font = "20pt Retro Stereo Wide Regular";
    ctx.fillStyle = "white";
    ctx.shadowColor = "purple";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = blursize;
    //ctx.fillText("スペースランナー", 0, 0);
    ctx.fillText("test",0,0);


    ctx.restore();
}

/*

p:nth-child(1) a {
  color: #fff;
  font-family: Monoton;
  -webkit-animation: neon1 1.5s ease-in-out infinite alternate;
  -moz-animation: neon1 1.5s ease-in-out infinite alternate;
  animation: neon1 1.5s ease-in-out infinite alternate;
}


@-webkit-keyframes neon1 {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #FF1177, 0 0 70px #FF1177, 0 0 80px #FF1177, 0 0 100px #FF1177, 0 0 150px #FF1177;
  }
  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #FF1177, 0 0 35px #FF1177, 0 0 40px #FF1177, 0 0 50px #FF1177, 0 0 75px #FF1177;
  }
}


 */



