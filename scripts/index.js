const popup          = document.querySelector('.popup');
const popup__form    = document.querySelector('.popup__form');
let author           = document.querySelector('.profile__author');
let author_subline   = document.querySelector('.profile__author-subline');

const editBtn        = document.querySelector('.edit-btn');
const closeBtn       = document.querySelector('.popup__close-btn');
const submitBtn      = document.querySelector('.popup__submit-btn');

let authorElement = document.querySelectorAll('input')[0];
let author_sublineElement = document.querySelectorAll('input')[1];

function openPopup(){ 
    authorElement.value         = author.textContent;
    author_sublineElement.value = author_subline.textContent;
    popup.classList.add('popup_opened');  
}

function closePopup(){ 
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(event){
    event.preventDefault();
    author.textContent         =  authorElement.value; 
    author_subline.textContent =  author_sublineElement.value; 
    closePopup();
}
popup__form.addEventListener('submit', formSubmitHandler);
editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click',closePopup);
popup.addEventListener('click',closePopup);
popup__form.addEventListener('click',function(event){
   event.stopPropagation();
});


