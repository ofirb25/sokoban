var OUT = { name: 'out', img: 'img/floor.png' };
var WALL = { name: 'wall', img: 'img/wall.png' };
var BOX = { name: 'box', img: 'img/box.png' };
var FLOOR = { name: 'floor', img: 'img/floor.png' };
var TARGET = { name: 'target', img: 'img/target.png' };
var PLAYER = { name: 'player', img: 'img/player.png', direction: 'left' };

var gLevelsMat = {
    1: [
        [OUT, WALL, WALL, WALL, WALL, WALL],
        [OUT, WALL, TARGET, TARGET, FLOOR, WALL],
        [WALL, WALL, WALL, FLOOR, FLOOR, WALL],
        [WALL, FLOOR, BOX, FLOOR, FLOOR, WALL],
        [WALL, FLOOR, BOX, FLOOR, WALL, WALL],
        [WALL, PLAYER, FLOOR, FLOOR, WALL, OUT],
        [WALL, WALL, WALL, WALL, WALL, OUT]
    ]
}

function getLevelMat (idx) {
    var mat = []
    for (var i = 0; i < gLevelsMat[idx].length; i++) {
        mat[i] = gLevelsMat[idx][i].slice()
    }
    return mat
}


