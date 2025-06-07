// main.js

const priceImages = [
  'img/price1.jpeg',
  'img/price2.jpeg',
  'img/price3.jpeg'
];
let currentIndex = 0;

const popup = document.getElementById('price-popup');
const popupImg = document.getElementById('popup-img');
const closeBtn = document.querySelector('.popup__close');
const leftArrow = document.querySelector('.popup__arrow--left');
const rightArrow = document.querySelector('.popup__arrow--right');
const overlay = document.querySelector('.popup__overlay');

// Открытие popup по клику на картинку
if (document.querySelectorAll('.price-list__images img').length) {
  document.querySelectorAll('.price-list__images img').forEach((img, idx) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      currentIndex = idx;
      popupImg.src = priceImages[currentIndex];
      popup.style.display = 'flex';
    });
  });
}

// Закрытие popup
function closePopup() {
  popup.style.display = 'none';
  popupImg.classList.remove('zoomed');
}
closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);
document.addEventListener('keydown', (e) => {
  if (popup.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) closePopup();
});

// Перелистывание стрелками
leftArrow.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + priceImages.length) % priceImages.length;
  popupImg.src = priceImages[currentIndex];
  popupImg.classList.remove('zoomed');
});
rightArrow.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % priceImages.length;
  popupImg.src = priceImages[currentIndex];
  popupImg.classList.remove('zoomed');
});

// Зум по клику на изображение
popupImg.addEventListener('click', function(e) {
  e.stopPropagation();
  if (!this.classList.contains('zoomed')) {
    // Координаты курсора относительно изображения
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.style.transformOrigin = `${x}% ${y}%`;
    this.classList.add('zoomed');
  } else {
    // Сначала убираем зум, потом сбрасываем origin после анимации
    this.classList.remove('zoomed');
    const img = this;
    function resetOrigin() {
      img.style.transformOrigin = '';
      img.removeEventListener('transitionend', resetOrigin);
    }
    img.addEventListener('transitionend', resetOrigin);
  }
});

// Горизонтальная прокрутка прайс-листа на мобильных
const priceListArrow = document.querySelector('.price-list__arrow');
const priceListImages = document.querySelector('.price-list__images');
if (priceListArrow && priceListImages) {
  priceListArrow.addEventListener('click', () => {
    if (window.innerWidth <= 970) {
      const cardWidth = priceListImages.querySelector('img')?.offsetWidth || 200;
      priceListImages.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  });
} 