var gf, level;

window.onload = main;

function main() {

	// intervalle, écart posX, types obs, vitesse (vy), taille

	level = {
		"1" : {
			"interval": 2000,
			"obstacles": [s
		},
		"2" : {
			"interval": 2000,
			"obstacles": ["easy", "medium"]
		},
		"3" : {
			"interval": 2000,
			"obstacles": ["medium", "hard"]
		}
	}

	gf = new GameFramework(level["3"]);
	gf.init();
}