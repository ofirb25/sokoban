'use strict'

console.log('SOKOBAN');
var gBoard = null
var gPlayerCoord = null;
var gTargetsCoords = [];
var gStepCount = null;
var gIsGameOn = true;
var gPlayerEl = null;

function initGame() {
    //get level
    gBoard = getLevelMat(1);
    gTargetsCoords = getTargetsCoors(gBoard)
    gPlayerCoord = { i: 5, j: 1 };
    //renderMat
    renderMat(gBoard);
    gStepCount = 0;
    document.querySelector('.status').innerHTML = '';
    gIsGameOn = true;
}

function renderMat(mat) {
    resetTargets(mat, gTargetsCoords);
    var elBoard = document.querySelector('tbody.board');
    var strHTML = ''
    for (var i = 0; i < mat.length; i++) {
        var row = mat[i];
        strHTML += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            strHTML += '<td celli="' + i + '" cellj="' + j + '" type="' + cell.name + '">' +
                '<img src="' + cell.img + '"></td>'
        }
        strHTML += '</tr>'
    }
    elBoard.innerHTML = strHTML;
    rotatePlayer(PLAYER.direction)
}

function checkKey(e) {
    if (gIsGameOn) {
        if (e.keyCode === 38) {
            // up arrow 
            if (isDirectionValid('up')) {
                incrementStep()
                // moveUp();
                move('up');
            }
        }
        else if (e.keyCode === 40) {
            // down arrow
            if (isDirectionValid('down')) {
                incrementStep()
                // moveDown();
                move('down');
            }
        }
        else if (e.keyCode === 37) {
            // left arrow
            console.log('left',isDirectionValid('left'))
            if (isDirectionValid('left')) {
                incrementStep()
                // moveLeft();
                move('left');
            }
        }
        else if (e.keyCode == '39') {
            // right arrow
            console.log('right',isDirectionValid('right'))
            if (isDirectionValid('right')) {
                incrementStep()
                // moveRight();
                move('right');
            }
        }
    }
}

function isDirectionValid(direction) {
    var i = gPlayerCoord.i;
    var j = gPlayerCoord.j;
    if (direction === 'up') {
        return gBoard[i - 1][j] === FLOOR || gBoard[i - 1][j] === BOX || gBoard[i - 1][j] === TARGET
    }
    if (direction === 'down') {
        return gBoard[i + 1][j] === FLOOR || gBoard[i + 1][j] === BOX || gBoard[i + 1][j] === TARGET
    }
    if (direction === 'left') {
        return gBoard[i][j - 1] === FLOOR || gBoard[i][j - 1] === BOX || gBoard[i][j - 1] === TARGET
    }
    if (direction === 'right') {
        return gBoard[i][j + 1] === FLOOR || gBoard[i][j + 1] === BOX || gBoard[i][j + 1] === TARGET
    }
}

function move(direction) {
    var i = gPlayerCoord.i;
    var j = gPlayerCoord.j;
    var nextI = i;
    var nextJ = j;
    switch (direction) {
        case 'down':
            nextI = i + 1;
            break;
        case 'up':
            nextI = i - 1;
            break;
        case 'left':
            nextJ = j - 1
            break;
        case 'right':
            nextJ = j + 1;
            break;
    }
    if (isBoxOnWay(direction)) {
        var beyondBoxI = nextI;
        var beyondBoxJ = nextJ;
        switch (direction) {
            case 'down':
                beyondBoxI = nextI + 1;
                break;
            case 'up':
                beyondBoxI = nextI - 1;
                break;
            case 'left':
                beyondBoxJ = nextJ - 1
                break;
            case 'right':
                beyondBoxJ = nextJ + 1;
                break;
        } 
        if (gBoard[beyondBoxI][beyondBoxJ] === FLOOR || gBoard[beyondBoxI][beyondBoxJ] === TARGET) {
            gPlayerCoord.i = nextI;
            gPlayerCoord.j = nextJ;
            gBoard[beyondBoxI][beyondBoxJ] = BOX
            gBoard[nextI][nextJ] = PLAYER;
            gBoard[i][j] = FLOOR;
            checkWin();
        }

    } else {
        gPlayerCoord.i = nextI;
        gPlayerCoord.j = nextJ
        gBoard[nextI][nextJ] = PLAYER;
        gBoard[i][j] = FLOOR
    }
    if(direction ==='left' || direction ==='right') rotatePlayer(direction)
    renderMat(gBoard);
}

function isBoxOnWay(direction) {
    var i = gPlayerCoord.i;
    var j = gPlayerCoord.j;

    if (direction === 'up') {
        return (gBoard[i - 1][j] === BOX)
    }
    if (direction === 'down') {
        return (gBoard[i + 1][j] === BOX)
    }
    if (direction === 'right') {
        return (gBoard[i][j + 1] === BOX)
    }
    if (direction === 'left') {
        return (gBoard[i][j - 1] === BOX)
    }
}

function getTargetsCoors(mat) {
    var coords = [];
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++) {
            if (mat[i][j] === TARGET) {
                coords.push({ i: i, j: j });
            }
        }
    }
    return coords
}

function resetTargets(mat, targetsCoord) {
    for (var i = 0; i < targetsCoord.length; i++) {
        var coord = targetsCoord[i];
        if (gBoard[coord.i][coord.j] === FLOOR) {
            gBoard[coord.i][coord.j] = TARGET
        }
    }
}

function checkWin() {
    var res = true;
    for (var i = 0; i < gTargetsCoords.length; i++) {
        var coord = gTargetsCoords[i];
        if (gBoard[coord.i][coord.j] !== BOX) {
            res = false;
            break;
        }
    }
    if (res) {
        document.querySelector('.status').innerHTML = 'YOU WON!'
        gIsGameOn = false;
    }

}

function incrementStep() {
    gStepCount++;
    document.querySelector('.stepCount').innerText = gStepCount;
}

function rotatePlayer(direction) {
    PLAYER.direction = direction;
    gPlayerEl = document.querySelector('td[type="player"] img');    
    if (direction === 'left') {
        gPlayerEl.style.transform = ""
    } else if (direction === 'right') {
        gPlayerEl.style.transform = "scaleX(-1)"
    }
}