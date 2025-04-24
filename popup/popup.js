document.addEventListener('DOMContentLoaded', () => {
    const configBtn = document.getElementById('configBtn');
    configBtn.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });
});