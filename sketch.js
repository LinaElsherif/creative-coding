var font;
var vehicles = [];

function preload() {
	font = loadFont('Strawberry Muffins Demo.ttf');
}

function setup() {
	createCanvas(800,300);
	background(255, 209, 0);
	var points = font.textToPoints('robusta',100,200,200);
	

	for (var i = 0; i < points.length; i++){
		var dots = points[i];
		var vehicle = new Vehicle(dots.x,dots.y);
		vehicles.push(vehicle);
	}
}

function draw() {
	background(255, 209, 0);
	for(var i = 0; i < vehicles.length; i++){
		var v = vehicles[i];
		v.behaviors();
		v.update();
		v.show();
	}
}
