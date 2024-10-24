import Robot from '../src/models/Robot';
import { TABLE_SIZE, DIRECTIONS } from '../src/constants/constants';

describe('Robot', () => {
    let robot;

    beforeEach(() => {
        robot = new Robot();
    });

    test('should correctly place the robot on the table', () => {
        robot.place(1, 2, 'NORTH');
        const report = robot.report();
        expect(report).toBe('1,2,NORTH');
    });

    test('should not place the robot outside the table boundaries', () => {
        const result = robot.place(6, 7, 'NORTH');
        expect(result).toBeUndefined();
        const report = robot.report();
        expect(report).toBeUndefined();
    });

    test('should move the robot correctly when facing NORTH', () => {
        robot.place(0, 0, 'NORTH');
        robot.move();
        const report = robot.report();
        expect(report).toBe('0,1,NORTH');
    });

    test('should move the robot correctly when facing EAST', () => {
        robot.place(0, 0, 'EAST');
        robot.move();
        const report = robot.report();
        expect(report).toBe('1,0,EAST');
    });

    test('should prevent the robot from moving off the table', () => {
        robot.place(0, 0, 'SOUTH');
        robot.move();
        const report = robot.report();
        expect(report).toBe('0,0,SOUTH'); // Should stay in the same position
    });

    test('should rotate the robot correctly to the LEFT', () => {
        robot.place(0, 0, 'NORTH');
        robot.left();
        const report = robot.report();
        expect(report).toBe('0,0,WEST');
    });

    test('should rotate the robot correctly to the RIGHT', () => {
        robot.place(0, 0, 'NORTH');
        robot.right();
        const report = robot.report();
        expect(report).toBe('0,0,EAST');
    });

    test('should not move if not placed', () => {
        robot.move();
        const report = robot.report();
        expect(report).toBeUndefined(); // Since robot is not placed, no report
    });

    test('should not rotate LEFT if not placed', () => {
        robot.left();
        const report = robot.report();
        expect(report).toBeUndefined(); // Since robot is not placed, no report
    });

    test('should not rotate RIGHT if not placed', () => {
        robot.right();
        const report = robot.report();
        expect(report).toBeUndefined(); // Since robot is not placed, no report
    });

    test('should report correct position and direction', () => {
        robot.place(1, 1, 'SOUTH');
        const report = robot.report();
        expect(report).toBe('1,1,SOUTH');
    });

    test('should not place the robot with invalid direction', () => {
        robot.place(0, 0, 'NORTHEAST');
        const report = robot.report();
        expect(report).toBeUndefined(); // Invalid direction should not place robot
    });

    test('should correctly determine if robot can move', () => {
        robot.place(0, 0, 'NORTH');
        expect(robot.canMove(0, 0)).toBe(true);
        robot.place(0, TABLE_SIZE, 'NORTH');
        expect(robot.canMove(0, TABLE_SIZE)).toBe(false); // Robot at table boundary
    });

    test('should not report if robot has not been placed', () => {
        const report = robot.report();
        expect(report).toBeUndefined(); // No placement means no valid report
    });
});
