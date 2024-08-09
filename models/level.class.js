class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectables;
    // finalBackground = [];
    eddededBackground = [];
    level_end_x = 3600;

    constructor(enemies, clouds, backgroundObjects, collectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectables = collectables;
        // this.generateBackground(5);
        // console.log(backgroundObjects);
        // console.log("final", this.finalBackground);
    }

    generateBackground(length) {
        for (let i = -1; i < length; i++) {
            this.backgroundObjects.forEach(e => {
                this.y = 719;
                // console.log(e.x, this.y);
                this.new_x = e.x + this.y;
                e.x = this.new_x;
                this.eddededBackground.push(e.x)
            });
            // this.finalBackground.push(this.backgroundObjects, this.eddededBackground)
        }
    }

    // generateBackground(lenght) {
    //     for (let i = 0; i < lenght; i++) {
    //         for (let ii = 0; ii < this.backgroundObjects.length; ii++) {
    //             const element = this.backgroundObjects[ii].x;
    //             this.y = 719;
    //             console.log(element, this.y);
    //             this.new_x = element + this.y;
    //             this.backgroundObjects[ii].x = this.new_x;
    //         }
    //     }
    // }
}