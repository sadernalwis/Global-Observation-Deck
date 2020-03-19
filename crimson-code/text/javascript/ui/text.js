export let Text = {
    makeRange: function(n0, n1, a) {
        if (!a) {
            a = [];
        }
        for (; n0 < n1; n0++) {
            a.push(String.fromCharCode(n0));
        }
        return a;
    },
    draw: function(ctx) {
        ctx.font = "18px mono";
        ctx.textBaseline = "middle";

        var text = ctx.measureText('foo'); // TextMetrics object
        text.width; // 16;

        ctx.fillText(Text.makeRange(0x3b1, 0x3ca, []).join(''), 0, 100);
        ctx.fillText(Text.makeRange(0x391, 0x3a2, []).join(''), 0, 120);
        ctx.fillText(Text.makeRange(0x3a3, 0x3aa, []).join(''), 0, 140);

    },
    greek: {
        lower: function() {
            return Text.makeRange(0x3c3, 0x3ca, Text.makeRange(0x3b1, 0x3c2, []));
        },
        upper: function() {
            return Text.makeRange(0x3a3, 0x3aa, Text.makeRange(0x391, 0x3a2, []));
        }
    }
};