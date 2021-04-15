//modals
const profileModal = document.querySelector('.popup-profile');
const cardModal    = document.querySelector('.popup-card');
const previewModal = document.querySelector('.popup-preview');
//buttons
const openProfileModalBtn  = document.querySelector('.profile__edit-btn');
const closeProfileModalBtn = profileModal.querySelector('.popup__close-btn');
const openCardModalBtn     = document.querySelector('.profile__add-btn');
const closeCardModalBtn    = cardModal.querySelector('.popup__close-btn');
const closePreviewModalBtn = previewModal.querySelector('.popup__close-btn');

const sectionProfile = document.querySelector('.profile');
let author           = sectionProfile.querySelector('.profile__author');
let authorSubline    = sectionProfile.querySelector('.profile__author-subline');
let authorElement    = document.getElementById('authorElement');
let userName         = document.getElementById('UserName');

const sectionElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.elementTemplate').content.querySelector('.element');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  // генерируем карточки
  initialCards.forEach(card => {
    addCard(card, false);  
 });

function SubmitProfileModal(event){
    event.preventDefault();
    author.textContent         =  authorElement.value; 
    authorSubline.textContent  =  userName.value; 
    closeModal(profileModal);   
}

function SubmitCardModal(event){
  event.preventDefault();

  card = {};
  card.name = cardModal.querySelector('#cardName').value;
  card.link = cardModal.querySelector("#cardLink").value;

  addCard(card, true);
  closeModal(cardModal);
}

function deleteCard(evt){
  evt.currentTarget.parentElement.remove();
}

function openModal(modal){
    modal.classList.add('popup_opened');
}

function closeModal(modal){
  modal.classList.remove('popup_opened');
}

function openProfileModal(modal){
  authorElement.value = author.textContent;
  userName.value      = authorSubline.textContent;
  openModal(modal);
}

function openCardModal(modal){
  openModal(modal);
}

function openPreviewModal(evt){
  card     = evt.currentTarget.parentElement;    
  cardSrc  = card.querySelector('.element__pic').currentSrc;
  cardText = card.querySelector('.element__pic-name').textContent;

  elementImg     = previewModal.querySelector('.popup__img');
  elementText    = previewModal.querySelector('.popup__img-desc');

  elementImg.src          =  cardSrc;
  elementText.textContent = cardText;

  openModal(previewModal);
}

//добавляем карточку
function addCard(item, isEvent){

  //получаем карточку
  card = createCard(item);
 
  likeBtn   = element.querySelector('.element__like-btn');
  deletebtn = element.querySelector('.element__trash-btn');
  imgBtn    = element.querySelector('.element__pic');
  //подписываем события
  likeBtn.addEventListener('click', (evt) => toggleLikeBtn(evt));
  deletebtn.addEventListener('click', (evt) => deleteCard(evt));
  imgBtn.addEventListener('click', (evt) => openPreviewModal(evt));
  //визуализируем карточку
  renderCard(card, isEvent);
  
  }

function toggleLikeBtn(evt){
  evt.target.classList.toggle('element__like-btn_active');  
}

function createCard(card){
  element                        = elementTemplate.cloneNode(true);
  elementPicture                 = element.querySelector('.element__pic');

  elementPicture.src             = card.link;
  elementPicture.alt             = card.name;

  elementPictureName             = element.querySelector('.element__pic-name');
  elementPictureName.textContent = card.name;

  return element;
}

function renderCard(card, isEvent){
  if(isEvent){
    sectionElements.prepend(card);
  }
  else{
    sectionElements.append(card);
  }
}

//подписки на события
profileModal.addEventListener('submit', SubmitProfileModal);
openProfileModalBtn.addEventListener('click', () => openProfileModal(profileModal));
closeProfileModalBtn.addEventListener('click', () => closeModal(profileModal));

openCardModalBtn.addEventListener('click', () => openCardModal(cardModal));
closeCardModalBtn.addEventListener('click', () => closeModal(cardModal));
cardModal.addEventListener('submit',  SubmitCardModal);

closePreviewModalBtn.addEventListener('click', () => closeModal(previewModal));

