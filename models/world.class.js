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
        this.Console();
    }

    Console() {
        setInterval(() => {
            console.log(this.character.speedY,  this.character.y);
        }, 1000) 
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisionsObjects() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkCollectCollisoion();
            this.level.enemies.liveEnergy
        }, 1000/10);
    }

    checkThrowObject() {
        if (this.keyboard.D && this.useableObject > 0) {
            let bottle = new throwableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.useableObject -= 1;
            this.keyboard.D = false;
            this.checkSalsaCollisoion();
        }
        if (this.useableObject == 0) {
           this.throwableObjects = [];
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                console.log(this.character.speedY);
                if (this.character.isColidingFromTop(enemy) && !(enemy instanceof Endboss) && this.character.speedY < 0) {
                    enemy.hit(1000);
                    this.level.enemies.splice(index, 1);
                } else if (enemy instanceof Chicken || enemy instanceof smallChicken) {
                    if (!enemy.isDead) {
                        this.character.hit(0.5);
                    } else {
                        null;
                    }
                } else {
                    this.character.hit(0.5);
                }
                // console.log("crash", this.character.liveEnergy);
            }
        })
    }

    checkSalsaCollisoion() {
        if (this.throwableObjects.length >= 0) {
            this.throwableObjects.forEach((bottle) => {
                this.level.enemies.forEach((enemy) => {
                    if(bottle.isColliding(enemy)) {
                        if(enemy instanceof Endboss) {
                            enemy.hit(25);
                            bottle.splashAnimation();
                        }
                        if (!enemy instanceof Endboss) {
                            this.level.enemies.hit(100);
                            bottle.splashAnimation();
                        }
                        
                    }
                })
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
            if (this.character.isColliding(collectable)) {    
                if (collectable.img.src.includes("salsa")) {
                    this.useableObject += 1;
                    this.level.collectables.splice(index, 1);
                } else if(collectable.img.src.includes("coin")) {
                    this.coins += 1;
                    this.level.collectables.splice(index, 1);
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
        mo.drawFrame3(this.ctx);
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