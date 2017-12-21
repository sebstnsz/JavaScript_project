class MenuES6{

    constructor(){
        this.canvas = null;
        this.ctx = null;
        this.p1 = null;
        this.p2 = null;
        this.index_selected_player = 0;
        this.player_array = [];
        this.onMax = false;
        this.blur = 5;
        this.avs1 = null;
        this.avs2 = null;
        this.button1 = null;

    }

    start(){
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");

        this.p1 = new Player(document.getElementById("space1"), 0, 0, 1, 8, 70, 70);
        this.p2 = new Player(document.getElementById("space2"), 0, 0, 7, 3, 70, 70);
        this.avs1 = new AvatarSelector(40, 110, 20, 20, 1, "white", document.getElementById("back"));
        this.avs2 = new AvatarSelector(canvas.width / 2 - 50, 110, 20, 20, 1, "white", document.getElementById("next"));

        let my_gradient = ctx.createLinearGradient(0, 0, 400, 0);
        my_gradient.addColorStop(0.10, "blue");
        my_gradient.addColorStop(0.5, "rgb(155, 0, 62)");
        my_gradient.addColorStop(0.90, "blue");

        let my_gradient2 = ctx.createLinearGradient(0, 0, 400, 0);
        my_gradient2.addColorStop(0.3, "rgb(27, 1, 145)");
        my_gradient2.addColorStop(0.5, "rgb(216, 21, 21)");
        my_gradient2.addColorStop(0.75, "rgb(27, 1, 145)");

        this.button1 = new PlayButton(0, 430, 1, my_gradient, "PLAY GAME", 25, 5);
        levels = [
            new Level(5000, ["easy"], 0),
            new Level(5000, ["easy", "medium"], 0),
            new Level(2000, ["easy", "medium"], 0),
            new Level(2000, ["hard", "medium"], 0),
            new Level(1000, ["hard", "medium"], 0)
        ];
       this.button1 = new PlayButton(0, 430, 1, my_gradient, "PLAY GAME", 40, 5);


        canvas.addEventListener('click', ()=> function (e) {
            let rect = canvas.getBoundingClientRect();
            let xmouse = e.clientX - rect.left;
            let ymouse = e.clientY - rect.top;
            if (xmouse > this.avs1.getX() * 2 && xmouse < (this.avs1.getX() * 2 + 20) && ymouse > this.avs1.getY() * 2 && ymouse < (this.avs1.getY() * 2 + 20)) {
                if (this.index_selected_player > 0) {
                    this.index_selected_player--;
                }
            }

            if (xmouse > this.avs2.getX() * 2 && xmouse < (this.avs2.getX() * 2 + 20) && ymouse > this.avs2.getY() * 2 && ymouse < (this.avs2.getY() * 2 + 20)) {
                if (this.index_selected_player < this.player_array.length - 1) {
                    this.index_selected_player++;
                }
            }
        });

        canvas.addEventListener('mousemove', ()=> function (e) {
            let rect = canvas.getBoundingClientRect();
            let xmouse = e.clientX - rect.left;
            let ymouse = e.clientY - rect.top;

            if (xmouse > this.avs1.getX() * 2 && xmouse < (this.avs1.getX() * 2 + 20) && ymouse > this.avs1.getY() * 2 && ymouse < (this.avs1.getY() * 2 + 20)) {
                this.avs1.setSize(25);
            } else {
                this.avs1.setSize(20);
            }

            if (xmouse > this.avs2.getX() * 2 && xmouse < (this.avs2.getX() * 2 + 20) && ymouse > this.avs2.getY() * 2 && ymouse < (this.avs2.getY() * 2 + 20)) {
                this.avs2.setSize(25);
            } else {
                this.avs2.setSize(20);
            }
        });

        canvas.addEventListener('mousemove', ()=> function (e) {
            let rect = canvas.getBoundingClientRect();
            let xmouse = e.clientX - rect.left;
            let ymouse = e.clientY - rect.top;
            let wText = this.button1.getPosX() + this.button1.getWidth();

            if (xmouse > this.button1.getPosX() && xmouse < wText && ymouse > this.button1.getY() - this.button1.getHeight() && ymouse < this.button1.getY() + this.button1.getHeight() / 2) {
                if (this.button1.fontsize < 41) {
                    this.button1.fontsize += 2;
                    this.button1.blur += 5;
                    this.button1.color = my_gradient2;
                }
            } else {
                if (this.button1.fontsize > 40) {
                    this.button1.fontsize -= 2;
                    this.button1.blur -= 5;
                    this.button1.color = my_gradient;
                }
            }
        });

        canvas.addEventListener('click',()=> function (e) {
            let rect = canvas.getBoundingClientRect();
            let xmouse = e.clientX - rect.left;
            let ymouse = e.clientY - rect.top;
            let wText = this.button1.getPosX() + this.button1.getWidth();

            if (xmouse > this.button1.getPosX() && xmouse < wText && ymouse > this.button1.getY() - button1.getHeight() && ymouse < button1.getY() + button1.getHeight() / 2) {
                console.log("play game !!!");
                this.ctx = null;
                menu = null;
                game = new Game(levels[4],this.player_array[this.index_selected_player]);
                game.init();


            }
        });

        this.player_array.push(this.p1);
        this.player_array.push(this.p2);

       this.Animation();
    }

     Animation() {
        // 1 - on efface le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 2 - on dessine dans le canvas
        /////BLUR FLICKER//////
        if (this.blur <= 25 && this.onMax === false) {
            this.blur = this.blur + 0.8;
            if (blur > 25) {
                this.onMax = true;
            }
        }
        if (this.blur >= 10 && this.onMax === true) {
            this.blur = this.blur - 0.25;
            if (blur < 10) {
                this.onMax = false;
            }
        }
        /////////  ////////
        if (this.index_selected_player === 0) {
            this.avs1.setColor("rgb(51, 51, 51)");
        } else {
            this.avs1.setColor("white");
        }

        if (this.index_selected_player === this.player_array.length - 1) {
            this.avs2.setColor("rgb(51, 51, 51)");
        } else {
            this.avs2.setColor("white");
        }

         this.selected_player = this.player_array[this.index_selected_player];
         this.drawTitle(this.blur);
         this.button1.setBlur(this.blur);
         this.button1.draw(this.ctx);
         this.avs1.draw(this.ctx);
         this.avs2.draw(this.ctx);
         this.selected_player.drawStatInMenu(this.ctx);
         this.selected_player.drawInMenu(this.ctx);

        // 3 - on met à jour les objets à dessiner

        // 4 - On rapelle 60 fois par seconde la fonction
        requestAnimationFrame(()=>this.Animation());
    }


     drawTitle(blursize) {
        let txt = "SPACERUNNER";

        let my_gradient = this.ctx.createLinearGradient(0, 0, 400, 0);
        my_gradient.addColorStop(0.10, "blue");
        my_gradient.addColorStop(0.5, "rgb(155, 0, 62)");
        my_gradient.addColorStop(0.90, "blue");
         this.ctx.save();

        //ctx.font = "40px Retro Stereo Wide";
         this.ctx.font = "35px Monoton";
         this.ctx.strokeStyle = "red";
         this.ctx.translate(0, -180);
         this.ctx.strokeText(txt, canvas.width / 2 - this.ctx.measureText(txt).width / 2, canvas.height / 2 - 5);

         this.ctx.shadowColor = "red";
         this.ctx.shadowOffsetX = 0;
         this.ctx.shadowOffsetY = 0;
         this.ctx.shadowBlur = blursize;
         this.ctx.fillStyle = my_gradient;
         this.ctx.fillText(txt, canvas.width / 2 - this.ctx.measureText(txt).width / 2, canvas.height / 2 - 5);

         this.ctx.translate(0, 25);
        let txt2 = "スペースランナー";
         this.ctx.font = "25px Arial";
         this.ctx.fillStyle = my_gradient;
         this.ctx.fillText(txt2, canvas.width / 2 - this.ctx.measureText(txt).width / 2, canvas.height / 2 - 5);

         this.ctx.restore();

    }

}