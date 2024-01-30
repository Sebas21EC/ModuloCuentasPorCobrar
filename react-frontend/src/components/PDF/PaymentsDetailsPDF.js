import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generatePDF = (details) => {
  const { paymentDetailsToSend, customerName, customerId, paymentDate, paymentId, paymentDetail, bankAccountId, paymentAmount } = details;

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10; // Margen de 10 unidades por cada lado
  const lineWidth = 1.5; // Ancho de la línea del margen

  // Establece el color para el margen (azul naval)
  doc.setDrawColor(0, 0, 128); // Color azul naval
  // Establece el ancho de la línea para el margen
  doc.setLineWidth(lineWidth);
  // Dibuja un rectángulo para el margen
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin); // Rectángulo sin relleno

  // Título del documento
  doc.setTextColor(222, 32, 32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  doc.text('DETALLE DE PAGO', 20 + margin, margin + 20);

  // Información del cliente en una tabla
  const clientInfo = [
    ['Cliente', customerName],
    ['ID de Cliente', customerId],
    ['Fecha de Pago', paymentDate],
    ['ID de Pago', paymentId]
  ];

  autoTable(doc, {
    body: clientInfo,
    startY: margin + 25,
    theme: 'grid',
    tableWidth: '60%', // Ajustado al 60% del ancho de la página
    styles: { font: 'helvetica', cellWidth: 'wrap' },
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left', cellWidth: '20%' },
      1: { halign: 'left', cellWidth: '25%' }
    },
  });
  const paymentInfo = [
    ['Detalle de Pago', paymentDetail],
    ['ID de Cuenta Bancaria', bankAccountId],
    ['Cantidad de Pago', paymentAmount]
  ];

  doc.setFontSize(10); // Tamaño de fuente para "Detalles del pago"
  let textYPosition = doc.lastAutoTable.finalY + 5; // Ajusta la posición 'y' del texto para reducir el espacio
  doc.text('Detalles del pago', 11 + margin, textYPosition);


  autoTable(doc, {
    body: paymentInfo,
    startY: doc.lastAutoTable.finalY + 10, // Aumenta el espacio entre tablas
    theme: 'grid',
    tableWidth: '60%', // Ajustado al 60% del ancho de la página
    styles: { font: 'helvetica', cellWidth: 'wrap' },
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left', cellWidth: '30%' },
      1: { halign: 'left', cellWidth: '45%' }
    },
  });
  textYPosition = doc.lastAutoTable.finalY + 5; // Reduce el espacio antes del texto "Monto cancelado por factura"
  doc.setFontSize(10); // Tamaño de fuente para "Monto cancelado por factura"
  doc.text('Monto cancelado por factura', 11 + margin, textYPosition);

  // Datos de la tabla de detalles de pago
  const paymentDetailsHead = [['ID de Factura', 'Cantidad Aplicada']];
  const paymentDetailsBody = paymentDetailsToSend.map(detail => [detail.invoiceId, detail.amountApplied]);

  autoTable(doc, {
    head: paymentDetailsHead,
    body: paymentDetailsBody,
    startY: textYPosition+5, // Continuar después de la tabla anterior
    theme: 'striped',
    tableWidth: '75%', // Ajusta el ancho de la tabla
    styles: { font: 'helvetica' },
  });

  // Footer
  doc.setFontSize(12);
  doc.setTextColor(100);
  const currentDate = new Date().toLocaleString(); // Fecha y hora del sistema
  doc.text('Este documento contiene un detalle de los pagos que ha realizado', 20, doc.internal.pageSize.height - 30);
  doc.text(`Documento generado: ${currentDate}`, 20, doc.internal.pageSize.height - 20);

  // Guarda el PDF con un nombre específico
  doc.save('detalle_pago.pdf');
};

export default generatePDF;
