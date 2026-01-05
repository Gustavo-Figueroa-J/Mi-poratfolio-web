// ========== MODAL MEJORADO PARA IMÁGENES Y VIDEOS ==========

function openModal(card) {
    const modal = document.getElementById('imageModal');
    const modalContent = modal.querySelector('.modal-content');
    const mediaType = card.getAttribute('data-type');
    
    // Limpiar contenido previo
    modalContent.innerHTML = '';
    
    if (mediaType === 'video') {
        // ✅ Es un video
        const videoElement = card.querySelector('video');
        const videoSrc = videoElement.querySelector('source').src;
        
        // Crear nuevo video en el modal
        const modalVideo = document.createElement('video');
        modalVideo.controls = true;
        modalVideo.autoplay = true;
        modalVideo.style.opacity = '0';
        modalVideo.style.transition = 'opacity 0.3s ease';
        
        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';
        
        modalVideo.appendChild(source);
        modalContent.appendChild(modalVideo);
        
        // Animación de entrada
        setTimeout(() => {
            modalVideo.style.opacity = '1';
        }, 10);
        
    } else {
        // ✅ Es una imagen
        const img = card.querySelector('.project-img');
        
        // Crear nueva imagen en el modal
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.id = 'modalImage';
        modalImg.style.opacity = '0';
        modalImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Evento de zoom en la imagen
        modalImg.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('zoomed');
        });
        
        modalContent.appendChild(modalImg);
        
        // Animación de entrada
        setTimeout(() => {
            modalImg.style.opacity = '1';
            modalImg.style.transform = 'scale(1)';
        }, 10);
    }
    
    // Mostrar modal
    modal.style.display = 'block';
    modal.scrollTop = 0;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Detener videos si hay alguno
    const video = modalContent.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    // Animación de salida
    const mediaElement = modalContent.querySelector('img, video');
    if (mediaElement) {
        mediaElement.style.opacity = '0';
        mediaElement.style.transform = 'scale(0.95)';
    }
    
    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.innerHTML = '';
    }, 200);
}

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Prevenir que el video se reproduzca al pasar el mouse
document.addEventListener('DOMContentLoaded', () => {
    const projectVideos = document.querySelectorAll('.project-card video');
    projectVideos.forEach(video => {
        video.addEventListener('mouseenter', function() {
            this.pause();
        });
    });
});

// Agregar botón de descarga
const downloadBtn = document.createElement('a');
downloadBtn.className = 'modal-download';
downloadBtn.innerHTML = '<i class="fas fa-download"></i> Descargar';
downloadBtn.download = '';

if (mediaType === 'video') {
    downloadBtn.href = videoSrc;
} else {
    downloadBtn.href = img.src;
}

modal.appendChild(downloadBtn);