import {
  ACCESS_TOKEN_ENUM,
  MESSAGE_ENUMS,
  STORAGED_ENUM,
} from "../content-script/src/types/global.types";
import { getAccessTokenRequest } from "../content-script/src/api";
import { getTimeDifferenceForToken } from "../content-script/src/utils/getTimeDifference";

chrome.webNavigation.onHistoryStateUpdated.addListener(
  (details) => {
    // Send a message to the content script with the new URL
    chrome.tabs.sendMessage(details.tabId, { url: details.url });
  },
  { url: [{ urlMatches: ".*" }] },
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == MESSAGE_ENUMS.HANDLE_LOGIN_TRIGGERED) {
    const { clientId, crmUrl, tenantId, challenge } = request.options;
    chrome.storage.sync.set({
      clientId: clientId,
      crmUrl: crmUrl,
      tenantId: tenantId,
      challenge: challenge,
    });
    const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:5678&response_mode=query&scope=${crmUrl}/.default&state=SrwhVCiM7ELA&code_challenge=${challenge}&code_challenge_method=S256&prompt=login`;
    chrome.identity.launchWebAuthFlow(
      { url: authUrl, interactive: true },
      () => {},
    );
  }
  console.log("Received message from " + sender + ": ", request);
  sendResponse({ received: true }); //respond however you like
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, { message: MESSAGE_ENUMS.TAB_UPDATED });
    const params = new URLSearchParams(new URL(changeInfo.url).search);
    const code = params.get("code");
    if (params.get("error")) {
      chrome.runtime.sendMessage({
        action: MESSAGE_ENUMS.SOMETHING_WENT_WRONG,
        data: params.get("error_description"),
      });
    }
    if (code && code.includes("0.AV")) {
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
          chrome.tabs.sendMessage(tab.id ? tab.id : 123, {
            message: MESSAGE_ENUMS.ACCESS_TOKEN_GOES_BACK,
            code: code,
          });
        });
      });
      chrome.storage.sync.set({ refreshTime: `${new Date()}` });
      // getAccessToken(code, ACCESS_TOKEN_ENUM.BASIC);
    }
  }
});

setInterval(async () => {
  try {
    const response = await chrome.storage.sync.get("refreshTime");
    if (response.refreshTime) {
      const timeDifference = getTimeDifferenceForToken(
        new Date(response.refreshTime),
      );
      // Check timeDifference and try to send a message
      if (timeDifference >= 7) {
        chrome.tabs.query({}, function (tabs) {
          tabs.forEach(function (tab) {
            chrome.tabs.sendMessage(tab.id ? tab.id : 123, {
              message: MESSAGE_ENUMS.LOGOUT,
            });
          });
        });
      }

      if (timeDifference > 2) {
        chrome.tabs.query({}, function (tabs) {
          tabs.forEach(function (tab) {
            chrome.tabs.sendMessage(tab.id ? tab.id : 123, {
              message: MESSAGE_ENUMS.REFRESS_TOKEN,
            });
          });
        });
      }
    }
  } catch (error) {
    console.error("Error fetching refreshTime or sending message:", error);
  }
}, 360000);
