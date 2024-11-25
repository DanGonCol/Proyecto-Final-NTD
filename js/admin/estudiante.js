// Listar estudiantes
function getEstudiantes() {
    fetch('http://localhost:5001/api/estudiantes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const resultDiv = document.getElementById('estudiantesResult');
        let tableHTML = `
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Fecha de Creación</th>
                </tr>
              </thead>
              <tbody>
        `;
  
        data.forEach(estudiante => {
          tableHTML += `
            <tr>
              <td>${estudiante._id}</td>
              <td>${estudiante.nombre} ${estudiante.apellido}</td>
              <td>${estudiante.email}</td>
              <td>${estudiante.telefono || 'No especificado'}</td>
              <td>${new Date(estudiante.createdAt).toLocaleString()}</td>
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
        console.error('Error al obtener los estudiantes:', error);
        alert('No se pudieron cargar los estudiantes.');
      });
  }
  
  // Actualizar estudiante
  function updateEstudiante() {
    const id = prompt('ID del estudiante que desea actualizar:');
    
    // Solicitar los datos actualizados al usuario
    const updatedData = {
      nombre: prompt('Nuevo nombre del estudiante:'),
      apellido: prompt('Nuevo apellido del estudiante:'),
      email: prompt('Nuevo correo del estudiante:'),
      telefono: prompt('Nuevo teléfono del estudiante (opcional):'),
    };
  
    // Eliminar campos vacíos (solo enviar los campos que tengan valores)
    Object.keys(updatedData).forEach(key => {
      if (!updatedData[key]) delete updatedData[key];
    });
  
    // Realizar la solicitud PUT al servidor
    fetch(`http://localhost:5001/api/estudiantes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el estudiante');
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || 'Estudiante actualizado exitosamente');
        getEstudiantes(); // Refrescar la lista de estudiantes después de actualizar
      })
      .catch((error) => {
        console.error('Error al actualizar el estudiante:', error);
        alert('Hubo un error al actualizar el estudiante.');
      });
  }
  
  
  // Eliminar estudiante
  function deleteEstudiante() {
    const id = prompt('ID del estudiante que desea eliminar:');
    fetch(`http://localhost:5001/api/estudiantes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || 'Estudiante eliminado exitosamente');
        getEstudiantes();
      })
      .catch((error) => {
        console.error('Error al eliminar el estudiante:', error);
      });
  }
  
  function showUpdateUserForm() {
    const id = prompt('Ingrese el ID del estudiante que desea modificar:');
    if (!id) {
      alert('Debe ingresar un ID válido.');
      return;
    }
  
    // Llamada para obtener los datos del estudiante
    fetch(`http://localhost:5001/api/estudiantes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener el estudiante.');
        }
        return response.json();
      })
      .then((data) => {
        // Rellenar los campos del formulario con los datos del estudiante
        document.getElementById('editUserId').value = data._id;
        document.getElementById('editUserNombre').value = data.nombre;
        document.getElementById('editUserApellido').value = data.apellido;
        document.getElementById('editUserEmail').value = data.email;
        document.getElementById('editUserTelefono').value = data.telefono || '';
  
        // Mostrar el formulario
        document.getElementById('editUserForm').style.display = 'block';
      })
      .catch((error) => {
        console.error('Error al obtener el estudiante:', error);
        alert('No se pudo cargar la información del estudiante.');
      });
  }
  
  // Función para cancelar la actualización
  function cancelUpdate() {
    document.getElementById('editUserForm').style.display = 'none';
  }
  