var size;

function preload() {
  audio = loadSound('assets/PeakyBlindersTheme.mp3');
  font = loadFont('assets/ClarendonCondensedBold.ttf');
  background = loadImage('assets/background.png');
  arthur = loadImage('assets/arthur.png');
  tom = loadImage('assets/tom.png');
  john = loadImage('assets/john.png');
  finn = loadImage('assets/finn.png');
  michael = loadImage('assets/michael.png');
}

function setup() {
  analyzer = new p5.Amplitude(0.8);
  analyzer.setInput(audio);
  createCanvas(windowWidth, windowHeight);
  audio.play();
  fft = new p5.FFT(0.9, 16);
  fft.setInput(audio);
};


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
};


function draw() {

  colorMode(HSB, 100);
  var spectrum = fft.analyze();
  var vol = map(analyzer.getLevel(), 0, 0.5, 0, 100);


  // This block of code reduces the "bins" used by the analyze function from 16 to 5, using an aritmethic average of the values collected
  lowBassValue  = (spectrum[1] + spectrum[2] + spectrum[3]) / 3000;
  midBassValue  = (spectrum[4] + spectrum[5] + spectrum[6]) / 3000;
  midMidValue   = (spectrum[7] + spectrum[8] + spectrum[9]) / 3000;
  midHighValue  = (spectrum[10] + spectrum[11] + spectrum[12]) / 3000;
  highHighValue = (spectrum[12] + spectrum[13] + spectrum[14]) / 3000;

  // The next block of code resizes the images according to the frequency associated to them
  imageMode(CENTER);
  image(background, windowWidth / 2, windowHeight / 2);
  push()
  translate(5 * windowWidth / 6, 4.2 * windowHeight / 6)
  scale((0.8 + highHighValue), (0.8 + highHighValue))
  image(finn, 0, 0, );
  pop()
  push()
  translate(4 * windowWidth / 6, 4.2 * windowHeight / 6)
  scale(1 + midHighValue, 1 + midHighValue)
  image(john, 0, 0, );
  pop()
  push()
  translate(1 * windowWidth / 6, 4.2 * windowHeight / 6)
  scale(1 + lowBassValue, 1 + lowBassValue)
  image(michael, 0, 0);
  pop()
  push()
  translate(2 * windowWidth / 6, 4.2 * windowHeight / 6)
  scale(1 + midBassValue, 1 + midBassValue)
  image(arthur, 0, 0);
  pop()
  push()
  translate(windowWidth / 2, 3.75 * windowHeight / 6)
  scale(1 + midMidValue, 1 + midMidValue)
  image(tom, 0, 0);
  pop()

  //this block of code handles the typography, which is responsive to the height of the screen
  size = height / 10;
  size *= 1 + vol / 800;
  leading = 0.561 * size;
  var alpha;
  alpha = 80 + (0.2 * vol)
  var brightness = 80 + (0.2 * vol)
  fill(0, 0, brightness, alpha);
  textFont(font);
  textAlign(CENTER);
  textSize(size);
  text('PEAKY', windowWidth / 2, 7 * windowHeight / 8);
  textSize(Math.floor(0.677 * size));
  text('BLINDERS', windowWidth / 2, (7 * windowHeight / 8) + leading);
};
