const url = "http://localhost:5678/api/works";

async function getWorks(url) {
  await fetch(url)
    .then((response) => {
      // On vérifie si le statut est en code 200
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (works) {
      genererwork(works);
      document.querySelectorAll(".btn").forEach((button) => {
        button.addEventListener("click", function () {
          const category = this.dataset.category;
          if (category == 0) {
            document.querySelector(".gallery").innerHTML = "";
            return genererwork(works);
          }
          const filterWorks = works.filter(
            (work) => work.categoryId == category
          );
          document.querySelector(".gallery").innerHTML = "";
          genererwork(filterWorks);
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function genererwork(works) {
  for (let i = 0; i < works.length; i++) {
    const sectionwork = document.querySelector(".gallery");
    const workelement = document.createElement("figure");
    const imageelement = document.createElement("img");
    imageelement.src = works[i].imageUrl;
    const nomelement = document.createElement("figcaption");
    nomelement.innerText = works[i].title;

    sectionwork.appendChild(workelement);
    workelement.appendChild(imageelement);
    workelement.appendChild(nomelement);
  }
}

getWorks(url);

const barreedition = document.querySelector(".edition");
const logout = document.querySelector(".logout");
const login = document.querySelector(".login");
const modalbtn = document.getElementById("modalbtn");

if (localStorage.getItem("data")) {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data.token) {
    barreedition.style.display = "content";
    logout.style.display = "contents";
    modalbtn.style.display = "contents";
    login.style.display = "none";
  } else {
    barreedition.style.display = "none";
    logout.style.display = "none";
    modalbtn.style.display = "none";
    login.style.display = "content";
  }
} else {
  barreedition.style.display = "none";
  logout.style.display = "none";
  modalbtn.style.display = "none";
  login.style.display = "contents";
}

logout.addEventListener("click", function () {
  localStorage.removeItem("data");
});

const modal = document.getElementById("modal");
const contenumodal = document.querySelector("modalcontent");
const boutonajout = document.getElementById("ajoutbtn");
const contenu1 = document.querySelector(".affichageworks");
const contenu2 = document.querySelector(".ajouterworks");

modalbtn.addEventListener("click", function (event) {
  event.preventDefault();
  modal.style.display = "flex";
  contenu1.style.display = "flex";
  contenu2.style.display = "none";
});

async function modalworks(url) {
  await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (works) {
      document.querySelector(".gallerymodal").innerHTML = "";
      genererworkmodal(works);
      /* gestion de la suppression des photos */
      const btnsuppr = document.querySelectorAll(".fa-trash-can");
      btnsuppr.forEach(async function (supprwork) {
        supprwork.addEventListener("click", async function (event) {
          event.preventDefault();
          event.stopPropagation();
          const data = JSON.parse(localStorage.getItem("data"));

          await fetch(`http://localhost:5678/api/works/${supprwork.value}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${data.token}` },
          })
            .then(async function (response) {
              if (response.ok) {
                supprwork.parentNode.remove();
                console.log("Suppression effectuée avec succès");
                majworks();
              } else {
                throw new Error("La suppression a échoué");
              }
            })
            .catch(async function (error) {
              console.error("Erreur lors de la suppression :", error);
            });
        });
      });
    });
}

modalworks(url);

/* generation travaux modal*/

function genererworkmodal(works) {
  for (let i = 0; i < works.length; i++) {
    const modalworks = document.querySelector(".gallerymodal");
    const modaldivwork = document.createElement("div");
    modaldivwork.classList.add("modalimage");
    const modalworkelement = document.createElement("img");
    modalworkelement.src = works[i].imageUrl;
    const supprimerbtn = document.createElement("i");
    supprimerbtn.classList.add("fa-solid", "fa-trash-can");
    supprimerbtn.value = works[i].id;

    modalworks.appendChild(modaldivwork);
    modaldivwork.appendChild(modalworkelement);
    modaldivwork.appendChild(supprimerbtn);
  }
}

/* bouton modal*/

boutonajout.addEventListener("click", function (event) {
  event.preventDefault();
  contenu2.style.display = "flex";
  contenu1.style.display = "none";
  document.querySelector(".photopreview").innerHTML = "";
  document.getElementById("Titre").value = "";
  btnphoto.style.display = "block";
  document.getElementById("categorie").value = "";
});
const btnretour = document.querySelector(".fa-arrow-left");
btnretour.addEventListener("click", function (event) {
  event.preventDefault();
  contenu1.style.display = "flex";
  contenu2.style.display = "none";
});

/* Evenement de fermeture*/

modal.addEventListener("click", function (event) {
  if (event.target === modal || event.target === contenumodal) {
    modal.style.display = "none";
  }
});

const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
});

/* previsualisation de la photo */

const file = document.querySelector(".file");
const preview = document.querySelector(".photopreview");
const btnphoto = document.querySelector(".btnphoto");

file.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imgElement = document.createElement("img");
      imgElement.src = e.target.result;
      imgElement.classList.add("previewimage");
      preview.innerHTML = "";
      preview.appendChild(imgElement);
    };
    reader.readAsDataURL(this.files[0]);
    btnphoto.style.display = "none";
  }
});

/* gestion de l'ajout des photos */

const form = document.getElementById("formajout");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const titre = document.getElementById("Titre").value;
  const categorie = document.getElementById("categorie").value;
  const photo = document.querySelector(".file").files[0];
  const data = JSON.parse(localStorage.getItem("data"));
  const formData = new FormData();
  formData.append("title", titre);
  formData.append("category", categorie);
  formData.append("image", photo);
  console.log(formData);

  fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        contenu1.style.display = "flex";
        contenu2.style.display = "none";
        majworksmodal();
        majworks();
      } else {
        throw new Error("Erreur lors de la création de la ressource");
      }
    })
    .then((data) => {
      console.log("Ressource créée avec succès :", data);
    })
    .catch((error) => {
      console.error("Erreur :", error);
    });
});

/* Mise a jour des elements du dom hors modal*/
function majworks() {
  document.querySelector(".gallery").innerHTML = "";
  getWorks(url);
}

/* Mise a jour des elements du dom modal*/
function majworksmodal() {
  document.querySelector(".gallery").innerHTML = "";
  modalworks(url);
}
