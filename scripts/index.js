let popup            = document.querySelector('.popup');
let popupForm        = document.querySelector('.popup__form');
let author           = document.querySelector('.profile__author');
let authorSubline    = document.querySelector('.profile__author-subline');

let editBtn   = document.querySelector('.profile__edit-btn');
let closeBtn  = document.querySelector('.popup__close-btn');

let authorElement = document.getElementById('text-field1');
let UserName      = document.getElementById('text-field2');

function openPopup(){ 
    authorElement.value         = author.textContent;
    UserName.value = authorSubline.textContent;
    popup.classList.add('popup_opened');  
}

function closePopup(){ 
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(event){
    event.preventDefault();
    author.textContent         =  authorElement.value; 
    authorSubline.textContent =  UserName.value; 
    closePopup();
}
popupForm.addEventListener('submit', formSubmitHandler);
editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click',closePopup);


