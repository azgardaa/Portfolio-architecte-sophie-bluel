const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()

function genererwork(works) {
    for (let i = 0; i < works.length; i++){
        const work = works[i]
        const sectionwork = document.querySelector(".gallery")
        const workelement = document.createElement("figure")
        const imageelement = document.createElement("img")
        imageelement.src = work.imageUrl
        const nomelement = document.createElement("figcaption")
        nomelement.innerText = work.title

        sectionwork.appendChild(workelement)
        workelement.appendChild(imageelement)
        workelement.appendChild(nomelement)
    }
}
genererwork(works);

