//import console = require("console");

export let Pointer = {
    init: function(Ui, element) {
        element.addEventListener("pointerdown", Pointer.pointerdown, false);
        element.addEventListener("pointermove", Pointer.pointermove, false);
        element.addEventListener("pointerup", Pointer.pointerup, false);
        element.addEventListener("pointercancel", Pointer.pointercancel, false);
        Pointer.Ui = Ui;
        Pointer.worker = new Worker('text/javascript/ui/workers/pointer.js');
        Pointer.worker.onmessage = Pointer.onMessage;
        return Pointer;
    },
    pointerdown: function(event) {
        if (event.isPrimary || Pointer.map === undefined) {
            Pointer.map_clear = true;
            Pointer.map = new Map();
        }
        Pointer.map.set(event.pointerId, { s: 'o', x: event.clientX, y: event.clientX, f: event.pressure });
        Pointer.postMessage(event.pointerId, 1, event.isPrimary, event.clientX, event.clientY, event.pressure);
    },
    pointermove: function(event) {
        if (Pointer.map) {
            Pointer.map.set(event.pointerId, { s: 'o', x: event.clientX, y: event.clientX, f: event.pressure });
            Pointer.postMessage(event.pointerId, 2, event.isPrimary, event.clientX, event.clientY, event.pressure);
        }
    },
    pointerup: function(event) {
        Pointer.map.set(event.pointerId, { s: 'o', x: event.clientX, y: event.clientX, f: event.pressure });
        Pointer.postMessage(event.pointerId, 3, event.isPrimary, event.clientX, event.clientY, event.pressure);
    },
    pointercancel: function(event) {
        Pointer.map.set(event.pointerId, { s: 'x', x: event.clientX, y: event.clientX });
    },
    draw: function() {
        if (Pointer.map_clear) {
            Pointer.Ui.ctx1.clearRect(0, 0, Ui.c1.width, Ui.c1.height);
            Pointer.map_clear = false;
        }
        Pointer.map.forEach(function(value, key, map) {
            Pointer.Ui.ctx1.fillStyle = `rgb(${value.f * 10},${0},${0},${1})`;
            Pointer.Ui.ctx1.font = `${100}px mono`;
            Pointer.Ui.ctx1.textBaseline = 'middle';
            Pointer.Ui.ctx1.textAlign = 'center';
            Pointer.Ui.ctx1.fillText(value.f, value.x * Pointer.Ui.dpi, value.y * Pointer.Ui.dpi);
        });

    },
    postMessage: function(key, state, primary, x, y, f) {
        var ixyf = {
            id: key,
            state: state,
            isPrimary: primary,
            vector: [x, y, f]
        };

        Pointer.worker.postMessage(ixyf);
    },
    onMessage: function(message) {

        let data = message.data;
        console.log(data);
        if (data.type) {
            if (data.type == 'debug') {
                log(data.msg);
            } else {
                //var rate = Math.round(toMB(data.byteLength) / elapsed);
            }
        } else {

        }



    },
    in: function(node, coords, selection) {
        if (node.children && node.children.length) {
            node.children.forEach(
                function(child) {
                    Pointer.in(child, coords, selection);
                }
            );
        } else if (Container.hit_test(node, coords)) {
            selection.push(node);
        }
    },
    hit_test: function(node, coords) {
        coords.forEach(function(coord) {
            var a = node.x - coord.pageX;
            var b = node.y - coord.pageY;
            if ((a > node.width / 2) && (b > node.height / 2)) {
                return false;
            }

        });
        return true;
    },

};