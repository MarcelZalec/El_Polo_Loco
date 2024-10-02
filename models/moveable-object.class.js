class MoveableObject extends drawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accleration = 1;
    liveEnergy = 100;
    lasHit = 0;
    damamge = 0;
    death_chicken_Sound = new Audio ("audio/chicken.mp3");


    moveRight(pixel) {
        setInterval(() => {
            this.x += pixel;
        }, 1000 / 50)
    }

    moveLeft(pixel) {
        setInterval(() => {
            this.x -= pixel;
        }, 1000 / 50)
    }

    animate(array) {
        let i = this.currentImage % array.length;
        let path = array[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

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

    isAboveGround() {
        if(this instanceof throwableObject) {
            return true;
        }
        return this.y < 140;
    }

    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x && 
                this.y + this.height - this.offset.bottom/3 > mo.y &&
                this.x + this.offset.left < mo.x + mo.width &&
                this.y + this.offset.top < mo.y + mo.height;
    }

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
    
    salsaColiding(mo) {
        return this.x + this.width - mo.x
    }

    hit(damamge) {
        if (!this.isHurt()) {
            this.liveEnergy -= damamge;
            this.lasHit = new Date().getTime();
        } else if (this.liveEnergy < 0) {
            this.liveEnergy = 0;
        }
    }

    hitEnemy(damamge) {
        this.liveEnergy -= damamge;
        if (this.liveEnergy < 0) {
            this.liveEnergy = 0;
        }
    }

    isDead() {
        if (this.liveEnergy == 0) {
            console.log("GAME OVER");
            stopGame();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lasHit;
        let currenttimepassed = timepassed / 1000;
        return currenttimepassed < 0.5;
    }
}