// content.js

if (window.location.protocol === "https:") {
  console.log("A conexão é segura usando HTTPS.");
} else {
  console.log("A conexão não é segura. Está usando HTTP.");
}
