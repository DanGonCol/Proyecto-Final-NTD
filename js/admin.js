function showSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));

  // Mostrar la sección seleccionada
  const sectionToShow = document.getElementById(sectionId);
  if (sectionToShow) {
    sectionToShow.classList.add('active');
  }
}
// Cambio dinámico entre secciones
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Logout
function logoutd() {
  alert("Cerrando sesión...");
  window.location.href = 'seleccion inicio de sesion.html';
}


function logout() {
  // Redirigir al HTML de login
  window.location.href = "seleccion inicio de sesion.html";
}

function registrarAdmin() {
  // Obtener valores del formulario
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;
  const confirmarPassword = document.getElementById('confirmar_password').value;

  // Validar contraseñas
  if (password !== confirmarPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Crear objeto administrador
  const admin = {
    nombre,
    apellido,
    email: correo,
    password,
  };

  // Enviar datos a la API
  fetch('http://localhost:5001/api/admins', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(admin),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message); // Confirmación de éxito
        window.location.href = 'login admin.html'; // Redirigir al login
      } else {
        alert('Error al registrar el administrador.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Hubo un error al conectar con el servidor.');
    });
}

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
      
      // Generar tabla
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


function updateEstudiante() {
  const id = document.getElementById('editUserId').value;

  // Obtener los valores actualizados del formulario
  const updatedData = {
    nombre: document.getElementById('editUserNombre').value,
    apellido: document.getElementById('editUserApellido').value,
    email: document.getElementById('editUserEmail').value,
    telefono: document.getElementById('editUserTelefono').value,
  };

  // Validar campos obligatorios
  if (!updatedData.nombre || !updatedData.apellido || !updatedData.email) {
    alert('Por favor, complete todos los campos obligatorios.');
    return;
  }

  // Enviar los datos actualizados al servidor
  fetch(`http://localhost:5001/api/estudiantes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message || 'Usuario actualizado exitosamente');
      document.getElementById('editUserForm').style.display = 'none'; // Ocultar formulario
      getEstudiantes(); // Refrescar lista de usuarios
    })
    .catch((error) => {
      console.error('Error al actualizar el usuario:', error);
      alert('Hubo un error al actualizar el usuario.');
    });
}



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
      getEstudiantes(); // Refresca la lista de estudiantes
    })
    .catch((error) => {
      console.error('Error al eliminar el estudiante:', error);
    });
}
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
      
      // Generar tabla
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





function updateDocente() {
  const id = prompt('ID del docente que desea actualizar:');
  
  // Solicitar los datos actualizados al usuario
  const updatedData = {
    nombre: prompt('Nuevo nombre del docente:'),
    apellido: prompt('Nuevo apellido del docente:'),
    email: prompt('Nuevo correo del docente (dejar vacío para no cambiar):'),
    materia: prompt('Nueva materia del docente (dejar vacío para no cambiar):'),
    nivelEducativo: prompt('Nuevo nivel educativo del docente (dejar vacío para no cambiar):'),
  };

  // Limpiar campos vacíos (solo se enviarán los campos modificados)
  Object.keys(updatedData).forEach(key => {
    if (!updatedData[key]) delete updatedData[key];
  });

  // Enviar la solicitud PUT al backend
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
      getDocentes(); // Refresca la lista de docentes
    })
    .catch((error) => {
      console.error('Error al actualizar el docente:', error);
      alert('Hubo un error al actualizar el docente.');
    });
}


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
      getDocentes(); // Refresca la lista de docentes
    })
    .catch((error) => {
      console.error('Error al eliminar el docente:', error);
    });
}
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
      resultDiv.innerHTML = '<ul>' + data.map(tutoria => `
        <li>
          <strong>ID:</strong> ${tutoria._id} - 
          <strong>Estudiante:</strong> ${tutoria.estudiante.nombre} ${tutoria.estudiante.apellido} - 
          <strong>Tutor:</strong> ${tutoria.tutor.nombre} ${tutoria.tutor.apellido} - 
          <strong>Fecha:</strong> ${new Date(tutoria.fecha).toLocaleString()} - 
          <strong>Tema:</strong> ${tutoria.tema} - 
          <strong>Ubicación:</strong> ${tutoria.ubicacion || 'No especificada'}
        </li>`).join('') + '</ul>';
    })
    .catch((error) => {
      console.error('Error al obtener las tutorías:', error);
      alert('No se pudieron cargar las tutorías.');
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

function showEditForm() {
  const id = prompt('Ingrese el ID del usuario que desea modificar:');
  if (!id) return;

  // Llamada para obtener los datos del usuario por ID
  fetch(`http://localhost:5001/api/estudiantes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Rellenar los campos del formulario con los datos del usuario
      document.getElementById('editUserId').value = data._id;
      document.getElementById('editUserNombre').value = data.nombre || '';
      document.getElementById('editUserApellido').value = data.apellido || '';
      document.getElementById('editUserEmail').value = data.email || '';
      document.getElementById('editUserTelefono').value = data.telefono || '';

      // Mostrar el formulario
      document.getElementById('editUserForm').style.display = 'block';
    })
    .catch((error) => {
      console.error('Error al obtener el usuario:', error);
      alert('No se pudo cargar la información del usuario.');
    });
}


