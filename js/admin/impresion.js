window.generarPDF = async function generarPDF() {
        try {
            const { jsPDF } = window.jspdf; // Asegúrate de extraer jsPDF correctamente
            const pdf = new jsPDF();
    
            // Configuración inicial del PDF
            pdf.setFontSize(16);
            pdf.text('Reporte de Usuarios y Tutores', 10, 10);
            pdf.setFontSize(12);
            pdf.text('Generado por BrainBuddies', 10, 20);
            pdf.setFontSize(10);
    
            let posY = 30; // Posición inicial en Y para escribir en el PDF
    
            // Obtener datos de estudiantes
            const estudiantesResponse = await fetch('http://localhost:5001/api/estudiantes');
            if (!estudiantesResponse.ok) {
                throw new Error('Error al obtener estudiantes');
            }
            const estudiantes = await estudiantesResponse.json();
    
            // Agregar estudiantes al PDF
            pdf.text('Lista de Estudiantes:', 10, posY);
            posY += 10;
            estudiantes.forEach((estudiante, index) => {
                pdf.text(
                    `${index + 1}. Nombre: ${estudiante.nombre} ${estudiante.apellido}, Email: ${estudiante.email}, Teléfono: ${estudiante.telefono || 'No especificado'}`,
                    10,
                    posY
                );
                posY += 10;
                if (posY > 270) { // Salto de página si la posición supera el límite
                    pdf.addPage();
                    posY = 10;
                }
            });
    
            posY += 10; // Espaciado antes de la siguiente sección
    
            // Obtener datos de tutores
            const tutoresResponse = await fetch('http://localhost:5001/api/tutores');
            if (!tutoresResponse.ok) {
                throw new Error('Error al obtener tutores');
            }
            const tutores = await tutoresResponse.json();
    
            // Agregar tutores al PDF
            pdf.text('Lista de Tutores:', 10, posY);
            posY += 10;
            tutores.forEach((tutor, index) => {
                pdf.text(
                    `${index + 1}. Nombre: ${tutor.nombre} ${tutor.apellido}, Email: ${tutor.email}, Materia: ${tutor.materia || 'No especificado'}, Nivel Educativo: ${tutor.nivelEducativo || 'No especificado'}`,
                    10,
                    posY
                );
                posY += 10;
                if (posY > 270) { // Salto de página si la posición supera el límite
                    pdf.addPage();
                    posY = 10;
                }
            });
    
            // Guardar el PDF
            pdf.save('reporte_usuarios_tutores.pdf');
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            alert('Hubo un error al generar el PDF.');
        }
    };
    
    // Logout
    function logout() {
        window.location.href = "/html/seleccion inicio de sesion.html";
      }