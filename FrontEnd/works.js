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
      });
  }
  modalworks(url);
});

boutonajout.addEventListener("click", function (event) {
  event.preventDefault();
  contenu2.style.display = "flex";
  contenu1.style.display = "none";
});

function genererworkmodal(works) {
  for (let i = 0; i < works.length; i++) {
    const modalworks = document.querySelector(".gallerymodal");
    const modaldivwork = document.createElement("div");
    modaldivwork.classList.add("modalimage");
    const modalworkelement = document.createElement("img");
    modalworkelement.src = works[i].imageUrl;
    const supprimerbtn = document.createElement("i");
    supprimerbtn.classList.add("fa-solid", "fa-trash-can");

    modalworks.appendChild(modaldivwork);
    modaldivwork.appendChild(modalworkelement);
    modaldivwork.appendChild(supprimerbtn);
  }
}

const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
});
