document.addEventListener('DOMContentLoaded', function () {
  const FORM = document.querySelector('form');
  const RESULTADOS = document.querySelector('.list-group');

  FORM.addEventListener('submit', function (event) {
    event.preventDefault();

    // Mostrar la sección de resultados de hoteles si se hace submit
    RESULTADOS.classList.remove('d-none');

    // Guardar las fechas seleccionadas
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    if (new Date(startDate) >= new Date(endDate)) {
      alert('La fecha de salida debe ser posterior a la fecha de entrada.');
      return;
    }

    // Validar el municipio, nombre, alojamiento y reseña
    var municipality = document.getElementById('municipality').value;
    var name = document.getElementById('name').value;
    var accommodation = document.getElementById('accommodation').value;
    var review = document.getElementById('review').value;
    var regex = /^[A-Za-z\s]+$/;
    if (!regex.test(municipality) || !regex.test(name) || !regex.test(accommodation) || !regex.test(review)) {
      alert('Sintaxis incorrecta. Solo se permiten letras mayúsculas y minúsculas en el municipio, nombre, alojamiento y reseña.');
      return;
    }

    // Validar la puntuación
    var rating = document.getElementById('rating').value;
    if (rating < 1 || rating > 5) {
      alert('La puntuación debe ser un número entre 1 y 5.');
      return;
    }

    // Mostrar la sección de resultados de hoteles si se hace submit
    RESULTADOS.classList.remove('d-none');

    // Guardar las fechas seleccionadas
    localStorage.setItem('SELECTED_START_DATE', startDate);
    localStorage.setItem('SELECTED_END_DATE', endDate);

    // Mostrar las fechas seleccionadas
    document.getElementById('selectedStartDate').textContent = startDate;
    document.getElementById('selectedEndDate').textContent = endDate;
  });
});

function selectAccommodation(accommodation) {
  // Guardar el alojamiento seleccionado
  localStorage.setItem('SELECTED_ACCOMMODATION', accommodation);

  // Mostrar la selección del usuario
  document.getElementById('selectedAccommodation').textContent = 'Alojamiento: ' + accommodation;
  document.getElementById('selectionCard').style.display = 'block';
}

document.getElementById('reviewForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  var name = document.getElementById('name').value;
  var accommodation = document.getElementById('accommodation').value;
  var rating = document.getElementById('rating').value;
  var review = document.getElementById('review').value;

  // Create new review card
  var newReview = document.createElement('div');
  newReview.className = 'card mb-3';
  newReview.innerHTML = `
    <div class="card-header">
      Alojamiento: ${accommodation}
    </div>
    <div class="card-body">
      <h5 class="card-title">Puntuación: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</h5>
      <p class="card-text">${review}</p>
      <p class="card-text"><small class="text-muted">Reseña por: ${name}</small></p>
    </div>
  `;

  // Add new review to reviews div
  document.getElementById('reviews').appendChild(newReview);

  // Save review to local storage
  var reviews = JSON.parse(localStorage.getItem('REVIEWS')) || [];
  reviews.push({ name, accommodation, rating, review });
  localStorage.setItem('REVIEWS', JSON.stringify(reviews));

  // Clear form
  reviewForm.reset();
});

function deleteSelection() {
  // Borrar la selección del usuario
  localStorage.removeItem('SELECTED_ACCOMMODATION');
  localStorage.removeItem('SELECTED_START_DATE');
  localStorage.removeItem('SELECTED_END_DATE');

  // Ocultar la tarjeta de selección
  document.getElementById('selectionCard').style.display = 'none';
}
