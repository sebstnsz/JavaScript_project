var gf, level;

window.onload = main;

function main() {

	// intervalle, écart posX, types obs, vitesse (vy), taille

	/*level = {
		"1" : {
			"interval": 2000,
			"obstacles": ["easy"]
		},
		"2" : {
			"interval": 2000,
			"obstacles": ["easy", "medium"]
		},
		"3" : {
			"interval": 2000,
			"obstacles": ["medium", "hard"]
		}
	}*/
	level = [
		new Level(2000,["easy"]),
		new Level(2000,["easy","medium"]),
		new Level(2000,["medium","hard"])
	];

	gf = new GameFramework(level["3"]);
	gf.init();
}