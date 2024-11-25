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
  

    function imprimirTutorias() {
      fetch('http://localhost:5001/api/tutorias', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
          .then(response => response.json())
          .then(data => {
              // Crear un HTML imprimible
              let printableContent = `
                  <html>
                      <head>
                          <title>Impresión de Tutorías</title>
                          <style>
                              body {
                                  font-family: Arial, sans-serif;
                                  padding: 20px;
                              }
                              table {
                                  width: 100%;
                                  border-collapse: collapse;
                                  margin-bottom: 20px;
                              }
                              th, td {
                                  border: 1px solid #000;
                                  padding: 8px;
                                  text-align: left;
                              }
                              th {
                                  background-color: #f2f2f2;
                              }
                              h1 {
                                  text-align: center;
                                  margin-bottom: 20px;
                              }
                          </style>
                      </head>
                      <body>
                          <h1>Lista de Tutorías</h1>
                          <table>
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
  
              // Agregar las filas de tutorías
              data.forEach(tutoria => {
                  printableContent += `
                      <tr>
                          <td>${tutoria._id}</td>
                          <td>${tutoria.estudiante?.nombre || 'Desconocido'} ${tutoria.estudiante?.apellido || ''}</td>
                          <td>${tutoria.tutor?.nombre || 'Desconocido'} ${tutoria.tutor?.apellido || ''}</td>
                          <td>${new Date(tutoria.fecha).toLocaleDateString()} ${new Date(tutoria.fecha).toLocaleTimeString()}</td>
                          <td>${tutoria.tema}</td>
                          <td>${tutoria.ubicacion || 'No especificada'}</td>
                      </tr>
                  `;
              });
  
              // Cerrar la tabla y el HTML
              printableContent += `
                              </tbody>
                          </table>
                      </body>
                  </html>
              `;
  
              // Abrir una nueva ventana con el contenido imprimible
              const printWindow = window.open('', '_blank');
              printWindow.document.open();
              printWindow.document.write(printableContent);
              printWindow.document.close();
              printWindow.print();
          })
          .catch(error => {
              console.error('Error al obtener las tutorías:', error);
              alert('No se pudieron cargar las tutorías para imprimir.');
          });
  }
  
  function getEstudiantes() {
    fetch('http://localhost:5001/api/estudiantes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('tutoriasTableBody'); // Ajusta al ID de tu tabla
        if (!tableBody) {
            console.error('No se encontró el elemento con ID tutoriasTableBody.');
            return;
        }

        tableBody.innerHTML = ''; // Limpiar contenido previo

        // Iterar sobre los estudiantes y agregarlos a la tabla
        data.forEach(estudiante => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${estudiante._id}</td>
                <td>${estudiante.nombre.toUpperCase()} ${estudiante.apellido.toUpperCase()}</td>
                <td>${estudiante.email.toUpperCase()}</td>
                <td>${estudiante.telefono ? estudiante.telefono.toUpperCase() : 'No especificado'}</td>
                <td>${new Date(estudiante.createdAt).toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener los estudiantes:', error);
        alert('No se pudieron cargar los estudiantes.');
    });
}

function getTutorias() {
  fetch('http://localhost:5001/api/tutorias', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => response.json())
  .then(data => {
      const tableBody = document.getElementById('tutoriasTableBody'); // ID del cuerpo de la tabla
      if (!tableBody) {
          console.error('No se encontró el elemento con ID tutoriasTableBody.');
          return;
      }

      tableBody.innerHTML = ''; // Limpiar contenido previo

      // Iterar sobre las tutorías y agregarlas a la tabla
      data.forEach(tutoria => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${tutoria._id}</td>
              <td>${tutoria.estudiante?.nombre?.toUpperCase() || 'Desconocido'} ${tutoria.estudiante?.apellido?.toUpperCase() || ''}</td>
              <td>${tutoria.tutor?.nombre?.toUpperCase() || 'Desconocido'} ${tutoria.tutor?.apellido?.toUpperCase() || ''}</td>
              <td>${new Date(tutoria.fecha).toLocaleDateString()}</td>
              <td>${new Date(tutoria.fecha).toLocaleTimeString()}</td>
              <td>${tutoria.tema.toUpperCase()}</td>
              <td>${tutoria.ubicacion?.toUpperCase() || 'No especificada'}</td>
          `;
          tableBody.appendChild(row);
      });
  })
  .catch(error => {
      console.error('Error al obtener las tutorías:', error);
      alert('No se pudieron cargar las tutorías.');
  });
}

 // Logout
 function logout() {
  window.location.href = "/html/seleccion inicio de sesion.html";
}