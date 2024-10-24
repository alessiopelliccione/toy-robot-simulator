import { DIRECTIONS, TABLE_SIZE } from "../constants/constants";

class Robot {

    constructor() {
        // Initialize the robot's state
        this.isPlaced = false;
        this.x = null;
        this.y = null;
        this.f = null; // Facing direction of the robot ('NORTH', 'EAST', 'SOUTH', 'WEST')
    }

    // Places the robot on the table at position (x, y) facing direction f
    place(x, y, f) {
        if (this.canMove(x, y) && DIRECTIONS.includes(f)) {
            this.x = x;
            this.y = y;
            this.f = f;
            this.isPlaced = true;
        } else {
            return;
        }
    }

    // Reports the current position and facing direction of the robot
    report() {
        if (this.isPlaced) {
            return `${this.x},${this.y},${this.f}`;
        } else {
            return;
        }
    }

    // Rotates the robot 90 degrees to the left
    left() {
        if (!this.isPlaced) return;

        const index = DIRECTIONS.indexOf(this.f);

        // Calculate the new index by subtracting 1 (adding 3 modulo 4 to handle negative indices)
        this.f = DIRECTIONS[(index + 3) % 4]; //
    }

    // Rotates the robot 90 degrees to the right
    right() {
        if (!this.isPlaced) return;
        const index = DIRECTIONS.indexOf(this.f);

        // Calculate the new index by adding 1 modulo 4 to cycle back to 0 after 3
        this.f = DIRECTIONS[(index + 1) % 4];
    }

    // Moves the robot one unit forward in the direction it is currently facing
    move() {
        if (!this.isPlaced || !this.canMove(this.x, this.y)) return;

        switch (this.f) {
            case 'NORTH':
                if (this.y + 1 < TABLE_SIZE) {
                    this.y += 1;
                }
                break;
            case 'EAST':
                if (this.x + 1 < TABLE_SIZE) {
                    this.x += 1;
                }
                break;
            case 'SOUTH':
                if (this.y - 1 >= 0) {
                   this.y -= 1; 
                }
                break;
            case 'WEST':
                if (this.x - 1 >= 0) {
                    this.x -= 1;
                }
                break;
            default:
                break;
        }
    }

    // Helper method to validate if a position is within the table boundaries
    canMove(x, y) {
        return x >= 0 && x < TABLE_SIZE && y >= 0 && y < TABLE_SIZE;
    }

}

export default Robot;