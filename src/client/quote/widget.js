// This file is a quick solution for cleaner loading
// I wanted to use webpack to bundle all files (and use proper html and scss files)
// but didn't have the time.

(function () {
    const deps = ['currency-cache', 'api', 'bl', 'template'];
    let loadedCount = 0
    const head = document.querySelector('head');
    deps.forEach(name => {
        const e = document.createElement('script');
        e.src = `/quote/${name}.js`;
        e.onload = () => {
            loadedCount++;
            if (loadedCount === deps.length) {
                loadUiScript();
            }
        }
        head.appendChild(e);
    });

    function loadUiScript() {
        const e = document.createElement('script');
        e.src = '/quote/ui.js';
        head.appendChild(e);
    }
})();
