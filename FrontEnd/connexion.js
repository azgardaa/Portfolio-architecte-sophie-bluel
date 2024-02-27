const form = document.getElementById("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const body = { email: email, password: password };
  const bodyjson = JSON.stringify(body);

  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyjson,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        const datajson = JSON.stringify(data);
        localStorage.setItem("data", datajson);
        window.location.href = "index.html";
      } else {
        alert("Identifiants invalides");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion :", error);
    });
});
