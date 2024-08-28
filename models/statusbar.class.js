class Statusbar extends drawableObject {
    x;
    y = 20;
    height = 50;
    width = 50;
    ctx;

    IMAGES = [
        "img/7_statusbars/3_icons/icon_health.png",
        "img/7_statusbars/3_icons/icon_coin.png",
        "img/7_statusbars/3_icons/icon_salsa_bottle.png",
    ];

    constructor(index, ctx, value) {
        super();
        this.ctx = ctx;
        this.generateStatusbar(index, value);
    }

    generateStatusbar(index, value) {
        let i = index;
        if (i == 0) {
            this.x = 20;
            this.loadImage(this.IMAGES[0]);
            // this.ctx.font = "20px Georgia";
            // this.ctx.fillText(`${value}`,50,50);
        } else if(i == 1) {
            this.x = 80;
            this.loadImage(this.IMAGES[1]);
            // this.ctx.font = "20px Georgia";
            // this.ctx.fillText(`${value}`,100,50);
        } else {
            this.x = 140;
            this.loadImage(this.IMAGES[2]);
            // this.ctx.font = "20px Georgia";
            // this.ctx.fillText(`${value}`,170,50);
        }
    }
}