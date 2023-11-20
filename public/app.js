// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const imageGallery = document.getElementById('imageGallery');
  
    // Fetch and display images
    const fetchImages = async () => {
      const response = await fetch('/gallery');
      const images = await response.json();
  
      imageGallery.innerHTML = '';
  
      images.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card', 'imageCard');
        card.style.width = '18rem';
  
        const img = document.createElement('img');
        img.src = image.webpPath;
        img.classList.add('card-img-top');
  
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
  
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = image.originalname;
  
        cardBody.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardBody);
  
        imageGallery.appendChild(card);
      });
    };
  
    // Event listener for image upload form
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(uploadForm);
  
      try {
        await fetch('/upload', {
          method: 'POST',
          body: formData,
        });
  
        // Refresh the image gallery after successful upload
        fetchImages();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    });
  
    // Initial fetch and display images
    fetchImages();
  });
  