
/*global chrome*/

const messagesFromReactAppListener = (message, sender, response) => {
    console.log('message receieved');
}

/**
 * Called when a message is sent from either extension process or a content script
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);