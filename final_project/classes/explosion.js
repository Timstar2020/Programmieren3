import { updateCreaturePosition, findNeighbourPositions, random, int } from '..utils.js';

class explosion {
    // Jede Klasse braucht einen Konstruktor
    // Hier werden die Anfangswerte der Kreatur gesetzt
    constructor() {
        this.stepCount = frameCount + 1; // Jede Kreatur braucht diese Zeile
        this.color = "orange";
        this.energy = 30         // Jede Kreatur braucht eine Farbe
        // Hier kannst du weitere Eigenschaften hinzufügen
    }

    // Die step() Methode wird in jedem Frame aufgerufen
    // Jede Kreatur braucht eine solche step() Methode!
    step() {
        this.energy -= 1
        if (this.energy <= 0){
            matrix[this.row][this.col] = new Empty()
        }
    }
}