function spreadLifeEater(pixel) {
	for(i = 0; i < adjacentCoords.length; i++) { //iterate through neighbor spots
		if(!isEmpty(pixel.x+adjacentCoords[i][0],pixel.y+adjacentCoords[i][1],true)) { //check for adjacentCoords
			var newPixel = pixelMap[pixel.x+adjacentCoords[i][0]][pixel.y+adjacentCoords[i][1]]
			if(
				(["life","auto creepers"].includes(elements[newPixel.element].category) || newPixel.element == "blood") && 
				!["life_eater_virus","life_eater_infection","organic_slurry"].includes(newPixel.element)
			) {
				changePixel(newPixel,"life_eater_infection");
			};
		};
	};
};


elements.life_eater_virus = {
	color: ["#7bb064", "#aabd60", "#9e9e29"],
	behavior: behaviors.GAS,
	tick: function(pixel) {
		spreadLifeEater(pixel);
	},
	category: "life",
	state: "gas",
	density: airDensity,
	excludeRandom: true,
};

elements.life_eater_infection = {
	color: ["#3d6e29", "#666617", "#7d5716"],
	behavior: behaviors.LIQUID,
	tick: function(pixel) {
		spreadLifeEater(pixel);
		
		if(pixelTicks - pixel.start > 6) {
			changePixel(pixel,Math.random() < 0.5 ? "methane" : "organic_slurry");
		};
	},
	category: "life",
	state: "liquid",
	density: 1050,
	burn: 70,
	burnTime: 20,
        fireSpawnTemp: 1000,
        burnTempChange: 100,
	excludeRandom: true,
};

elements.organic_slurry = {
	color: ["#6f8046", "#857539"],
	behavior: behaviors.LIQUID,
	reactions: {
		"dirt": {elem1: null, elem2: "mud"},
		"sand": {elem1: null, elem2: "wet_sand"},
	},
	category: "life",
	state: "liquid",
	density: 1050,
	burn: 80,
	burnTime: 10,
        fireSpawnTemp: 1000,
        burnTempChange: 100,
	excludeRandom: true,
};
