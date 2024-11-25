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
  
  function registrarEstudiante() {
    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value; // Opcional
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmar_password').value;
  
    // Validar contraseñas
    if (password !== confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
  
    // Crear el objeto estudiante para enviar
    const estudiante = {
      nombre,
      apellido,
      email: correo,
      telefono, // Campo opcional según el modelo
    };
  
    // Enviar los datos a la API
    fetch('http://localhost:5001/api/estudiantes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estudiante),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // Confirmación de éxito
          window.location.href = 'login estudiante.html'; // Redirigir al login de estudiantes
        } else {
          alert('Exito al registrar el estudiante.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un error al conectar con el servidor.');
      });
  }
  
  function irATutorias() {
    // Redirigir al HTML de tutorías
    window.location.href = "tutorias.html";
  }
  
  function logout() {
    // Redirigir al HTML de login
    window.location.href = "seleccion inicio de sesion.html";
  }
  