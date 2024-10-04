/**
 * Class representing a game level.
 * 
 * @property {Array} enemies - Array of enemy objects in the level.
 * @property {Array} clouds - Array of cloud objects in the level.
 * @property {Array} backgroundObjects - Array of background objects in the level.
 * @property {Array} collectables - Array of collectable objects in the level.
 * @property {Array} eddededBackground - Array of additional background objects in the level.
 * @property {number} level_end_x - The x-coordinate marking the end of the level.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectables;
    eddededBackground = [];
    level_end_x = 3600;

    /**
     * Creates a game level.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Array} collectables - The collectable objects in the level.
     */
    constructor(enemies, clouds, backgroundObjects, collectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
    }

    /**
     * Generates background objects and updates their positions.
     * @param {number} length - The number of background objects to generate.
     */
    generateBackground(length) {
        for (let i = -1; i < length; i++) {
            this.backgroundObjects.forEach(e => {
                this.y = 719;
                this.new_x = e.x + this.y;
                e.x = this.new_x;
                this.eddededBackground.push(e.x)
            });
        }
    }
}