// pdfGenerator.js
import jsPDF from 'jspdf';const generatePDF = (details) => {
  const { paymentDetailsToSend, customerName, customerId, paymentDate } = details;
 
  // Crea un nuevo documento PDF
  const doc = new jsPDF();
 
  // Definir estilos
  const titleStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#66b3ff',
  };
 
  const subtitleStyle = {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a237e',
  };
 
  const contentStyle = {
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5,
    color: '#000000',
  };
 
  // Título del documento
  doc.setTextColor(102, 179, 255); // Establecer color de texto usando RGB
  doc.text('Detalle de Pago', 105, 15, titleStyle);
 
  // Agrega información del cliente
  doc.setFontSize(14); // Restablece el tamaño de fuente para subtítulos
  doc.setTextColor(26, 35, 126); // Establecer color de texto usando RGB
  doc.text(`Cliente: ${customerName}`, 20, 30, subtitleStyle);
  doc.text(`ID de Cliente: ${customerId}`, 20, 40, subtitleStyle);
  doc.text(`Fecha de Pago: ${paymentDate}`, 20, 50, subtitleStyle);
 
  // Agrega los detalles de pago al PDF
  let yPosition = 70; // Comienza después de la información del cliente
  doc.setTextColor(0, 0, 0); // Establecer color de texto usando RGB (negro)
  paymentDetailsToSend.forEach((paymentDetail) => {
    doc.text(`Payment Detail ID: ${paymentDetail.invoiceId}`, 20, yPosition, contentStyle);
    doc.text(`Payment ID: ${paymentDetail.paymentId}`, 20, yPosition + 10, contentStyle);
    doc.text(`Invoice ID: ${paymentDetail.invoiceId}`, 20, yPosition + 20, contentStyle);
    doc.text(`Amount Applied: ${paymentDetail.amountApplied}`, 20, yPosition + 30, contentStyle);
    yPosition += 40; // Espacio entre cada conjunto de datos
  });
 
  // Guarda el PDF con un nombre específico
  doc.save('detalle_pago.pdf');
};
 
export default generatePDF;