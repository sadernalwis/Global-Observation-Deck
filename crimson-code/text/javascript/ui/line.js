export let Line = {
    words: [],
    stamps: [],
    count: function() {
        return words.length;
    },
    unicode: function(u) {},
    character: function(word) {
        if (word === " ") {

        } else if (word === ".") {

        } else if (word === "?") {

        } else if (word === "!") {

        } else {
            Line.words.push(word);
        }
    },
    space: function() {},
    backspace: function() {},
    period: function() {},
    comma: function() {},
    question: function() {},
    exclamation: function() {},
    verify: function() {
        // let form = new FormData();
        // form.append('triangle1.obj', new Blob([obj]));
        // console.log("fetching");
        // fetch('/Ruby/xyztem', {
        //     method: 'POST',
        //     body: form
        // }).then(response => {

        //     console.log("fetched");
        //     return response.blob();
        // });
    },
    query2: function(obj, prefix, lines) {
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k;
                if (Array.isArray(obj[p])) {
                    //k = prefix ?  "is " + p + " a " + prefix : p;
                    obj[p].forEach(function(element, index) {
                        Line.query(element, p + " " + element, lines);
                    });
                    alert(obj[p]);
                } else if (typeof obj[p] === "object") {
                    Line.query(obj[p], p, lines);
                } else if (typeof obj[p] === "string") {
                    k = (prefix) ? prefix + " " + p : p;
                    lines[k] = prompt(k + "?");
                }
                var v = obj[p];
            }
        }
    },
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

}