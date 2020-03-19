export let Utility = {
    url_encode: function (obj, prefix) {
        var str = [],
            p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p;
                var v = obj[p];
                str.push((v !== null && typeof v === "object") ?
                    Utility.url_encode(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    },
    setup_Array: function (x,l) {
        let arrayBuffer = new ArrayBuffer(1024 * 1024 * 32); // 32MB;
        let uInt8View = new Uint8Array(arrayBuffer);
        let originalLength = uInt8View.length;

        for (var i = 0; i < originalLength; ++i) {
            uInt8View[i] = x ? x : 0;
        }
        return uInt8View;
    },
    time: function () {
        var now = new Date();
        var time = /(\d+:\d+:\d+)/.exec(now)[0] + ':';
        for (var ms = String(now.getMilliseconds()), i = ms.length - 3; i < 0; ++i) {
            time += '0';
        }
        return time + ms;
    },

    seconds_since: function (since) {
        return (new Date() - since) / 1000.0;
    },

    bytes_to_MB: function (bytes) {
        return Math.round(bytes / 1024 / 1024);
    }



};
