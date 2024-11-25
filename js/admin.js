
function logout() {
  window.location.href = "/html/seleccion inicio de sesion.html";
}

// Registrar administrador
function registrarAdmin() {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;
  const confirmarPassword = document.getElementById('confirmar_password').value;

  if (password !== confirmarPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  const admin = { nombre, apellido, email: correo, password };

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
        alert(data.message);
        window.location.href = 'login admin.html';
      } else {
        alert('Error al registrar el administrador.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Hubo un error al conectar con el servidor.');
    });
}
