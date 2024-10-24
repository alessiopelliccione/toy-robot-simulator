// Import the necessary modules
import Robot from '../src/models/Robot';
import InputHandler from '../src/models/InputHandler';
import { PLACE, MOVE, RIGHT, LEFT, REPORT } from '../src/constants/commands';

describe('InputHandler', () => {
    let robot;
    let inputHandler;

    beforeEach(() => {
        robot = new Robot();
        inputHandler = new InputHandler(robot);
    });

    test ('should return error when missing arguments', () => {
        const result = inputHandler.executeCommands('PLACE');
        expect(inputHandler.getError()).toBe(`Missing arguments for PLACE command: PLACE`);
        expect(result).toBe(null);
    })

    test('should correctly handle PLACE command with valid input', () => {
        const result = inputHandler.executeCommands(`PLACE 1,2,NORTH\nREPORT`);
        expect(result).toBe('1,2,NORTH');
    });

    test('should throw an error for invalid PLACE coordinates', () => {
        const result = inputHandler.executeCommands(`PLACE 6,7,NORTH`);
        expect(inputHandler.getError()).toBe('Invalid coordinates for PLACE command: PLACE 6,7,NORTH');
        expect(result).toBeNull();
    });

    test('should throw an error for invalid PLACE direction', () => {
        const result = inputHandler.executeCommands(`PLACE 1,2,NORTHEAST`);
        expect(inputHandler.getError()).toBe('Invalid direction for PLACE command: PLACE 1,2,NORTHEAST');
        expect(result).toBeNull();
    });

    test('should move the robot correctly when executing MOVE command', () => {
        inputHandler.executeCommands(`PLACE 1,2,NORTH`);
        const result = inputHandler.executeCommands(`MOVE\nREPORT`);
        expect(result).toBe('1,3,NORTH');
    });

    test('should not move if robot cannot move beyond table boundaries', () => {
        inputHandler.executeCommands(`PLACE 0,0,SOUTH`);
        const result = inputHandler.executeCommands(`MOVE\nREPORT`);
        expect(result).toBe(`0,0,SOUTH`);
    });

    test('should rotate the robot correctly with LEFT command', () => {
        inputHandler.executeCommands(`PLACE 1,2,NORTH`);
        const result = inputHandler.executeCommands(`LEFT\nREPORT`);
        expect(result).toBe('1,2,WEST');
    });

    test('should rotate the robot correctly with RIGHT command', () => {
        inputHandler.executeCommands(`PLACE 1,2,NORTH`);
        const result = inputHandler.executeCommands(`RIGHT\nREPORT`);
        expect(result).toBe('1,2,EAST');
    });

    test('should handle multiple commands in sequence', () => {
        const result = inputHandler.executeCommands(`PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT`);
        expect(result).toBe('3,3,NORTH');
    });

    test('should throw an error for invalid command', () => {
        const result = inputHandler.executeCommands(`JUMP`);
        expect(inputHandler.getError()).toBe('Invalid command: JUMP');
        expect(result).toBeNull();
    });

    test('should return correct robot object', () => {
        const robotInstance = inputHandler.getRobot();
        expect(robotInstance).toBe(robot);
    });

    test('should return error message after invalid command', () => {
        inputHandler.executeCommands(`PLACE 1,1,SOUTHWEST`);
        const error = inputHandler.getError();
        expect(error).toBe('Invalid direction for PLACE command: PLACE 1,1,SOUTHWEST');
    });
});
