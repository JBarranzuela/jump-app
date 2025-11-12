// Configuration
const API_URL = 'http://localhost:3000/experiences';

// DOM Elements
const form = document.getElementById('experienceForm');
const container = document.getElementById('experiences-container');
const messageDiv = document.getElementById('message');

// Event Listeners
document.addEventListener('DOMContentLoaded', loadExperiences);
form.addEventListener('submit', handleSubmit);

/**
 * Load all experiences from API
 */
async function loadExperiences() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error al cargar experiencias');
        }
        
        const experiences = await response.json();
        renderExperiences(experiences);
    } catch (error) {
        showError('No se pudieron cargar las experiencias: ' + error.message);
        console.error('Error:', error);
    }
}

/**
 * Handle form submission
 */
async function handleSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const title = formData.get('title');
    const country = formData.get('country');
    const price = parseFloat(formData.get('price'));
    const description = formData.get('description');

    // Validate on client side
    if (!validateForm(title, country, price, description)) {
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                experience: { title, country, price, description }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errors = errorData.errors || errorData;
            throw new Error(formatErrors(errors));
        }

        showSuccess('¡Experiencia agregada correctamente!');
        form.reset();
        clearErrors();
        loadExperiences();
    } catch (error) {
        showError('Error: ' + error.message);
        console.error('Error:', error);
    }
}

/**
 * Delete an experience
 */
async function deleteExperience(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta experiencia?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la experiencia');
        }

        showSuccess('Experiencia eliminada correctamente');
        loadExperiences();
    } catch (error) {
        showError('Error: ' + error.message);
        console.error('Error:', error);
    }
}

/**
 * Render experiences in the grid
 */
function renderExperiences(experiences) {
    container.innerHTML = '';

    if (!experiences || experiences.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <p>📭 No hay experiencias aún. ¡Crea la primera!</p>
            </div>
        `;
        return;
    }

    experiences.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'experience-card';
        card.innerHTML = `
            <h3>${escapeHtml(exp.title)}</h3>
            <span class="badge">${escapeHtml(exp.country)}</span>
            <div class="price">$${parseFloat(exp.price).toFixed(2)}</div>
            <p class="description">${escapeHtml(exp.description)}</p>
            <div class="date">${formatDate(exp.created_at)}</div>
            <button class="btn-delete" onclick="deleteExperience(${exp.id})">Eliminar</button>
        `;
        container.appendChild(card);
    });
}

/**
 * Validate form data
 */
function validateForm(title, country, price, description) {
    let isValid = true;
    clearErrors();

    if (!title || title.trim().length < 3) {
        showFieldError('title', 'El título debe tener al menos 3 caracteres');
        isValid = false;
    }

    if (!country || country.trim().length < 2) {
        showFieldError('country', 'El país debe tener al menos 2 caracteres');
        isValid = false;
    }

    if (!price || price <= 0) {
        showFieldError('price', 'El precio debe ser mayor a 0');
        isValid = false;
    }

    if (!description || description.trim().length < 10) {
        showFieldError('description', 'La descripción debe tener al menos 10 caracteres');
        isValid = false;
    }

    return isValid;
}

/**
 * Show field error
 */
function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

/**
 * Clear all field errors
 */
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
}

/**
 * Show success message
 */
function showSuccess(message) {
    messageDiv.innerHTML = `<div class="alert success">${message}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 4000);
}

/**
 * Show error message
 */
function showError(message) {
    messageDiv.innerHTML = `<div class="alert error">${message}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 6000);
}

/**
 * Format error messages from API
 */
function formatErrors(errors) {
    if (typeof errors === 'object') {
        return Object.values(errors).flat().join(', ');
    }
    return errors.toString();
}

/**
 * Format date to readable format
 */
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
