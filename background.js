const maliciousUrls = ["malicious.com", "phishing.com", "iqbroker.com"]; // Lista de URLs maliciosas

let isActive = true;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isActive: true });
  updateRules();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleExtension") {
    isActive = !isActive;
    chrome.storage.local.set({ isActive });
    updateRules();
    sendResponse({ isActive });
  } else if (message.action === "checkSite") {
    const url = new URL(message.url);
    const isMalicious = maliciousUrls.some((site) =>
      url.hostname.includes(site)
    );
    sendResponse({ isMalicious });
  }
});

chrome.storage.local.get("isActive", (result) => {
  if (result.isActive !== undefined) {
    isActive = result.isActive;
    updateRules();
  }
});

function updateRules() {
  if (isActive) {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        addRules: maliciousUrls.map((item, i) => ({
          id: i + 1,
          priority: 1,
          action: {
            type: "redirect",
            redirect: {
              extensionPath: "/blocked.html",
            },
          },
          condition: {
            urlFilter: `*://${item}/*`,
            resourceTypes: ["main_frame"],
          },
        })),
        removeRuleIds: maliciousUrls.map((_, i) => i + 1),
      },
      () => {
        console.log("Rules updated: extension is active.");
      }
    );
  } else {
    chrome.declarativeNetRequest.updateDynamicRules(
      {
        addRules: [],
        removeRuleIds: maliciousUrls.map((_, i) => i + 1),
      },
      () => {
        console.log("Rules cleared: extension is inactive.");
      }
    );
  }
}
