var simIsOn = true,
  agents = [],
  ogAgents = [],
  counter = 0

let numberOfAgents = 2500,
  qt,
  sliderR, sliderV, sliderB;


function sliderStuff(x) {
  sliderR = createSlider(0, 80, 20);
  sliderR.position(x, 30);
  sliderR.style('width', '150px');
  Radd = createElement('button', '+')
  Radd.position(x - 10, 20)
  Radd.changed(() => {sliderR.value =(constrain(sliderR.value + 1, 0, 80))})
  Rsub = createElement('button', '-')
  Rsub.position(x - 10, 40)
  Rsub.changed(() => sliderR.value(constrain(sliderR.value - 1, 0, 80)))

  sliderV = createSlider(0, 20, 3.01, 0.67);
  sliderV.position(x, 70);
  sliderV.style('width', '150px');
  Vadd = createElement('button', '+')
  Vadd.position(x - 10, 60)
  Vadd.changed(() => sliderV.value(constrain(sliderV.value + 1, 0, 20)))
  Vsub = createElement('button', '-')
  Vsub.position(x - 10, 80)
  Vsub.changed(() => sliderV.value(constrain(sliderV.value - 1, 0, 20)))

  sliderB = createSlider(1, 180, 17);
  sliderB.position(x, 110);
  sliderB.style('width', '150px');
  Badd = createElement('button', '+')
  Badd.position(x - 10, 100)
  Badd.changed(() => sliderB.value(constrain(sliderB.value + 1, 1, 180)))
  Bsub = createElement('button', '-')
  Bsub.position(x - 10, 120)
  Bsub.changed(() => sliderV.value(constrain(sliderV.value - 1, 1, 180)))
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  sliderStuff(width * 0.05)
  for (k = 0; k < numberOfAgents; k++) agents.push(new Agent());

  for (i = 0; i < numberOfAgents; i++) {
    let b = new Agent()
    b.x = agents[i].x
    b.y = agents[i].y
    b.o = agents[i].o
    b.v = agents[i].v
    b.r = agents[i].r
    b.a = agents[i].a
    b.b = agents[i].b
    b.neighbors = agents[i].neighbors
    b.radius = agents[i].radius;
    ogAgents.push(b)
  }
  // socket.on('send', pause)
}

function pause() {
  simIsOn = simIsOn == true ? false : true
}

function keyPressed() {
  if (key == ' ') {
    // socket.emit('SpaceBar', true)
    simIsOn = simIsOn == true ? false : true
  }
}

function draw() {
  background(23);
  var v1 = agents[1].v,
    v2 = sliderV.value()
  if (v1 != v2) {
    var velocity = sliderV.value()
    // socket.emit('vel', velocity)
  }

  qt = new Quadtree()
  for (i = 0; i < numberOfAgents; i++) {
    agents[i].r = sliderR.value()
    agents[i].b = radians(sliderB.value())
    agents[i].v = sliderV.value()
    qt.insert(agents[i]);
  }

  for (i = 0; i < numberOfAgents; i++) {
    agents[i].show();
    if (simIsOn == true) agents[i].go();
    else agents[i].showR(0);
  }

  textSize(32)
  fill(255)
  text('Fr: ' + floor(frameRate()), width * 0.84, height * 0.1)

  textSize(20)
  text(counter, width * 0.9, height * 0.9)

  //   slider show values
  textSize(30)
  var x = width * 0.05 + 20 + 180
  text(sliderR.value() + ': Radius (Sight)', x, 40)
  text(sliderV.value() + ': Velocity', x, 70)
  text(sliderB.value() + ': Beta', x, 110)

  if (simIsOn) {
    text('Press Spacebar To Pause Simulation.', width * 0.03, height * 0.93)
    counter++
  } else {
    textSize(30)
    text(agents.length, width * 0.1, height * 0.9)
  }
}