class Collectable extends drawableObject {
    x;
    height;
    width;
    offset = {
        top: 20,
        bottom: 40,
        left: 30,
        right: 40,
    }

    IMAGES_Ground_Bottle = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];
    IMAGES_Coins = [
        "img/8_coin/coin_1.png",
    ];


    constructor(objImg) {
        super();
        this.x = 400 + Math.random()*2300;
        this.checkImg(objImg);
    }

    collect() {
        if(bottle) {
            bottles++;
        } else if (coins) {
            coins++;
        } else {
            null;
        }
    }

    checkCollisionsWithColectable(mo) {
        if (this instanceof Collectable) {
            return mo;
        }
    }

    checkImg(obj) {
        let resImg;
        if (obj == "bottle") {
            this.height = 80;
            this.width = 80;
            this.y = canvas.height - 125 ;
            resImg = this.IMAGES_Ground_Bottle[0];
        } else if(obj == "coin") {
            this.height = 90;
            this.width = 90;
            this.y -= Math.random() *200
            resImg = this.IMAGES_Coins[0];
        }
        this.loadImage(resImg);
    }
}