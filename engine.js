var c;
var speed = 0;
var position = 0;

function checkFilter(object) {
    return object.pos[2] + object.length > 0;
}

function updatePosition(object) {
    return object.pos[2] -= speed;
}

function init(gl){
    counter = 0;
    // Initialize objects here
    coins = [];
    grounds = [];
    rails = [];
    overheadLines = [];
    trains = [];
    barricades = [];
    bushes = [];
    hordings = [];
    walls = [];

    grounds.push(new Ground(gl, [0, -5, 0]));
    grounds.push(new Ground(gl, [0, -5, 100]));
    rails.push(new Rail(gl, [-6, -5, 0]));
    rails.push(new Rail(gl, [ 0, -5, 0]));
    rails.push(new Rail(gl, [ 6, -5, 0]));
    rails.push(new Rail(gl, [-6, -5, 100]));
    rails.push(new Rail(gl, [ 0, -5, 100]));
    rails.push(new Rail(gl, [ 6, -5, 100]));
    overheadLines.push(new OverheadLine(gl,[0,5,  0]));
    overheadLines.push(new OverheadLine(gl,[0,5,100]));
    miner = new Miner(gl, [ 0, -2, 20]);
    walls.push(new Wall(gl, [-10,-5, 0]));
    walls.push(new Wall(gl, [-10,-5, 100]));
    walls.push(new Wall(gl, [ 10,-5, 0]));
    walls.push(new Wall(gl, [ 10,-5, 100]));

    coin = new Coin(gl, [-6, -3, 30]);
    coins.push(coin);
}

function tick(gl, deltaTime){
    // Make a tick function on basis of deltaTime
    counter++;
    const acceleration = 0.001;
    speed += acceleration;
    position -= speed;

    if(grounds.length < 3){
        grounds.push(new Ground(gl, [0, -5, 190]));
        rails.push(new Rail(gl, [ 6, -5, 190]));
        rails.push(new Rail(gl, [ 0, -5, 190]));
        rails.push(new Rail(gl, [-6, -5, 190]));
        walls.push(new Wall(gl, [-10, -5, 190]));
        walls.push(new Wall(gl, [ 10, -5, 190]));
        overheadLines.push(new Rail(gl, [-6, -5, 190]));
    }

    if(counter % 797 == 2)
        coins.push(new Coin(gl, [(randInt(3)-1)*6, -4, randInt(100)]));
    if(counter % 1211 == 2)
        bushes.push(new Bushes(gl, [(randInt(3)-1)*6, -4, randInt(100)]));
    if(counter % 911 == 2)
        barricades.push(new Barricade(gl, [(randInt(3)-1)*6, -4, randInt(100)]));
    if(counter % 782 == 2)
        hordings.push(new Hording(gl, [(randInt(3)-1)*6, 0, randInt(100)]));
    // if(counter % 782 == 2)
    //     coins.push(new Train(gl, [(randInt(3)-1)*6, -4, randInt(100)]));

    grounds.forEach(updatePosition);
    rails.forEach(updatePosition);
    overheadLines.forEach(updatePosition);
    coins.forEach(updatePosition);
    hordings.forEach(updatePosition);
    barricades.forEach(updatePosition);
    bushes.forEach(updatePosition);
    walls.forEach(updatePosition);

    grounds = grounds.filter(checkFilter);
    rails = rails.filter(checkFilter);
    overheadLines = overheadLines.filter(checkFilter);
    coins = coins.filter(checkFilter);
    bushes = bushes.filter(checkFilter);
    walls = walls.filter(checkFilter);
    barricades = barricades.filter(checkFilter);
    hordings = hordings.filter(checkFilter);
}

function draw(gl, viewProjectionMatrix, programInfo, programInfoTexture, deltaTime){
    function drawTexture(object) {
        object.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    }
    function drawNormal(object) {
        object.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
    }


    // Final function which renders everything
    grounds.forEach(drawTexture);
    rails.forEach(drawTexture);
    overheadLines.forEach(drawNormal);
    coins.forEach(drawTexture);
    trains.forEach(drawTexture);
    hordings.forEach(drawTexture);
    barricades.forEach(drawTexture);
    bushes.forEach(drawTexture);
    walls.forEach(drawTexture);

    miner.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
}
