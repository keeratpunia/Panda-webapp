// script.js

// Select panda image using its ID
const pandaImage = document.getElementById('panda');

// Select heart container to add hearts
const heartContainer = document.getElementById('heart-container');

// Select the button using its ID
const button = document.getElementById('pet-me');

// Image paths for different panda expressions
const eyesOpen = './assets/PanEyeOpen.png';
const eyesClose = './assets/PanEyeClose.png';
const eyesHappy = './assets/PanSmile.png';

// Blinking mechanism using setInterval
function blink() {
  // Check which image is currently displayed and switch it
  if (pandaImage.src.includes('PanEyeOpen.png')) {
    pandaImage.src = eyesClose;
  } else {
    pandaImage.src = eyesOpen;
  }
}

// Start blinking every second
let blinkInterval = setInterval(blink, 1000);

// Function to stop blinking
function stopBlinking() {
  clearInterval(blinkInterval);
}

// Function to restart blinking
function startBlinking() {
  blinkInterval = setInterval(blink, 1000);
}

// Handle the button click event
button.addEventListener('click', () => {
  console.log('Switching to happy panda!');
  
  // Change panda image to happy
  pandaImage.src = eyesHappy;
  stopBlinking(); // Stop blinking when happy

  // Generate 15 hearts using createHeart function
  for (let i = 0; i < 15; i++) {
    createHeart();
  }

  // Switch back to normal panda after 5 seconds
  setTimeout(() => {
    console.log('Switching back to normal panda!');
    pandaImage.src = eyesOpen;
    startBlinking(); // Resume blinking
  }, 5000);
});

// Function to create a floating heart
function createHeart() {
  // Create a new div element for heart
  const heart = document.createElement('div');
  heart.classList.add('heart');

  // Set random position, size, and animation duration
  const randomX = Math.random() * 100;
  const randomSize = Math.random() * 80 + 60;
  const randomDuration = Math.random() * 4 + 3;

  // Apply styles
  heart.style.left = `${randomX}vw`;
  heart.style.width = `${randomSize}px`;
  heart.style.height = `${randomSize}px`;
  heart.style.animationDuration = `${randomDuration}s`;

  // Add heart to the container
  heartContainer.appendChild(heart);

  // Remove heart when animation completes
  setTimeout(() => {
    heart.remove();
  }, randomDuration * 1000);
} 

const bamboos = document.querySelectorAll('.bamboo');
const panda = document.getElementById('panda');
const heart = document.getElementById('heartDialogBox');

// Track Drag State
let dragging = false;
let draggedBamboo = null;

bamboos.forEach(bamboo => {
    bamboo.addEventListener('mousedown', (e) => {
      dragging = true;

    // Create a new bamboo to follow the pointer
    draggedBamboo = document.createElement('img');
    draggedBamboo.src = './assets/Bamboo.png';
    draggedBamboo.classList.add('dragged-bamboo');
    document.body.appendChild(draggedBamboo);
    updateBambooPosition(e);

    // Prevent default drag image
    e.preventDefault();
  });
});

// Move the Bamboo with Pointer
document.addEventListener('mousemove', (e) => {
    if (dragging && draggedBamboo) {
      updateBambooPosition(e);
    }
  });
  function updateBambooPosition(e) {
    draggedBamboo.style.position = 'absolute';
    draggedBamboo.style.left = `${e.clientX - 40}px`;
    draggedBamboo.style.top = `${e.clientY - 40}px`;
  }

  // Check for Collision with Panda
document.addEventListener('mouseup', () => {
    if (dragging && draggedBamboo) {
      const pandaRect = panda.getBoundingClientRect();
      const bambooRect = draggedBamboo.getBoundingClientRect();
  
      if (
        bambooRect.right > pandaRect.left &&
        bambooRect.left < pandaRect.right &&
        bambooRect.bottom > pandaRect.top &&
        bambooRect.top < pandaRect.bottom
      ) {
        console.log('Bamboo Fed!');
        
        // Switch to happy panda
        panda.src = './assets/PanSmile.png';

        // Show the heart for feedback
      heart.style.display = 'block';
      heart.style.left = `${pandaRect.left + (pandaRect.width / 2) - (heart.offsetWidth / 2)}px`;
      heart.style.top = `${pandaRect.top - 50}px`;

      // Reset Panda and Heart after a short delay
      setTimeout(() => {
        panda.src = './assets/PanEyeOpen.png';
        heart.style.display = 'none';
      }, 3000);
    }

    // Clean up dragged bamboo
    draggedBamboo.remove();
    dragging = false;
    draggedBamboo = null;
  }
});

