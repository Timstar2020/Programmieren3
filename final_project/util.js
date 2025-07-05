let matrix = [];
// Größe der Matrix, Anzahl der Zellen in Breite und Höhe
let matrixSize = 50;
// Anzeigengröße in Pixeln für jede Zelle
let blockSize = 15;

let creatureProbabilities = [
    [Grass, 0.25],       // Gras: 25% Wahrscheinlichkeit
    [GrassEater, 0.05],  // Grasfresser: 5% Wahrscheinlichkeit
    [MeatEater, 0.02],   // Fleischfresser: 2% Wahrscheinlichkeit
    [F16FightingFalcon, 0.02],
    [Su35, 0.02],
    [patriot, 0.01],
    [pantsir, 0.01],
    [T90, 0.01],
    [Abrams, 0.01],
];

export function findNeighbourPositions(row, col, distance, creatureType) {
    let positions = [];
    for (let x = 0 - distance; x <= distance; x++) {
        for (let y = 0 - distance; y <= distance; y++) {
            if (!(y == 0 && x == 0 || col + x >= matrixSize || row + y >= matrixSize || col + x < 0 || row + y < 0 || (!(matrix[y + row][x + col] instanceof creatureType)))) {
                positions.push([row + y, col + x])
            }
        }
    }
    return positions;
}

export function updateCreaturePosition(creature, newPos) {
    let newRow = newPos[0];
    let newCol = newPos[1];
    matrix[newRow][newCol] = creature;
    matrix[creature.row][creature.col] = new Empty();
    creature.row = newRow;
    creature.col = newCol;
}

export function random(...args) {
    if (args.length === 0) {
        return Math.random();
    } else if (args.length === 1 && Array.isArray(args[0])) {
        return args[0][Math.floor(Math.random() * args[0].length)];
    } else if (args.length === 1 && typeof args[0] === 'number') {
        return Math.floor(Math.random() * args[0]);
    } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        return Math.floor(Math.random() * (args[1] - args[0] + 1) - args[0]);
    } else {
        console.log(args);
        throw new Error('Invalid arguments');
    }
}


export function int(value) {
    if (Array.isArray(value)) {
        return value.map(int);
    } else {
        return Math.floor(value);
    }
}

function getRandomCreature() {
    let rand = random(); // Zufallszahl zwischen 0 und 1
    let sum = 0;
    for (let i = 0; i < creatureProbabilities.length; i++) {
        let creatureClass = creatureProbabilities[i][0];
        let probability = creatureProbabilities[i][1];
        sum += probability; // Summiert die Wahrscheinlichkeiten
        if (rand < sum) {   // Wenn die Zufallszahl kleiner ist, wähle diese Kreatur
            return new creatureClass();
        }
    }
    return new Empty(); // Wenn keine andere Bedingung zutrifft, wird ein leeres Feld zurückgegeben
}

function fillRandomMatrix() {
    matrix = []
    for (let x = 0; x < matrixSize; x++) {
        matrix.push([])
        for (let y = 0; y < matrixSize; y++) {
            matrix[x][y] = getRandomCreature()
        }
    }
}

function setup() {
    createCanvas(matrixSize * blockSize, matrixSize * blockSize); // Zeichenfläche erstellen
    fillRandomMatrix(); // Matrix zufällig füllen
    noStroke(); // Keine Umrandungen für Rechtecke
    frameRate(30); // Bildrate auf 30 Frame pro Sekunde setzen
}

function draw() {
    background(200); // Hintergrundfarbe festlegen
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col]; // Objekt an der aktuellen Position

            // Leere Zellen überspringen
            if (obj instanceof Empty) continue;

            // Zeile und Spalte der Kreatur setzen
            obj.row = row;
            obj.col = col;

            // Verhindert, dass neu erstellte Kreaturen im gleichen Schritt aktualisiert werden
            // und dass Kreaturen, die sich bewegen, mehrfach in einem Frame aktualisiert werden
            if (obj.stepCount === frameCount) {

                obj.step(); // Kreatur führen ihren Schritt aus
                obj.stepCount++;
            }

            // Kreatur zeichnen
            fill(obj.color); // Farbe der Kreatur setzen
            rect(blockSize * obj.col, blockSize * obj.row, blockSize, blockSize); // Rechteck zeichnen
        }
    }
}