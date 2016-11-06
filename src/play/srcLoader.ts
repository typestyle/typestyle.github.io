export const getSource = () => decodeURI(window.location.hash.substr(1));
export const setSource = (source: string) => {
    // http://stackoverflow.com/questions/12381563/how-to-stop-browser-back-button-using-javascript
    const hash = '#' + encodeURI(source);
    window.location.hash = hash;
    window.location.hash = "Again-No-back-button"; // again because google chrome don't insert first hash into history
    window.location.hash = hash;
    window.onhashchange = function() { window.location.hash = hash }
}

/**
 * http://stackoverflow.com/a/11654596/390330
 */
function updateQueryString(key: string, value: string) {
    let url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}