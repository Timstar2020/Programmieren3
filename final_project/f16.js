class F16FightingFalcon {
    // Jede Klasse braucht einen Konstruktor
    // Hier werden die Anfangswerte der Kreatur gesetzt
    constructor() {
        this.stepCount = frameCount + 1; // Jede Kreatur braucht diese Zeile
        this.color = "#777777";
        this.fuel = 1000         // Jede Kreatur braucht eine Farbe
        // Hier kannst du weitere Eigenschaften hinzufügen
    }

    // Die step() Methode wird in jedem Frame aufgerufen
    // Jede Kreatur braucht eine solche step() Methode!
    step() {
        let emptyPositions = findNeighbourPositions(this.row, this.col, 1, Object)
        let commies = findNeighbourPositions(this.row, this.col, 1, Su35)
        let t90 = findNeighbourPositions(this.row, this.col, 5, T90)
        commies = commies.concat(t90)
        if (emptyPositions.length >= 1) {
            let emptyPosition = random(emptyPositions)
            updateCreaturePosition(this, emptyPosition)

            // Der Code hier wird in jedem Frame ausgeführt
            // Um den Code zu organisieren, kannst du andere Methoden erstellen und von hier aus aufrufen
            // z.B. könntest du eine multiply() Methode erstellen, die aufgerufen wird, wenn die Energie ≥ 7 ist
        }
        this.fuel -= 1
        if (commies.length >= 1) {
            let commiesgoboom = random(commies)
            let row = commiesgoboom[0]
            let col = commiesgoboom[1]
            matrix[row][col] = new explosion()
        }
        if (this.fuel <= 0) {
            matrix[this.row][this.col] = new Empty()
        }
    }
}