import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generatePDF = async (paymentData) => {
    // Extraer los datos necesarios
    const {
        paymentId,
        customer: { customerId, customerName },
        paymentDetail,
        paymentAmount,
        paymentDate,
        paymentDetails,
    } = paymentData;

    // Crear un nuevo documento PDF
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10; // Margen de 10 unidades por cada lado
    let startY = margin + 20; // Iniciar después del título
    let isFirstPage = true; 

// Título del documento
doc.setTextColor(222, 32, 32);
doc.setFont("helvetica", "bold");
doc.setFontSize(25); // Tamaño del título principal
doc.text(`Detalle de Pago - ${paymentId}`, margin + 30, startY); 
    // Información del cliente
    startY += 10; // Incrementar startY para la siguiente sección
    const clientInfo = [
        ['ID de Cliente', customerId],
        ['Nombre del Cliente', customerName],
    ];

    autoTable(doc, {
        head: [['Campo', 'Detalle']],
        body: clientInfo,
        startY,
        theme: 'plain',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
    });

    // Ajustar startY para la siguiente tabla
    startY = doc.lastAutoTable.finalY + 10;

    // Detalle de Pago, Cantidad y Fecha
    const paymentInfo = [
        ['Detalle de Pago', paymentDetail],
        ['Cantidad de Pago', `$${paymentAmount.toFixed(2)}`],
        ['Fecha de Pago', new Date(paymentDate).toISOString().split('T')[0]],
    ];

    autoTable(doc, {
        head: [['Campo', 'Detalle']],
        body: paymentInfo,
        startY,
        theme: 'plain',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
    });

    // Ajustar startY para la tabla de detalles de pago
    startY = doc.lastAutoTable.finalY + 10; // Asegúrate de que haya suficiente espacio

doc.setFontSize(12); // Establece el tamaño de la fuente para el texto "hola"
doc.text('Detalles de facturas', margin+5, startY); // Añade el texto "hola" en la posición adecuada

// Ajustar startY para la tercera tabla
startY += 10; 

    // Tabla de detalles de pago
    const paymentDetailsHead = [['ID de Factura', 'Cantidad Aplicada']];
    const paymentDetailsBody = paymentDetails.map(detail => [detail.invoiceId, `$${detail.amountApplied.toFixed(2)}`]);

    autoTable(doc, {
        head: paymentDetailsHead,
        body: paymentDetailsBody,
        startY,
        theme: 'striped',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
    });
    if (isFirstPage) {
        doc.setDrawColor(0, 0, 128);
        doc.setLineWidth(1.5);
        doc.rect(margin, margin, doc.internal.pageSize.getWidth() - 2 * margin, pageHeight - 2 * margin);
        isFirstPage = false; // Cambiar a false para que no se aplique en las siguientes páginas
      }
    // Footer
    const currentDate = new Date().toLocaleString(); // Fecha y hora del sistema
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Documento generado: ${currentDate}`, margin+5, pageHeight - 20);

    // Guardar el PDF con un nombre específico
    doc.save(`Detalle_Pago_${paymentId}.pdf`);
};

export default generatePDF;
