let Credentials = {
    get_all: function(all) {
        all.forEach(function(key) {
            this[key] = prompt(`Enter your ${key}:`);
        });
    },
}