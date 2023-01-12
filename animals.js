//Variables globales
let defaultAction = 'add';
let idModifyCard = 0;

/**
 * Fonction vidant les champs du formulaire 
 */
const emptyFields=()=>{
   document.getElementById('animal_name').value='';
   document.getElementById('animal_picture').value='';
   document.getElementById('description').value='';
}

/**
 * 
 * Supprime la carte avec l'ID fourni en paramètre
 * 
 * @param {*} child : l'ID dce la carte à supprimer
 */
const removeCard = (child) => {
    const childNode = document.getElementById(child);
    childNode.remove();
}

/**
 * 
 * Fonction permettant de modifier les informations d'une carte : Nom, photo, description
 * 
 * @param {*} animal Objet contenant les informations à modifier dans la carte
 * @param {*} id id de la carte à modifier
 */
const updateCard = (animal, id) => {
    //Récupération de la carte
    const CardToModify = document.getElementById(id);
    CardToModify.querySelector('h3').innerHTML=animal.name;
    CardToModify.querySelector('p').innerHTML=animal.description;
    CardToModify.querySelector('img').src=animal.picture
    //reset de l'action par défaut
    defaultAction = 'add';
    //Vide les champs du formulaire
    emptyFields();
}


/**
 * 
 * Stocke en variable gloable l'id de la carte à modifier et rempli les champs du formulaire avec les informations existantes dans la carte
 * 
 * @param {*} child id de la carte qui va être modifiée
 */
const modifyCardRequest = (child) => {
    //On stocke en mémoire l'id à modifier
    idModifyCard = child;
    //On récupère les valeurs dans la carte
    const CardToModify = document.getElementById(child);
    const cardName = CardToModify.querySelector('h3').innerHTML;
    //Description
    const cardDesc = CardToModify.querySelector('p').innerHTML;
    //Image
    const cardImg = CardToModify.querySelector('img').src;
    //Ici on rempli le formulaire avec les différentes valeurs
    //Le nom
    document.getElementById('animal_name').value = cardName;
    //La photo
    document.getElementById('animal_picture').value = cardImg;
    //La description
    document.getElementById('description').value = cardDesc;
}

/**
 * 
 * Ajoute une nouvelle carte dans le conteneur de carte et remplie les informations
 * 
 * @param {*} animal Objet contenant les informations à afficher dans la carte : nom, description, photo
 */

const createAnimalCard = (animal) => {
    //Générer l'ID
    const idCard = new Date().valueOf() + Math.random();
    //récupération du conteneur 
    const animalContainer = document.getElementById('animals-container');
    //Création du cardContainer
    const card = document.createElement('article');
    card.classList.add('flip-card');
    card.id = id = idCard;
    //création du inner card
    const innerCard = document.createElement('div');
    innerCard.classList.add('flip-card-inner');
    //Création de la face pile
    const frontCard = document.createElement('div');
    frontCard.classList.add('flip-card-front');
    //Création de la photo
    const animalPicture = document.createElement('img');
    animalPicture.classList.add('animal-picture');
    animalPicture.src = animal.picture;
    animalPicture.alt = animal.name;
    //ajout de l'image à la carte
    frontCard.appendChild(animalPicture);
    //création du dos de al carte
    const backCard = document.createElement('div');
    backCard.classList.add('flip-card-back');
    //création du titre
    const animalName = document.createElement('h3');
    animalName.innerHTML = animal.name;
    animalName.classList.add('animal-name');
    //Création de la description
    const animalDesc = document.createElement('p');
    animalDesc.innerHTML = animal.description;
    //ajout des éléments au dos de la carte
    backCard.appendChild(animalName);
    backCard.appendChild(animalDesc);
    //Ajout des faces de la carte au inner card
    innerCard.appendChild(frontCard);
    innerCard.appendChild(backCard);
    //ajout du innercard à la card
    card.appendChild(innerCard);
    //Création des boutons
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    const btnSupp = document.createElement('button');
    btnSupp.innerHTML = "Supprimer";
    //Ajouter le dataset
    btnSupp.dataset.id = idCard;
    btnSupp.addEventListener('click', (e) => {
        const CardToRemoveId = e.target.dataset.id;
        removeCard(CardToRemoveId);
    })
    btnContainer.appendChild(btnSupp);
    //Bouton modifier
    const btnModif = document.createElement('button');
    btnModif.innerHTML = "Modifier";
    btnModif.dataset.id = idCard;
    btnModif.addEventListener('click', (e) => {
        modifyCardRequest(e.target.dataset.id);
    })
    btnContainer.appendChild(btnModif);
    card.appendChild(btnContainer);
    //ajout de la carte au container
    animalContainer.appendChild(card);
    emptyFields();
}

//Permet de modifier la variable globale sur le clic du bouton modifier afin de savoir quel bouton on a cliqué
const modifyBtn = document.getElementById('modify-btn');
modifyBtn.addEventListener('click', () => {
    defaultAction = "mod";
})

//Initialisation de la page. On va chercher les informations dans un tableau stocké dans un autre fichier
for (let i = 0; i < animalList.length; i++) {
    createAnimalCard(animalList[i]);
}


const formAdd = document.querySelector('form');
formAdd.addEventListener('submit', (e) => {
    //On bloque l'envoi du formulaire
    e.preventDefault();
    //Récupérations des valeurs
    const newName = document.getElementById('animal_name').value;
    const newPicture = document.getElementById('animal_picture').value;
    const newDesc = document.getElementById('description').value;
    //check if values are OK
    if (newName != '' && newPicture != "" && newDesc != "") {
        const newAnimal = {
            name: newName,
            picture: newPicture,
            description: newDesc
        }
        //En fonction du bouton cliqué, on agit en conséquence
        switch (defaultAction) {
            case 'add': createAnimalCard(newAnimal); //Ajoute un animal
                break;
            case 'mod': updateCard(newAnimal, idModifyCard); //Modifie l'animal
                break;
            default: alert('Rien à faire');
        }
    }
    else
        alert('Veuillez remplir tous les champs');
})
