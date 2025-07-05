import { updateCreaturePosition, findNeighbourPositions, random, int } from '..utils.js';

class Su35 {
    // Jede Klasse braucht einen Konstruktor
    // Hier werden die Anfangswerte der Kreatur gesetzt
    constructor() {
        this.stepCount = frameCount + 1; // Jede Kreatur braucht diese Zeile
        this.color = "cyan";
        this.fuel = 1000         // Jede Kreatur braucht eine Farbe
        // Hier kannst du weitere Eigenschaften hinzufügen
    }

    // Die step() Methode wird in jedem Frame aufgerufen
    // Jede Kreatur braucht eine solche step() Methode!
    step() {
        this.fuel -= 1
        let emptyPositions = findNeighbourPositions(this.row, this.col, 1, Object)
        let capitalistpigs = findNeighbourPositions(this.row, this.col, 1, F16FightingFalcon)
        let abrams = findNeighbourPositions(this.row, this.col, 5, Abrams)
        capitalistpigs = capitalistpigs.concat(abrams)
        if (emptyPositions.length >= 1) {
            let emptyPosition = random(emptyPositions)
            updateCreaturePosition(this, emptyPosition)

            // Der Code hier wird in jedem Frame ausgeführt
            // Um den Code zu organisieren, kannst du andere Methoden erstellen und von hier aus aufrufen
            // z.B. könntest du eine multiply() Methode erstellen, die aufgerufen wird, wenn die Energie ≥ 7 ist
        }
        if (capitalistpigs.length >= 1) {
            let capitalistpigsboom = random(capitalistpigs)
            let row = capitalistpigsboom[0]
            let col = capitalistpigsboom[1]
            matrix[row][col] = new explosion()
        }
        if (this.fuel <= 0) {
            matrix[this.row][this.col] = new Empty()
        }
    }
}