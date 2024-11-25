function handleRedirection() {
    // Obtener el valor seleccionado
    const userType = document.getElementById('tipo_cuenta').value;
  
    // Verificar la selección y redirigir a la página correspondiente
    if (userType === "administrador") {
      window.location.href = "admin.html"; // Página para administrador
    } else if (userType === "tutor") {
      window.location.href = "docente.html"; // Página para docente
    } else if (userType === "usuario") {
      window.location.href = "estudiante.html"; // Página para estudiante
    } else {
      alert("Por favor, seleccione un tipo de cuenta válido."); // Mensaje de error si no se seleccionó nada
    }
  }
  
  // Función para manejar la redirección según el tipo de cuenta
function handleRedirection() {
  const tipoCuenta = document.getElementById("tipo_cuenta").value;

  if (tipoCuenta === "administrador") {
      window.location.href = "login admin.html"; // Ruta para administrador
  } else if (tipoCuenta === "usuario") {
      window.location.href = "login estudiante.html"; // Ruta para estudiante
  } else if (tipoCuenta === "tutor") {
      window.location.href = "login docente.html"; // Ruta para docente/tutor
  } else {
      alert("Por favor, seleccione un tipo de cuenta válido.");
  }
}

function handleRedirections() {
  const tipoCuenta = document.getElementById("tipo_cuenta").value;

  if (tipoCuenta === "administrador") {
      window.location.href = "register admin.html"; // Ruta para administrador
  } else if (tipoCuenta === "usuario") {
      window.location.href = "register estudiante.html"; // Ruta para estudiante
  } else if (tipoCuenta === "tutor") {
      window.location.href = "register docente.html"; // Ruta para docente/tutor
  } else {
      alert("Por favor, seleccione un tipo de cuenta válido.");
  }
}

function logindocente() {
  // Redirige directamente a docente.html
  window.location.href = "docente.html";
}

function login_admin() {
  // Redirige directamente a docente.html
  window.location.href = "admin.html";
}


function login_estudiante() {
  // Redirige directamente a docente.html
  window.location.href = "estudiante.html";
}


