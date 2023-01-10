//récupération dans le dom du div "like"
const grillsLike=document.getElementById('grills-like');
grillsLike.addEventListener('click',()=>{
    grillsLike.classList.toggle('like');
})

//function de calcul
const calculPrice=(price,qtty,element)=>{
    let total=price*qtty;
    element.innerHTML=total;
}
const grillQuantitySelector=document.getElementById('grills-qtty');
const displayGrillPrice=document.getElementById('grills-price');
const grillPrice=20;
grillQuantitySelector.addEventListener('change',()=>{
    const qtty=grillQuantitySelector.value;
    calculPrice(grillPrice,qtty,displayGrillPrice);
})

const fishQuantitySelector=document.getElementById('fish-qtty');
const displayFishPrice=document.getElementById('fish-price');
const fishPrice=15;
fishQuantitySelector.addEventListener('change',()=>{
    const qtty=fishQuantitySelector.value;
    calculPrice(fishPrice,qtty,displayFishPrice);
})