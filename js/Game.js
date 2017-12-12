let player;
let canvas;
let ctx;
class Game{

    constructor(p){
        this.player = p;
    }

    init(){
        console.log("loadded");
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");
        player = this.player;
        /*
          37 : left
          38 : up
          39 : right
          40 : down
          32 : space


          0 = up
          1 = down

          0 = left
          1 = right

           */
        window.addEventListener('keydown', function(event) {
            if (event.keyCode === 37) {

                    player.moveX();


            }else if(event.keyCode === 38){
                    player.moveY(0);
                    console.log(player.y);


            }else if(event.keyCode === 39){

                if(player.x > canvas.width){
                    player.moveX();
                }

            }else if(event.keyCode === 40){
                    player.moveY(1);
                    console.log(player.y);

            } else if (event.keyCode === 32) {

            }
        }, false);


        this.Animation();

    }
    Animation(){

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
        requestAnimationFrame(()=> this.Animation());


    }

    draw(){
        ctx.save();
        ctx.translate(10,10);
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,100,100);
        ctx.restore();
    }


}
