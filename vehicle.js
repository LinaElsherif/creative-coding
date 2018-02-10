function Vehicle(x,y){
	this.pos = createVector(random(width),random(height));
	this.target = createVector(x,y);
	this.vel = p5.Vector.random2D();
	this.acc = createVector();
	this.r = 8;
	this.maxspeed = 10;
	this.maxsforce = 1;
}

//setting the behaviour of the points when approached by mouse 
Vehicle.prototype.behaviors = function(){
	var arrive = this.arrive(this.target);
	var mouse = createVector(mouseX,mouseY);
	var flee = this.flee(mouse);

	arrive.mult(1);
	flee.mult(5);
	
	this.applyForce(arrive);
	this.applyForce(flee);
}

//the paramter 'f' stands for force (arrive or flee)
Vehicle.prototype.applyForce = function(f){
	this.acc.add(f);
}

//updating the state of the points 
Vehicle.prototype.update = function(){
	this.pos.add(this.vel);
	this.vel.add(this.acc);
	this.acc.mult(0);
}

//showing points in the shape of text 
Vehicle.prototype.show = function(){
	stroke(255,0,0);
	strokeWeight(7);
	point(this.pos.x,this.pos.y);
}

//setting points behaviour arriving the main location
Vehicle.prototype.arrive = function(target){
	var desired = p5.Vector.sub(target,this.pos);
	var distance = desired.mag();
	var speed = this.maxspeed;
	if(distance < 100){
		speed = map(distance,0,100,0,this.maxspeed)
	}

	desired.setMag(speed);
	var steer = p5.Vector.sub(desired,this.vel);
	steer.limit(this.maxsforce);
	return steer;
}

//setting points behaviour fleeing from main location to desired target
Vehicle.prototype.flee = function(target){
	var desired = p5.Vector.sub(target,this.pos);
	var distance = desired.mag();
	if (distance < 50){
	desired.setMag(this.maxspeed);
	desired.mult(-1);
	var steer = p5.Vector.sub(desired,this.vel);
	steer.limit(this.maxsforce);
	return steer;
	} else {
		return createVector(0,0);
	}
}
