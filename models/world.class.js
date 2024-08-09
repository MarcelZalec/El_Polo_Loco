class World {
    character = new Character(this.setWorld);
    level = level1;
    // enemies = this.level.enemies;
    // clouds = this.level.clouds;
    // backgroundObjects = this.level.finalBackground;
    canvas;
    ctx;
    keyboard;
    camara_x = 0;
    statusbar = [
        new Statusbar(0),
        new Statusbar(1),
        new Statusbar(2),
    ];
    throwableObjects = [];
    coins = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisionsObjects();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisionsObjects() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThowObject();
        }, 1000/60);
    }

    checkThowObject() {
        if (this.keyboard.D && this.throwableObjects.length > 0) {
            let bottle = new throwableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            console.log(this.throwableObjects);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingSure(enemy)) {
                this.character.hit(0.5)
                // console.log("crash", this.character.liveEnergy);
            }
        })
        this.level.collectables.forEach((collectable) => {            
            if (this.character.isColliding(collectable)) {
                if (collectable.img.curretnSrc.contains("salsa")) {                    
                    this.throwableObjects.push(collectable)
                } else if(collectable.img.curretnSrc.contains("coin")) {
                    this.coins.push(collectable)
                } else {
                    null;
                }                
            }
        })
    }

    draw() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camara_x, 0);

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);

        this.ctx.translate(-this.camara_x, 0);
        // ------- Space for fixed objects -------
        this.addObjectToMap(this.statusbar);
        this.ctx.translate(this.camara_x, 0);

        this.addObjectToMap(this.throwableObjects)
        this.addToMap(this.character);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.collectables);
        
        
        this.ctx.translate(-this.camara_x, 0);

        let self = this; 
        requestAnimationFrame(() => { // Draw() wird immer aufgerufen
            self.draw();
        });
    }

    addObjectToMap(obj) {
        obj.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        mo.drawFrame2(this.ctx);
        // mo.drawFrameCollision(this.ctx);
        

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}