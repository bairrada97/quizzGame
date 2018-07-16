var LEROY = LEROY || {};

LEROY.MAIN = (function() {

    return {
        init: function() {
            $('[data-control]').each(function (index, elem) {
                var data = $(elem).data(),
                    control = data.control;

                if(!LEROY[control]) return;

                if(typeof LEROY[control] === 'function') {
                    var obj = new LEROY[control]; obj.init(elem, data);
                } else if(typeof LEROY[control] === 'object') {
                    LEROY[control].init(elem, data);
                }
            });
        }
    }
})();

$(document).ready(function () {
    LEROY.MAIN.init();
});
