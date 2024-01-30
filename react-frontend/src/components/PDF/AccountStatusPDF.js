import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generatePDF = (accountStatus, date) => {
  const { customer, beginningBalance, subtotal, endingBalance, statement } = accountStatus;
  const {startDate, endDate}=date;
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10; // Margen de 10 unidades por cada lado
  const lineWidth = 1.5; // Ancho de la línea del margen

  // Configuración del documento
  doc.setDrawColor(0, 0, 128); // Color azul naval
  doc.setLineWidth(lineWidth);
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

  // Título del documento
  doc.setTextColor(222, 32, 32);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(25);
  doc.text('Estado de Cuenta', margin, margin + 25);

  // Información del cliente
  const clientInfo = [
    ['Cliente', customer.customerName],
    ['ID de Cliente', customer.customerId],
    ['Dirección', customer.customerAddress],
    ['Teléfono', customer.customerPhone],
    ['Email', customer.customerEmail],
  ];

  autoTable(doc, {
    head: [['Detalle', 'Información']],
    body: clientInfo,
    startY: margin + 30,
    theme: 'grid',
    styles: { font: 'helvetica', cellWidth: 'wrap' },
    headStyles: { fillColor: [22, 160, 133] }, // Añade color a la cabecera si deseas
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left', cellWidth: '30%' },
      1: { halign: 'left', cellWidth: '70%' }
    },
  });

  const dateInfo = [
    ['Fecha de inicio', startDate],
    ['Fecha de fin', endDate],
  ];
  autoTable(doc, {
    head: [['Detalle', 'Información']],
    body: dateInfo,
    startY: margin + 30,
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

  autoTable(doc, {
    body: balanceInfo,
    startY: doc.lastAutoTable.finalY + 5,
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

  autoTable(doc, {
    head: statementHead,
    body: statementBody,
    startY: doc.lastAutoTable.finalY + 5,
    theme: 'striped',
    styles: { font: 'helvetica', cellWidth: 'wrap' },
    headStyles: { fillColor: [22, 160, 133] }, 
  });

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100);
  const currentDate = new Date().toLocaleString();
  doc.text('Este documento fue generado automáticamente, cualquier inconsistencia por favor reportarla.', margin, pageHeight - 20);

  // Guardar el PDF
  doc.save('estado_cuenta.pdf');
};

export default generatePDF;
