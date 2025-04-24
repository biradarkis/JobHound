
document.addEventListener("DOMContentLoaded", setUp);

function setUp() {
    function areKeywordsValid() {
        const keywordsInput = document.getElementById("keywords");
        const keywords = keywordsInput.value.split(",").map(keyword => keyword.trim());
        const invalidKeywords = keywords.filter(keyword => !/^[a-zA-Z0-9]+$/.test(keyword));
        return { result: invalidKeywords.length === 0, invalidKeywords: invalidKeywords };

    }

    function areURLsValid() {
        const urlsInput = document.getElementById("urls");
        const urls = urlsInput.value.split(",").map(url => url.trim());
        const invalidURLs = urls.filter(url => !/^(https?:\/\/)?([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/.*)?$/.test(url));
        return { result: invalidURLs.length === 0, invalidURLs: invalidURLs };
    }

    chrome.storage.sync.get(["name", "apiKey"], (data) => {
        if (!data || !data.name || !data.apiKey) {

            const submitButton = document.getElementById("submitBtn");
            const nameInput = document.getElementById("name");
            const apiKeyInput = document.getElementById("api-key");
            const keywordsInput = document.getElementById("keywords");
            const urlsInput = document.getElementById("urls");
            submitButton.addEventListener("click", async () => {
                const areKeywordsValid = areKeywordsValid();
                const areURLsValid = areURLsValid();

                if (!nameInput.value || !apiKeyInput.value || !data.keywords || !data.urls) {
                    alert("Please fill in all fields correctly");
                    return;
                }
                if (!areKeywordsValid) {
                    alert(`Please enter valid keywords (alphanumeric characters only) Invalid Keywords : ${invalidKeywords.join(',')}`);
                    return;
                }
                if (!areURLsValid) {
                    alert(`Please enter valid URLs (valid URL format) Invalid URLs : ${invalidURLs.join(',')}`);
                    return;
                }
                const data = {
                    name: nameInput.value,
                    apiKey: apiKeyInput.value
                };
                console.log(data);
                await chrome.storage.sync.set(data);

            });
        }
        else {
           let data  =  JSON.parse(data);
           Object.entries(data).forEach(([key, value]) => {
            document.getElementById(key).value = value;
           });
        }
    });

}


