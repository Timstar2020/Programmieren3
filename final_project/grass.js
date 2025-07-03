class Grass {

    // Jede Klasse braucht einen Konstruktor
    // Hier werden die Anfangswerte der Kreatur gesetzt
    constructor() {
        this.stepCount = frameCount + 1; // Jede Kreatur braucht diese Zeile
        this.color = "green";
        this.energy = int(random(0, 3))

        // Jede Kreatur braucht eine Farbe
        // Hier kannst du weitere Eigenschaften hinzufügen
    }
    // Die step() Methode wird in jedem Frame aufgerufen
    // Jede Kreatur braucht eine solche step() Methode!
    step() {
        this.energy += 1
        if (this.energy >= 7) {
            let emptyPositions = findNeighbourPositions(this.row, this.col, 1, Empty)
            if (emptyPositions.length >= 1) {
                let emptyPosition = random(emptyPositions)
                let row = emptyPosition[0]
                let col = emptyPosition[1]
                matrix[row][col] = new Grass()
                this.energy = 0
            }
        }

        // Der Code hier wird in jedem Frame ausgeführt
        // Um den Code zu organisieren, kannst du andere Methoden erstellen und von hier aus aufrufen
        // z.B. könntest du eine multiply() Methode erstellen, die aufgerufen wird, wenn die Energie ≥ 7 ist
    }
}