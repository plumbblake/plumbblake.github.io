var Grid = function (size, bestScore, currentGame, currentScore) {
    var self = this;
    var isGameEnded = false;
    var score = 0;
    var maxValue = 2048;
    var endOfArray = size - 1;

    var gamePieceArray = [];
    var updateArray = [];

    var emptyArray = function (array) {
        while (array.length > 0) {
            array.pop();
        }
    }

    var getAvailableGamePieces = function () {
        var available = [];

        for (var i = 0; i < gamePieceArray.length; i++) {
            for (var j = 0; j < gamePieceArray.length; j++) {
                if (!gamePieceArray[i][j].isActive) {
                    available.push(gamePieceArray[i][j]);
                }
            }
        }
        return available;
    }

    var getRandomAvailableGamePiece = function () {
        var available = getAvailableGamePieces();
        if (available.length === 0) {
            return undefined;
        }
        else {
            return available[Math.floor(Math.random() * available.length)];
        }
    }

    var setUpGrid = function () {
        score = currentScore || 0;
        var setUpGamePieces = [];
        if (currentGame !== '') {
            gamePieceArray = JSON.parse(currentGame);
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    if (gamePieceArray[i][j].isActive) {
                        setUpGamePieces.push(gamePieceArray[i][j]);
                    };
                }
            }
            currentScore = 0;
            currentGame = '';
        }
        else {
            for (var i = 0; i < size; i++) {
                gamePieceArray[i] = [];
                for (var j = 0; j < size; j++) {
                    gamePieceArray[i][j] = new GamePiece(i, j);
                }
            }

            var initialCharacters = ['troll', 'troll', 'knight', 'knight'];
            var initialBases = ['castle', 'cave'];

            var initialBasesLocations = [gamePieceArray[0][0], gamePieceArray[endOfArray][endOfArray]];

            for (var i = 0; i < initialBases.length; i++) {
                var gamePiece = initialBasesLocations[i];
                gamePiece.isActive = true;
                gamePiece.type = initialBases[i];
                gamePiece.health = maxValue;
                setUpGamePieces.push(gamePiece);
            }
            for (var i = 0; i < initialCharacters.length; i++) {
                var gamePiece = getRandomAvailableGamePiece();
                gamePiece.isActive = true;
                gamePiece.type = initialCharacters[i];
                gamePiece.value = 2;
                setUpGamePieces.push(gamePiece);
            }
        }
        $.publish({ type: 'gridSetUp', value: setUpGamePieces });
    }

    var addScore = function (value) {
            score += value;
    }

    var getNewClosest = function (old, current) {
        var newCurrent = null;
        if (!old.isActive) {
            newCurrent = old;
        }
        else if (old.y === current.y && old.x < current.x) {
            newCurrent = gamePieceArray[old.y][old.x + 1];
        }
        else if (old.y === current.y && old.x > current.x) {
            newCurrent = gamePieceArray[old.y][old.x - 1];
        }
        else if (old.x === current.x && old.y < current.y) {
            newCurrent = gamePieceArray[old.y + 1][old.x];
        }
        else if (old.x === current.x && old.y > current.y) {
            newCurrent = gamePieceArray[old.y - 1][old.x];
        }
        return newCurrent;
    }


    var setNewClosest = function (old, current) {
        var newCurrent = getNewClosest(old, current);
        if (newCurrent !== current) {
            return replace(newCurrent, current);
        }
        else {
            return current;
        }
    }

    var reset = function (gamePiece) {
        gamePiece.isActive = false;
        gamePiece.value = 0;
        gamePiece.type = undefined;
    }

    var replace = function (old, current) {
        updateArray.push({
            transition: 'replace',
            old: { y: old.y, x: old.x },
            current: { y: current.y, x: current.x }
        });
        old.isActive = true;
        old.value = current.value;
        old.type = current.type;
        reset(current);
        return old;
    }

    var merge = function (old, current, obj) {
        if (old.value === current.value) {
            if (obj) {
                obj.action(old.value * 2);
            }
            updateArray.push({
                transition: 'merge',
                old: { y: old.y, x: old.x, value: old.value },
                current: { y: current.y, x: current.x, value: current.value }
            });
            old.value *= 2;
            reset(current);
            return getNewClosest(old, current);
        } else {
            return setNewClosest(old, current);
        }
    }

    var battle = function (old, current, obj) {
        if (old.value === current.value) {
            return setNewClosest(old, current);
        }
        else if (old.value > current.value) {
            updateArray.push({
                transition: 'battle',
                old: { y: old.y, x: old.x },
                current: { y: current.y, x: current.x }
            });
            if (obj.action1) {
                obj.action1(current.value);
            }
            reset(current);
            return getNewClosest(old, current);
        }
        else if (old.value < current.value) {
            if (obj.action2) {
                obj.action2(old.value);
            }
            replace(old, current);
            return getNewClosest(old, current);
        }
    }

    var attack = function (old, current, obj) {
        if (old.health <= current.value) {
            if (obj) {
                obj.action(old.health);
            }
            if (current.type === 'knight') {
                updateArray.push({
                    transition: 'attackEnd',
                    old: { y: old.y, x: old.x },
                    current: { y: current.y, x: current.x }
                });
                $.publish({ type: 'gameWon' });
                isGameEnded = true;
            }
            else {
                updateArray.push({
                    transition: 'attackEnd',
                    old: { y: old.y, x: old.x },
                    current: { y: current.y, x: current.x }
                });
                $.publish({ type: 'gameOver' });
                isGameEnded = true;
            }
        }
        else {
            if (obj) {
                obj.action(current.value);
            }
            updateArray.push({
                transition: 'attack',
                old: { y: old.y, x: old.x, health: old.health },
                current: { y: current.y, x: current.x, value: current.value }
            });
            old.health -= current.value;
        }
        reset(current);
        return getNewClosest(old, current);
    }

    var compareGamePieces = function (old, current) {
        if (current.isActive) {
            if (current.type === 'castle' || current.type === 'cave') {
                return current;
            }
            else {
                if (current.type === 'troll') {
                    if (old.type === 'troll') {
                        return merge(old, current);
                    }
                    else if (old.type === 'knight') {
                        return battle(old, current, { action1: addScore });
                    }
                    else if (old.type === 'castle') {
                        return attack(old, current);
                    }
                    else {
                        return setNewClosest(old, current);
                    }
                }
                else {
                    if (old.type === 'knight') {
                        return merge(old, current, { action: addScore });
                    }
                    else if (old.type === 'troll') {
                        return battle(old, current, { action2: addScore });
                    }
                    else if (old.type === 'cave') {
                        return attack(old, current, { action: addScore });
                    }
                    else {
                        return setNewClosest(old, current);
                    }
                }
            }
        } else {
            return old;
        }
    }

    var gridUpdate = function () {
        if (updateArray.length !== 0) {
            var updateCharacters = ['troll', 'knight'];
            var possibleValues = [[2, 4], [4, 8], [8, 16], [16, 32], [32, 64], [64, 128], [128, 256]];
            var possibleValuesEnd = possibleValues.length - 1;
            for (var i = 0; i < updateCharacters.length; i++) {
                var gamePiece = getRandomAvailableGamePiece();
                if (gamePiece !== undefined) {
                    var likeliHood = 0.8;
                    gamePiece.isActive = true;
                    gamePiece.type = updateCharacters[i];
                    if (gamePiece.type === 'troll') {
                        var end
                        var trollStrength = Math.round(maxValue / gamePieceArray[endOfArray][endOfArray].health) - 1;

                        if (possibleValues[trollStrength]) {
                            gamePiece.value = Math.random() < likeliHood ? possibleValues[trollStrength][0] : possibleValues[trollStrength][1];
                        }
                        else {
                            gamePiece.value = Math.random() < likeliHood ? possibleValues[possibleValuesEnd][0] : possibleValues[possibleValuesEnd][1];
                        }
                    }
                    else {
                        gamePiece.value = Math.random() < likeliHood ? 2 : 4;
                    }
                    updateArray.push({
                        transition: 'add',
                        gamePiece: gamePiece
                    });
                }
                else {
                    var dontIncreaseScore = parseInt(localStorage.getItem('currentScore'), 10);
                    if (dontIncreaseScore) {
                        score = dontIncreaseScore;
                    }
                }
            }
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem('bestScore', bestScore);
            }
            localStorage.setItem('currentGame', JSON.stringify(gamePieceArray));
            localStorage.setItem('currentScore', score);
            $.publish({ type: 'gridUpdate', value: updateArray, score: score, bestScore: bestScore });
        }
    }

    self.up = function () {
        if (!isGameEnded) {
            emptyArray(updateArray);
            for (var i = 0; i < gamePieceArray.length; i++) {
                var topMost = gamePieceArray[0][i];
                for (var j = 0; j < gamePieceArray.length; j++) {
                    if (topMost !== gamePieceArray[j][i]) {
                        topMost = compareGamePieces(topMost, gamePieceArray[j][i]);
                    }
                }
            }
            gridUpdate();
        }
    }

    self.down = function () {
        if (!isGameEnded) {
            emptyArray(updateArray);
            for (var i = endOfArray; i > -1; i--) {
                var bottomMost = gamePieceArray[endOfArray][i];
                for (var j = endOfArray; j > -1; j--) {
                    if (bottomMost !== gamePieceArray[j][i]) {
                        bottomMost = compareGamePieces(bottomMost, gamePieceArray[j][i]);
                    }
                }
            }
            gridUpdate();
        }
    }

    self.left = function () {
        if (!isGameEnded) {
            emptyArray(updateArray);
            for (var i = 0; i < gamePieceArray.length; i++) {
                var leftMost = gamePieceArray[i][0];
                for (var j = 0; j < gamePieceArray.length; j++) {
                    if (leftMost !== gamePieceArray[i][j]) {
                        leftMost = compareGamePieces(leftMost, gamePieceArray[i][j]);
                    }
                }
            }
            gridUpdate();
        }
    }

    self.right = function () {
        if (!isGameEnded) {
            emptyArray(updateArray);
            for (var i = endOfArray; i > -1; i--) {
                var rightMost = gamePieceArray[i][endOfArray];
                for (var j = endOfArray; j > -1; j--) {
                    if (rightMost !== gamePieceArray[i][j]) {
                        rightMost = compareGamePieces(rightMost, gamePieceArray[i][j]);
                    }
                }
            }
            gridUpdate();
        }
    }

    self.restart = function () {
        isGameEnded = false;
        emptyArray(gamePieceArray);
        setUpGrid();
    }
}