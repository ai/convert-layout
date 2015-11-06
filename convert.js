var replace = function (map) {
    return function (str) {
        return str.split('').map(function (i) {
            return map[i] || i;
        }).join('');
    };
};

module.exports = function (map) {
    var reverse = { };
    var full    = { };

    for ( var key in map ) {
        var value = map[key];
        full[key] = value;
        reverse[value] = key;

        var upper = key.toUpperCase();
        if ( upper !== key ) {
            full[upper] = value.toUpperCase();
            reverse[full[upper]] = upper;
        }
    }

    return { fromEn: replace(full), toEn: replace(reverse) };
};
