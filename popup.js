document.getElementById("changeColor").addEventListener("click", () => {
  checkSSL();
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => (document.body.style.backgroundColor = "blue"),
    });
  });
});

function checkSSL() {
  const url = new URL(window.location.href);
  if (url.protocol === "https:") {
    console.log("Conexão segura (HTTPS) detectada.");
  } else {
    console.log("Conexão não segura (HTTP) detectada.");
  }
}

function handleToggleActiveExtensions(event) {
  console.log(event.target.checked);
}
