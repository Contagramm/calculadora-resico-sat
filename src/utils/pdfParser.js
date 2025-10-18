import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

/**
 * Extract text from PDF file
 */
export async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('No se pudo leer el PDF');
  }
}

/**
 * Parse invoice data from PDF text
 */
export function parseInvoiceData(text, fileName) {
  const invoice = {
    fileName: fileName,
    date: null,
    subtotal: 0,
    iva: 0,
    retencionIVA: 0,
    retencionISR: 0,
    total: 0
  };

  // Extract date - multiple formats
  const datePatterns = [
    /fecha[:\s]+(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/i,
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
    /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/,
    /fecha de emisi[óo]n[:\s]+(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/i
  ];

  for (const pattern of datePatterns) {
    const dateMatch = text.match(pattern);
    if (dateMatch) {
      let day, month, year;
      if (pattern === datePatterns[2]) {
        // YYYY-MM-DD format
        [, year, month, day] = dateMatch;
      } else {
        // DD-MM-YYYY format
        [, day, month, year] = dateMatch;
      }
      invoice.date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      break;
    }
  }

  // If no date found, try to extract from filename
  if (!invoice.date) {
    const fileNameDate = fileName.match(/(\d{4})[_\-]?(\d{2})[_\-]?(\d{2})/);
    if (fileNameDate) {
      const [, year, month, day] = fileNameDate;
      invoice.date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      // Default to current date
      invoice.date = new Date();
    }
  }

  // Extract amounts - look for currency patterns
  const amountPattern = /\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
  const amounts = [];
  let match;
  
  while ((match = amountPattern.exec(text)) !== null) {
    const amount = parseFloat(match[1].replace(/,/g, ''));
    if (!isNaN(amount) && amount > 0) {
      amounts.push(amount);
    }
  }

  // Extract specific fields
  const subtotalMatch = text.match(/subtotal[:\s]+\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (subtotalMatch) {
    invoice.subtotal = parseFloat(subtotalMatch[1].replace(/,/g, ''));
  }

  const ivaMatch = text.match(/iva[:\s]+\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (ivaMatch) {
    invoice.iva = parseFloat(ivaMatch[1].replace(/,/g, ''));
  }

  const totalMatch = text.match(/total[:\s]+\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (totalMatch) {
    invoice.total = parseFloat(totalMatch[1].replace(/,/g, ''));
  }

  // Extract retenciones if present
  const retencionIVAMatch = text.match(/retenci[óo]n\s+iva[:\s]+\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (retencionIVAMatch) {
    invoice.retencionIVA = parseFloat(retencionIVAMatch[1].replace(/,/g, ''));
  }

  const retencionISRMatch = text.match(/retenci[óo]n\s+isr[:\s]+\$?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/i);
  if (retencionISRMatch) {
    invoice.retencionISR = parseFloat(retencionISRMatch[1].replace(/,/g, ''));
  }

  // If subtotal not found but we have amounts, use heuristics
  if (invoice.subtotal === 0 && amounts.length > 0) {
    // Sort amounts descending
    amounts.sort((a, b) => b - a);
    
    // If we have a total, try to derive subtotal
    if (invoice.total > 0) {
      // Subtotal should be less than total
      const possibleSubtotal = amounts.find(amt => amt < invoice.total);
      if (possibleSubtotal) {
        invoice.subtotal = possibleSubtotal;
      }
    } else {
      // Use largest amount as total, second largest as subtotal
      if (amounts.length >= 2) {
        invoice.total = amounts[0];
        invoice.subtotal = amounts[1];
      } else if (amounts.length === 1) {
        invoice.total = amounts[0];
        invoice.subtotal = amounts[0] / 1.16; // Assume 16% IVA
      }
    }
  }

  // Calculate missing values
  if (invoice.subtotal > 0 && invoice.iva === 0) {
    invoice.iva = invoice.subtotal * 0.16;
  }

  if (invoice.total === 0 && invoice.subtotal > 0) {
    invoice.total = invoice.subtotal + invoice.iva - invoice.retencionIVA - invoice.retencionISR;
  }

  return invoice;
}

/**
 * Process multiple PDF files
 */
export async function processPDFFiles(files) {
  const invoices = [];
  
  for (const file of files) {
    try {
      const text = await extractTextFromPDF(file);
      const invoice = parseInvoiceData(text, file.name);
      invoices.push(invoice);
    } catch (error) {
      console.error(`Error processing ${file.name}:`, error);
      // Add error invoice
      invoices.push({
        fileName: file.name,
        date: new Date(),
        subtotal: 0,
        iva: 0,
        retencionIVA: 0,
        retencionISR: 0,
        total: 0,
        error: error.message
      });
    }
  }
  
  return invoices;
}
