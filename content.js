chrome.storage.local.get("isActive", (data) => {
  if (data.isActive) {
    chrome.runtime.sendMessage(
      { action: "checkSite", url: window.location.href },
      (response) => {
        if (response.isMalicious) {
          const proceed = confirm(
            "Este site pode ser malicioso. Deseja continuar?"
          );
          if (!proceed) {
            window.location.href = "about:blank";
          }
        }
      }
    );
  }
});
