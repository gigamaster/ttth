// via hamsket
Object.defineProperty(navigator.serviceWorker,"register",{value:()=>Promise.reject()});



const {ipcRenderer} = require("electron");


/**
* @name serviceMicrosoftTeamsGetUnreadMessageCount
* @summary Gets the amount of unread messages of the service Teams
* @description Gets the amount of unread messages of the service Teams
*/
function serviceMicrosoftTeamsGetUnreadMessageCount()
{
    console.log("serviceMicrosoftTeamsGetUnreadMessageCount ::: Checking unread message count");

    // via: https://github.com/meetfranz/Microsoft-Teams/blob/master/webview.js
    let count = 0;
    const badge = document.querySelector(".activity-badge.dot-activity-badge .activity-badge");
    if (badge) 
    {
        const value = parseInt(badge.innerHTML, 10);

        if (!isNaN(value)) 
        {
            count = value;
        }
    }

    console.log("serviceMicrosoftTeamsGetUnreadMessageCount ::: Total Microsoft Teams unread messages: " + count);

    ipcRenderer.sendToHost(count.toString());
    return count.toString();
}


ipcRenderer.on("request", function()
{
    ipcRenderer.sendToHost(serviceMicrosoftTeamsGetUnreadMessageCount());
});

