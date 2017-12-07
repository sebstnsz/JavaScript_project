window.onload = init;

// Variable globales
let canvas, ctx;
let avatar1, avatar2, selected_avatar;
let avatar_array = [];
let blur = 5;
let index_selected_avatar = 0;
let onMax = false;
let avs1,avs2;
let fontsize = 30;


function init(){

    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    avatar1 = new Avatar(0,0,4,8,80,150);
    avatar2 = new Avatar(0,0,7,3,50,50);



        avs1 = new AvatarSelector(30,110,20,20,1,"white");
        avs2 = new AvatarSelector(canvas.width/2 - 40,110,20,20,1,"white");


    canvas.addEventListener('click', function(e){
        let rect = canvas.getBoundingClientRect();
        let xmouse = e.clientX - rect.left;
        let ymouse = e.clientY - rect.top;
        if( xmouse > avs1.getX()*2 && xmouse < (avs1.getX()*2+20) && ymouse > avs1.getY()*2 && ymouse < (avs1.getY()*2+20)){
           if(index_selected_avatar>0){
               index_selected_avatar--;
           }
        }

        if( xmouse > avs2.getX()*2 && xmouse < (avs2.getX()*2+20) && ymouse > avs2.getY()*2 && ymouse < (avs2.getY()*2+20)){
            if(index_selected_avatar<avatar_array.length-1){
               index_selected_avatar++;
           }
        }
    });


    canvas.addEventListener('mousemove', function(e){
        let rect = canvas.getBoundingClientRect();
        let xmouse = e.clientX - rect.left;
        let ymouse = e.clientY - rect.top;


        if( xmouse > avs1.getX()*2 && xmouse < (avs1.getX()*2+20) && ymouse > avs1.getY()*2 && ymouse < (avs1.getY()*2+20)){
            console.log("over");
            if(fontsize < 35) {
                fontsize += 1;
            }
        }

    });


    avatar_array.push(avatar1);
    avatar_array.push(avatar2);

    Animation();

}

function Animation(){
    // 1 - on efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 - on dessine dans le canvas
/////BLUR FLICKER//////
    if(blur <= 25 && onMax === false ) {
        blur = blur + 0.8;
        if(blur > 25){
            onMax = true;
        }
    }
    if(blur >= 10 && onMax === true ) {
        blur = blur  - 0.25;
        if(blur < 10){
            onMax = false;
        }
    }
 /////////  ////////
    if(index_selected_avatar === 0){
        avs1.setColor("rgb(51, 51, 51)");
    }else{
        avs1.setColor("white");
    }

    if(index_selected_avatar === avatar_array.length-1){
        avs2.setColor("rgb(51, 51, 51)");
    }else{
        avs2.setColor("white");
    }

    selected_avatar = avatar_array[index_selected_avatar];
    drawTitle(blur);
    drawPlay(0,430,blur);
    avs1.draw(ctx);
    avs2.draw(ctx);
    selected_avatar.drawStat(ctx);
    selected_avatar.draw(ctx);

    // 3 - on met à jour les objets à dessiner

    // 4 - On rapelle 60 fois par seconde la fonction
    requestAnimationFrame(Animation);
}

function playButtonOver(scale){
ctx.save();
ctx.scale(scale,scale);
ctx.restore();
}


function drawTitle(blursize){
    let txt = "SPACERUNNER";

    let my_gradient=ctx.createLinearGradient(0,0,400,0);
    my_gradient.addColorStop(0.10,"blue");
    my_gradient.addColorStop(0.5,"rgb(155, 0, 62)");
    my_gradient.addColorStop(0.90,"blue");
    ctx.save();

    //ctx.font = "40px Retro Stereo Wide";
    ctx.font = "35px Monoton";
    ctx.strokeStyle = "red";
    ctx.translate(0,-180);
    ctx.strokeText(txt,canvas.width/2 - ctx.measureText(txt).width/2,canvas.height/2 - 5);

    ctx.shadowColor = "red";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = blursize;
    ctx.fillStyle = my_gradient;
    ctx.fillText(txt,canvas.width/2 - ctx.measureText(txt).width/2,canvas.height/2 - 5);

    ctx.translate(0,25);
    let txt2= "スペースランナー";
    ctx.font = "25px Arial";
    ctx.fillStyle = my_gradient;
    ctx.fillText(txt2,canvas.width/2 - ctx.measureText(txt).width/2,canvas.height/2 - 5);

    ctx.restore();

}


function drawPlay(x,y,blur){
    let txt = "PLAY GAME";

    let my_gradient=ctx.createLinearGradient(0,0,400,0);
    my_gradient.addColorStop(0.10,"blue");
    my_gradient.addColorStop(0.5,"rgb(155, 0, 62)");
    my_gradient.addColorStop(0.90,"blue");
    ctx.save();

    //ctx.font = "40px Retro Stereo Wide";
    ctx.font = fontsize + "px True Lies";
    ctx.strokeStyle = "red";
    ctx.translate(x,y);
    ctx.strokeText(txt,canvas.width/2 - ctx.measureText(txt).width/2,0);

    ctx.shadowColor = "red";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = blur;
    ctx.fillStyle = my_gradient;
    ctx.fillText(txt,canvas.width/2 - ctx.measureText(txt).width/2,0);

    ctx.restore();
}


