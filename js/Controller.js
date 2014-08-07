var Controller = function () {
    var self = this;
    var $document = $(document);
    var $battleField = $('#battle-field');

    var add = function (gamePiece) {
        var $div = $('<div data-position="' + gamePiece.y + '-' + gamePiece.x + '"><div class="' + gamePiece.type + ' add animating"><span>' + (gamePiece.health === undefined ? gamePiece.value : gamePiece.health) + '</span></div></div>');
        $battleField.append($div);
        $div.children('div').on('animationend webkitAnimationEnd', function () {
            $(this).off('animationend webkitAnimationEnd').removeClass('add animating');
        });
    }

    self.replace = function (obj) {
        $('[data-position="' + obj.old.y + '-' + obj.old.x + '"]')
            .children('div')
            .addClass('remove animating')
            .on('animationend webkitAnimationEnd', function () {
                $(this).parent().remove();
            });
        $('[data-position="' + obj.current.y + '-' + obj.current.x + '"]').attr('data-position', obj.old.y + '-' + obj.old.x);
    }

    self.merge = function (obj) {
        var $removeDiv = $('[data-position="' + obj.old.y + '-' + obj.old.x + '"]');
        $('[data-position="' + obj.current.y + '-' + obj.current.x + '"]')
            .attr('data-position', obj.old.y + '-' + obj.old.x)
            .addClass('animating')
            .on('transitionend webkitTransitionEnd', function () {
                $(this)
                    .off('transitionend webkitTransitionEnd')
                    .removeClass('animating')
                    .children('div')
                    .addClass('pop animating')
                    .on('animationend webkitAnimationEnd', function () {
                        $(this).off('animationend webkitAnimationEnd').removeClass('pop animating');
                    });
                $(this).find('span').text(obj.current.value * 2);
                $removeDiv.remove();
       });
    }

    self.battle = function (obj) {
        $('[data-position="' + obj.current.y + '-' + obj.current.x + '"]')
            .attr('data-position', obj.old.y + '-' + obj.old.x)
            .children('div')
            .addClass('remove animating')
            .on('animationend webkitAnimationEnd', function () {
                $(this).parent().remove();
                $('[data-position="' + obj.old.y + '-' + obj.old.x + '"]')
                    .children('div')
                    .addClass('pop animating')
                    .on('animationend webkitAnimationEnd', function () {
                        $(this).off('animationend webkitAnimationEnd').removeClass('pop animating');
                    });
            });
    }

    self.attack = function (obj) {
        $('[data-position="' + obj.current.y + '-' + obj.current.x + '"]')
            .attr('data-position', obj.old.y + '-' + obj.old.x)
            .addClass('animating')
            .on('webkitTransitionEnd transitionend', function () {
                $(this).remove();
                $('[data-position="' + obj.old.y + '-' + obj.old.x + '"]')
                    .children('div')
                    .addClass('hit animating')
                    .on('animationend webkitAnimationEnd', function () {
                        $(this)
                            .off('animationend webkitAnimationEnd')
                            .removeClass('hit animating')
                            .find('span')
                            .text(obj.old.health -= obj.current.value);
                    });
            }).children('div').addClass('remove');
    }

    self.attackEnd = function (obj) {
        var $old = $('[data-position="' + obj.old.y + '-' + obj.old.x + '"]');
        $('[data-position="' + obj.current.y + '-' + obj.current.x + '"]')
            .attr('data-position', obj.old.y + '-' + obj.old.x)
            .addClass('animating')
            .on('webkitTransitionEnd transitionend', function () {
                $(this).removeClass('animating');
                $old
                    .children('div')
                    .addClass('hit animating')
                    .on('animationend webkitAnimationEnd', function () {
                        $(this).remove();
                    });
            });
    }

    self.add = function (obj) {
        add(obj.gamePiece);
    }

    $.subscribe('gridSetUp', function (event) {
        event.value.forEach(function (gamePiece) {
            add(gamePiece);
        });
    });

    $.subscribe('gridUpdate', function (event) {
        for (var i = 0; i < event.value.length; i++) {
            self[event.value[i].transition](event.value[i]);
        }
        $('#score-placeholder').text(event.score);
        $('#best-score-placeholder').text(event.bestScore);
    });
}