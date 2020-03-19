import { Layout } from '../ui/layout.js';
import { Container } from '../ui/container.js';
import { Pointer } from '../ui/pointer.js';
import * as THREE from '../threejs/build/three.module.js';

export let Ui = {
    initialize: function() {

        Ui.c1 = document.getElementById("c1");
        Ui.c2 = document.getElementById("c2");

        Ui.ctx1 = Ui.c1.getContext("2d");
        Ui.ctx2 = Ui.c2.getContext("2d");

        Ui.ctx1.sRect = function(x, y, w, h) {
            x = parseInt(x) + 0.50;
            y = parseInt(y) + 0.50;
            Ui.ctx1.strokeRect(x, y, w, h);
        }
        Ui.ctx1.fRect = function(x, y, w, h) {
            x = parseInt(x);
            y = parseInt(y);
            Ui.ctx1.fillRect(x, y, w, h);
        }

        Ui.ctx2.sRect = function(x, y, w, h) {
            x = parseInt(x) + 0.50;
            y = parseInt(y) + 0.50;
            Ui.ctx2.strokeRect(x, y, w, h);
        }
        Ui.ctx2.fRect = function(x, y, w, h) {
            x = parseInt(x);
            y = parseInt(y);
            Ui.ctx2.fillRect(x, y, w, h);
        }


        Ui.orient_key = 'orientation';
        if ('mozOrientation' in screen) {
            Ui.orient_key = 'mozOrientation';
        } else if ('msOrientation' in screen) {
            Ui.orient_key = 'msOrientation';
        }



        if (screen[Ui.orient_key]) {
            Ui.onOrientationChange = function() {
                Ui.resize();
            };
            try {
                if ('onorientationchange' in screen) {
                    screen.addEventListener('orientationchange', Ui.onOrientationChange);
                } else if ('onchange' in screen[Ui.orient_key]) {
                    screen[Ui.orient_key].addEventListener('change', Ui.onOrientationChange);
                }
            } catch (err) {

            }
        }

        Ui.goFullScreen = null;
        Ui.exitFullScreen = null;
        if ('requestFullscreen' in document.body) {
            Ui.goFullScreen = 'requestFullscreen';
            Ui.exitFullScreen = 'exitFullscreen';
        } else if ('mozRequestFullScreen' in document.body) {
            Ui.goFullScreen = 'mozRequestFullScreen';
            Ui.exitFullScreen = 'mozCancelFullScreen';
        } else if ('webkitRequestFullscreen' in document.body) {
            Ui.goFullScreen = 'webkitRequestFullscreen';
            Ui.exitFullScreen = 'webkitExitFullscreen';
        } else if ('msRequestFullscreen') {
            Ui.goFullScreen = 'msRequestFullscreen';
            Ui.exitFullScreen = 'msExitFullscreen';
        }

        // if (window.Worker) {
        //     Ui.worker = new Worker('text/javascript/ui/worker.js');
        // } else {
        //     console.error("No workers!");
        // }

        Ui.c2.addEventListener('click', function() { Ui.fullscreen(1); });

        Ui.touch_map = new Map();
        // Ui.c1.addEventListener("touchstart", Ui.touchstart, false);
        // Ui.c1.addEventListener("touchend", Ui.touchend, false);
        // Ui.c1.addEventListener("touchcancel", Ui.touchcancel, false);
        // Ui.c1.addEventListener("touchmove", Ui.touchmove, false);


        // Ui.c1.addEventListener("pointerdown", Ui.touchstart, false);
        // Ui.c1.addEventListener("pointerup", Ui.touchend, false);
        // Ui.c1.addEventListener("pointercancel", Ui.touchcancel, false);
        // Ui.c1.addEventListener("pointermove", Ui.touchmove, false);

        Ui.pointer = Pointer.init(Ui, Ui.c1);

        Ui.Icons = new Map();
        Ui.load_icons();


        Ui.layout = { roots: [Layout.init()] };
        Ui.initialized = true;
        Ui.resize();

    },

    touchstart: function(evt) {
        // evt.preventDefault();
        // var touches = evt.changedTouches;
        // for (var i = 0; i < touches.length; i++) {
        //     Ui.touch_map.set(touches[i].identifier, [touches[i]]);
        //     Ui.draw_touch(touches[i]);
        // }
        Ui.draw_touch(evt, "s");
        Ui.touch_map.set(evt.pointerId, [evt]);

    },
    touchmove: function(evt) {
        // evt.preventDefault();
        // var touches = evt.changedTouches;
        // for (var i = 0; i < touches.length; i++) {
        // Ui.touch_map.get(touches[i].identifier).push(touches[i]);
        // }
        Ui.draw_touch(evt, "m");
        //Ui.touch_map.get(evt.pointerId).push(evt);
    },
    touchend: function(evt) {
        // evt.preventDefault();
        // var touches = evt.changedTouches;
        // for (var i = 0; i < touches.length; i++) {
        //     let touch = touches[i];
        //     Ui.touch_map.delete(touches[i].identifier);
        //     Ui.draw_touch(touches[i]);
        // }
        Ui.draw_touch(evt, "e");
        Ui.touch_map.delete(evt.pointerId);
    },
    touchcancel: function(evt) {
        // evt.preventDefault();
        // var touches = evt.changedTouches;
        // for (var i = 0; i < touches.length; i++) {
        //     Ui.touch_map.delete(touches[i].identifier);
        //     Ui.draw_touch(touches[i]);
        // }
        Ui.draw_touch(evt, "c");
        Ui.touch_map.delete(evt.pointerId);
    },
    draw_touch: function(touch, c) {

        // Ui.ctx1.beginPath();
        //ctx.ellipse(touch.pageX, touch.pageY, touch.radiusX, touch.radiusY, touch.rotationAngle, 0, 2 * Math.PI, false);
        // Ui.ctx1.arc(touch.clientX, touch.clientY, 8, 0, 2 * Math.PI, false);
        //Ui.ctx1.fillStyle = `rgb(${touch[i].force},${1.0},${1.0},${1.0})`;
        if (touch.buttons > 0) {
            Ui.ctx1.fillStyle = `Black`;
            Ui.ctx1.font = `${100}px mono`;
            Ui.ctx1.textBaseline = 'middle';
            Ui.ctx1.textAlign = 'center';
            Ui.ctx1.fillText(`${touch.pointerId}:${touch.pressure.toFixed(2)}`, touch.clientX * Ui.dpi, touch.clientY * Ui.dpi);
        }
    },

    resize: function() {
        if (!Ui.initialized) { return; };

        Ui.c1.style.width = window.innerWidth + "px";
        Ui.c1.style.height = window.innerHeight + "px";

        Ui.c2.style.width = window.innerWidth + "px";
        Ui.c2.style.height = window.innerHeight + "px";

        Ui.rectWidth = 100;
        Ui.rectHeight = 100;
        Ui.cornerRadius = 3;
        Ui.lineWidth = Ui.cornerRadius;
        Ui.marginWidth = 20;
        Ui.marginHeight = 20;

        Ui.dpi = window.devicePixelRatio;
        let style_height_1 = +getComputedStyle(Ui.c1).getPropertyValue("height").slice(0, -2);
        let style_width_1 = +getComputedStyle(Ui.c1).getPropertyValue("width").slice(0, -2);

        let style_height_2 = +getComputedStyle(Ui.c2).getPropertyValue("height").slice(0, -2);
        let style_width_2 = +getComputedStyle(Ui.c2).getPropertyValue("width").slice(0, -2);
        Ui.global = {
            width_1: style_width_1 * Ui.dpi,
            height_1: style_height_1 * Ui.dpi,
            width_2: style_width_2 * Ui.dpi,
            height_2: style_height_2 * Ui.dpi
        };
        Ui.c2.setAttribute('width', Ui.global.width_2);
        Ui.c2.setAttribute('height', Ui.global.height_2);

        Ui.c1.setAttribute('width', Ui.global.width_1);
        Ui.c1.setAttribute('height', Ui.global.height_1);


        Ui.orientation = (Ui.global.width_2 > Ui.global.height_2) ? 'horizontal' : 'vertical';


        Ui.layout.roots.forEach(function(root, index) {

            root.x = Ui.global.width_2 / 2;
            root.y = Ui.global.height_2 / 2;
            root.width = Ui.global.width_2;
            root.height = Ui.global.height_2;
            root.draw_board = root.children;

            Container.resize(root, Ui.orientation);

        });

        // Ui.layout = Layout.init();

        // Ui.layout.root.x = Ui.global.width_2 / 2;
        // Ui.layout.root.y = Ui.global.height_2 / 2;
        // Ui.layout.root.width = Ui.global.width_2;
        // Ui.layout.root.height = Ui.global.height_2;
        // Ui.layout.root.draw_board = Ui.layout.root.children;

        // Container.resize(Ui.layout.root, Ui.orientation);

        Ui.draw();


    },
    load_icons: function(icon) {
        var name = "initializing Ui. loading icons.";
        let loader = new THREE.FileLoader();
        loader.setResponseType("json");
        var path = `${location.origin}/icon/`;

        loader.load(path,
            function(json) {
                json = JSON.parse(json);
                if (json) {
                    Ui.icon_list = json;
                    Ui.loaded_icons = 0;
                    json.forEach(function(element, index) {
                        var icon = new Image();
                        icon.onload = function() {
                            // Ui.layout = Layout.init(Array.from(Ui.Icons.keys()));
                            Ui.loaded_icons++;
                            if (Ui.loaded_icons === json.length) {
                                // Ui.layout.root.children[1].children[1].children[0].children = Array.from(Ui.Icons.keys());
                                Ui.resize();
                            }
                        }
                        icon.src = element;
                        var icon_name = element.split('/');
                        icon_name = icon_name[icon_name.length - 1].split('.')[0];
                        Ui.Icons.set(icon_name, icon);

                    });
                    console.log(`${name} ${Ui.Icons.size} completed!`);
                } else {
                    console.error(name + " no server data!");
                }
            },
            function(xhr) {
                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function(err) {
                console.error(name + " error!");
                //window.setTimeout(Models.queue, 1000, null);
            }
        );

    },
    fullscreen: function(parameter) {
        if (parameter) {
            document.body[Ui.goFullScreen] && document.body[Ui.goFullScreen]();
            var promise = null;
            if (screen[Ui.orient_key].lock) {
                promise = screen[Ui.orient_key].lock(screen[Ui.orient_key].type);
            } else {
                promise = screen.orientationLock(screen[Ui.orient_key]);
            }

            promise
                .then(function() {
                    console.log('Screen lock acquired');
                })
                .catch(function(err) {
                    console.error('Cannot acquire orientation lock: ' + err);
                    document[Ui.exitFullScreen] && document[Ui.exitFullScreen]();
                });

        } else {
            document[Ui.exitFullScreen] && document[Ui.exitFullScreen]();
            if (screen[Ui.orient_key].unlock) {
                screen[Ui.orient_key].unlock();
            } else {
                screen.orientationUnlock();
            }
        }
    },

    draw: function() {
        Ui.ctx2.clearRect(0, 0, Ui.c2.width, Ui.c2.height);

        // Ui.ctx2.lineJoin = "round";
        // Ui.ctx2.lineWidth = Ui.lineWidth;

        Ui.layout.roots.forEach(function(root, index) {

            Container.draw(root, Ui);
        });

    },
    off: function() {
        Ui.c2.style.width = window.innerWidth / 8 + "px";
        Ui.c2.style.height = window.innerHeight / 8 + "px";
    }
};