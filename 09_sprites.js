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

function putImage(screen, image, x, y) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      putPixel(screen, image[i][j], x + j, y + i);
    }
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

function updateEntity(character) {
  const frame = character[2];
  const speed = character[3];

  character[2] = frame + speed;
}

function putEntity(screen, character) {
  const position = character[0];
  const spriteSheet = character[1];
  const frame = character[2];

  const index = Math.floor(frame) % spriteSheet.length;
  putImage(screen, spriteSheet[index], position[0], position[1]);
}

function animate(screen, entities, steps) {
  let frames = '';
  for (let i = 0; i < steps; i++) {
    clearScreen(screen);
    for(const entity of entities) {
      putEntity(screen, entity);
    }
    for(const entity of entities) {
      updateEntity(entity);
    }
    frames += screenToString(screen);
  }

  return frames;
}

function displayAnimFormat(width, height, frames) {
  console.log(width, height);
  console.log(frames);
}

function getSpriteSheet() {
  const image1 = [
    '>----',
    '----<',
  ];

  const image2 = [
    '->---',
    '---<-',
  ];

  const image3 = [
    '-->--',
    '--<-',
  ];

  const image4 = [
    '--->-',
    '-<---',

  ];

  const image5 = [
    '---->',
    '<----',
  ];

  const image6 = [
    '-----',
    '-----',
  ];

  return [image1, image2, image3, image4, image5, image6];
}

function wavySpriteSheet() {
  const image1 = [
    '*....',
    '.*...',
    '..*..',
    '...*.',
    '....*',
  ];
  
  const image2 = [
    '.*...',
    '.*...',
    '..*..',
    '...*.',
    '...*.',
  ];    
  
  const image3 = [
    '..*..',
    '..*..',
    '..*..',
    '..*..',
    '..*..',
  ];

  const image4 = [
    '...*.',
    '..*..',
    '..*..',
    '..*..',
    '.*...',
  ];

  const image5 = [
    '....*',
    '...*.',
    '..*..',
    '.*...',
    '*....',
  ];

  return [image1, image2, image3, image4, image5, image4, image3, image2];
}

// A sprite is simply composed of many images that are displayed in sequence
function main() {
  const WIDTH = 40;
  const HEIGHT = 20;
  const screen = createScreen(WIDTH, HEIGHT);
  // try wavySpriteSheet() for a different animation
  const spriteSheet = getSpriteSheet();
  // [x, y], spriteSheet, frame, frameSpeed
  const animatedEntity1 = [[10,10], spriteSheet, 0, 0.5]
  const animatedEntity2 = [[20,10], spriteSheet, 3, 0.5]

  const entities = [animatedEntity1, animatedEntity2];
  const frames = animate(screen, entities, spriteSheet.length * 2);
  displayAnimFormat(WIDTH, HEIGHT, frames);
}

main();