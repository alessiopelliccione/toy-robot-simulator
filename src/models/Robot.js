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
        if (this.canMove && DIRECTIONS.includes(f)) {
            this.x = x;
            this.y = y;
            this.f = f;
            this.isPlaced = true;
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
        if (!this.isPlaced) return;

        switch (this.f) {
            case 'NORTH':
                this.y += 1;
                break;
            case 'EAST':
                this.x += 1;
                break;
            case 'SOUTH':
                this.y -= 1;
                break;
            case 'WEST':
                this.x -= 1;
                break;
            default:
                break;
        }
    }

    // Helper method to validate if a position is within the table boundaries
    canMove() {
        return this.x >= 0 && this.x < TABLE_SIZE && this.y >= 0 && this.y < TABLE_SIZE;
    }

}

export default Robot;