// background.js

const maliciousUrls = [
  "http://malicious.com",
  "http://phishing.com",
  "https://iqbroker.com/",
]; // Lista de URLs maliciosas

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: maliciousUrls.map((item, i) => ({
        id: i + 1,
        priority: i + 1,
        action: {
          type: "block",
        },
        condition: {
          urlFilter: item,
          resourceTypes: ["main_frame"],
        },
      })),
      removeRuleIds: maliciousUrls.map((_, i) => i + 1),
    },

    () => {
      console.log("ola como estas");
    }
  );
});
