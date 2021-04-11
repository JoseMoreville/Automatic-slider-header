const getTags = async () => {
  const mangas = await fetch("/static/info.json", {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  }).then(async (data) => {
    const mangas = await data.json();
    return mangas;
  });
  return mangas;
};

const createSlides = async (callback) => {
  mangas = await callback();
  const container = document.getElementById("container");
  //const informationContainer = document.getElementById("manga_information");
  for (const index of Object.keys(mangas)) {
    //! create document elements
    const slider = document.createElement("div");
    const informationContainer = document.createElement("div");
    const title = document.createElement("h1");
    const tagsContainer = document.createElement("div");
    const img = document.createElement("img");

    //! add class and content to the created elements
    informationContainer.id = "manga_information";
    img.classList.add("manga_image");
    img.src = mangas[index].img;
    title.classList.add("manga_title");
    title.innerText = mangas[index].title;
    tagsContainer.classList.add("tags_container");
    slider.classList.add("slider");

    //! create new element for each manga tag
    mangas[index].tags.forEach((element, index) => {
      let newTag = document.createElement("div");
      newTag.innerText = element;
      newTag.classList.add(`tag`);
      tagsContainer.appendChild(newTag);
    });

    informationContainer.appendChild(title);
    informationContainer.appendChild(tagsContainer);
    slider.appendChild(informationContainer);
    slider.appendChild(img);
    container.appendChild(slider);
  }

  //! assign ID to slider with the ID of the tag to change slide later
  document.querySelectorAll(".slider").forEach((e, i) => {
    e.id = `tag_${i}`;
    e.style.display = "none";
  });

  //! Remove extra elements that are created for some reason and i don't want to look why
  document.querySelectorAll(".slider").forEach((e, i) => {
    if (e.id === `tag_0`) {
      e.style.display = "flex";
    }
  });
  changeSlide();
};

const changeSlide = () => {
  const slides = document.querySelectorAll(".slider");
  let slideIndex = 0;
  setInterval(() => {
    if (slideIndex === 0) {
      slides[0].style.display = "none";
      slides[1].style.display = "flex";
      slideIndex = 1;
      return;
    }
    if (slideIndex === 1) {
      slides[1].style.display = "none";
      slides[2].style.display = "flex";
      slideIndex = 2;
      return;
    }
    if (slideIndex === 2) {
      slides[2].style.display = "none";
      slides[3].style.display = "flex";
      slideIndex = 3;
      return;
    }
    if (slideIndex === 3) {
      slides[3].style.display = "none";
      slides[4].style.display = "flex";
      slideIndex = 4;
      return;
    }
    if (slideIndex === 4) {
      slides[4].style.display = "none";
      slides[5].style.display = "flex";
      slideIndex = 5;
      return;
    }
    if (slideIndex === 5) {
      slides[5].style.display = "none";
      slides[0].style.display = "flex";
      slideIndex = 0;
      return;
    }
  }, 4000);
};

createSlides(getTags);
