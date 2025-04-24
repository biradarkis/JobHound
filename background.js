chrome.runtime.onInstalled.addListener(() => {
    chrome.tabs.create({
        url: "signup/signup.html"
    });
});