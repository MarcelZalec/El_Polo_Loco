class Endboss extends MoveableObject {
    height = 400;
    width = 200;
    y = 50;
    liveEnergy = 1000;

    walk = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ]

    walk1 = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ]

    hadFirstContact = false;


    constructor() {
        super().loadImage(this.walk1[0]);
        this.loadImages(this.walk1);
        this.x = 3400;
        this.animate1();
    }

    animate1() {
        let i = 0;
        setInterval(() => {
            if (i < 10) {
                this.animate(this.walk1)
            } else {
                this.animate(this.walk)
            }

            if (world.character.x > 3000 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
            
        }, 110) 
    }
}