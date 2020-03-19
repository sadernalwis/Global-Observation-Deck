export let Console = {
    article: {},
    path: [],
    query: function(obj, prefix, lines) {
        var k;
        if (Array.isArray(obj)) {
            //k = prefix ?  "is " + p + " a " + prefix : p;
            obj.forEach(function(element) {
                k = (prefix) ? prefix + " " + element : element + "?";
                Line.query(element, prefix, lines);
            });
        } else if (typeof obj === "object") {
            for (let p in obj) {
                if (obj.hasOwnProperty(p)) {
                    Line.query(obj[p], p, lines);
                }
            }
        } else if (typeof obj === "string") {
            k = (prefix) ? prefix + " " + obj : obj;
            lines[k] = prompt(k + "?");
        }

    },

};