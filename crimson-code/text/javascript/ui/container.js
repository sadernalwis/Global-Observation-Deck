import { Colors } from '../ui/color.js';

export let Container = { in: function(node, coords, selection) {
        if (node.children && node.children.length) {
            node.children.forEach(
                function(child) {
                    Container.in(child, coords, selection);
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
    draw: function(node, Ui) {

        let tmp = {};
        if (node.draw_board) {

            Ui.ctx2.fillStyle = `rgb(${0.8},${0.8},${0.8},${0.1})`;
            tmp.x = node.x - (node.width / 2);
            tmp.y = node.y - (node.height / 2);
            Ui.ctx2.fRect(tmp.x, tmp.y, node.width, node.height);
            node.draw_board.forEach(
                function(element) {
                    Container.draw(element, Ui);
                }
            );
        } else if (Ui.Icons && Ui.Icons.has(node.src)) {
            let blend = Ui.ctx2.globalCompositeOperation;
            Ui.ctx2.globalCompositeOperation = "lighter";
            tmp.icon = Ui.Icons.get(node.src);

            tmp.x = node.x - (node.width / 2);
            tmp.y = node.y - (node.height / 2);
            Ui.ctx2.drawImage(tmp.icon, tmp.x, tmp.y, node.width, node.height);
            Ui.ctx2.globalCompositeOperation = blend;

        } else if (parseInt(node.src)) {

            Ui.ctx2.textBaseline = 'middle';
            Ui.ctx2.textAlign = 'center';
            tmp.text = String.fromCharCode(parseInt(node.src));

            tmp.height = node.height
            Ui.ctx2.font = `${tmp.height}px mono`;
            tmp.width = Ui.ctx2.measureText(tmp.text).width;
            if (tmp.width > node.width) {
                Ui.ctx2.font = `${parseInt(node.width / tmp.width * tmp.height)}px mono`;
            }
            Ui.ctx2.fillText(tmp.text, node.x, node.y);

        } else if (Colors.css.includes(node.src)) {

            Ui.ctx2.fillStyle = node.src;
            tmp.x = node.x - (node.width / 2);
            tmp.y = node.y - (node.height / 2);
            Ui.ctx2.fRect(tmp.x, tmp.y, node.width, node.height);

        } else if (typeof node.src === 'string' && node.src !== "") {

            Ui.ctx2.fillStyle = `rgb(${0.0},${0.0},${1.0},${1.0})`;
            Ui.ctx2.textBaseline = 'middle';
            Ui.ctx2.textAlign = 'center';
            Ui.ctx2.font = `${node.height}px mono`;
            tmp.text = node.src;
            tmp.width = Ui.ctx2.measureText(tmp.text).width;
            if (tmp.width > node.width) {
                //tmp.text = node.src.substring(0, parseInt(node.width / (tmp.width / node.src.length)));

                let lines = Math.ceil(node.height / node.width);
                lines = (lines > tmp.text.length) ? tmp.text.length : lines;
                if (lines === 1 || tmp.text.length === 1) {
                    let h1 = node.height;
                    let w1 = tmp.width / tmp.text.length;
                    let w2 = node.width / tmp.text.length;
                    let h2 = w2 / w1 * h1;
                    Ui.ctx2.font = `${Math.floor(h2)}px mono`;
                    Ui.ctx2.fillText(tmp.text, node.x, node.y);

                } else {
                    let characters_per_line = Math.ceil(tmp.text.length / lines);
                    let pager = [];
                    for (let line = 0; line < lines; line++) {
                        let cursor_begin = line * characters_per_line;
                        let cursor_end = cursor_begin + characters_per_line;
                        if (cursor_end < tmp.text.length) {
                            pager.push(tmp.text.substring(cursor_begin, cursor_end));
                        } else {
                            pager.push(tmp.text.substring(cursor_begin, tmp.text.length));
                        }
                    }

                    let h1 = node.height;
                    let w1 = tmp.width / tmp.text.length;
                    let w2 = node.width / characters_per_line;
                    let h2 = w2 / w1 * h1;
                    Ui.ctx2.font = `${Math.floor(h2)}px mono`;

                    let page_height = h2 * pager.length;

                    if (page_height > node.height) {
                        w1 = Ui.ctx2.measureText(" ").width;
                        h1 = h2;
                        w2 = w1 / h1 * (node.height / pager.length);
                        h2 = w2 / w1 * h1;
                        Ui.ctx2.font = `${Math.floor(h2)}px mono`;
                    }
                    page_height = h2 * pager.length;
                    pager.forEach(
                        function(line, index) {
                            Ui.ctx2.fillText(
                                line,
                                node.x,
                                node.y - (page_height / 2) + (index * h2) + (h2 / 2));
                        }
                    );

                }
            } else {
                Ui.ctx2.fillText(tmp.text, node.x, node.y);
            }
        }


    },
    resize: function(node, ui_orientation) {

        let tmp = {};

        if (node.children && node.children.length) {
            if (node.layout[ui_orientation].vr_stops &&
                node.layout[ui_orientation].hc_stops &&
                node.layout[ui_orientation].vr_stops.length &&
                node.layout[ui_orientation].hc_stops.length) {
                if (node.children.length > (node.layout[ui_orientation].vr_stops.length - 2) * (node.layout[ui_orientation].hc_stops.length - 2)) {
                    tmp.overflow = true;
                }
            } else {
                let lines = Math.ceil(Math.sqrt(node.children.length)) + 1;
                node.layout[Ui.orientation].vr_stops = node.layout[Ui.orientation].hc_stops = Array(lines).fill(0).map(function(value, index, arr) { return index / (arr.length - 1); });
            }



            node.draw_board = [];

            for (let vr = 0; vr < (node.layout[ui_orientation].vr_stops.length - 1); vr++) {
                tmp.vr_stop_a = node.layout[ui_orientation].vr_stops[vr];
                tmp.vr_stop_b = node.layout[ui_orientation].vr_stops[vr + 1];
                tmp.height = (tmp.vr_stop_b - tmp.vr_stop_a) * node.height;
                tmp.margin_height = (node.margin_height) ? (tmp.height * node.margin_height) : 0.0;
                // tmp.y = tmp.margin_height + (tmp.height / 2);
                tmp.y = (tmp.height / 2);



                for (let hc = 0; hc < (node.layout[ui_orientation].hc_stops.length - 1); hc++) {
                    tmp.hc_stop_a = node.layout[ui_orientation].hc_stops[hc];
                    tmp.hc_stop_b = node.layout[ui_orientation].hc_stops[hc + 1];
                    tmp.width = (tmp.hc_stop_b - tmp.hc_stop_a) * node.width;
                    tmp.margin_width = (node.margin_width) ? (tmp.width * node.margin_width) : 0.0;
                    // tmp.x = tmp.margin_width + (tmp.width / 2);
                    tmp.x = (tmp.width / 2);


                    let rect = {
                        x: (node.x - (node.width / 2)) + (tmp.hc_stop_a * node.width) + tmp.x,
                        y: (node.y - (node.height / 2)) + (tmp.vr_stop_a * node.height) + tmp.y,
                        width: tmp.width - tmp.margin_width,
                        height: tmp.height - tmp.margin_height,
                        margin_width: node.margin_width,
                        margin_height: node.margin_height,
                        parent: node
                    };

                    let index = ((node.layout[ui_orientation].hc_stops.length - 1) * vr) + hc;
                    let last_index = ((node.layout[ui_orientation].vr_stops.length - 1) * (node.layout[ui_orientation].hc_stops.length - 1)) - 1;
                    if (tmp.overflow) {
                        if (index === 0) {
                            rect.src = null;
                            rect.state = 0;
                            rect.on = [
                                function() {
                                    rect.parent.children.unshift(rect.parent.children.pop());
                                    Container.resize(rect.parent, ui_orientation);
                                }
                            ];
                            node.draw_board.push(rect);
                        } else if (index === last_index) {
                            rect.src = null;
                            rect.state = 0;
                            rect.on = [
                                function() {
                                    rect.parent.children.push(rect.parent.children.shift());
                                    Container.resize(rect.parent, ui_orientation);
                                }
                            ];
                            node.draw_board.push(rect);
                        }
                    }

                    if (index < node.children.length) {

                        if (typeof node.children[index] === 'object') {
                            console.warn("drawing" + node.src);
                            node.children[index].x = rect.x;
                            node.children[index].y = rect.y;
                            node.children[index].width = rect.width;
                            node.children[index].height = rect.height;
                            Container.resize(node.children[index], ui_orientation);
                            node.draw_board.push(node.children[index]);
                        } else if (typeof node.children[index] === 'string') {
                            rect.src = node.children[index];
                            node.draw_board.push(rect);
                        }
                    }
                }
            }
        }
    },
    new: function(src, horizontal, vertical, children) {
        var instance = Object.create(Container);
    }
}