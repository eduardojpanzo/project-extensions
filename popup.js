document.addEventListener("DOMContentLoaded", () => {
  const statusText = document.getElementById("status");
  const toggleButton = document.getElementById("toggleButton");

  chrome.storage.local.get("isActive", (data) => {
    updateUI(data.isActive);
  });

  toggleButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "toggleExtension" }, (response) => {
      updateUI(response.isActive);
    });
  });

  function updateUI(isActive) {
    statusText.textContent = `Status: ${isActive ? "Ativado" : "Desativado"}`;
    toggleButton.textContent = isActive ? "Desativar" : "Ativar";
  }
});
