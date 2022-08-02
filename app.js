const ASPECT_RATIO = (4 + 1 / 3) / 3;
const PIECES = [
  [[1]],
  [[1, 1]],
  [[1, 1, 1]],
  [[1, 1, 1, 1]],
  [[1, 1, 1, 1, 1]],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1],
    [1, 0],
  ],
  [
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
];

let canbg, canfg, conbg, confg;
let gridTop, gridBottom;
let size;
let isDragging = false;
let givenPieces = [];

window.onload = init;

function drawAll() {
  conbg.clearRect(0, 0, canbg.width, canbg.height);
  drawGrid();
  drawGivenPieces();
}

function drawGrid() {
  conbg.lineWidth = 2;
  conbg.strokeStyle = "black";
  conbg.beginPath();
  for (let i = 0; i < 4; i++) {
    conbg.moveTo(0, gridTop + i * size * 3);
    conbg.lineTo(canbg.width, gridTop + i * size * 3);
    conbg.moveTo(i * size * 3, gridTop);
    conbg.lineTo(i * size * 3, gridBottom);
  }
  conbg.stroke();
  conbg.lineWidth = 0.5;
  conbg.beginPath();
  for (let i = 0; i < 10; i++) {
    conbg.moveTo(0, gridTop + i * size);
    conbg.lineTo(canbg.width, gridTop + i * size);
    conbg.moveTo(i * size, gridTop);
    conbg.lineTo(i * size, gridBottom);
  }
  conbg.stroke();
}

function drawGivenPieces() {
  drawGivenPiece(0);
  drawGivenPiece(1);
  drawGivenPiece(2);
}

function drawGivenPiece(index) {
  conbg.lineWidth = 0.5;
  conbg.strokeStyle = "black";
  conbg.fillStyle = "blue";
  conbg.translate((index / 3 + 1 / 6) * canbg.width, canbg.height - canbg.width / 6);
  //con.fillRect(-5 / 2 * size / 2, -5 / 2 * size / 2, 5 / 2 * size, 5 / 2 * size);
  //con.strokeRect(-5 / 2 * size / 2, -5 / 2 * size / 2, 5 / 2 * size, 5 / 2 * size);
  for (let row = 0; row < givenPieces[index].length; row++) {
    for (let col = 0; col < givenPieces[index][row].length; col++) {
      if (givenPieces[index][row][col]) {
        // con.translate(
        //   -givenPieces[index][row].length / 2 + col * 2 * size / 5,
        //   -givenPieces[index].length / 2 + row * 2 * size / 5);
        conbg.translate(
          -givenPieces[index][row].length / 2 + (col * 2 * size) / 5,
          (-givenPieces[index].length / 2 + row) * 2 * size / 5
        );
        conbg.fillRect(-size / 5, -size / 5, (2 * size) / 5, (2 * size) / 5);
        conbg.strokeRect(-size / 5, -size / 5, (2 * size) / 5, (2 * size) / 5);
        conbg.translate(
          givenPieces[index][row].length / 2 - (col * 2 * size) / 5,
          (givenPieces[index].length / 2 - row) * 2 * size / 5
        );
      }
    }
  }
  conbg.translate(-(index / 3 + 1 / 6) * canbg.width, -canbg.height + canbg.width / 6);
}

function getRandomPiece() {
  let pieceIndex = getRandomInt(0, PIECES.length);
  let numRotations = getRandomInt(0, 4);
  let piece = makePiece(pieceIndex);
  for (let i = 0; i <= numRotations; i++) {
    piece = rotate(piece);
  }
  return piece;
}

function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function giveThreePieces() {
  givenPieces[0] = getRandomPiece();
  givenPieces[1] = getRandomPiece();
  givenPieces[2] = getRandomPiece();
}

function handleMD(e) {
  e.preventDefault();
  console.log(e.layerX, e.layerY);
  if (e.layerY > gridBottom) {
    isDragging = true;
  }
}

function handleMU(e) {
  e.preventDefault();
  if (!isDragging) {
    return;
  }
  isDragging = false;
}

function handleMM(e) {
  e.preventDefault();
  if (!isDragging) {
    return;
  }
  confg.clearRect(0, 0, canfg.width, canfg.height);
  confg.fillRect(e.layerX - 0.5 * size, e.layerY - 0.5 * size, size, size);
}

function init() {
  canbg = document.getElementById("canbg");
  conbg = canbg.getContext("2d");
  canfg = document.getElementById("canfg");
  confg = canfg.getContext("2d");
  canfg.addEventListener("mousedown", handleMD);
  canfg.addEventListener("mouseup", handleMU);
  canfg.addEventListener("mousemove", handleMM);
  giveThreePieces();
  window.onresize = resize;
  resize();
}

function makePiece(index) {
  let piece = [];
  for (let row = 0; row < PIECES[index].length; row++) {
    let pieceRow = [];
    for (let col = 0; col < PIECES[index][row].length; col++) {
      pieceRow[col] = PIECES[index][row][col];
    }
    piece.push(pieceRow);
  }
  return piece;
}

function resize() {
  if (window.innerHeight / window.innerWidth < ASPECT_RATIO) {
    canbg.height = canfg.height = window.innerHeight;
    canbg.style.top = canfg.style.top = 0;
    canbg.width = canfg.width = canbg.height / ASPECT_RATIO;
    canbg.style.left = canfg.style.left = (window.innerWidth - canbg.width) / 2 + "px";
  } else {
    canbg.width = canfg.width = window.innerWidth;
    canbg.style.left = canfg.style.left = 0;
    canbg.height = canfg.height = canbg.width * ASPECT_RATIO;
    canbg.style.top = canfg.style.top = (window.innerHeight - canbg.height) / 2 + "px";
  }
  gridTop = (1 / 3 / (4 + 1 / 3)) * canbg.height;
  gridBottom = canbg.height - (1 / (4 + 1 / 3)) * canbg.height;
  console.log(gridBottom);
  size = canbg.width / 9;
  drawAll();
}

function rotate(piece) {
  let result = [];
  for (let row = 0; row < piece[0].length; row++) {
    let resultRow = [];
    for (let col = 0; col < piece.length; col++) {
      resultRow.push(0);
    }
    result.push(resultRow);
  }
  for (let row = 0; row < result.length; row++) {
    for (let col = 0; col < piece.length; col++) {
      result[row][piece.length - col - 1] = piece[col][row];
    }
  }
  return result;
}
