/**
 * Class representing a collidable object.
 * @extends MoveableObject
 * 
 * @property {Object} offset - The offset values for collision detection.
 */
class colideable extends MoveableObject {
    offset = {
        top: 0,
        bottom: 30,
        left: 0,
        right: 0,
    }
}