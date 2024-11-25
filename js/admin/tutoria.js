function getTutorias() {
    fetch('http://localhost:5001/api/tutorias', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const resultDiv = document.getElementById('tutoriasResult');
        
        // Generar tabla
        let tableHTML = `
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Estudiante</th>
                  <th>Tutor</th>
                  <th>Fecha</th>
                  <th>Tema</th>
                  <th>Ubicación</th>
                </tr>
              </thead>
              <tbody>
        `;
  
        data.forEach(tutoria => {
          tableHTML += `
            <tr>
              <td>${tutoria._id}</td>
              <td>${tutoria.estudiante?.nombre || 'Desconocido'} ${tutoria.estudiante?.apellido || ''}</td>
              <td>${tutoria.tutor?.nombre || 'Desconocido'} ${tutoria.tutor?.apellido || ''}</td>
              <td>${new Date(tutoria.fecha).toLocaleString()}</td>
              <td>${tutoria.tema}</td>
              <td>${tutoria.ubicacion || 'No especificada'}</td>
            </tr>
          `;
        });
  
        tableHTML += `
              </tbody>
            </table>
          </div>
        `;
  
        resultDiv.innerHTML = tableHTML;
      })
      .catch((error) => {
        console.error('Error al obtener las tutorías:', error);
        alert('No se pudieron cargar las tutorías.');
      });
  }
  

  function createTutoria() {
    // Solicitar datos de la nueva tutoría
    const nuevaTutoria = {
      estudiante: prompt('ID del estudiante asignado:'),
      tutor: prompt('ID del tutor asignado:'),
      fecha: prompt('Fecha de la tutoría (YYYY-MM-DD):'),
      tema: prompt('Tema de la tutoría:'),
      ubicacion: prompt('Ubicación de la tutoría (opcional):'),
    };
  
    // Validar campos obligatorios
    if (!nuevaTutoria.estudiante || !nuevaTutoria.tutor || !nuevaTutoria.fecha || !nuevaTutoria.tema) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    // Enviar la solicitud POST al backend
    fetch('http://localhost:5001/api/tutorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaTutoria),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al registrar la tutoría');
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || 'Tutoría registrada exitosamente');
        getTutorias(); // Refresca la lista de tutorías
      })
      .catch((error) => {
        console.error('Error al registrar la tutoría:', error);
        alert('Hubo un error al registrar la tutoría.');
      });
  }
  
  function updateTutoria() {
    const id = prompt('ID de la tutoría que desea actualizar:');
    
    const updatedData = {
      estudiante: prompt('Nuevo ID del estudiante asignado (dejar vacío para no cambiar):'),
      tutor: prompt('Nuevo ID del tutor asignado (dejar vacío para no cambiar):'),
      fecha: prompt('Nueva fecha de la tutoría (YYYY-MM-DD, dejar vacío para no cambiar):'),
      tema: prompt('Nuevo tema de la tutoría (dejar vacío para no cambiar):'),
      ubicacion: prompt('Nueva ubicación de la tutoría (dejar vacío para no cambiar):'),
    };
  
    Object.keys(updatedData).forEach(key => {
      if (!updatedData[key]) delete updatedData[key];
    });
  
    fetch(`http://localhost:5001/api/tutorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar la tutoría');
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || 'Tutoría actualizada exitosamente');
        getTutorias(); // Refresca la lista de tutorías
      })
      .catch((error) => {
        console.error('Error al actualizar la tutoría:', error);
        alert('Hubo un error al actualizar la tutoría.');
      });
  }
  
  function deleteTutoria() {
    const id = prompt('ID de la tutoría que desea eliminar:');
  
    fetch(`http://localhost:5001/api/tutorias/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar la tutoría');
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || 'Tutoría eliminada exitosamente');
        getTutorias(); // Refresca la lista de tutorías
      })
      .catch((error) => {
        console.error('Error al eliminar la tutoría:', error);
        alert('Hubo un error al eliminar la tutoría.');
      });
  }
  