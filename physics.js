function onStart(){
// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;
Body = Matter.Body

var engine = Engine.create(document.body, {
  render: {
    options: {
      wireframes: true,
      showAngleIndicator: true
    }
  }
});

//add a mouse-controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);
var boxA = Bodies.rectangle(400, 200, 80, 80);
var gravOn=true
//Bodies.rectangle(x origin,y origin, width, height, { isStatic: true })
// add boundaries
var offset = 5;
World.add(engine.world, [
  Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, { isStatic: true }),
  Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, { isStatic: true }),
  Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, { isStatic: true }),
  Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, { isStatic: true })
]);
function gravityOn(){
    if(gravOn){
        engine.world.gravity['y']=0
        gravOn=false
        $("#gravity").html(gravOn)
    }else{
        engine.world.gravity['y'] =1
        gravOn=true
        $("#gravity").html(gravOn)
    }
}

$(document).keydown(function(event){
	console.log("KEYDOWN")
	if(event.which===68){
		console.log("A KEY DOWN")
		Body.applyForce(boxA, { x: 0, y: 0 }, { 
            x: 0.2, 
            y: 0
        });
	}
	if(event.which===87){
		console.log("going up")
		Body.applyForce(boxA, { x: 0, y: 0 }, { 
            x: 0, 
            y:-0.2
        });
	}
	if(event.which===65){
		console.log("going left")
		Body.applyForce(boxA, { x: 0, y: 0 }, { 
            x: -0.2, 
            y:0
        });
	}
	if(event.which===83){
		console.log("going down")
		Body.applyForce(boxA, { x: 0, y: 0 }, { 
            x:0, 
            y:0.2
        });
	}
	if(event.which===69){
		console.log("rotate")
		boxA.angle= boxA.angle+0.07
	}
	if(event.which===81){
		console.log("rotate")
		boxA.angle= boxA.angle-0.07
	}
	if(event.which===32){
		console.log(Common.random(10,780))
		var temp=Bodies.polygon(Common.random(10,780), Common.random(10,780), Common.random(3,11), Common.random(20,50))
		World.add(engine.world,temp)
	}
	if(event.which===71){
		console.log(gravOn)
		console.log(engine.world.gravity['x'])
		console.log(engine.world.gravity['y'])
		if(gravOn){
			engine.world.gravity['y']=0
			gravOn=false
		}else{
			engine.world.gravity['y'] =1 ;
			gravOn=true
		}
	}

})


World.add(engine.world, boxA);

// run the engine
Engine.run(engine);
}