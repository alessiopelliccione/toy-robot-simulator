import Robot from './Robot';
import { PLACE, MOVE, RIGHT, LEFT, REPORT } from '../constants/commands';
import { TABLE_SIZE, DIRECTIONS } from '../constants/constants';

class InputHandler {
    constructor(robot) {
        this.robot = robot;
        this.outputText = '';
        this.errorMessage = '';
    }

    executeCommands(commandsString) {
        try {
            const commands = commandsString.trim().split('\n');
            this.outputText = '';

            commands.forEach((line) => {
                const [command, args] = line.trim().split(' ');
                switch (command) {
                    case PLACE:
                        if (args) {
                            const [x_string, y_string, f] = args.split(',');
                            const x = parseInt(x_string, 10);
                            const y = parseInt(y_string, 10);

                            // Validate coordinates
                            if (
                                isNaN(x) ||
                                isNaN(y) ||
                                x < 0 ||
                                x >= TABLE_SIZE ||
                                y < 0 ||
                                y >= TABLE_SIZE
                            ) {
                                throw new Error(`Invalid coordinates for PLACE command: ${line}`);
                            }

                            // Validate direction
                            if (!DIRECTIONS.includes(f)) {
                                throw new Error(`Invalid direction for PLACE command: ${line}`);
                            }

                            this.robot.place(x, y, f);

                        } else {
                            throw new Error(`Missing arguments for PLACE command: ${line}`);
                        }
                        break;
                    case MOVE:
                        if (!this.robot.canMove(this.x, this.y)) {
                            throw new Error("The robot cannot proceed in the current direction.");
                        }
                        this.robot.move();
                        break;
                    case LEFT:
                        this.robot.left();
                        break;
                    case RIGHT:
                        this.robot.right();
                        break;
                    case REPORT:
                        const report = this.robot.report();
                        if (report) {
                            this.outputText += report + '\n'
                        }
                        break;
                    default:
                        throw new Error(`Invalid command: ${line}`);
                        break;
                }
            });

            return this.outputText.trim();
        } catch (error) {
            this.errorMessage = error.message;
            return null;
        }
    }

    getRobot() {
        return this.robot;
    }

    getError() {
        return this.errorMessage;
    }

}

export default InputHandler;