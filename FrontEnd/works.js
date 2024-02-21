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
        const categoryId = work.categoryId

        sectionwork.appendChild(workelement)
        workelement.appendChild(imageelement)
        workelement.appendChild(nomelement)
    }
}
genererwork(works);


const boutontous = document.querySelector(".tous");
boutontous.addEventListener("click", function(){
     const tous = works.filter(function (work) {
        return [1,2,3].includes(work.categoryId)
    })
    document.querySelector(".gallery").innerHTML = "";
    genererwork(tous)
})


const boutonobjets = document.querySelector(".objets");
boutonobjets.addEventListener("click", function(){
    const objets = works.filter(function (work) {
        return work.categoryId == 1;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererwork(objets)
})

const boutonappartements = document.querySelector(".appartements");
boutonappartements.addEventListener("click", function(){
    const appartements = works.filter(function (work) {
        return work.categoryId == 2;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererwork(appartements)
})

const boutonHR = document.querySelector(".HR");
boutonHR.addEventListener("click", function(){
    const HR = works.filter(function (work) {
        return work.categoryId == 3;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererwork(HR)
})



