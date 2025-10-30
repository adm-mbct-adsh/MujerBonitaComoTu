document.addEventListener("DOMContentLoaded", function () {
  const totalImages = 30;
  const gap = 10;

  // Elementos del DOM
  const carousel = document.getElementById("carousel");
  const thumbnails = document.getElementById("thumbnails");
  const thumbnailsContainer = document.querySelector(".thumbnails-container");
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");
  const closeBtn = document.getElementById("close");
  const prevModalBtn = document.getElementById("prevModal");
  const nextModalBtn = document.getElementById("nextModal");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Variables de estado
  let currentIndex = 0;
  let intervalId;
  let visibleImages = 3;

  // Función para determinar cuántas imágenes son visibles según el ancho de pantalla
  function getVisibleImagesCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) return 1;
    if (screenWidth <= 768) return 2;
    return 3;
  }

  // Función para calcular el ancho de cada imagen
  function calculateImageWidth() {
    const containerWidth = document.querySelector(
      ".carousel-container"
    ).offsetWidth;
    return containerWidth / visibleImages - gap;
  }

  function initCarousel() {
    visibleImages = getVisibleImagesCount();
    const imageWidth = calculateImageWidth();

    const carouselImages = document.querySelectorAll(".carousel img");
    carouselImages.forEach((img) => {
      img.style.width = `${imageWidth}px`;
      img.style.minWidth = `${imageWidth}px`;
    });

    moveCarousel(currentIndex);

    setTimeout(() => {
      const firstThumb = thumbnails.querySelector(".thumb-active");
      if (firstThumb) {
        thumbnailsContainer.scrollLeft = 0;
      }
    }, 100);
  }

  const imageList = [
    "assets/img/inicio/carrousel/car-1.jpg",
    "assets/img/inicio/carrousel/car-2.jpg",
    "assets/img/inicio/carrousel/car-3.jpeg",
    "assets/img/inicio/carrousel/car-4.jpg",
    "assets/img/inicio/carrousel/car-5.jpg",
    "assets/img/inicio/carrousel/car-6.jpg",
    "assets/img/inicio/carrousel/car-7.jpg",
    "assets/img/inicio/carrousel/car-8.jpg",
    "assets/img/inicio/carrousel/car-9.jpg",
    "assets/img/inicio/carrousel/car-10.jpg",
    "assets/img/inicio/carrousel/car-11.png",
    "assets/img/inicio/carrousel/car-12.jpg",
    "assets/img/inicio/carrousel/car-13.jpg",
    "assets/img/inicio/carrousel/car-14.jpeg",
    "assets/img/inicio/carrousel/car-15.jpg",
    "assets/img/inicio/carrousel/car-16.jpeg",
    "assets/img/inicio/carrousel/car-17.jpg",
    "assets/img/inicio/carrousel/car-18.jpg",
    "assets/img/inicio/carrousel/car-19.jpg",
    "assets/img/inicio/carrousel/car-20.jpg",
    "assets/img/inicio/carrousel/car-21.jpg",
    "assets/img/inicio/carrousel/car-22.jpg",
    "assets/img/inicio/carrousel/car-23.jpg",
    "assets/img/inicio/carrousel/car-24.jpg",
    "assets/img/inicio/carrousel/car-25.jpg",
    "assets/img/inicio/carrousel/car-26.jpg",
    "assets/img/inicio/carrousel/car-27.jpg",
    "assets/img/inicio/carrousel/car-28.jpg",
    "assets/img/inicio/carrousel/car-29.jpg",
    "assets/img/inicio/carrousel/car-30.jpg",
  ];

  function generateImages() {
    carousel.innerHTML = "";
    thumbnails.innerHTML = "";

    imageList.forEach((imagePath, index) => {
      // Crear imágenes para el carrusel
      const img = document.createElement("img");
      img.src = imagePath;
      img.alt = `Imagen ${index + 1}`;
      img.dataset.index = index;
      carousel.appendChild(img);

      // Crear miniaturas
      const thumb = document.createElement("img");
      thumb.src = imagePath;
      thumb.alt = `Miniatura ${index + 1}`;
      thumb.dataset.index = index;
      thumbnails.appendChild(thumb);
    });

    // Inicializar primera miniatura como activa
    if (thumbnails.children.length > 0) {
      thumbnails.children[0].classList.add("thumb-active");
    }
  }

  // Mover el carrusel
  function moveCarousel(index) {
    currentIndex = index;
    const imageWidth = calculateImageWidth();

    let adjustedIndex = currentIndex;
    if (currentIndex > totalImages - visibleImages) {
      adjustedIndex = totalImages - visibleImages;
    }

    const offset = -adjustedIndex * (imageWidth + gap);
    carousel.style.transform = `translateX(${offset}px)`;

    // Actualizar miniaturas
    Array.from(thumbnails.children).forEach((thumb, i) => {
      thumb.classList.toggle("thumb-active", i === currentIndex);
    });

    // Scroll de miniaturas
    const activeThumb = thumbnails.querySelector(".thumb-active");
    if (activeThumb) {
      const container = thumbnailsContainer;
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      const containerWidth = container.offsetWidth;
      const containerScrollLeft = container.scrollLeft;
      const thumbRight = thumbLeft + thumbWidth;
      const containerRight = containerScrollLeft + containerWidth;

      if (thumbLeft < containerScrollLeft || thumbRight > containerRight) {
        const scrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;
        thumbnailsContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }

  // Auto-avance
  function startAutoSlide() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalImages;
      moveCarousel(nextIndex);
    }, 2500);
  }

  generateImages();
  initCarousel();
  startAutoSlide();

  carousel.addEventListener("mouseenter", () => clearInterval(intervalId));
  carousel.addEventListener("mouseleave", startAutoSlide);

  prevBtn.addEventListener("click", () => {
    const newIndex = Math.max(0, currentIndex - 1);
    moveCarousel(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % totalImages;
    moveCarousel(newIndex);
  });

  carousel.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const index = parseInt(e.target.dataset.index);
      openModal(index);
    }
  });

  thumbnails.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const index = parseInt(e.target.dataset.index);
      moveCarousel(Math.min(index, totalImages - visibleImages));
      openModal(index);
    }
  });

  // Abrir modal
  function openModal(index) {
    clearInterval(intervalId);
    currentIndex = index;
    modal.style.display = "flex";
    modalImage.src = thumbnails.children[index].src;
  }

  prevModalBtn.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + totalImages) % totalImages;
    openModal(newIndex);
  });

  nextModalBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % totalImages;
    openModal(newIndex);
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    startAutoSlide();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
      startAutoSlide();
    } else if (e.key === "ArrowLeft") {
      if (modal.style.display === "flex") {
        prevModalBtn.click();
      } else {
        prevBtn.click();
      }
    } else if (e.key === "ArrowRight") {
      if (modal.style.display === "flex") {
        nextModalBtn.click();
      } else {
        nextBtn.click();
      }
    }
  });

  window.addEventListener("resize", () => {
    initCarousel();
  });
});

// Alianzas
const brandTrack = document.getElementById("brandTrack");
const btnLeft = document.querySelector(".brand-left");
const btnRight = document.querySelector(".brand-right");

const scrollAmount = 120;

// Pausar animación
brandTrack.addEventListener("mouseenter", () => {
  brandTrack.style.animationPlayState = "paused";
});

brandTrack.addEventListener("mouseleave", () => {
  brandTrack.style.animationPlayState = "running";
});

btnLeft.addEventListener("click", () => {
  brandTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

btnRight.addEventListener("click", () => {
  brandTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
});
