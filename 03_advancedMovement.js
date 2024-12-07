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

function putWalker(screen, walker) {
  const position = walker[0];
  const name = walker[1];
  const x = position[0];
  const y = position[1];
  const size = walker[2];
  putString(screen, name, x, y);
  drawRectangle(screen, '.', x, y + 1, x + size, y + 1 + size);
}

function moveWalker(walker) {
  const position = walker[0];
  const speed = walker.at(-1);

  position[0] = position[0] + speed[0];
  position[1] = position[1] + speed[1];
}

function animate(screen, walker, steps) {
  let frames = '';
  for (let i = 0; i < steps; i++) {
    clearScreen(screen);
    putWalker(screen, walker);
    moveWalker(walker);
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
  // walker: [[x, y], char, size, [xSpeed, ySpeed]]
  const walker = [[0, 0], 'W', 5, [0.5, 0.5]];

  const frames = animate(screen, walker, 20);
  displayAnimFormat(WIDTH, HEIGHT, frames);
}

main();