import { Colors } from '../ui/color.js';
import { Text } from '../ui/text.js';
import { Line } from '../ui/line.js';

export let Layout = {
    init_gradient: function() {
        let color_stops = Array(Colors.prime.length + 1).fill(0).map(function(value, index, arr) { return index / (arr.length - 1); });
        Layout.gradient = {
            src: "gradient",
            children: Colors.prime,
            layout: {
                vertical: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: color_stops
                },
                horizontal: {
                    vr_stops: color_stops,
                    hc_stops: [0.0, 1.0]
                }
            }
        };
    },
    init_glyphs: function(icons) {

        let glyph_set;
        if (icons) {
            glyph_set = icons;
        } else {
            glyph_set = Text.greek.lower();
        }
        let glyph_vr_stops = Array(4).fill(0).map(function(value, index, arr) { return index / (arr.length - 1); });
        let glyph_hc_stops = Array(9).fill(0).map(function(value, index, arr) { return index / (arr.length - 1); });

        Layout.glyphs = {
            src: "glyphs",
            children: glyph_set,
            layout: {
                vertical: {
                    vr_stops: glyph_vr_stops,
                    hc_stops: glyph_hc_stops
                },
                horizontal: {
                    vr_stops: glyph_vr_stops,
                    hc_stops: glyph_hc_stops
                }
            },
            margin_width: 0.5,
            margin_height: 0.5
        };
    },
    init_symbols: function() {
        let symbol_set = ['X', 'Y', 'Z', 'T', 'E', 'M'];
        let symbol_stops = Array(symbol_set.length + 1).fill(0).map(function(value, index, arr) { return index / (arr.length - 1); });

        Layout.symbols = {
            src: "symbols",
            children: symbol_set,
            layout: {
                vertical: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: symbol_stops
                },
                horizontal: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: symbol_stops
                }
            }
        };

    },
    init_functions: function() {
        let function_set = ['Black', 'Grey'];
        let function_stops = Array(function_set.length + 1).fill(0).map(function(value, index, arr) { return index / (arr.length - 1); });

        Layout.functions = {
            src: "functions",
            children: function_set,
            layout: {
                vertical: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: function_stops
                },
                horizontal: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: function_stops
                }
            }
        };

    },
    init_operators: function() {
        let operator_set = ['+', '-', '*', '/'];
        let operator_stops = Array(operator_set.length + 1).fill(0).map(function(value, index, arr) { return index / (arr.length - 1); });

        Layout.operators = {
            src: "operators",
            children: operator_set,
            layout: {
                vertical: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: operator_stops
                },
                horizontal: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: operator_stops
                }
            }
        };

    },
    init_q1: function() {
        Layout.quadrant_1 = {
            src: "",
            children: [],
            layout: {
                vertical: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: [0.0, 1.0]
                },
                horizontal: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: [0.0, 1.0],
                }
            }
        };


    },
    init_q2: function() {
        let q2_set = [Layout.glyphs];
        let q2_stops = [0.0, 1.0];

        Layout.quadrant_2 = {
            src: "quadrant_2",
            children: q2_set,
            layout: {
                vertical: {
                    vr_stops: q2_stops,
                    hc_stops: q2_stops
                },
                horizontal: {
                    vr_stops: q2_stops,
                    hc_stops: q2_stops
                }
            }
        };
    },
    init_q3: function() {
        // Layout.quadrant_3 = {
        //     src: "",
        //     children: [],
        //     layout: {
        //         vertical: {
        //             vr_stops: [0.0, 1.0],
        //             hc_stops: [0.0, 1.0]
        //         },
        //         horizontal: {
        //             vr_stops: [0.0, 1.0],
        //             hc_stops: [0.0, 1.0],
        //         }
        //     }
        // };
        Layout.quadrant_3 = Layout.init2();


    },
    init_q4: function() {
        let q4_set = [Layout.symbols, Layout.functions, Layout.operators];
        let q4_vr_stops = [0.0, 0.2, 0.8, 1.0];

        Layout.quadrant_4 = {
            src: "quadrant_4",
            children: q4_set,
            layout: {
                vertical: {
                    vr_stops: q4_vr_stops,
                    hc_stops: [0.0, 1.0]
                },
                horizontal: {
                    vr_stops: q4_vr_stops,
                    hc_stops: [0.0, 1.0],
                }
            }
        };

    },
    init_quadrants: function() {
        let quadrant_set = [Layout.quadrant_1, Layout.quadrant_2, Layout.quadrant_3, Layout.quadrant_4];
        Layout.quadrants = {
            src: "quadrants",
            children: quadrant_set,
            layout: {
                vertical: {
                    vr_stops: [0.0, 0.25, 0.5, 0.75, 1.0],
                    hc_stops: [0.0, 1.0]
                },
                horizontal: {
                    vr_stops: [0.0, 0.5, 1.0],
                    hc_stops: [0.0, 0.5, 1.0],
                }
            }
        };

    },
    init_root: function() {
        Layout.root = {
            src: "root",
            children: [Layout.gradient, Layout.quadrants],
            layout: {
                vertical: {
                    vr_stops: [0.0, 0.07, 1.0],
                    hc_stops: [0.0, 1.0]
                },
                horizontal: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: [0.0, 0.07, 1.0],
                }
            }
        }
        return Layout.root;
    },
    init: function(icons) {
        this.init_gradient();
        this.init_glyphs(icons);
        this.init_symbols();
        this.init_functions();
        this.init_operators();
        this.init_q1();
        this.init_q2();
        this.init_q3();
        this.init_q4();
        this.init_quadrants();

        return this.init_root();
    },
    init2: function(obj) {


        let line = {};
        Line.query({ male: "", female: "", symptoms: ["nausea", "headache", "running nose", "IBS", "shiver"] }, null, line);


        let children = [];
        for (let key in line) {
            children.push(key + " : " + line[key]);
        }

        let vr_stops = Array(children.length + 1).fill(0).map(function(value, index, arr) { return index / (arr.length - 1); });
        let root = {
            src: "root",
            children: children,
            layout: {
                vertical: {
                    vr_stops: vr_stops,
                    hc_stops: [0.0, 1.0],
                },
                horizontal: {
                    vr_stops: vr_stops,
                    hc_stops: [0.05, 0.5]
                }
            }
        }
        return root;
    }

};
let H1 = {
    initialize: function() {
        let color_stops = Array(Colors.prime.length + 1).fill(0).map(function(value, index, arr) { return index / (arr.length - 1); });
        let container = {
            src: "gradient",
            children: Colors.prime,
            layout: {
                vertical: {
                    vr_stops: [0.0, 1.0],
                    hc_stops: color_stops
                },
                horizontal: {
                    vr_stops: color_stops,
                    hc_stops: [0.0, 1.0]
                }
            }
        };
        return container;
    }
};

let H2 = {
    initialize: function() {
        let container = {
            src: "quadrants",
            children: [Q1.initialize(), Q2.initialize(), Q3.initialize(), Q4.initialize()],
            layout: {
                vertical: {
                    vr_stops: [0.0, 0.25, 0.5, 0.75, 1.0],
                    hc_stops: [0.0, 1.0]
                },
                horizontal: {
                    vr_stops: [0.0, 0.5, 1.0],
                    hc_stops: [0.0, 0.5, 1.0],
                }
            }
        };
        return container;
    }
};

let Q1 = {
    initialize: function() {
        let container = {
            src: "articles",
            children: [this.get_parent_article(), this.get_current_article(), this.get_sub_article()],
            layout: {
                vertical: {
                    vr_stops: [0.0, 0.25, 0.5, 1.0],
                    hc_stops: [0.0, 1.0]
                },
                horizontal: {
                    vr_stops: [0.0, 0.25, 0.5, 1.0],
                    hc_stops: [0.0, 1.0]
                }
            }
        };
        return container;
    },
    get_parent_article: function() {
        let levels = Layout.console.path.length;
        if (levels === 0) {

        } else if (levels === 1) {

        } else if (levels === 2) {

        } else if (levels === 3) {

        } else if (levels > 3) {

        }

    },
    get_current_article: function() {},
    get_sub_article: function() {}

};
let Q2 = {

};
let Q3 = {

};
let Q4 = {

};