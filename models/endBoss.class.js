/**
 * Class representing the end boss enemy.
 * @extends MoveableObject
 * 
 * @property {number} height - The height of the end boss.
 * @property {number} width - The width of the end boss.
 * @property {number} y - The y-coordinate of the end boss.
 * @property {number} liveEnergy - The live energy of the end boss.
 * @property {number} speed - The speed of the end boss.
 * @property {Object} offset - The offset values for collision detection.
 * @property {string[]} walk - Array of image paths for walking animation.
 * @property {string[]} alert - Array of image paths for alert animation.
 * @property {string[]} HURT - Array of image paths for hurt animation.
 * @property {string[]} atack - Array of image paths for attack animation.
 * @property {string[]} dead - Array of image paths for dead animation.
 * @property {boolean} hadFirstContact - Indicates if the end boss had first contact with the character.
 */
class Endboss extends MoveableObject {
    height = 400;
    width = 200;
    y = 50;
    liveEnergy = 100;
    speed = 0.05;
    offset = {
        top: 100,
        bottom: 80,
        left: 20,
        right: 50,
    }

    walk = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ]

    alert = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ]

    HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    atack = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    hadFirstContact = false;
    isAtacking = false;

    /**
     * Creates an end boss enemy.
     */
    constructor() {
        super().loadImage(this.alert[0]);
        this.loadImages(this.walk);
        this.loadImages(this.alert);
        this.loadImages(this.HURT);
        this.loadImages(this.atack);
        this.loadImages(this.dead);
        this.x = 3400;
        this.animate1();
    }

    /**
     * Animates the end boss's actions.
     */
    animate1() {
        setInterval(() => {
            this.handleContact()
        }, 250) 
        setInterval(() => {
            if (this.liveEnergy <= 0) {
                this.animate(this.dead);
                this.isDead();
            }
        }, 110)
    }

    handleContact() {
        let i = 0;
        console.log(i);
        if (i < 10 && !this.hadFirstContact) {
            this.animate(this.alert)
        } else {
            if (world.character.x + 500 > this.x && this.hadFirstContact && !this.isAtacking) {
                this.moveLeft(this.speed)
            }
            this.animate(this.walk)
        } i++;
        if (world.character.x > 3000 && !this.hadFirstContact) {
            i = 0;
            this.hadFirstContact = true;
        }
    }

    /**
     * Executes the attack animation and inflicts damage on the character.
     * @param {number} damage - The amount of damage to inflict.
     */
    atacking(damage) {
        this.isAtacking = true;
        this.moveLeft(0)
        this.animate(this.atack);
        world.character.hit(damage);
        setTimeout(() => {
            this.isAtacking = false;
            this.moveLeft(this.speed)
        }, 500) 
    }

    /**
     * Executes the hurt animation and plays the hurt sound.
     */
    isHurt() {
        this.death_chicken_Sound.play();
        this.animate(this.HURT);
    }
}