// Listar tutores
function getDocentes() {
    fetch('http://localhost:5001/api/tutores', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const resultDiv = document.getElementById('docentesResult');
        let tableHTML = `
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Materia</th>
                  <th>Nivel Educativo</th>
                  <th>Fecha de Creación</th>
                </tr>
              </thead>
              <tbody>
        `;
  
        data.forEach(tutor => {
          tableHTML += `
            <tr>
              <td>${tutor._id}</td>
              <td>${tutor.nombre} ${tutor.apellido}</td>
              <td>${tutor.email}</td>
              <td>${tutor.materia}</td>
              <td>${tutor.nivelEducativo || 'No especificado'}</td>
              <td>${new Date(tutor.createdAt).toLocaleString()}</td>
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
        console.error('Error al obtener los tutores:', error);
        alert('No se pudieron cargar los tutores.');
      });
  }
  
  // Actualizar tutor
  function updateDocente() {
    const id = prompt('ID del docente que desea actualizar:');
    const updatedData = {
      nombre: prompt('Nuevo nombre del docente:'),
      apellido: prompt('Nuevo apellido del docente:'),
      email: prompt('Nuevo correo del docente:'),
      materia: prompt('Nueva materia del docente:'),
      nivelEducativo: prompt('Nuevo nivel educativo del docente:'),
    };
  
    Object.keys(updatedData).forEach(key => {
      if (!updatedData[key]) delete updatedData[key];
    });
  
    fetch(`http://localhost:5001/api/tutores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el docente');
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || 'Docente actualizado exitosamente');
        getDocentes();
      })
      .catch((error) => {
        console.error('Error al actualizar el docente:', error);
      });
  }
  
  // Eliminar tutor
  function deleteDocente() {
    const id = prompt('ID del docente que desea eliminar:');
    fetch(`http://localhost:5001/api/tutores/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || 'Docente eliminado exitosamente');
        getDocentes();
      })
      .catch((error) => {
        console.error('Error al eliminar el docente:', error);
      });
  }
  