var length;
var baseLength;
var data;
var angle;
let writer;
var index;

function setup() {
  createCanvas(windowWidth, windowHeight);
  baseLength = 300;
  length = random(baseLength-50,baseLength+50);
  data = [];
  data[0] = "angle;";
  for(let i=0;i<=90;i+=5)data[0] += i.toString(10)+";";
  data[1] = "patient 1;";
  index = 1;
  angle = 0;
  writer = createWriter("Data.csv");
  writer.print(data[0]);
}

function draw() {
  translate(width / 2, height / 2);
  background(220);
  fill(0);
  rectMode(CENTER);
  rect(0, -150, baseLength, 40);

  text("FLÈCHE HAUT pour diminuer la taille de la barre",-width/2,-height/2+15);
  text("FLÈCHE BAS pour augmenter la taille de la barre",-width/2,-height/2+30);
  text("ENTRER pour passer à l'angle suivant",-width/2,-height/2+45);
  text("ÉCHAP pour télécharger lefichier de données",-width/2,-height/2+60);
  
  push();
  angleMode(DEGREES);
  translate(0, -150);
  rotate(angle);
  beginShape();
  vertex(0, 20);
  vertex(0, -20);
  vertex(length, -20);
  vertex(length, 20);
  endShape(CLOSE);
  pop();

  if (keyIsDown(UP_ARROW)) length -= 1;
  if (keyIsDown(DOWN_ARROW)) length += 1;
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (angle < 90) {
      data[index] += (300 - length).toString(10) + ";";
      angle += 5;
    } else {
      data[index] += (300 - length).toString(10) + ";";
      writer.print(data[index]);
      data[++index] = "patient " + index.toString(10) + ";";
      angle = 0;
      length = random(baseLength-50,baseLength+50);
    }
  }
  if(keyCode == ESCAPE){
    writer.close();
  }
}
