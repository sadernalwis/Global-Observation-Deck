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
    self.postMessage("");
};


self.onerror = function(message) {

};

let Sound = {
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
    },
    process: function(id, vectors) {
        let result = Touch.map.get(id);

        if (!result) {
            result = [];
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
                result.push({ minimum: 0.0, maximum: 0.0, scans: scans });
            });
            Touch.map.set(id, result);
        }

        vectors.forEach(function(vector, index) {
            Touch.scans.forEach(function(scan, pass) {

                let index_pass = result[index][pass];

                index_pass.accumulator.push(vector);

                if (index % scan === 0) {
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
                }
            })

        });
        self.postMessage(result);
    }
};