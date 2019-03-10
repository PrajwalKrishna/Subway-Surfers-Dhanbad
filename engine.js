var c;
var speed = 0;
var position = 0;
var score = 0;
var slow = false;
const OVERHEAD_LEVEL = 8;
var JETPACK = false;
var LIGHT = 0;
var GREYSCALE = false;
var DIFFERNCE = 4.0;

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
    boots = [];
    jetpacks = [];

    grounds.push(new Ground(gl, [0, -5, 0]));
    grounds.push(new Ground(gl, [0, -5, 100]));
    rails.push(new Rail(gl, [-6, -5, 0]));
    rails.push(new Rail(gl, [ 0, -5, 0]));
    rails.push(new Rail(gl, [ 6, -5, 0]));
    rails.push(new Rail(gl, [-6, -5, 100]));
    rails.push(new Rail(gl, [ 0, -5, 100]));
    rails.push(new Rail(gl, [ 6, -5, 100]));
    overheadLines.push(new OverheadLine(gl,[0,OVERHEAD_LEVEL,  0]));
    overheadLines.push(new OverheadLine(gl,[0,OVERHEAD_LEVEL,100]));
    miner = new Miner(gl, [ 0, -3.75, 30]);
    police = new Police(gl, [ 6, -3.75, 20]);
    dog = new Dog(gl, [ 6, -5.75, 20]);
    walls.push(new Wall(gl, [-10,-5, 0]));
    walls.push(new Wall(gl, [-10,-5, 100]));
    walls.push(new Wall(gl, [ 10,-5, 0]));
    walls.push(new Wall(gl, [ 10,-5, 100]));
    trains.push(new Train(gl, [6, -5, 40]));
}

function tick(gl, deltaTime){
    // Make a tick function on basis of deltaTime
    counter++;
    const acceleration = 0.0003;
    speed += acceleration;
    position -= speed;

    if(grounds.length < 3){
        grounds.push(new Ground(gl, [0, -5, 199]));
        rails.push(new Rail(gl, [ 6, -5, 199]));
        rails.push(new Rail(gl, [ 0, -5, 199]));
        rails.push(new Rail(gl, [-6, -5, 199]));
        walls.push(new Wall(gl, [-10, -5, 199]));
        walls.push(new Wall(gl, [ 10, -5, 199]));
        overheadLines.push(new OverheadLine(gl, [0, OVERHEAD_LEVEL, 199]));
    }

    if(JETPACK && counter % 13 == 2)
        coins.push(new Coin(gl, [(randInt(3)-1)*6, OVERHEAD_LEVEL, 100+randInt(100)]));
    if(counter % 29 == 2)
        coins.push(new Coin(gl, [(randInt(3)-1)*6, -2, 100+randInt(100)]));
    if(counter % 1211 == 2)
        bushes.push(new Bushes(gl, [(randInt(3)-1)*6, -5, 100+randInt(100)]));
    if(counter % 911 == 2)
        barricades.push(new Barricade(gl, [(randInt(3)-1)*6, -5, 100+randInt(100)]));
    if(counter % 799 == 2)
        hordings.push(new Hording(gl, [(randInt(3)-1)*6, -1, 100+randInt(100)]));
    if(counter % 379 == 2)
        trains.push(new Train(gl, [(randInt(3)-1)*6, -5, 100+randInt(100)]));
    if(counter % 1799 == 2)
        boots.push(new Boot(gl, [(randInt(3)-1)*6, -3, 100+randInt(100)]));
    if(counter % 1379 == 2)
        jetpacks.push(new Jetpack(gl, [(randInt(3)-1)*6, -3, 100+randInt(100)]));

    checkForCollision();

    grounds.forEach(updatePosition);
    rails.forEach(updatePosition);
    overheadLines.forEach(updatePosition);
    coins.forEach(updatePosition);
    hordings.forEach(updatePosition);
    barricades.forEach(updatePosition);
    bushes.forEach(updatePosition);
    walls.forEach(updatePosition);
    boots.forEach(updatePosition);
    jetpacks.forEach(updatePosition);

    // Run two times for more speed
    trains.forEach(updatePosition);
    trains.forEach(updatePosition);

    grounds = grounds.filter(checkFilter);
    rails = rails.filter(checkFilter);
    overheadLines = overheadLines.filter(checkFilter);
    coins = coins.filter(checkFilter);
    bushes = bushes.filter(checkFilter);
    walls = walls.filter(checkFilter);
    barricades = barricades.filter(checkFilter);
    hordings = hordings.filter(checkFilter);
    trains = trains.filter(checkFilter);
    boots = boots.filter(checkFilter);
    jetpacks = jetpacks.filter(checkFilter);

    miner.tick();
    police.pos[0] = miner.pos[0];
    while(dog.pos[0]==police.pos[0])
        dog.pos[0] = (randInt(3)-1)*6;

    police.pos[2] = miner.pos[2] - DIFFERNCE;
    dog.pos[2] = (miner.pos[2]+police.pos[2])/2;
    if(DIFFERNCE < 20)
        DIFFERNCE += 0.0125;

    police.tick();
    dog.tick();

    LIGHT++;
    if(LIGHT == 10)
        LIGHT = 0;
}

function draw(gl, viewProjectionMatrix, programInfo, programInfoTexture, programInfoTextureGreyScale, programInfoFlash, deltaTime){
    function drawTexture(object) {
        if(GREYSCALE)
            object.drawCube(gl, viewProjectionMatrix, programInfoTextureGreyScale, deltaTime);
        else
            object.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    }
    function drawNormal(object) {
        object.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    function drawFlash(object) {
        object.drawCube(gl, viewProjectionMatrix, programInfoFlash, deltaTime);
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
    trains.forEach(drawTexture);
    boots.forEach(drawTexture);
    jetpacks.forEach(drawTexture);

    if(LIGHT)
        walls.forEach(drawTexture);
    else
        walls.forEach(drawFlash);

    miner.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    police.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
    dog.drawCube(gl, viewProjectionMatrix, programInfoTexture, deltaTime);
}

function checkForCollision() {
    coins.forEach(function checker(object){
        flag = detect_collision(object, miner);
        if(flag){
            score += 1;
            object.pos[2] = -100;
        }
    });
    function checkerGameOver(object){
        flag = detect_collision(object, miner);
        if(flag){
            die(score);
            object.pos[2] = -100;
        }
    };
    trains.forEach(checkerGameOver);
    barricades.forEach(checkerGameOver);
    hordings.forEach(checkerGameOver);
    bushes.forEach(function checker(object){
        flag = detect_collision(object, miner);
        if(flag){
            if(DIFFERNCE < 10.0)
                die(score);
            DIFFERNCE = 4.0;
            score += 10;
            object.pos[2]= -100;
        }
    });

    jetpacks.forEach(function checker(object){
        flag = detect_collision(object, miner);
        if(flag){
            miner.jetpack();
            score += 10;
            object.pos[2]= -100;
        }
    })
    boots.forEach(function checker(object){
        flag = detect_collision(object, miner);
        if(flag){
            miner.boot();
            score += 10;
            object.pos[2]= -100;
        }
    })
    document.getElementById('score').innerHTML = score;
}

window.addEventListener('keydown', handleKey);
function handleKey(e) {
    switch (e.code) {
        case 'KeyA':
        case 'ArrowLeft':
            miner.move(0);
            break;
        case 'KeyS':
        case 'ArrowDown':
            miner.move(2);
            break;
        case 'KeyW':
        case 'ArrowUp':
            miner.move(3);
            break;
        case 'KeyD':
        case 'ArrowRight':
            miner.move(1);
            break;
        case 'KeyG':
            GREYSCALE ^= 1;
    }
}

function detect_collision(a, b) {
    return (Math.abs(a.pos[0] - b.pos[0]) * 2 <= (a.width + b.width)) &&
           (Math.abs(a.pos[1] - b.pos[1]) * 2 <= (a.height + b.height)) &&
           (Math.abs(a.pos[2] - b.pos[2]) * 2 <= (a.length + b.length));
}

function randInt (max) {
  return Math.floor(Math.random() * (max));
}

function die(score) {
    window.alert("Game Over, Final Score = " + score);
    window.location.reload();
}
