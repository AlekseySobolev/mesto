//modals
const profileModal = document.querySelector('.popup-profile');
const cardModal = document.querySelector('.popup-card');
const previewModal = document.querySelector('.popup-preview');

//buttons
const ProfileModalOpenBtn = document.querySelector('.profile__edit-btn');
const ProfileModalCloseBtn = profileModal.querySelector('.popup__close-btn');
const CardModalOpenBtn = document.querySelector('.profile__add-btn');
const CardModalCloseBtn = cardModal.querySelector('.popup__close-btn');
const PreviewModalCloseBtn = previewModal.querySelector('.popup__close-btn');

const popupList = document.querySelectorAll('.popup');
const sectionProfile = document.querySelector('.profile');
const author = sectionProfile.querySelector('.profile__author');
const authorSubline = sectionProfile.querySelector('.profile__author-subline');
//const authorElement = document.getElementById('authorElement');
const authorElement = profileModal.querySelectorAll('.popup__text-field')[0];
//const userName = document.getElementById('UserName');
const userName = profileModal.querySelectorAll('.popup__text-field')[1];

const sectionElements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.elementTemplate').content.querySelector('.element');


function closeModal(modal) {
  document.removeEventListener('keydown', closeOnEsc);
  modal.classList.remove('popup_opened');
}

function openModal(modal) {
  document.addEventListener('keydown', closeOnEsc);
  modal.classList.add('popup_opened');
}

function createCard(card) {
  const element            = elementTemplate.cloneNode(true);
  const elementPicture     = element.querySelector('.element__pic');
  const elementPictureName = element.querySelector('.element__pic-name');

  elementPicture.src             = card.link;
  elementPicture.alt             = card.name;
  elementPictureName.textContent = card.name;

  return element;
}

function renderCard(card, isEvent) {
  if (isEvent) {
    sectionElements.prepend(card);
  }
  else {
    sectionElements.append(card);
  }
}

//добавляем карточку
function addCard(item, isEvent) {

  //получаем карточку
  const card = createCard(item);

  const likeBtn = card.querySelector('.element__like-btn');
  const deletebtn = card.querySelector('.element__trash-btn');
  const imgBtn = card.querySelector('.element__pic');
  //подписываем события
  likeBtn.addEventListener('click', (evt) => toggleLikeBtn(evt));
  deletebtn.addEventListener('click', (evt) => deleteCard(evt));
  imgBtn.addEventListener('click', (evt) => openPreviewModal(evt));
  //визуализируем карточку
  renderCard(card, isEvent);

}

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

function submitProfileModal(event) {
  event.preventDefault();

  author.textContent        = authorElement.value;
  authorSubline.textContent = userName.value;

  event.target.reset();
  closeModal(profileModal);

}

function SubmitCardModal(event) {
  event.preventDefault();

  const card = {};
  card.name  = cardModal.querySelector('#cardName').value;
  card.link  = cardModal.querySelector("#cardLink").value;

  addCard(card, true);
  event.target.reset();
  event.target.lastElementChild.classList.add('popup__submit-btn_unactive');
  closeModal(cardModal);

}

function deleteCard(evt) {
  evt.currentTarget.parentElement.remove();
}

function openProfileModal(modal) {
  authorElement.value = author.textContent;
  userName.value      = authorSubline.textContent;
  openModal(modal);
}

function openCardModal(modal) {
  openModal(modal);
}

function openPreviewModal(evt) {
  const card     = evt.currentTarget.parentElement;
  const cardSrc  = card.querySelector('.element__pic').currentSrc;
  const cardText = card.querySelector('.element__pic-name').textContent;

  const elementImg  = previewModal.querySelector('.popup__img');
  const elementText = previewModal.querySelector('.popup__img-desc');

  elementImg.src          = cardSrc;
  elementText.textContent = cardText;
  elementImg.alt          = cardText; 

  openModal(previewModal);
}

function toggleLikeBtn(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

function closeOnEsc(event) {
  if (event.key === 'Escape') {
    popupList.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closeModal(popup);
      }
    });
  }
}

function closeOnOverley(event) {
  if (event.target.classList.contains('popup_opened')) {
    closeModal(event.target);
  }
}

//подписки на события
profileModal.addEventListener('submit', submitProfileModal);
profileModal.addEventListener('click', closeOnOverley);
ProfileModalOpenBtn.addEventListener('click', () => openProfileModal(profileModal));
ProfileModalCloseBtn.addEventListener('click', () => closeModal(profileModal));

CardModalOpenBtn.addEventListener('click', () => openCardModal(cardModal));
CardModalCloseBtn.addEventListener('click', () => closeModal(cardModal));
cardModal.addEventListener('submit', SubmitCardModal);
cardModal.addEventListener('click', closeOnOverley);

previewModal.addEventListener('click', closeOnOverley);
PreviewModalCloseBtn.addEventListener('click', () => closeModal(previewModal));

// генерируем карточки
initialCards.forEach(card => {
  addCard(card, false);
});

