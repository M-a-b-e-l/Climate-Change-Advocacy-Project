// Animation configuration
const animationConfig = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

// Get all elements with the "revealable" class
const revealableContainers = document.querySelectorAll('.revealable');

// Intersection Observer callback function
const revealCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
};

// Create an Intersection Observer instance
const observer = new IntersectionObserver(revealCallback, {
  root: null,
  rootMargin: `-${animationConfig.revealDistance}px 0px`,
  threshold: 0.2 // Adjust as needed
});

// Observe each revealable container
revealableContainers.forEach((container) => {
  observer.observe(container);
});

// Scroll event listener for hiding/showing navigation
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.style.top = `-${navbarHeight}px`;
  } else {
    // Scrolling up
    navbar.style.top = '0';
  }

  lastScrollTop = scrollTop;
});

//MODAL
let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");

const scaleImage = () => {
  if(scaleFactor === 1)
  {
    scaleFactor = 0.8;
  }
  else{
    scaleFactor = 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;

}

const toggleModal = (person) => {
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("modal-text-container");

  modal.style.display = "flex";
  modalContent.innerHTML = `<p id="thanks-modal-content">Thank you so much ${person.name}!</p>`;

  const intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000)

}

//FORM VALIDATION
const form = document.getElementById('sign-petition');

let signNowButton = document.getElementById("sign-now-button");
const email = document.getElementById('Email');

let count = 3;

const addSignature = (person) => {

  const state = document.getElementById("State").value;

  const signatures = document.getElementById("signatures");

  const newSignature = document.createElement("p");
  
  newSignature.textContent = "️🖊️ " + person.name + " from " + state + " supports this";

  signatures.appendChild(newSignature);

  count++;
  
  count = document.getElementById("counter").innerHTML = "🖊️ " + count + " people have signed this petition and support this cause.";
 
}


const validateForm = () => {

  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value //Accesses and saves the value of the first input 
  }

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }

  }

  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
  }
  else {
    email.classList.remove('error');
  }

  if (containsErrors == false) {
    addSignature(person);

    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
  
  toggleModal(person);
};


signNowButton.addEventListener("click", validateForm);


//DARK MODE
const darkModeButton = document.getElementById("topRightButton");
const body = document.body;
let isDarkMode = false;

darkModeButton.addEventListener("click", function() {
  body.classList.toggle("dark-mode");
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    darkModeButton.textContent = "Light Mode";
  } else {
    darkModeButton.textContent = "Dark Mode";
  }
});




// // Close the modal when clicking outside of it
// window.onclick = (event) => {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }





