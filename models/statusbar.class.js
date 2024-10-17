/**
 * Class representing a status bar.
 * @extends drawableObject
 * 
 * @property {number} x - The x-coordinate of the status bar.
 * @property {number} y - The y-coordinate of the status bar.
 * @property {number} height - The height of the status bar.
 * @property {number} width - The width of the status bar.
 * @property {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @property {string[]} HEALTH - Array of image paths for health status.
 * @property {string[]} COINS - Array of image paths for coin status.
 * @property {string[]} BOTTLES - Array of image paths for bottle status.
 * @property {string[]} ENDBOSS - Array of image paths for end boss status.
 * @property {number} percentage - The current percentage of the status bar.
 */
class Statusbar extends drawableObject {
    x = 20;
    y;
    height = 50;
    width = 150;
    ctx;

    HEALTH = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    ];
    COINS = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    ];
    BOTTLES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
    ];
    ENDBOSS = [
        "img/7_statusbars/2_statusbar_endboss/green/green0.png",
        "img/7_statusbars/2_statusbar_endboss/green/green20.png",
        "img/7_statusbars/2_statusbar_endboss/green/green40.png",
        "img/7_statusbars/2_statusbar_endboss/green/green60.png",
        "img/7_statusbars/2_statusbar_endboss/green/green80.png",
        "img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ];

    percentage = 100;

    /**
     * Creates a status bar.
     * @param {number} index - The index of the status bar type.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    constructor(index, ctx) {
        super();
        this.ctx = ctx;
        this.loadImages(this.HEALTH);
        this.loadImages(this.COINS);
        this.loadImages(this.BOTTLES);
        this.loadImages(this.ENDBOSS);
        this.generateStatusbar(index);
    }

    /**
     * Generates the status bar based on the given index.
     * @param {number} index - The index of the status bar type.
     */
    generateStatusbar(index) {
        let i = index;
        this.percentage = this.setStandartPercentage(i);
        if (i == 0) {
            this.y = 20;
            this.loadImage(this.HEALTH[this.resolveImageIndex()]);
        } else if(i == 1) {
            this.y = 60;
            this.loadImage(this.COINS[this.percentage]);
        } else if(i == 2) {
            this.y = 110;
            this.loadImage(this.BOTTLES[this.percentage]);
        } else {
            this.drawEndbossStatusbar()
        }
    }

    drawEndbossStatusbar() {
        this.x = 550;
        this.y = 20;
        this.loadImage(this.ENDBOSS[this.resolveImageIndex()]);
    }

    /**
     * Sets the percentage of the status bar and updates the image.
     * @param {number} percentage - The new percentage.
     * @param {number} i - The index of the status bar type.
     */
    setPercentage(percentage, i) {
        let array = this.checkStatusbar(i);
        this.percentage = percentage;
        let path = array[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Checks the status bar type and returns the corresponding image array.
     * @param {number} i - The index of the status bar type.
     * @returns {string[]} The array of image paths for the status bar type.
     */
    checkStatusbar(i) {
        if (i == 0) {
            return this.HEALTH;
        } else if (i == 1) {
            return this.COINS;
        } else if (i == 2) {
            return this.BOTTLES;
        } else if ( i == 3) {
            return this.ENDBOSS;
        }
    }

    /**
     * Resolves the image index based on the current percentage.
     * @returns {number} The index of the image in the array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80){
            return 4;
        } else if (this.percentage > 60){
            return 3;
        } else if (this.percentage > 40){
            return 2;
        } else if (this.percentage > 20){
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Sets the standard percentage based on the status bar type.
     * @param {number} i - The index of the status bar type.
     * @returns {number} The standard percentage.
     */
    setStandartPercentage(i) {
        if (i == 1 || i == 2) {
            return 0;
        } else {
            return 100;
        }
    }
}