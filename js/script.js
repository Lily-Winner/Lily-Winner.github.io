/* ==================== PORTFOLIO ==================== */

// Filter portfolio items based on the selected category
filterSelection("all");

// Function to filter portfolio items
function filterSelection(category) {
  const items = document.querySelectorAll(".filterDiv");

  // If 'all' is selected, no category filter is applied
  if (category === "all") category = "";

  items.forEach((item) => {
    item.classList.remove("show");
    if (item.className.indexOf(category) > -1) item.classList.add("show");
  });
}

// Function to add a class to an element
function addClass(element, name) {
  const classesToAdd = name.split(" ");
  classesToAdd.forEach((cls) => {
    if (!element.classList.contains(cls)) {
      element.classList.add(cls);
    }
  });
}

// Function to remove a class from an element
function removeClass(element, name) {
  const classesToRemove = name.split(" ");
  classesToRemove.forEach((cls) => {
    element.classList.remove(cls);
  });
}

// Add an event listener to the portfolio buttons container
const btnContainer = document.getElementById("myBtnContainer");
if (btnContainer) {
  const btns = btnContainer.getElementsByClassName('btn');

  // Add click event listeners to portfolio buttons
  Array.from(btns).forEach(btn => {
    btn.addEventListener('click', function () {
      const currentActiveBtn = btnContainer.querySelector(".btn-active");

      // Remove the 'btn-active' class from the previously active button
      if (currentActiveBtn) {
        currentActiveBtn.classList.remove('btn-active');
      }

      // Add the 'btn-active' class to the clicked button
      btn.classList.add('btn-active');
    });
  });
}

// Initialize modals when the DOM content is loaded
document.addEventListener('DOMContentLoaded', (event) => {
  // Get all modal elements
  const modals = document.querySelectorAll('.modal');

  // Set up the modal functionality
  modals.forEach(modal => {
    const modalBtn = document.getElementById(modal.getAttribute('id') + "-btn");
    const closeModalElements = modal.querySelectorAll(".close");

    // Open the modal when the associated button is clicked
    if (modalBtn) {
      modalBtn.addEventListener('click', () => {
        modal.style.display = "block";
      });
    }

    // Close the modal when the close elements are clicked
    closeModalElements.forEach(span => {
      span.addEventListener('click', () => {
        modal.style.display = "none";
      });
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});


/* ==================== Experience ==================== */
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active');
    })
    target.classList.add('qualification__active');

    tabs.forEach(tab => {
      tab.classList.remove('btn-active');
    })
    tab.classList.add('btn-active');
  });
});

/* ==================== Skills ==================== */
const skills = document.querySelectorAll('.skills__content');
const skillArrows = document.querySelectorAll('.skills__arrow');

skills.forEach(skill => {
  const skillHeader = skill.querySelector('.skills__header');
  const arrow = skillHeader.querySelector('.skills__arrow');

  skillHeader.addEventListener('click', () => {
    const menuIsOpen = skill.classList.contains('skills__open')
    closeMenu(skills, skillArrows);
    if (!menuIsOpen) {
      skill.classList.toggle('skills__open');
      skill.classList.toggle('skills__close');
      arrow.classList.toggle('bx-chevron-down');
      arrow.classList.toggle('bx-chevron-up');
    }
  });

});


function closeMenu(menus, arrows) {
  menus.forEach(skill => {
    skill.classList.remove('skills__open');
    skill.classList.add('skills__close');
  });

  arrows.forEach(skillArrow => {
    skillArrow.classList.remove('bx-chevron-up');
    skillArrow.classList.add('bx-chevron-down');
  })
};

/* ==================== BLOG ====================*/

/* ==================== CONTACTS ====================*/
function submitForm() {

  const frm = document.getElementsByName('contact-form')[0];

  frm.submit(); // Submit the form
  frm.reset();  // Reset all form data
  return false; // Prevent page refresh
}