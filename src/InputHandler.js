import Robot from './Robot';
import { PLACE, MOVE, RIGHT, LEFT, REPORT } from './commands';

class InputHandler {
    constructor() {
        this.robot = new Robot();
        this.outputText = ''; 
    }

    executeCommands(commandsString) {
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
                        this.robot.place(x, y, f);
                    }
                    break;
                case MOVE:
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
                    break;
            }
        });

        return this.outputText.trim();
    }

    getRobot() {
        return this.robot;
    }

}

export default InputHandler;