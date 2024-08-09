class Statusbar extends drawableObject {
    x;
    y = 20;
    height = 50;
    width = 50;

    IMAGES = [
        "img/7_statusbars/3_icons/icon_health.png",
        "img/7_statusbars/3_icons/icon_coin.png",
        "img/7_statusbars/3_icons/icon_salsa_bottle.png",
    ];

    constructor(index) {
        super();
        this.generateStatusbar(index);
    }

    generateStatusbar(index) {
        let i = index;
        if (i == 0) {
            this.x = 20;
            this.loadImage(this.IMAGES[0]);
        } else if(i == 1) {
            this.x = 80;
            this.loadImage(this.IMAGES[1]);
        } else {
            this.x = 140;
            this.loadImage(this.IMAGES[2]);
        }
    }
}