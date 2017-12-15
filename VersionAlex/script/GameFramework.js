function GameFramework() {

	let canvas, ctx, width, height, chrono, fusee, obstacles;

	function init() {
		canvas = document.querySelector("#jeu");
		ctx = canvas.getContext('2d');
		width = canvas.width;
		height = canvas.height;
		chrono = new Chrono();
		fusee = new Objet(100,100,2,2,50,50,2,0);
		obstacles = [];

		console.log("début anim");
		requestAnimationFrame(animation);
	}
	
	function animation() {
		ctx.clearRect(0, 0, width, height);
		
		fusee.dessiner(ctx);
		fusee.animer();
		
		var i, obs;
		for(i=0; i<obstacles.length; i++) {
			obs = obstacles[i];
			obs.dessiner(ctx);
			obs.animer();
			if(obs.out(ctx)) obstacles.splice(i,1);
		}

		requestAnimationFrame(animation);
	}

	function creerObstacle() {
		var posX;
		var ecartTemps;
		obstacles.push();
	}

	return { init }
}