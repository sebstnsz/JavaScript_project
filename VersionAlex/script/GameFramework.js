function GameFramework(levelData) {

	let canvas, ctx, width, height, chrono, fusee, obstacles;

	function init() {
		canvas = document.querySelector("#jeu");
		ctx = canvas.getContext('2d');
		width = canvas.width;
		height = canvas.height;
		chrono = new Chrono();
		fusee = new Objet(225,500,0,0,50,50,100,document.querySelector("#spaceship"));
		obstacles = [];

		creerObstacle();
	//	setInterval(function(){creerObstacle();}, levelData["interval"]);

		requestAnimationFrame(animation);
	}
	
	function animation() {
		ctx.clearRect(0, 0, width, height);
		
		fusee.dessiner(ctx);
		//fusee.animer();
		
		var i, obs;
		for(i=0; i<obstacles.length; i++) {
			obstacle = obstacles[i];
			obstacle.dessiner(ctx);
			obstacle.animer();
			if(obstacle.out(ctx))
				obstacles.splice(i,1);
			else if(collision(fusee, obstacle))
				console.log("collision");
		}

		requestAnimationFrame(animation);
	}

	function creerObstacle() {
		var posX = Math.floor(Math.random()*width);

		var nbObs = levelData["obstacles"].length;
		var randObs = Math.floor(Math.random()*nbObs);
		var newObs;

		switch(levelData["obstacles"][randObs]) {
			case "easy":
				newObs = new ObstacleEasy(posX);
				break;
			case "medium":
				newObs = new ObstacleMedium(posX);
				break;
			case "hard":
				newObs = new ObstacleHard(posX);
				break;
		}
		
		obstacles.push(newObs);
	}

	function collision(obj1,obj2) {
		var x1 = obj1.x;
		var y1 = obj1.y;
		var l1 = obj1.largeur;
		var h1 = obj1.hauteur;

		var x2 = obj2.x;
		var y2 = obj2.y;
		var l2 = obj2.largeur;
		var h2 = obj2.hauteur;

		if ((x1 + l1 <= x2) || (x2 + l2 <= x1) || (y1 + h1 <= y2) || (y2 + h2 <= y1))
			return false;
		return true;
	}

	return { init }
}