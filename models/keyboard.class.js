/**
 * Class representing keyboard controls.
 * 
 * @property {boolean} LEFT - Indicates if the left key is pressed.
 * @property {boolean} RIGHT - Indicates if the right key is pressed.
 * @property {boolean} UP - Indicates if the up key is pressed.
 * @property {boolean} DOWN - Indicates if the down key is pressed.
 * @property {boolean} SPACE - Indicates if the space key is pressed.
 * @property {boolean} D - Indicates if the D key is pressed.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * Binds touch events to the control buttons for mobile devices.
     */
    bindBtnPressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        })
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        })
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        })
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        })
        document.getElementById('btnSpace').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        })
        document.getElementById('btnSpace').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        })
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        })
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        })
    }
}