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
  
  function logout() {
    // Redirigir al HTML de login
    window.location.href = "seleccion inicio de sesion.html";
  }
  
  function registrarDocente() {
    // Obtener valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const materia = document.getElementById('materia').value;
    const nivelEducativo = document.getElementById('nivelEducativo').value; // Opcional
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmar_password').value;
  
    // Validar que las contraseñas coincidan
    if (password !== confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
  
    // Crear el objeto tutor para enviar
    const docente = {
      nombre,
      apellido,
      email: correo,
      materia,
      nivelEducativo, // Campo opcional
    };
  
    // Enviar la solicitud POST a la API
    fetch('http://localhost:5001/api/tutores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(docente),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // Mostrar mensaje de éxito
          window.location.href = 'login docente.html'; // Redirigir al login del docente
        } else {
          alert('Exito registrar el docente.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error en el servidor.');
      });
  }
  