import * as THREE from '../javascript/threejs/build/three.module.js';
import { GLTFLoader } from '../javascript/threejs/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls, MapControls } from '../javascript/threejs/examples/jsm/controls/OrbitControls.js';
import { SkeletonUtils } from '../javascript/threejs/examples/jsm/utils/SkeletonUtils.js';
import { Ui } from '../javascript/ui/ui.js';
import { Utility } from '../javascript/utility/utility.js';
import { Babylon } from '../javascript/modules/babylon.js';

function proxy(context, method, message) {
    return function() {
        message = [message].concat(Array.prototype.slice.apply(arguments));
        alert(message);
        method.apply(context, message);
    }
}

//console.log = proxy(console, console.log, 'Log:');
console.error = proxy(console, console.error, 'Error:');
//console.warn = proxy(console, console.warn, 'Warning:');

let processor = {

    doLoad: function(video) {
        this.video = video;
        this.c1 = document.getElementById("c1");
        this.c2 = document.getElementById("c2");
        this.ctx1 = this.c1.getContext("2d");
        this.ctx2 = this.c2.getContext("2d");
        let self = this;
        this.video.addEventListener("play", function() {
            self.width = self.video.videoWidth;
            self.height = self.video.videoHeight;
            self.c1.width = self.c2.width = self.width;
            self.c1.height = self.c2.height = self.height;
            self.timerCallback();
        }, false);
    },
    timerCallback: function() {
        if (this.video.paused || this.video.ended) {
            return;
        }
        this.computeFrame();
        let self = this;
        setTimeout(function() {
            self.timerCallback();
        }, 0);
    },
    computeFrame: function() {
        //        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        //        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        //        let l = frame.data.length / 4;
        //
        //        for (let i = 0; i < l; i++) {
        //            let r = frame.data[i * 4 + 0];
        //            let g = frame.data[i * 4 + 1];
        //            let b = frame.data[i * 4 + 2];
        //            if (g > 100 && r > 100 && b < 43)
        //                frame.data[i * 4 + 3] = 0;
        //        }
        //        this.ctx2.putImageData(frame, 0, 0);
        this.ctx2.drawImage(this.video, 0, 0, this.width, this.height);
        this.decode(this.c2, this.ctx2);
        return;
    },
    TEST_NUMERIC: /^\d+$/,
    TEST_ALPHANUMERIC: /^[0-9A-Z$%*+-./: ]+$/,
    chooseBestModeData: function(data) {
        if (processor.TEST_NUMERIC.test(data)) {
            return new QRCode.QRNumeric(data);
        } else if (processor.TEST_ALPHANUMERIC.test(data)) {
            return new QRCode.QRAlphanumeric(data);
        }

        try {
            return new QRCode.QRKanji(data);
        } catch (error) {
            return new QRCode.QRByte(data);
        }
    },
    encode: function(input) {
        let parameters = {
            input: [input],
            ecLevel: ['L', 'M', 'Q', 'H'],
            hasEncodingHint: [false, true],
            mode: ["Auto", "QRByte", "QRAlphanumeric", "QRNumeric", "QRKanji"],
            moduleSize: [3, 4, 5, 6, 7, 8, 9, 10, 1, 2],
            margin: [10, 15, 20, 25, 30, 35, 40, 5],
            output: []
        };
        var data = parameters.input[0];
        var ecLevel = parameters.ecLevel[0];
        var hasEncodingHint = parameters.hasEncodingHint[0];
        var mode = parameters.mode[0];
        var moduleSize = parameters.moduleSize[0];
        var margin = parameters.margin[0];
        if (!data) {
            //output.addClass('hide');
            return console.error('encode-data empty.');
        } else {
            console.log('procedding with encode-data.');
        }

        var qrcode = new QRCode.Encoder();
        var errorCorrectionLevel = QRCode.ErrorCorrectionLevel[ecLevel];
        qrcode.setEncodingHint(hasEncodingHint).setErrorCorrectionLevel(errorCorrectionLevel);
        try {
            var data = mode === 'Auto' ? processor.chooseBestModeData(data) : new QRCode[mode](data);
            qrcode.write(data).make();
            const dataURL = qrcode.toDataURL(moduleSize, margin);


            var image = new Image();
            image.onload = function() {
                //Ui.ctx2.drawImage(image, 0, 0);
            };
            image.src = dataURL;
            //            output.removeClass('hide');

            return qrcode.toDataURL(moduleSize, margin);
        } catch (error) {
            //            output.addClass('hide');
            console.error(error);
        }

    },
    decode: function(canvas, context) {
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var result = new QRCode.Decoder()
            .setOptions({ canOverwriteImage: false })
            .decode(imageData.data, imageData.width, imageData.height);
        if (result) {
            this.markQRCodeArea(context, result.location, result.version);
            //console && console.log(result.data);
            var decodedData;
            try {
                decodedData = JSON.parse(result.data)
            } catch (error) {
                return;
            }
            form.checkin(decodedData);
        }

    },
    markQRCodeArea: function(context, location, version) {
        context.lineWidth = 2;
        context.strokeStyle = '#00ff00';
        context.beginPath();
        context.moveTo(location.topLeft.x, location.topLeft.y);
        context.lineTo(location.topRight.x, location.topRight.y);
        context.lineTo(location.bottomRight.x, location.bottomRight.y);
        context.lineTo(location.bottomLeft.x, location.bottomLeft.y);
        context.lineTo(location.topLeft.x, location.topLeft.y);
        context.stroke();
        var moduleSize = this.getModuleSize(location, version);
        this.markFinderPattern(context, location.topLeftFinder.x, location.topLeftFinder.y, moduleSize);
        this.markFinderPattern(context, location.topRightFinder.x, location.topRightFinder.y, moduleSize);
        this.markFinderPattern(context, location.bottomLeftFinder.x, location.bottomLeftFinder.y, moduleSize);
    },
    getModuleSize: function(location, version) {
        var topLeft = location.topLeft;
        var topRight = location.topRight;
        var a = Math.abs(topRight.x - topLeft.x);
        var b = Math.abs(topRight.y - topLeft.y);
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return c / (version * 4 + 17);
    },
    markFinderPattern: function(context, x, y, moduleSize) {
        context.fillStyle = '#00ff00';
        context.beginPath();
        context.arc(x, y, moduleSize * 0.75, 0, 2 * Math.PI);
        context.fill();
    }
};
let device = {
    facingMode: ['user', 'environment', 'none'],
    show_cameras: async(facingMode) => {
        let self = this;
        if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
            //device.facingMode.unshift(device.facingMode.pop());
            //self.constraints = {video: {facingMode: device.facingMode[0]}};
            self.constraints = {
                video: {
                    facingMode: { exact: "user" }
                }
            };
            const stream = await navigator.mediaDevices.getUserMedia(self.constraints).then(
                function(stream) {
                    self.video = document.getElementById("video_camera");
                    track = stream.getTracks()[0];
                    self.video.srcObject = stream;
                    self.video.innerHTML = "streaming";
                    processor.doLoad(self.video);
                }).catch(
                function(error) {
                    console.error(error);
                });
        }
    },
    currentStream: null,
    stopMediaTracks: (stream) => {
        stream.getTracks().forEach(track => {
            track.stop();
        });
    },
    getDevices: (mediaDevices) => {
        let count = 1;
        device.cameras = [];
        mediaDevices.forEach(mediaDevice => {
            if (mediaDevice.kind === 'videoinput') {
                const camera = {
                    id: mediaDevice.deviceId,
                    label: mediaDevice.label || `Camera ${count++}`
                };
                device.cameras.push(camera);
            }
        });
    },
    cameras: null,
    videoConstraints: {},
    start_camera: () => {
        if (device.currentStream) {
            device.stopMediaTracks(device.currentStream);
        }
        device.facingMode.unshift(device.facingMode.pop());
        if (device.facingMode[0] === 'none') {
            return;
        }
        device.videoConstraints.facingMode = device.facingMode[0];
        const constraints = {
            video: device.videoConstraints,
            audio: false
        };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
                const video = document.getElementById("video_camera");
                device.currentStream = stream;
                video.srcObject = stream;
                processor.doLoad(video);
                return navigator.mediaDevices.enumerateDevices();
            })
            .then(device.getDevices)
            .catch(error => {
                console.error(error);
            });
    },
};

let world = {
    create: function() {
        world.scene = new THREE.Scene();
        world.scene.background = new THREE.Color(0xffffff);
        //world.scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

        world.cameras = [new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 10)];
        //world.cameras[0].position.set(0.0, 0.0, -0.02);
        // world.cameras[0].position.set(0.2050682233931717, 1.1663507799900064, -0.48179537459518473);
        // world.cameras[0].rotation.set(-1.570797326764811, -7.75694065707419e-9, -3.1338356351402967);
        //world.cameras[0].lookAt(0, 1, 0);

        world.clock = new THREE.Clock();


        world.ground = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(40, 40),
            new THREE.MeshPhongMaterial({
                color: 0x999999,
                depthWrite: false
            }));
        world.ground.rotation.x = -Math.PI / 2;
        world.ground.receiveShadow = true;

        world.illumination = new THREE.HemisphereLight(0xffffff, 0x444444);
        world.illumination.position.set(0, 20, 0);

        world.key_light = new THREE.DirectionalLight(0xffffff);
        world.key_light.position.set(-3, 10, -10);
        world.key_light.castShadow = true;
        world.key_light.shadow.camera.top = 2;
        world.key_light.shadow.camera.bottom = -2;
        world.key_light.shadow.camera.left = -2;
        world.key_light.shadow.camera.right = 2;
        world.key_light.shadow.camera.near = 0.1;
        world.key_light.shadow.camera.far = 40;

        world.scene.add(world.illumination);
        world.scene.add(world.key_light);
        world.scene.add(world.ground);

        world.renderer = new THREE.WebGLRenderer({ antialias: true });
        world.renderer.setPixelRatio(window.devicePixelRatio);
        world.renderer.setSize(window.innerWidth, window.innerHeight);
        world.renderer.gammaOutput = true;
        world.renderer.gammaFactor = 2.2;
        world.renderer.shadowMap.enabled = true;
        world.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        world.ui = Ui;
        world.ui.initialize();

        document.body.prepend(world.renderer.domElement);
        window.addEventListener('resize',
            function() {
                world.cameras[0].aspect = window.innerWidth / window.innerHeight;
                world.cameras[0].updateProjectionMatrix();

                world.renderer.setPixelRatio(window.devicePixelRatio);
                world.renderer.setSize(window.innerWidth, window.innerHeight);
                world.ui.resize();
            }, false);

        world.models = Models;
        Models.Parameters = [];
        Models.Assets = new Map();
        Models.Clones = new Map();

        world.controls = new MapControls(world.cameras[0], world.renderer.domElement);
        world.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        world.controls.dampingFactor = 0.05;
        world.controls.screenSpacePanning = false;
        world.controls.minDistance = 1;
        world.controls.maxDistance = 10;
        world.controls.maxPolarAngle = Math.PI / 2;

        world.script = script;
        world.sensors = Sensors;
        world.Keyboard = Keyboard;
        world.gamepad = Gamepad;

    },

    render: function() {
        var cloneUpdateDelta = world.clock.getDelta();
        Models.Clones.forEach(function(clone) {
            clone.mixer.update(cloneUpdateDelta);
        });
        world.controls.update();
        world.renderer.render(world.scene, world.cameras[0]);
        world.ui.draw();
    }
};




let Models = {

    queue: function(parameter) {

        console.log("queue called with" + parameter);
        if (!parameter) {
            parameter = Models.Parameters.pop();
            if (parameter) {
                Models.queue(parameter);
            } else {

                let loader = new THREE.FileLoader();
                loader.setResponseType("json");

                var url = Sensors.get_matrix();
                url.e = hash;
                url = Utility.url_encode(url);

                loader.load(`${location.origin}/map/?${url}`,
                    // onLoad callback
                    function(json) {
                        json = JSON.parse(json);
                        if (json) {
                            json.forEach(function(element, index) {
                                Models.Parameters.push(element);
                            });
                            //Models.queue();
                        } else {
                            console.log("no server data.")
                        }
                    },
                    // onProgress callback
                    function(xhr) {
                        //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    },
                    // onError callback
                    function(err) {
                        console.error('connection error : retrying in 1000ms.');
                        //window.setTimeout(Models.queue, 1000, null);
                    }
                );
                return;
            }
        }
        var model_key = parameter.asset_name + "." + parameter.mesh_Name;
        var clone_key = parameter.e;

        if (Models.Assets.has(model_key)) {
            console.log("model key found");

            if (Models.Clones.has(clone_key)) {
                console.log("clone key found. parameterizing.");

                var clone = Models.Clones.get(clone_key);
                // clone.scene.position.set(
                //     (parameter.lx) ? parameter.lx / 10 : 0,
                //     (parameter.ly) ? parameter.ly / 10 : 0,
                //     (parameter.lz) ? parameter.lz / 10 : 0
                // );
                // // clone.scene.position.x = clone_key.split('.')[3];
                // clone.scene.position.x += parameter.ax * 10;
                // clone.scene.position.y += parameter.ay * 10;
                // clone.scene.position.z += parameter.az * 10;

                clone.scene.scale.set(1.0, 1.0, 1.0);
                world.cameras[0].position.set(clone.scene.position.x, clone.scene.position.y + 1.0, clone.scene.position.z);
                world.cameras[0].lookAt(clone.scene.position.x, clone.scene.position.y, clone.scene.position.z);
                //     clone.scene.scale.set(
                //     (parameter.sx) ? parameter.sx : 1,
                //     (parameter.sy) ? parameter.sy : 1,
                //     (parameter.sz) ? parameter.sz : 1
                // );
                // clone.scene.rotation.set(
                //     (parameter.ta) ? (parameter.ta * (Math.PI / 180)) : 0,
                //     (parameter.tb) ? (parameter.tb * (Math.PI / 180)) : 0,
                //     (parameter.tg) ? (parameter.tg * (Math.PI / 180)) : 0
                // );
                // clone.scene.rotation.set(
                //     (parameter.ta) ? 0 : 0,
                //     (parameter.tb) ? (180 * (Math.PI / 180)) : 0,
                //     (parameter.tg) ? 0 : 0
                // );
                Models.parameterized = true;
                Sensors.map.set(clone_key, parameter);
                //Models.queue(Models.Parameters.pop());

            } else {
                console.log("clone key not found. creating clone");

                var model = Models.Assets.get(model_key);
                if (model) {
                    var clone_scene = SkeletonUtils.clone(model.scene);
                    if (clone_scene) {
                        var mixer = new THREE.AnimationMixer(clone_scene);
                        var action_map = new Map();
                        model.animations.forEach(
                            function(animation) {
                                var action = mixer.clipAction(animation);
                                action.play();
                                action_map.set(animation.name, action);
                            }
                        );

                        clone_scene.traverse(
                            function(object) {
                                if (object.isMesh) {
                                    object.castShadow = true;
                                }
                            }
                        );
                        var clone = {
                            scene: clone_scene,
                            mixer: mixer,
                            action_map: action_map
                        };
                        Models.Clones.set(clone_key, clone);
                        world.scene.add(clone_scene);
                        ///Models.queue(parameter);
                        console.log("clone added");
                    } else { console.log("could not clone model"); }
                } else { console.log("model is not in asset."); }
            }
        } else {

            console.log("model key not found. downloading model");

            var split = parameter.asset_name.split('.');
            if (split.length > 1) {}

            var loader;
            if (["gltf", "glb"].includes(split[1])) {
                parameter.format = "gltf";
                loader = new GLTFLoader();
            } else if (["gltf", "glb"].includes(split[1])) {
                loader = new GLTFLoader();
            }

            var path = `${location.origin}/application/${parameter.format}/${parameter.asset_name}`;

            loader.load(path,
                function(data) {
                    var model = {
                        scene: data.scene,
                        animations: data.animations
                    };
                    model.scene.traverse(
                        function(object) {
                            if (object.isMesh) {
                                object.castShadow = true;
                            }
                        }
                    );
                    Models.Assets.set(model_key, model);
                    //Models.queue(parameter);
                },
                function(xhr) {
                    var progress = (xhr.loaded / xhr.total * 100);
                },
                function(err) {
                    console.error("download error. back to queue:" + err);
                    //Models.queue();
                }
            );

        }


    }
};


let Sensors = {
    map: new Map(),
    get_matrix: function() {
        var parameter = {};
        if (Sensors.location) {
            parameter.lx = Sensors.location.longitude;
            parameter.ly = Sensors.location.latitude;
        }
        if (Sensors.tilt) {
            parameter.ta = Sensors.tilt.alpha;
            parameter.tb = Sensors.tilt.beta;
            parameter.tg = Sensors.tilt.gamma;
        }
        if (Sensors.acceleration) {
            parameter.ax = Sensors.acceleration.x;
            parameter.ay = Sensors.acceleration.y;
            parameter.az = Sensors.acceleration.z;
        }
        if (Sensors.rotation) {
            parameter.rx = Sensors.rotation.x;
            parameter.ry = Sensors.rotation.y;
            parameter.rz = Sensors.rotation.z;
        }
        return parameter;
    },
    start_sensors: function() {

        Sensors.location = { latitude: 0, longitude: 0 };
        Sensors.tilt = { alpha: 0, beta: 0, gamma: 0 };
        Sensors.acceleration = { x: 0, y: 0, z: 0 };
        Sensors.rotation = { x: 0, y: 0, z: 0 };



        if ('DeviceOrientationEvent' in window) {
            window.addEventListener('deviceorientation', Sensors.tilt_Handler, false);
        }

        if ('LinearAccelerationSensor' in window && 'Gyroscope' in window) {

            let accelerometer = new LinearAccelerationSensor();
            accelerometer.addEventListener('reading', e => {
                Sensors.acceleration_Handler(accelerometer);
            });
            accelerometer.start();

            if ('GravitySensor' in window) {
                let gravity = new GravitySensor();
                gravity.addEventListener('reading', e => Sensors.acceleration_Handler(gravity));
                gravity.start();
            }

            let gyroscope = new Gyroscope();
            gyroscope.addEventListener('reading', e => Sensors.rotation_Handler({
                alpha: gyroscope.x,
                beta: gyroscope.y,
                gamma: gyroscope.z
            }));
            gyroscope.start();

        } else if ('DeviceMotionEvent' in window) {
            var onDeviceMotion = function(eventData) {
                Sensors.acceleration_Handler(eventData.acceleration);
                Sensors.acceleration_Handler(eventData.accelerationIncludingGravity);
                Sensors.rotation_Handler(eventData.rotationRate);
            }
            window.addEventListener('devicemotion', onDeviceMotion, false);
        }

        if ('geolocation' in navigator) {
            try {
                navigator.geolocation.getCurrentPosition(function(location) {
                    Sensors.location_Handler(location);
                });
            } catch (error) {

            }
        }


    },

    acceleration_Handler: function(acceleration) {
        Sensors.acceleration = {
            x: acceleration.x && acceleration.x.toFixed(3),
            y: acceleration.y && acceleration.y.toFixed(3),
            z: acceleration.z && acceleration.z.toFixed(3)
        }
    },

    rotation_Handler: function(rotation) {
        Sensors.rotation = {
            x: rotation.alpha && rotation.alpha.toFixed(3),
            y: rotation.beta && rotation.beta.toFixed(3),
            z: rotation.gamma && rotation.gamma.toFixed(3)
        };
    },

    tilt_Handler: function(eventData) {
        Sensors.tilt = {
            alpha: eventData.alpha,
            beta: eventData.beta,
            gamma: eventData.gamma
        };
    },
    location_Handler: function(location) {
        Sensors.location = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };
    }
};

let Keyboard = {

    keydown: function(e) {
        if (!Keyboard.buffer) {
            Keyboard.buffer = [
                [
                    []
                ]
            ];
        }

        if (e.key in ["Shift", "Ctrl"]) {

        } else if (e.key === "ArrowUp") {
            Setting.shoulder.right();
        } else if (e.key === "ArrowDown") {
            Setting.shoulder.left();

        } else if (e.keyCode == 13) {
            Keyboard.buffer.unshift([]);
        } else if (e.key.toUpperCase() == "backspace".toUpperCase()) {
            if (e.ctrlKey) {
                Keyboard.buffer[0].pop() ? null : Keyboard.buffer.shift();
                Keyboard.buffer.length ? null : Keyboard.buffer.unshift([]);
            } else {

            }
        } else {
            Keyboard.buffer[0].push(e.key);
        }
    },
    evaluate: function() {
        if (Keyboard.buffer) {
            for (buffer in Keyboard.buffer) {
                let command = buffer.replace(' ', '_');
                if (command in script.lines) {
                    if (script.lines.hasOwnProperty(command)) {
                        script.lines[command].apply(null, [e.ctrlKey]);
                    } else {

                    }
                }
            }
        }
    }
}

let Gamepad = {
    connect: function() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
        for (var i = 0; i < gamepads.length; i++) {
            var gamepad = gamepads[i];
            if (gamepad) {
                Gamepad.connected({ gamepad: gamepad.id, gamepad: gamepad });
            }
        }
    },
    connected: function(event) {
        if (!Gamepad.map) {
            Gamepad.map = new Map();
        }
        Gamepad.map.set(event.gamepad.id, event.gamepad);
    },
    disconnected: function(event) {
        if (Gamepad.map) {
            Gamepad.map.delete(event.gamepad.id);
        }
    },
    update: function() {
        if (Gamepad.map) {
            Gamepad.map.forEach(function(gamepad, id, map) {
                if (gamepad) {
                    Gamepad.process(gamepad);
                }
            });
        }
    },
    process: function(gamepad) {
        if (gamepad.buttons[4].pressed) {
            if (Gamepad.button_4) {
                if (Gamepad.button_4.pressed) {

                } else {
                    Setting.shoulder.right();
                    console.info("shoulder right.");
                }
            }
        }
        Gamepad.button_4 = { pressed: gamepad.buttons[4].pressed };
        if (gamepad.buttons[5].pressed) {
            if (Gamepad.button_5) {
                if (Gamepad.button_5.pressed) {

                } else {
                    Setting.shoulder.left();
                    console.info("shoulder left.");
                }
            }
        }
        Gamepad.button_5 = { pressed: gamepad.buttons[5].pressed };
    }

};

world.uploadObj = () => {
    let obj =
        'o' +
        '\nv -0.500000 -0.500000 0.500000' +
        '\nv 0.500000 -0.500000 0.500000' +
        '\nv -0.500000 0.500000 0.500000' +
        '\nvt 0.000000 0.000000' +
        '\nvt 1.000000 0.000000' +
        '\nvt 0.000000 1.000000' +
        '\nvn 0.000000 0.000000 1.000000' +
        '\nf 1/1/1 2/2/1 3/3/1';

    let form = new FormData();
    form.append('triangle1.obj', new Blob([obj]));
    form.append('first/second/triangle2.obj', new Blob([obj]));
    console.log("fetching");
    fetch('/Ruby/xyztem', {
        method: 'POST',
        body: form
    }).then(response => {

        console.info("fetched");
        return response.blob();
    });
};



var script = {
    onload: function() {
        //device.start_camera();
        //document.getElementById("c2").addEventListener("click", device.start_camera);
        //Ui.initialize();
        world.create();
        Babylon.create(document.getElementById("c3"));
        script.loop_count = 0;
        script.loop();
        Sensors.start_sensors();
        Models.queue();
        //Socket.write({ link: 0, data: "hello" });
        //uploadObj();
        processor.encode({ hello: "encoder" });
        document.addEventListener('keydown', Keyboard.keydown);
        script.console = Console.initialize();
        window.addEventListener("gamepadconnected", Gamepad.connected);
        window.addEventListener("gamepaddisconnected", Gamepad.disconnected);
        Credentials.get_all();

    },
    loop: function() {
        script.loop_count++;
        const loop = script.loop_count;
        requestAnimationFrame(script.loop);
        if (loop % 1 === 0) {
            world.render();
        }
        if (loop % 2 === 0) {
            Gamepad.update();
        }
        if (loop % 3 === 0) {

        }
        if (loop % 30 === 0) {
            //world.renderer.render(world.scene, world.cameras[0]);
            Models.queue();
        }
        if (loop % 60 === 0) {
            Gamepad.connect();
        }


    },
    fullscreen: function() {
        let container = document.body;
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) { /* Firefox */
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { /* IE/Edge */
            container.msRequestFullscreen();
        }
    },
    export: function(data, filename) {

        if (!data) {
            console.error('Console.save: No data');
            return;
        }

        if (!filename) { filename = 'console.json'; }

        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4);
        }

        let blob = new Blob([data], { type: 'text/json' });
        let e = document.createEvent('MouseEvents');

        if (script.a) {
            window.URL.revokeObjectURL(script.a.href);
        }

        script.a = document.createElement('a');

        script.a.download = filename;
        script.a.href = window.URL.createObjectURL(blob);
        script.a.dataset.downloadurl = ['text/json', script.a.download, script.a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        script.a.dispatchEvent(e);

    }

};
let Microphone = {
    start: function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(function(stream) {
                Microphone.media_recorder = new MediaRecorder(stream);
                Microphone.data_chunks = [];
                Microphone.media_recorder.ondataavailable = Microphone.data_recorder;
                Microphone.media_recorder.onstop = Microphone.on_stop;
                Microphone.media_recorder.start();

                Microphone.context = new AudioContext();
                Microphone.source = context.createMediaStreamSource(stream);
                Microphone.processor = context.createScriptProcessor(1024, 1, 1);

                Microphone.source.connect(Microphone.processor);
                Microphone.processor.connect(Microphone.context.destination);

                Microphone.processor.onaudioprocess = function(event) {
                    // Do something with the data, e.g. convert it to WAV
                    console.log(e.inputBuffer);
                };

            }).catch(function(error) {
                console.error('The following getUserMedia error occured: ' + error);
            });
        } else {
            console.error('getUserMedia not supported on your browser!');
        }
    },
    data_recorder: function(event) {
        Microphone.data_chunks.push(event.data);
    },
    pause: function() {
        Microphone.media_recorder.pause();
    },
    resume: function() {
        Microphone.media_recorder.resume();
    },
    stop: function() {
        Microphone.media_recorder.stop();
    },
    on_stop: function(event) {
        let blob = new Blob(Microphone.data_chunks, { 'type': 'audio/ogg; codecs=opus' });
        Microphone.data_chunks = [];

        let audio_track = new Audio();
        audio_track.src = window.URL.createObjectURL(blob);

        if (!Microphone.audio_tracks) {
            Microphone.audio_tracks = [];
        }
        Microphone.audio_tracks.push(audio_track);
    }
};


let Console = {
    lines: [],
    initialize: function() {
        return Console;
    }
};

let Setting = {
    shoulder: {
        left: function() {
            let child = document.body.firstChild;
            document.body.removeChild(child);
            document.body.appendChild(child);
        },
        right: function() {
            let child = document.body.lastChild;
            document.body.removeChild(child);
            document.body.insertBefore(child, document.body.firstChild);
        }
    }

}


window.addEventListener("load", script.onload, false);
window.world = world;
window.ui = Ui;