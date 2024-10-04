class MoveableObject extends drawableObject {
    
    /**
     * @property {number} speed - The speed of the object.
     * @property {boolean} otherDirection - Indicates if the object is moving in the other direction.
     * @property {number} speedY - The vertical speed of the object.
     * @property {number} accleration - The acceleration of the object.
     * @property {number} liveEnergy - The live energy of the object.
     * @property {number} lasHit - The timestamp of the last hit.
     * @property {number} damamge - The damage taken by the object.
     * @property {Audio} death_chicken_Sound - The sound played when the object dies.
     */
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accleration = 1;
    liveEnergy = 100;
    lasHit = 0;
    damamge = 0;
    death_chicken_Sound = new Audio ("audio/chicken.mp3");


    /**
     * Moves the object to the right by a specified number of pixels.
     * @param {number} pixel - The number of pixels to move.
     */
    moveRight(pixel) {
        setInterval(() => {
            this.x += pixel;
        }, 1000 / 50)
    }

    /**
     * Moves the object to the left by a specified number of pixels.
     * @param {number} pixel - The number of pixels to move.
     */
    moveLeft(pixel) {
        setInterval(() => {
            this.x -= pixel;
        }, 1000 / 50)
    }

    /**
     * Animates the object using an array of image paths.
     * @param {string[]} array - The array of image paths.
     */
    animate(array) {
        let i = this.currentImage % array.length;
        let path = array[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25)
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if(this instanceof throwableObject) {
            return true;
        }
        return this.y < 140;
    }

    /**
     * Checks if the object is colliding with another moveable object.
     * @param {MoveableObject} mo - The other moveable object.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x && 
                this.y + this.height - this.offset.bottom/3 > mo.y &&
                this.x + this.offset.left < mo.x + mo.width &&
                this.y + this.offset.top < mo.y + mo.height;
    }

    /**
     * Checks if the object is colliding with an enemy from the top.
     * @param {Object} enemy - The enemy object.
     * @returns {boolean} True if the object is colliding from the top, otherwise false.
     */
    isColidingFromTop(enemy) {
        if (enemy instanceof smallChicken) {
            return  this.x + this.width - this.offset.right > enemy.x && 
                    this.y + this.height - enemy.height*1.2 < enemy.y + enemy.offset.bottom &&
                    this.x + this.offset.left < enemy.x + enemy.width &&
                    this.y + this.offset.top < enemy.y + enemy.height;
        } else {
            return  this.x + this.width - this.offset.right > enemy.x && 
                    this.y + this.height - enemy.height*1 < enemy.y + enemy.offset.bottom &&
                    this.x + this.offset.left < enemy.x + enemy.width &&
                    this.y + this.offset.top < enemy.y + enemy.height; 
        }        
    }
    
    /**
     * Checks if the object is colliding with salsa.
     * @param {Object} mo - The salsa object.
     * @returns {number} The collision value.
     */
    salsaColiding(mo) {
        return this.x + this.width - mo.x
    }

    /**
     * Reduces the object's live energy when hit.
     * @param {number} damamge - The damage taken.
     */
    hit(damamge) {
        if (!this.isHurt()) {
            this.liveEnergy -= damamge;
            this.lasHit = new Date().getTime();
        } else if (this.liveEnergy < 0) {
            this.liveEnergy = 0;
        }
    }

    /**
     * Reduces the object's live energy when hitting an enemy.
     * @param {number} damamge - The damage taken.
     */
    hitEnemy(damamge) {
        this.liveEnergy -= damamge;
        if (this.liveEnergy < 0) {
            this.liveEnergy = 0;
        }
    }

    /**
     * Checks if the object is dead.
     */
    isDead() {
        if (this.liveEnergy == 0) {
            stopGame();
            checkGameStatus();
        }
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} True if the object is hurt, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lasHit;
        let currenttimepassed = timepassed / 1000;
        return currenttimepassed < 0.5;
    }
}