//refactoring code pour les likes
const foodsLike=document.getElementsByClassName('like-container');
for(const foodLike of foodsLike){
    foodLike.addEventListener('click',()=>{
        foodLike.classList.toggle('like');
    })
}


//function de calcul
const calculPrice=(price,qtty,element)=>{
    let total=price*qtty;
    const spanPrice=document.getElementById(element);
    spanPrice.innerHTML=total;
}
//Assigne les eventListener à chaque menu déroulant
//Dans le fichier HTML, j'ai rajouter des data-span et data-price dans les sélecteurs
const selectors=document.querySelectorAll('select');  //on récupère tous les select du document
for(const selector of selectors){
    selector.addEventListener('change',()=>{
        const price=selector.dataset.price;
        const element=selector.dataset.span;
        const qtty=selector.value;
        calculPrice(price,qtty,element);
    });
}
