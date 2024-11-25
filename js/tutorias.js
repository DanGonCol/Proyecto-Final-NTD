function cargarTutorias() {
    const url = 'http://localhost:5001/api/tutorias';
  
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener las tutorías.');
        }
        return response.json();
      })
      .then((tutorias) => {
        const tabla = document.getElementById('tabla-tutorias').querySelector('tbody');
        tabla.innerHTML = '';
  
        tutorias.forEach((tutoria) => {
          const fila = document.createElement('tr');
  
          const columnaEstudiante = document.createElement('td');
          const columnaTutor = document.createElement('td');
          const columnaFecha = document.createElement('td');
          const columnaTema = document.createElement('td');
  
          columnaEstudiante.textContent = tutoria.estudiante || 'Desconocido';
          columnaTutor.textContent = tutoria.tutor || 'Desconocido';
          columnaFecha.textContent = new Date(tutoria.fecha).toLocaleString();
          columnaTema.textContent = tutoria.tema;
  
          fila.appendChild(columnaEstudiante);
          fila.appendChild(columnaTutor);
          fila.appendChild(columnaFecha);
          fila.appendChild(columnaTema);
  
          tabla.appendChild(fila);
        });
      })
      .catch((error) => {
        console.error('Error al cargar tutorías:', error);
        alert('Hubo un error al cargar las tutorías.');
      });
  }
  
  function volver() {
    // Redirigir al HTML de estudiante
    window.location.href = "estudiante.html";
  }
  
  function registrarTutoria() {
    // Obtener valores del formulario
    const estudiante = document.getElementById('estudiante').value;
    const tutor = document.getElementById('tutor').value;
    const fecha = document.getElementById('fecha').value;
    const tema = document.getElementById('tema').value;
  
    // Validar campos
    if (!estudiante || !tutor || !fecha || !tema) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    // Crear objeto de tutoría
    const tutoria = { estudiante, tutor, fecha, tema };
  
    // Hacer un POST a la API
    fetch('http://localhost:5001/api/tutorias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tutoria),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          document.getElementById('form-tutoria').reset(); // Limpiar formulario
        } else {
          alert('Error al registrar la tutoría.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un problema al conectar con el servidor.');
      });
  }
  