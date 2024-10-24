
# Toy Robot Simulator

This is a simple simulation of a toy robot moving on a square tabletop. The robot can be placed on the table and given commands to move, rotate, and report its position. The simulation is implemented using React and JavaScript.

## Description

The application simulates a toy robot moving on a 5x5 unit tabletop. The robot can be placed, moved, and rotated using text commands. It ensures that the robot does not fall off the table and handles invalid commands gracefully.

### Commands

- `PLACE X,Y,F`: Places the robot on the table at coordinates (X, Y) facing direction F. F can be `NORTH`, `SOUTH`, `EAST`, or `WEST`.
- `MOVE`: Moves the robot one unit forward in the direction it is currently facing.
- `LEFT`: Rotates the robot 90 degrees to the left.
- `RIGHT`: Rotates the robot 90 degrees to the right.
- `REPORT`: Outputs the robot's current position and direction (e.g., `Output: 3,3,NORTH`).

**Note**: The first valid command must be `PLACE`, and any command issued before a valid `PLACE` will be ignored.

### Constraints

- The robot cannot fall off the table. Any command that would result in this is ignored.
- Commands are entered through a multi-line text input, where each command appears on a new line.

### Example Input/Output

1. **Input:**

    ```plaintext
    PLACE 0,0,NORTH
    MOVE
    REPORT
    ```

    **Output:**

    ```plaintext
    0,1,NORTH
    ```

2. **Input:**

    ```plaintext
    PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT
    ```

    **Output:**

    ```plaintext
    3,3,NORTH
    ```

## Setup

To get the application up and running locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/alessiopelliccione/toy-robot-simulator.git
    ```

2. **Install dependencies:**

    ```bash
    cd toy-robot-simulator
    npm install
    ```

3. **Run the application:**

    ```bash
    npm start
    ```

    The application will be accessible at `http://localhost:3000`.

## Testing

This project uses [Jest](https://jestjs.io/) for testing. To run the test suite:

```bash
npm test
```

The test suite includes both unit tests for individual components and integration tests to validate the robot's behavior across different command sequences.