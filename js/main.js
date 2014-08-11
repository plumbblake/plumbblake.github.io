
$(function () {
    var size = 4;
    var cellWidth = 65;
    var cellHeight = 74;
    var touchSensitivity = 35;
    var width = size * cellWidth;
    var height = size * cellHeight;
    var touchIdentifier;
    var startX;
    var startY;
    var $restart = $('#restart');
    var $battleFieldBorder = $('#battle-field-border');
    var $battleField = $('#battle-field');
    var $scorePlaceholder = $('#score-placeholder');
    var $instructions = $('#instructions');
    var $document = $(document);
    var events = [];
    var bestScore = parseInt(localStorage.getItem('bestScore'),10) || 0;
    var currentGame = localStorage.getItem('currentGame') || '';
    var currentScore = parseInt(localStorage.getItem('currentScore'),10) || 0;

    $('#best-score-placeholder').text(bestScore);

    $battleField.css({
        width: width + 'px',
        height: height + 'px'
    });

    var gridStyle = '';
    var row = 2;

    for (var i = 0; i < size; i++) {
        var column = 5;
        for (var j = 0; j < size; j++) {
            gridStyle += '[data-position="' + i + '-' + j + '"] { -webkit-transform: translate3d(' + column + 'px,' + row + 'px,0); transform: translate3d(' + column + 'px,' + row + 'px,0);}';
            column += cellWidth;
        }
        row += cellHeight;
    }
    $('head').append('<style type="text/css">' + gridStyle + '</style>');

    var controller = new Controller();
    var grid = new Grid(size, bestScore, currentGame, currentScore);

    var left = function () {
        grid.left();
    }
    var up = function () {
        grid.up();
    }
    var right = function () {
        grid.right();
    }
    var down = function () {
        grid.down();
    }

    var direction = {
        37: left,
        38: up,
        39: right,
        40: down
    }

    var executeEvent = function () {
        if ($battleField.find('.animating').length === 0 && events.length > 0) {
            events[0]();
            events.shift();
        }
        else {
            setTimeout(executeEvent, 50);
        }
    }

    var touchstartHandler = function (event) {
        event.preventDefault();
        var originalEventChangedTouch = event.originalEvent.changedTouches[0];
        touchIdentifier = originalEventChangedTouch.identifier;
        startX = originalEventChangedTouch.pageX;
        startY = originalEventChangedTouch.pageY;
        $battleFieldBorder.on('touchmove', touchmoveHandler);
        $battleFieldBorder.off('touchstart');
    }

    var touchmoveHandler = function (event) {
        event.preventDefault();
        var originalEventChangedTouch = event.originalEvent.changedTouches[0];

        var moveX = originalEventChangedTouch.pageX;
        var moveY = originalEventChangedTouch.pageY;

        var translateAmountX = moveX - startX;
        var translateAmountY = moveY - startY;

        if (Math.abs(translateAmountX) >= touchSensitivity || Math.abs(translateAmountY) >= touchSensitivity) {
            event.stopImmediatePropagation();
            $battleFieldBorder.off('touchmove');
        }
        var action = null;
        if (translateAmountX >= touchSensitivity) {
            action = right;
        }
        else if (translateAmountX <= -touchSensitivity) {
            action = left;
        }
        else if (translateAmountY >= touchSensitivity) {
            action = down;
        }
        else if (translateAmountY <= -touchSensitivity) {
            action = up;
        }
        if (action) {
            events.push(action);
            executeEvent();
        }
    }

    var touchendHandler = function (event) {
        var originalEventChangedTouch = event.originalEvent.changedTouches[0];
        var tempIdentifer = originalEventChangedTouch.identifier;
        if (tempIdentifer === touchIdentifier) {
            $battleFieldBorder.on('touchstart', touchstartHandler);
        }
    };

    var keyupHandler = function (event) {
        if (direction[event.which]) {
            event.preventDefault();
            events.push(direction[event.which]);
            executeEvent();
        }
    }

    var unbindEvents = function () {
        $document.off('keyup');
        $battleFieldBorder.off('touchstart')
            .off('touchend');
    }

    var gameWon = function () {
        if ($battleField.find('.animating').length === 0 && events.length === 0) {
            $battleField.append('<div id="game-won" class="game-ended"><div>You Win!</div></div>');
        }
        else {
            setTimeout(gameWon, 50);
        }
    }

    var gameOver = function () {
        if ($battleField.find('.animating').length === 0 && events.length === 0) {
            $battleField.append('<div id="game-over" class="game-ended"><div>Game Over!</div></div>');
        }
        else {
            setTimeout(gameOver, 50);
        }
    }

    var start = function () {
        unbindEvents();
        $scorePlaceholder.text(currentScore);
        $battleField.empty();
        grid.restart();
        $document.on('keyup', keyupHandler);
        $battleFieldBorder
            .on('touchstart', touchstartHandler)
            .on('touchend', touchendHandler);
    }

    if (localStorage.getItem('instructions') !== 'set') {
        $instructions.show();
    }
    else {
        start();
    }

    $restart.on('click', function () {
        localStorage.setItem('currentGame', '');
        localStorage.setItem('currentScore', 0);
        currentScore = 0;
        start();
    });

    $instructions.on('click', function () {
        $instructions.hide();
        localStorage.setItem('instructions', 'set');
        start();
    });

    $.subscribe('gameOver', function () {
        unbindEvents();
        gameOver();
    });

    $.subscribe('gameWon', function () {
        unbindEvents();
        gameWon();
    });  
});