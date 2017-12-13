let player;
let canvas;
let ctx;
let inputStates =  {};

class Game{

    constructor(p){
        this.player = p;
    }

    init(){
        console.log("loadded");
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");
        player = this.player;
        player.scale = 0.65;
        player.setPosition(canvas.width/2+player.long/3,canvas.height+player.larg);
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Checks inputStates
        if (inputStates.left) {
           if(player.x > 0){
               player.moveX(1);
           }


        }
        if (inputStates.right) {
            if(player.x < canvas.width+player.larg/1.5){;
                player.moveX(0);
            }
        }

        if(inputStates.up){
            if(player.y >10){
                player.moveY(0);
            }

        }
        if(inputStates.down){
            if(player.y < canvas.height+player.larg){
                player.moveY(1);
            }

        }




        this.player.draw(ctx);
        requestAnimationFrame(()=> this.Animation());


    }



}
