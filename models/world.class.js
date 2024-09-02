class World {
    character = new Character(this.setWorld);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camara_x = 0;
    statusbar = [];
    throwableObjects = [];
    useableObject = 50;
    coins = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.statusbar = [
            new Statusbar(0, this.ctx, this.character.liveEnergy),
            new Statusbar(1, this.ctx, this.coins),
            new Statusbar(2, this.ctx, this.useableObject),
        ]
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
            this.checkCollectCollisoion();
        }, 1000/60);
    }

    checkThowObject() {
        if (this.keyboard.D && this.useableObject > 0) {
            let bottle = new throwableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            // console.log(this.throwableObjects);
            this.useableObject -= 1;
            console.log(this.useableObject);
            this.keyboard.D = false;
        }
       // if (this.useableObject == 0) {
       //     this.throwableObjects = [];
       // }
        // this.checkSalsaCollisoion();
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(0.5)
                // console.log("crash", this.character.liveEnergy);
            }
        })
    }

    checkSalsaCollisoion() {
        if (this.throwableObjects > 0) {
            this.throwableObjects.forEach((bottle) => {
                this.level.enemies.forEach((enemy) => {
                    if(bottle.isColliding(enemy)) {
                        if(enemy === this instanceof Endboss) {
                            enemy.hit(25);
                        }
                        throwableObject.splashAnimation()
                    }
                })
                // if (bottle.isColliding(this.level.enemies)) {
                //     this.level.enemies.hit(25);
                // }
            })
        }
        // if (this.throwableObjects > 0) {
        //     this.throwableObjects.forEach((bottle) => {
        //         this.level.enemies.forEach((enemy) => {
        //             if(bottle.isColliding(enemy)) {
        //                 if(this instanceof Endboss) {
        //                     enemy.hit(25);
        //                 }
        //             }
        //         })
        //         // if (bottle.isColliding(this.level.enemies)) {
        //         //     this.level.enemies.hit(25);
        //         // }
        //     })
        // }
    }

    checkCollectCollisoion() {
        this.level.collectables.forEach((collectable, index) => {
            if (this.character.isCollidingSure(collectable)) {    
                console.log(collectable.img.src);
                if (collectable.img.src.includes("salsa")) {
                    this.useableObject += 1;
                    this.level.collectables.splice(index, 1);
                    console.log("bottle" ,collectable);
                    // console.log("useableObject",this.useableObject);
                } else if(collectable.img.src.includes("coin")) {
                    this.coins += 1;
                    this.level.collectables.splice(index, 1);
                    // console.log("coin" ,collectable);
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
        // mo.drawFrame2(this.ctx);
        // mo.drawFrameZone(this.ctx, mo);
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