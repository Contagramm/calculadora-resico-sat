/**
 * Universal File Processor
 * Handles both PDF and XML files
 */

import { processPDFFiles } from './pdfParser';
import { processXMLFiles, isXMLFile, isPDFFile } from './xmlParser';
import { validateDeduction } from './deductionValidator';

/**
 * Process files (PDF or XML) with deduction validation
 */
export async function processFiles(files, invoiceType = 'emitida') {
  const pdfFiles = [];
  const xmlFiles = [];
  const unsupportedFiles = [];
  
  // Separate files by type
  files.forEach(file => {
    if (isXMLFile(file)) {
      xmlFiles.push(file);
    } else if (isPDFFile(file)) {
      pdfFiles.push(file);
    } else {
      unsupportedFiles.push(file);
    }
  });
  
  const results = {
    invoices: [],
    stats: {
      xml: 0,
      pdf: 0,
      errors: 0,
      unsupported: unsupportedFiles.length,
      nonDeductible: 0,
      deductible: 0
    }
  };
  
  // Process XML files
  if (xmlFiles.length > 0) {
    try {
      const xmlInvoices = await processXMLFiles(xmlFiles);
      results.invoices.push(...xmlInvoices);
      results.stats.xml = xmlInvoices.filter(inv => !inv.error).length;
      results.stats.errors += xmlInvoices.filter(inv => inv.error).length;
    } catch (error) {
      console.error('Error processing XML files:', error);
    }
  }
  
  // Process PDF files
  if (pdfFiles.length > 0) {
    try {
      const pdfInvoices = await processPDFFiles(pdfFiles);
      results.invoices.push(...pdfInvoices);
      results.stats.pdf = pdfInvoices.filter(inv => !inv.error).length;
      results.stats.errors += pdfInvoices.filter(inv => inv.error).length;
    } catch (error) {
      console.error('Error processing PDF files:', error);
    }
  }
  
  // Add unsupported files as errors
  unsupportedFiles.forEach(file => {
    results.invoices.push({
      fileName: file.name,
      format: 'UNSUPPORTED',
      date: new Date(),
      subtotal: 0,
      iva: 0,
      retencionIVA: 0,
      retencionISR: 0,
      total: 0,
      error: 'Formato no soportado. Use XML o PDF'
    });
  });
  
  // Validate deductions for received invoices (expenses)
  if (invoiceType === 'recibida') {
    results.invoices.forEach(invoice => {
      if (!invoice.error) {
        invoice.type = invoiceType;
        const validation = validateDeduction(invoice);
        invoice.deductionValidation = validation;
        
        // Update stats
        if (validation.isDeductible === false) {
          results.stats.nonDeductible++;
        } else if (validation.isDeductible === true || validation.isDeductible === 'limited') {
          results.stats.deductible++;
        }
      }
    });
  }
  
  return results;
}

/**
 * Get file type icon
 */
export function getFileTypeIcon(format) {
  switch (format) {
    case 'XML':
      return '📋';
    case 'PDF':
      return '📄';
    default:
      return '📎';
  }
}

/**
 * Get file type badge color
 */
export function getFileTypeBadge(format) {
  switch (format) {
    case 'XML':
      return 'bg-green-100 text-green-800';
    case 'PDF':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
