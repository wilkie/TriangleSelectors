var genderSelector;
var start = function () {
// storing original coordinates
	this.ox = this.attr("cx");
	this.oy = this.attr("cy");
	this.attr({opacity: 0.5});
},
move = function (dx, dy) {
	// move will be called with dx and dy
	var newy = this.oy + dy;
	var newx = this.ox + dx;

	// width of line = width * (y / height)
	var widthOfLine = Math.abs(100 * (newy / 80));

	if (newx < (100 - widthOfLine/2) + 10) {
		newx = Math.round((100 - widthOfLine/2) + 10);
	}

	if(newx > ((100 - widthOfLine) / 2) + widthOfLine) {
		newx = Math.round(((100 - widthOfLine) / 2) + widthOfLine);
	}

	if(newy > 130){
		newy = 130;
	}

	if(newy < 50){
		newy = 50;
	}

	// check the min boundry
	if(newx > 130){
		newx = 130;
	}

	if(newx < 30){
		newx = 30;
	}

	// check the max boundry
	if(newy == 50){
		newx = 80;
	}

	this.attr({cx: newx, cy: newy});

	// Distance to the 3 points
	var mDistance = 100 - Math.round(Math.sqrt(((30 - newx)*(30 - newx))+((130 - newy)*(130 - newy))));
	var fDistance = 100 - Math.round(Math.sqrt(((130 - newx)*(130 - newx))+((130 - newy)*(130 - newy))));
	var nDistance = Math.round(((130 - newy)/80)*100);
	


	if(this == genderSelector){
		// gender value given in (male, female, none)
		document.getElementById("genderVal").value = "(" + mDistance + "," + fDistance + "," + nDistance + ")";
		document.getElementById("genderXPos").value = newx;
		document.getElementById("genderYPos").value = newy;
	} else {
		// sexuality value given in (men, women, indifferent)
		document.getElementById("sexualityVal").value = "(" + mDistance + "," + fDistance + "," + nDistance + ")";
		document.getElementById("sexualityXPos").value = newx;
		document.getElementById("sexualityYPos").value = newy;				
	}
},
up = function () {
	// restoring state
	this.attr({opacity: 1.0});
},

over = function() {
	document.body.style.cursor = "move";
},
out = function() {
	document.body.style.cursor = "default";
};
window.onload = function() {
	var genderPaper = Raphael("genderTriField", 200, 200);
	var genderTri = genderPaper.path("M 80 50 L 130 130 L 30 130 z").attr({stroke: "#333", "stroke-width": 3, fill: "#efefef"});
	var genderLabel1 = genderPaper.text(80,40, "none");
	var genderLabel2 = genderPaper.text(30,140, "male");
	var genderLabel3 = genderPaper.text(130,140, "female");
	var genderTitle = genderPaper.text(80,20, "Gender Identity");

	var sexualityPaper = Raphael("sexualityTriField", 200, 200);
	var sexualityTri = sexualityPaper.path("M 80 50 L 130 130 L 30 130 z").attr({stroke: "#333", "stroke-width": 3, fill: "#efefef"});
	var sexualityLabel1 = sexualityPaper.text(80,40, "indifferent");
	var sexualityLabel2 = sexualityPaper.text(30,140, "men");
	var sexualityLabel3 = sexualityPaper.text(130,140, "women");
	var sexualityTitle = sexualityPaper.text(80,20, "Attracted to");

	
	var genderXPos, genderYPos, sexualityXPos, sexualityYPos;

	if(document.getElementById("genderXPos").value == "" || document.getElementById("genderYPos").value == "") {
		genderXPos = 80;
		genderYPos = 100;
	} else {
		genderXPos = parseInt(document.getElementById("genderXPos").value);
		genderYPos = parseInt(document.getElementById("genderYPos").value);				
	}

	if(document.getElementById("sexualityXPos").value == "" || document.getElementById("sexualityYPos").value == "") {
		sexualityXPos = 80;
		sexualityYPos = 100;
	} else {
		sexualityXPos = parseInt(document.getElementById("sexualityXPos").value);
		sexualityYPos = parseInt(document.getElementById("sexualityYPos").value);				
	}
	
	// clear fill opacity to allow for selection of entire circle
	genderSelector = genderPaper.circle(genderXPos,genderYPos,5).attr({stroke: "#999", "stroke-width": 2, fill: "#fff", "fill-opacity": 0.0});
	var sexualitySelector = sexualityPaper.circle(sexualityXPos,sexualityYPos,5).attr({stroke: "#999", "stroke-width": 2, fill: "#fff", "fill-opacity": 0.0}); 

	// add drag events to gender and sexuality selectors 
	genderSelector.drag(move, start, up);
	sexualitySelector.drag(move, start, up);

	genderSelector.mouseover(over);
	genderSelector.mouseout(out);
	sexualitySelector.mouseover(over);
	sexualitySelector.mouseout(out);
}