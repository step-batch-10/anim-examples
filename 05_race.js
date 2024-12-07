function createScreen(width, height) {
  const screen = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(' ');
    }
    screen.push(row);
  }
  return screen;
}

function putPixel(screen, char, x, y) {
  if (x < 0 || x >= screen[0].length || y < 0 || y >= screen.length) {
    return;
  }

  screen[Math.floor(y)][Math.floor(x)] = char;
}

function drawHorizontalLine(screen, char, x1, x2, y) {
  for (let i = x1; i <= x2; i++) {
    putPixel(screen, char, i, y);
  }
}

function drawVerticalLine(screen, char, x, y1, y2) {
  for (let i = y1; i <= y2; i++) {
    putPixel(screen, char, x, i);
  }
}

function drawRectangle(screen, char, x1, y1, x2, y2) {
  drawHorizontalLine(screen, char, x1, x2, y1);
  drawHorizontalLine(screen, char, x1, x2, y2);
  drawVerticalLine(screen, char, x1, y1, y2);
  drawVerticalLine(screen, char, x2, y1, y2);
}

function putString(screen, str, x, y) {
  for (let i = 0; i < str.length; i++) {
    putPixel(screen, str[i], x + i, y);
  }
}

function putVerticalString(screen, str, x, y) {
  for (let i = 0; i < str.length; i++) {
    putPixel(screen, str[i], x, y + i);
  }
}

function screenToString(screen) {
  let frame = '';
  for (let i = 0; i < screen.length; i++) {
    frame += screen[i].join('');
  }

  return frame;
}

function displayScreen(screen) {
  for (const line of screen) {
    console.log(line.join(''));
  }
}

function clearScreen(screen) {
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[i].length; j++) {
      screen[i][j] = ' ';
    }
  }
}

function putRacer(screen, walker) {
  const position = walker[0];
  const name = walker[1];
  const x = position[0];
  const y = position[1];
  putString(screen, "|" + name + "|>", x+1, y);
}

function moveRacer(racer) {
  const position = racer[0];
  const speed = racer.at(-2);
  const acceleration = racer.at(-1);

  position[0] = position[0] + speed[0];
  position[1] = position[1] + speed[1];

  speed[0] = speed[0] + acceleration[0];
  speed[1] = speed[1] + acceleration[1];
}

function putRacers(screen, racers) {
  for (const racer of racers) {
    putRacer(screen, racer);
  }
}

function moveRacers(racers) {
  for (const racer of racers) {
    moveRacer(racer);
  }
}

function animate(screen, racers, steps) {
  let frames = '';
  for (let i = 0; i < steps; i++) {
    clearScreen(screen);
    putRacers(screen, racers);
    moveRacers(racers);
    frames += screenToString(screen);
  }

  return frames;
}

function displayAnimFormat(width, height, frames) {
  console.log(width, height);
  console.log(frames);
}

function main() {
  const WIDTH = 40;
  const HEIGHT = 20;
  const screen = createScreen(WIDTH, HEIGHT);
  
  // racer: [[x, y], name, [xSpeed, ySpeed], [xAccel, yAccel]]
  const racerA = [[0, 7], 'A', [0.5, 0], [0.02, 0]];
  const racerB = [[0, 10], 'B', [0.5, 0], [0.03, 0]];
  const racerC = [[0, 13], 'C', [0.8, 0], [0, 0]];
  const racers = [racerA, racerB, racerC];

  const frames = animate(screen, racers, 40);
  displayAnimFormat(WIDTH, HEIGHT, frames);
}

main();