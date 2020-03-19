//import console = require("console");

//importScripts('shared.js');
const STAGNANT = 0,
    UP = 1,
    DOWN = 2;

self.onmessage = function(message) {

    let touch = message.data;
    if (touch.state === 1) {
        Touch.start(touch);
    } else if (touch.state === 2) {
        Touch.move(touch);
    } else if (touch.state === 3) {
        Touch.end(touch);
    }
    // self.postMessage("hello");
};


self.onerror = function(message) {

};

let Touch = {
    map: new Map(),
    scans: [1, 2, 4, 8],
    start: function(touch) {
        if (touch.isPrimary) {
            Touch.map = new Map();
        }
        Touch.process(touch.id, touch.vector);
    },
    move: function(touch) {
        Touch.process(touch.id, touch.vector);
    },
    end: function(touch) {
        Touch.process(touch.id, touch.vector);
        self.postMessage(Touch.map.get(touch.id));
        Touch.map.delete(touch.id);
    },
    process: function(id, vectors) {
        let result = Touch.map.get(id);

        if (!result) {
            result = { length: 0, data: [] };
            vectors.forEach(function() {
                let scans = [];
                Touch.scans.forEach(function() {
                    scans.push({
                        accumulator: [],
                        average: Math.log2(0),
                        direction: UP,
                        signature: [
                            [0, 0]
                        ]
                    });
                });
                result.data.push({ minimum: 0.0, maximum: 0.0, scans: scans });
            });
            Touch.map.set(id, result);
        }
        result.length++;
        vectors.forEach(function(vector, index) {
            Touch.scans.forEach(function(scan, pass) {
                let index_pass = result.data[index].scans[pass];

                index_pass.accumulator.push(vector);

                if (result.length % scan === 0) {
                    let average = index_pass.accumulator.reduce(function(accumulator, currentValue) {
                        return accumulator + currentValue;
                    }, 0.0) / index_pass.accumulator.length;
                    index_pass.accumulator = [];

                    let difference = average - index_pass.average;

                    if (difference > 0) {
                        if (index_pass.direction === UP) {
                            index_pass.signature[0][0] += difference;
                            index_pass.signature[0][1]++;
                        } else if (index_pass.direction === DOWN) {
                            index_pass.direction = UP;
                            index_pass.signature.unshift([difference, 1]);
                        }

                    } else if (difference === 0) {

                        index_pass.signature[0][1]++;

                    } else if (difference < 0) {
                        if (index_pass.direction === UP) {
                            index_pass.direction = DOWN;
                            index_pass.signature.unshift([difference, 1]);
                        } else if (index_pass.direction === DOWN) {
                            index_pass.signature[0][0] += difference;
                            index_pass.signature[0][1]++;
                        }
                    }
                    index_pass.average = average;
                } else {

                }
            })

        });
    }
};