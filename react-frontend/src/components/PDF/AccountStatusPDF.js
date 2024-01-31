import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generatePDF = (accountStatus, date) => {
  const { customer, beginningBalance, subtotal, endingBalance, statement } = accountStatus;
  const { startDate, endDate } = date;
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10; // Margen de 10 unidades por cada lado
  let isFirstPage = true; // Variable para controlar si es la primera página

  // Título del documento
  doc.setTextColor(222, 32, 32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30); // Tamaño del título principal
  doc.text('Estado de Cuenta', margin + 30, margin + 25); // Ajusta la posición X para centrar

  // Información del cliente
  const clientInfo = [
    ['Cliente', customer.customerName],
    ['ID de Cliente', customer.customerId],
    ['Dirección', customer.customerAddress],
    ['Teléfono', customer.customerPhone],
    ['Email', customer.customerEmail],
  ];

  if (isFirstPage) {
    doc.setDrawColor(0, 0, 128);
    doc.setLineWidth(1.5);
    doc.rect(margin, margin, doc.internal.pageSize.getWidth() - 2 * margin, pageHeight - 2 * margin);
  }

  autoTable(doc, {
    head: [['Detalle', 'Información']],
    body: clientInfo,
    startY: margin + 30, // Ajusta la posición Y para el contenido principal
    theme: 'grid',
    styles: { font: 'helvetica', cellWidth: 'wrap' },
    headStyles: { fillColor: [22, 160, 133] }, // Añade color a la cabecera si deseas
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left', cellWidth: '30%' },
      1: { halign: 'left', cellWidth: '70%' }
    },
  });

  // Información de la fecha
  const dateInfo = [
    ['Fecha de inicio', startDate],
    ['Fecha de fin', endDate],
  ];
  
  if (isFirstPage) {
    doc.setDrawColor(0, 0, 128);
    doc.setLineWidth(1.5);
    doc.rect(margin, margin, doc.internal.pageSize.getWidth() - 2 * margin, pageHeight - 2 * margin);
  }

  autoTable(doc, {
    head: [['Detalle', 'Información']],
    body: dateInfo,
    startY: isFirstPage ? doc.lastAutoTable.finalY + 10 : margin + 10, // Ajusta la posición Y para la siguiente tabla
    theme: 'grid',
    styles: { font: 'helvetica', cellWidth: 'wrap' },
    headStyles: { fillColor: [22, 160, 133] }, // Añade color a la cabecera si deseas
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left', cellWidth: '30%' },
      1: { halign: 'left', cellWidth: '70%' }
    },
  });

  // Saldo inicial, subtotal y saldo final
  const balanceInfo = [
    ['Saldo Inicial', `$${beginningBalance.toFixed(2)}`],
    ['Subtotal', `$${subtotal.toFixed(2)}`],
    ['Saldo Final', `$${endingBalance.toFixed(2)}`]
  ];

  if (isFirstPage) {
    doc.setDrawColor(0, 0, 128);
    doc.setLineWidth(1.5);
    doc.rect(margin, margin, doc.internal.pageSize.getWidth() - 2 * margin, pageHeight - 2 * margin);
  }

  autoTable(doc, {
    body: balanceInfo,
    startY: isFirstPage ? doc.lastAutoTable.finalY + 10 : margin + 10, // Ajusta la posición Y para la siguiente tabla
    theme: 'grid',
    tableWidth: 'auto',
    styles: { font: 'helvetica', cellWidth: 'wrap' },
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left' },
      1: { halign: 'right' }
    },
  });

  // Movimientos
  const statementHead = [['Fecha', 'Tipo', 'ID', 'Debe', 'Haber']];
  const statementBody = statement.map(item => [
    item.date ? new Date(item.date).toLocaleDateString() : '',
    item.type,
    item.id,
    `$${item.debe.toFixed(2)}`,
    `$${item.haber.toFixed(2)}`
  ]);

  if (isFirstPage) {
    doc.setDrawColor(0, 0, 128);
    doc.setLineWidth(1.5);
    doc.rect(margin, margin, doc.internal.pageSize.getWidth() - 2 * margin, pageHeight - 2 * margin);
  }
   // Título más pequeño antes de la última tabla
   doc.setFontSize(14); // Tamaño del título más pequeño
   doc.text('Detalle de las transacciones',11 + margin, doc.lastAutoTable.finalY + 8); // Ajusta la posición Y
  autoTable(doc, {
    head: statementHead,
    body: statementBody,
    startY: isFirstPage ? doc.lastAutoTable.finalY + 10 : margin + 10, // Ajusta la posición Y para la siguiente tabla
    theme: 'striped',
    styles: { font: 'helvetica', cellWidth: 'wrap' },
    headStyles: { fillColor: [22, 160, 133] },
  });


  // Aplicar el margen solo en la primera página
  if (isFirstPage) {
    doc.setDrawColor(0, 0, 128);
    doc.setLineWidth(1.5);
    doc.rect(margin, margin, doc.internal.pageSize.getWidth() - 2 * margin, pageHeight - 2 * margin);
    isFirstPage = false; // Cambiar a false para que no se aplique en las siguientes páginas
  }

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100);
  const currentDate = new Date().toLocaleString();
  doc.text('Este documento fue generado automáticamente, cualquier inconsistencia por favor reportarla.', margin+3, pageHeight - 20);


  // Guardar el PDF
  doc.save('estado_cuenta.pdf');
};

export default generatePDF;
