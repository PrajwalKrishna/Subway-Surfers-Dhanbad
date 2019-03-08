var c;
var speed = 0;
var position = 0;

function init(gl){
    // Initialize objects here
    ground = new Ground(gl, [0, -5, 0]);
    rail_1 = new Rail(gl, [-6, -5, 0]);
    rail_2 = new Rail(gl, [ 0, -5, 0]);
    rail_3 = new Rail(gl, [ 6, -5, 0]);
    train = new Train(gl, [ 6, -5, 20]);
    miner = new Miner(gl, [ 0, -5, 20]);
    wall_1 = new Wall(gl, [-10,-5, 20]);
    wall_2 = new Wall(gl, [ 10,-5, 20]);
    overheadLine = new OverheadLine(gl, [ 0, 5, 20]);
}

function tick(deltaTime){
    // Make a tick function on basis of deltaTime
    const acceleration = 0.001;
    speed += acceleration;
    position -= speed;

    ground.pos[2] = position;
    rail_1.pos[2] = position;
    rail_2.pos[2] = position;
    rail_3.pos[2] = position;
    wall_1.pos[2] = position;
    wall_2.pos[2] = position;
    overheadLine.pos[2] = position;
}

function draw(gl, viewProjectionMatrix, programInfo, programInfoTexture, deltaTime){
    // Final function which renders everything
    ground.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    rail_1.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    rail_2.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    rail_3.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    train.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    miner.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
    wall_1.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    wall_2.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    overheadLine.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
}
