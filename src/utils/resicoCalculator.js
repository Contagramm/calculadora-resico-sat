/**
 * RESICO Tax Calculator
 * Calculates IVA, retenciones, and monthly payments according to Mexican tax law
 */

const IVA_RATE = 0.16;
const RETENCION_IVA_RATE = 0.106667; // 10.6667% of subtotal
const RETENCION_ISR_RATE = 0.0125; // 1.25% of subtotal

/**
 * Calculate RESICO taxes for an invoice
 */
export function calculateInvoiceTaxes(invoice) {
  const subtotal = invoice.subtotal || 0;
  
  return {
    ...invoice,
    ivaTrasladado: subtotal * IVA_RATE,
    retencionIVA: invoice.retencionIVA || (subtotal * RETENCION_IVA_RATE),
    retencionISR: invoice.retencionISR || (subtotal * RETENCION_ISR_RATE),
    totalRecibido: subtotal + (subtotal * IVA_RATE) - (invoice.retencionIVA || subtotal * RETENCION_IVA_RATE) - (invoice.retencionISR || subtotal * RETENCION_ISR_RATE)
  };
}

/**
 * Group invoices by month (excluding non-deductible expenses)
 */
export function groupInvoicesByMonth(invoices) {
  const monthlyData = {};
  
  invoices.forEach(invoice => {
    const date = new Date(invoice.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        year: date.getFullYear(),
        monthNumber: date.getMonth() + 1,
        invoices: [],
        emitidas: [],
        recibidas: [],
        recibidasExcluidas: []
      };
    }
    
    monthlyData[monthKey].invoices.push(invoice);
    
    // Classify as emitida or recibida based on type
    if (invoice.type === 'emitida') {
      monthlyData[monthKey].emitidas.push(invoice);
    } else {
      // Check if expense is deductible
      const validation = invoice.deductionValidation;
      if (validation && validation.isDeductible === false) {
        // Exclude non-deductible expenses from calculations
        monthlyData[monthKey].recibidasExcluidas.push(invoice);
      } else {
        // Include deductible and uncertain expenses
        monthlyData[monthKey].recibidas.push(invoice);
      }
    }
  });
  
  return monthlyData;
}

/**
 * Calculate monthly totals with RESICO rules
 */
export function calculateMonthlyTotals(monthlyData) {
  const months = Object.keys(monthlyData).sort();
  let saldoAFavorAcumulado = 0;
  
  const monthlyTotals = months.map(monthKey => {
    const data = monthlyData[monthKey];
    
    // Calculate totals for emitidas (issued invoices)
    const emitidas = {
      count: data.emitidas.length,
      subtotal: data.emitidas.reduce((sum, inv) => sum + inv.subtotal, 0),
      ivaTrasladado: data.emitidas.reduce((sum, inv) => sum + (inv.subtotal * IVA_RATE), 0),
      retencionIVA: data.emitidas.reduce((sum, inv) => sum + (inv.retencionIVA || inv.subtotal * RETENCION_IVA_RATE), 0),
      retencionISR: data.emitidas.reduce((sum, inv) => sum + (inv.retencionISR || inv.subtotal * RETENCION_ISR_RATE), 0)
    };
    
    // Calculate totals for recibidas (received invoices)
    const recibidas = {
      count: data.recibidas.length,
      subtotal: data.recibidas.reduce((sum, inv) => sum + inv.subtotal, 0),
      iva: data.recibidas.reduce((sum, inv) => sum + (inv.iva || inv.subtotal * IVA_RATE), 0)
    };
    
    // Calculate IVA to pay (IVA trasladado - IVA acreditable - retenciones IVA)
    const ivaAPagar = emitidas.ivaTrasladado - recibidas.iva - emitidas.retencionIVA;
    
    // Calculate total monthly payment to SAT
    const pagoMensual = Math.max(0, ivaAPagar + saldoAFavorAcumulado);
    
    // Update saldo a favor
    if (ivaAPagar < 0) {
      saldoAFavorAcumulado += Math.abs(ivaAPagar);
    } else if (pagoMensual > 0) {
      saldoAFavorAcumulado = 0;
    }
    
    const totalRecibido = emitidas.subtotal + emitidas.ivaTrasladado - emitidas.retencionIVA - emitidas.retencionISR;
    
    return {
      month: monthKey,
      year: data.year,
      monthNumber: data.monthNumber,
      monthName: getMonthName(data.monthNumber),
      emitidas,
      recibidas,
      ivaAPagar,
      pagoMensual,
      saldoAFavor: saldoAFavorAcumulado,
      totalRecibido,
      totalInvoices: data.invoices.length
    };
  });
  
  return monthlyTotals;
}

/**
 * Calculate annual totals
 */
export function calculateAnnualTotals(monthlyTotals) {
  return {
    totalEmitidas: monthlyTotals.reduce((sum, m) => sum + m.emitidas.count, 0),
    totalRecibidas: monthlyTotals.reduce((sum, m) => sum + m.recibidas.count, 0),
    subtotalEmitidas: monthlyTotals.reduce((sum, m) => sum + m.emitidas.subtotal, 0),
    subtotalRecibidas: monthlyTotals.reduce((sum, m) => sum + m.recibidas.subtotal, 0),
    ivaTrasladado: monthlyTotals.reduce((sum, m) => sum + m.emitidas.ivaTrasladado, 0),
    ivaAcreditable: monthlyTotals.reduce((sum, m) => sum + m.recibidas.iva, 0),
    retencionesIVA: monthlyTotals.reduce((sum, m) => sum + m.emitidas.retencionIVA, 0),
    retencionesISR: monthlyTotals.reduce((sum, m) => sum + m.emitidas.retencionISR, 0),
    totalPagado: monthlyTotals.reduce((sum, m) => sum + m.pagoMensual, 0),
    totalRecibido: monthlyTotals.reduce((sum, m) => sum + m.totalRecibido, 0),
    saldoFinal: monthlyTotals[monthlyTotals.length - 1]?.saldoAFavor || 0
  };
}

/**
 * Get month name in Spanish
 */
function getMonthName(monthNumber) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthNumber - 1];
}

/**
 * Format currency
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
}
