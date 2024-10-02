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

    drawFrame2(ctx) {
        if (this instanceof Character || this instanceof smallChicken || this instanceof Chicken || this instanceof Collectable ||this instanceof Endboss ||this instanceof throwableObject) {
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
}