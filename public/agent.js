class Agent {

  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    //     orientation
    this.o = random(0, TWO_PI);
    //     velocity
    this.v = 0.67 * 3;
    // how far agent can see
    this.r = 5 * 8;
    //     turning characteristic
    this.a = PI * 1;
    //     neighborly influence on a
    this.b = radians(17 * 1);

    this.neighbors = []
    //     size of agent
    this.radius = 5;
  }

  newSearch() {
    this.neighbors = qt.ask(this, this.neighbors)
  }

  go() {
    this.neighbors = [];
    let leftNeighbors = []
    let rightNeighbors = []

    //  see whos near put them in neighbors array
    this.newSearch();

    // split neighbors into right and left     
    for (let neighbors of this.neighbors) {
      var no = atan2(neighbors.y - this.y, neighbors.x - this.x)
      if (no < 0) no += TWO_PI
      if (no > PI + this.o || no < this.o) leftNeighbors.push(neighbors)
      else if (no < PI + this.o || no > this.o) rightNeighbors.push(neighbors)
    }
    // which way to turn
    const B = leftNeighbors.length >= rightNeighbors.length ? -(this.b * this.neighbors.length) : this.b * this.neighbors.length;
    //   update
    this.o = (this.o + this.a + B + TWO_PI) % TWO_PI;
    this.x = (this.v * cos(this.o) + this.x + width) % width;
    this.y = (this.v * sin(this.o) + this.y + height) % height;
  }

  show() {
    noStroke()
    var nt = this.neighbors.length

    var a = 255
    // make switch maybe
    if (nt >= 35) fill(255, 255, 0, a)
    else
    if (nt >= 30) fill(255, 0, 255, a)
    else
    if (nt >= 20) fill(0, 0, 255, a)
    else
    if (nt >= 0) fill(0, 255, 0, a)

    ellipse(this.x, this.y, this.radius * 2);
    // --RULES--
    //     yellow when => 35 neighbors
    //     blue when => 15 and < 20
    //     green when < 15 neighbors
    //     magents when => 20 and < 35
  }
  /**
   * @param  {} n
   */
  showR(n) {
    if (n != 0 || (
        mouseX > this.x - this.radius &&
        mouseX < this.x + this.radius &&
        mouseY > this.y - this.radius &&
        mouseY < this.y + this.radius)) {
      stroke(255)
      noFill()
      ellipse(this.x, this.y, this.r * 2)
      textSize(16)
      fill(255)
      text(this.neighbors.length, this.x + 20, this.y - 25)
      textSize(12)
      text(i, this.x - 5, this.y + 30)
    }
  }
  
  
////oldsearch
  oldSearch() {
  
    
    
    for (let j = 0; j < agents.length; j++) {
      if (i > j) {
        for (let p = 0; p < agents[j].neighbors.length; p++) {
          if (this == agents[j].neighbors[p]) this.neighbors.push(agents[j])
        }
      } else if (agents[j] != this) {

        var x1 = this.x
        var x2 = agents[j].x
        var y1 = this.y
        var y2 = agents[j].y

        var dx = abs(x2 - x1)
        var dy = abs(y2 - y1)

        //         wrap for distance
        if (dx > width / 2) dx = (width / 2) - (dx - width / 2)
        if (dy > height / 2) dy = (height / 2) - (dy - height / 2)
        var d = sqrt(pow(dx, 2) + pow(dy, 2))
        if (d < this.r) this.neighbors.push(agents[j])
      }
    }
  }
}