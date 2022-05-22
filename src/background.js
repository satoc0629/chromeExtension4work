let selectionText = ""
const backgroundService = () => {
    chrome.contextMenus.create(
        {
            "id": "translateDeppL",
            "contexts": ["selection"],
            "title": "DeepLで翻訳"
        }
    )
    chrome.contextMenus.create(
        {
            "id": "searchByEnglishGoogle",
            "contexts": ["selection"],
            "title": "英Googleで検索"
        }
    )
};

function openEGoogle(selectionText) {
    const url = `https://www.google.com/search?q=${selectionText}&hl=en`
    chrome.tabs.create({
        url: url
    })
}

function openDeepL(selectionText) {
    const url = `https://www.deepl.com/ja/translator#en/ja/${selectionText}`
    chrome.tabs.create({
        url: url
    })
}

const func = (info, tab) => {
    const selectionText = info.selectionText
    if (info.menuItemId === "translateDeppL") {
        openDeepL(selectionText)
    }
    if (info.menuItemId === "searchByEnglishGoogle") {
        openEGoogle(selectionText)
    }
}
chrome.contextMenus.onClicked.addListener(func)
chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case "translateDeppL":
            openDeepL(selectionText)
            break
        case "searchByEnglishGoogle":
            openEGoogle(selectionText)
            break
    }
    console.log(`Command "${command}" called selectionText:${selectionText}`);
});

function onMessageFunc(message, sender, sendResponse) {
    chrome.tabs.query({active: true}).then(tabs => {
        const tab = tabs[0]
        console.log(`selection text[${message.message}] update by sender:${sender.tab.id}, active.tab.id:${tab.id}`)

        if (sender.tab.id === tab.id) {
            selectionText = message.message
        }
    })
    return true
}

chrome.runtime.onMessage.addListener(onMessageFunc)
// chrome.runtime.onMessage.addListener(() => console.log(`onMessage called.`))
chrome.runtime.onInstalled.addListener(backgroundService);
chrome.runtime.onStartup.addListener();
chrome.runtime.onSuspend.addListener(() => console.log(`onSuspend called.`))
chrome.runtime.onSuspendCanceled.addListener(() => console.log(`onSuspendCanceled called.`))
chrome.runtime.onUpdateAvailable.addListener(() => console.log(`onUpdateAvailable called.`))
chrome.runtime.onRestartRequired.addListener(() => console.log(`onRestartRequired called.`))
chrome.runtime.onMessageExternal.addListener(() => console.log(`onMessageExternal called.`))
chrome.runtime.onConnectExternal.addListener(() => console.log(`onConnectExternal called.`))
chrome.runtime.onConnect.addListener(() => console.log(`onConnect called.`))
chrome.runtime.onBrowserUpdateAvailable.addListener(() => console.log(`onBrowserUpdateAvailable called.`))
// chrome OS
// chrome.runtime.onConnectNative.addListener(() => console.log(`onConnectNative called.`))
