import * as XLSX from 'xlsx';

/**
 * Export monthly data to CSV
 */
export function exportToCSV(monthlyTotals, annualTotals) {
  const headers = [
    'Mes',
    'Facturas Emitidas',
    'Subtotal Emitidas',
    'IVA Trasladado',
    'Retención IVA',
    'Retención ISR',
    'Facturas Recibidas',
    'Subtotal Recibidas',
    'IVA Acreditable',
    'IVA a Pagar',
    'Pago Mensual',
    'Saldo a Favor',
    'Total Recibido'
  ];
  
  const rows = monthlyTotals.map(month => [
    `${month.monthName} ${month.year}`,
    month.emitidas.count,
    month.emitidas.subtotal.toFixed(2),
    month.emitidas.ivaTrasladado.toFixed(2),
    month.emitidas.retencionIVA.toFixed(2),
    month.emitidas.retencionISR.toFixed(2),
    month.recibidas.count,
    month.recibidas.subtotal.toFixed(2),
    month.recibidas.iva.toFixed(2),
    month.ivaAPagar.toFixed(2),
    month.pagoMensual.toFixed(2),
    month.saldoAFavor.toFixed(2),
    month.totalRecibido.toFixed(2)
  ]);
  
  // Add annual totals
  rows.push([]);
  rows.push([
    'TOTALES ANUALES',
    annualTotals.totalEmitidas,
    annualTotals.subtotalEmitidas.toFixed(2),
    annualTotals.ivaTrasladado.toFixed(2),
    annualTotals.retencionesIVA.toFixed(2),
    annualTotals.retencionesISR.toFixed(2),
    annualTotals.totalRecibidas,
    annualTotals.subtotalRecibidas.toFixed(2),
    annualTotals.ivaAcreditable.toFixed(2),
    '',
    annualTotals.totalPagado.toFixed(2),
    annualTotals.saldoFinal.toFixed(2),
    annualTotals.totalRecibido.toFixed(2)
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');
  
  downloadFile(csvContent, 'resico-declaracion.csv', 'text/csv;charset=utf-8;');
}

/**
 * Export monthly data to Excel
 */
export function exportToExcel(monthlyTotals, annualTotals, invoices) {
  const workbook = XLSX.utils.book_new();
  
  // Sheet 1: Monthly Summary
  const monthlyData = monthlyTotals.map(month => ({
    'Mes': `${month.monthName} ${month.year}`,
    'Facturas Emitidas': month.emitidas.count,
    'Subtotal Emitidas': month.emitidas.subtotal,
    'IVA Trasladado': month.emitidas.ivaTrasladado,
    'Retención IVA': month.emitidas.retencionIVA,
    'Retención ISR': month.emitidas.retencionISR,
    'Facturas Recibidas': month.recibidas.count,
    'Subtotal Recibidas': month.recibidas.subtotal,
    'IVA Acreditable': month.recibidas.iva,
    'IVA a Pagar': month.ivaAPagar,
    'Pago Mensual': month.pagoMensual,
    'Saldo a Favor': month.saldoAFavor,
    'Total Recibido': month.totalRecibido
  }));
  
  // Add annual totals
  monthlyData.push({
    'Mes': 'TOTALES ANUALES',
    'Facturas Emitidas': annualTotals.totalEmitidas,
    'Subtotal Emitidas': annualTotals.subtotalEmitidas,
    'IVA Trasladado': annualTotals.ivaTrasladado,
    'Retención IVA': annualTotals.retencionesIVA,
    'Retención ISR': annualTotals.retencionesISR,
    'Facturas Recibidas': annualTotals.totalRecibidas,
    'Subtotal Recibidas': annualTotals.subtotalRecibidas,
    'IVA Acreditable': annualTotals.ivaAcreditable,
    'IVA a Pagar': '',
    'Pago Mensual': annualTotals.totalPagado,
    'Saldo a Favor': annualTotals.saldoFinal,
    'Total Recibido': annualTotals.totalRecibido
  });
  
  const monthlySheet = XLSX.utils.json_to_sheet(monthlyData);
  XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Resumen Mensual');
  
  // Sheet 2: All Invoices Detail
  const invoicesData = invoices.map(inv => ({
    'Archivo': inv.fileName,
    'Tipo': inv.type === 'emitida' ? 'Emitida' : 'Recibida',
    'Fecha': inv.date.toLocaleDateString('es-MX'),
    'Subtotal': inv.subtotal,
    'IVA': inv.iva || inv.subtotal * 0.16,
    'Retención IVA': inv.retencionIVA || (inv.type === 'emitida' ? inv.subtotal * 0.106667 : 0),
    'Retención ISR': inv.retencionISR || (inv.type === 'emitida' ? inv.subtotal * 0.0125 : 0),
    'Total': inv.total
  }));
  
  const invoicesSheet = XLSX.utils.json_to_sheet(invoicesData);
  XLSX.utils.book_append_sheet(workbook, invoicesSheet, 'Detalle Facturas');
  
  // Generate and download
  XLSX.writeFile(workbook, 'resico-declaracion.xlsx');
}

/**
 * Helper function to download file
 */
function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
