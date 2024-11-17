export function loadPage(pageFactoryFn, state) {
    const appRoot = document.getElementById('app-root');

    if (!appRoot) {
        console.error('Error: element id="app-root" was not found.');
        return;
    }

    const loadingText = document.createElement('div');
    loadingText.id = 'loading-text';
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Loading...';
    appRoot.innerHTML = '';
    appRoot.appendChild(loadingText);

    const page = pageFactoryFn(state);

    setTimeout(() => {
        if (page && page.root instanceof Node) {
            appRoot.innerHTML = '';
            appRoot.appendChild(page.root);
        } else {
            console.error('Incorrect page object:', page);
        }
    }, 500);
}
