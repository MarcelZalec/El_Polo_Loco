class MoveableObject extends drawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accleration = 1;
    liveEnergy = 100;
    lasHit = 0;
    damamge = 0;


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
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if(this instanceof throwableObject) {
            return true;
        }
        return this.y < 140;
    }

    // isColliding(mo) {
    //     return  this.x + this.width > mo.x && 
    //             this.y + this.height > mo.y &&
    //             this.x < mo.x &&
    //             this.y < mo.y + mo.height;
    // }

    isColliding(mo) {
        return  this.x + this.width - this.offset.right > mo.x && 
                this.y + this.height - this.offset.bottom > mo.y &&
                this.x + this.offset.left < mo.x + mo.width &&
                this.y + this.offset.top < mo.y + mo.height;
    }

    // isColliding (obj) {
    //     return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
    //             (this.Y + this.offsetY + this.height) >= obj.Y &&
    //             (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
    //             obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }

    isCollidingSure(mo) {
        return (this.x + this.width) -this.offset.right > mo.x - mo.offset.left && 
        (this.y + this.height) -this.offset.bottom > mo.y + mo.offset.top &&
        this.x  + this.offset.left < mo.x + mo.offset.right  &&
        this.y + this.offset.top < (mo.y + mo.height) - mo.offset.bottom;
    }
    

    hit(damamge) {
        this.liveEnergy -= damamge;
        if (this.liveEnergy < 0) {
            this.liveEnergy = 0;
        } else {
            this.lasHit = new Date().getTime();
        }
        // console.log(this.liveEnergy);
    }

    isDead() {
        if (this.liveEnergy == 0) {
            // console.log("GAME OVER");
            // stopGame()
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lasHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    // this.x + this.offset.left, this.y + this.offset.top, this.width -
    //             this.offset.right, this.height - this.offset.bottom

    // isCollidingSure(mo) {
    //     return this.x + this.width -this.offset.right > mo.x + mo.offset.left && 
    //     this.y + this.height -this.offset.bottom > mo.y + mo.offset.top &&
    //     this.x  + this.offset.left < mo.x + mo.offset.right  &&
    //     this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    // }
}