class drawableObject {
    x;
    y = canvas.height - 200;
    img;
    height;
    width;
    imageCache = [];
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 20,
    }
    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            // console.log(this.img.src);
        } catch(e){
            console.warn("Error loading image", e);
            console.log("could not find image", this.img.src);
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Collectable ||this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrame2(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Collectable ||this instanceof Endboss ||this instanceof throwableObject) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, 
                this.y + this.offset.top,
                this.width - this.offset.right,
                this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    drawFrame3(ctx) {
        if (this instanceof throwableObject || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, 
                this.y + this.offset.top,
                this.width - this.offset.right,
                this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    drawFrameCollision(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Collectable ||this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "green";
            ctx.rect(this.x + (this.width - this.offset.left), 
                this.y + (this.height - this.offset.top),
                this.x  + this.offset.right,
                this.y + this.offset.bottom);
            ctx.stroke();

            // console.warn("Rahmen für collision detection fertigstellen!!")
        }
    }

    drawFrameZone(ctx, mo) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Collectable ||this instanceof Endboss ||this instanceof throwableObject) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.width - this.offset.right > mo.x, 
                this.y + this.height - this.offset.bottom > mo.y,
                this.x + this.offset.left < mo.x + mo.width,
                this.y + this.offset.top < mo.y + mo.height);
            ctx.stroke();
        }
    }    
}