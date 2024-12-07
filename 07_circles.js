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

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function putParticle(screen, particle) {
  const position = particle[0];
  const symbol = particle[1];
  const radius = particle[2];
  const angle = particle[3];

  const x = position[0] + radius * Math.cos(angle);
  const y = position[1] + radius * Math.sin(angle);

  putString(screen, 'C', position[0], position[1]);
  putString(screen, symbol, x, y);
}

function updateParticle(particle) {
  const angle = particle[3];
  const angularSpeed = particle[4];

  // Update angle
  particle[3] = angle + angularSpeed;
}

function animate(screen, particle, steps) {
  let frames = '';
  for (let i = 0; i < steps; i++) {
    clearScreen(screen);
    putParticle(screen, particle);
    updateParticle(particle);
    frames += screenToString(screen);
  }

  return frames;
}

function displayAnimFormat(width, height, frames) {
  console.log(width, height);
  console.log(frames);
}

// particle = [position, name, radius, angle, angularSpeed]
// angle and angular speed in radians
function main() {
  const WIDTH = 40;
  const HEIGHT = 20;
  const screen = createScreen(WIDTH, HEIGHT);
  const particle = [[WIDTH / 2, HEIGHT / 2], 'P', 9, 0, 0.2];
  const frames = animate(screen, particle, 63);
  displayAnimFormat(WIDTH, HEIGHT, frames);
}

main();