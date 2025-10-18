/**
 * XML Parser for CFDI (Comprobante Fiscal Digital por Internet)
 * Supports CFDI 3.3 and 4.0
 */

/**
 * Extract text from XML file
 */
export async function extractTextFromXML(file) {
  try {
    const text = await file.text();
    return text;
  } catch (error) {
    console.error('Error reading XML file:', error);
    throw new Error('No se pudo leer el archivo XML');
  }
}

/**
 * Parse CFDI XML and extract invoice data
 */
export function parseCFDI(xmlText, fileName) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('XML mal formado');
    }
    
    // Detect CFDI version
    const comprobante = xmlDoc.querySelector('Comprobante') || 
                       xmlDoc.querySelector('cfdi\\:Comprobante') ||
                       xmlDoc.querySelectorAll('*')[0];
    
    if (!comprobante) {
      throw new Error('No es un CFDI válido');
    }
    
    const version = comprobante.getAttribute('Version') || 
                   comprobante.getAttribute('version') || '3.3';
    
    // Extract basic data
    const invoice = {
      fileName: fileName,
      format: 'XML',
      cfdiVersion: version,
      certified: true,
      date: null,
      subtotal: 0,
      iva: 0,
      retencionIVA: 0,
      retencionISR: 0,
      total: 0,
      uuid: null,
      rfcEmisor: null,
      rfcReceptor: null,
      tipoComprobante: null,
      description: null,
      nombreEmisor: null
    };
    
    // Extract date
    const fecha = comprobante.getAttribute('Fecha') || 
                 comprobante.getAttribute('fecha');
    if (fecha) {
      invoice.date = new Date(fecha);
    }
    
    // Extract amounts
    invoice.subtotal = parseFloat(
      comprobante.getAttribute('SubTotal') || 
      comprobante.getAttribute('subTotal') || 
      comprobante.getAttribute('subtotal') || 
      '0'
    );
    
    invoice.total = parseFloat(
      comprobante.getAttribute('Total') || 
      comprobante.getAttribute('total') || 
      '0'
    );
    
    // Extract tipo de comprobante (I=Ingreso, E=Egreso, etc.)
    invoice.tipoComprobante = comprobante.getAttribute('TipoDeComprobante') || 
                             comprobante.getAttribute('tipoDeComprobante') ||
                             'I';
    
    // Extract RFC Emisor and Name
    const emisor = xmlDoc.querySelector('Emisor, cfdi\\:Emisor');
    if (emisor) {
      invoice.rfcEmisor = emisor.getAttribute('Rfc') || 
                         emisor.getAttribute('rfc');
      invoice.nombreEmisor = emisor.getAttribute('Nombre') || 
                            emisor.getAttribute('nombre');
    }
    
    // Extract RFC Receptor
    const receptor = xmlDoc.querySelector('Receptor, cfdi\\:Receptor');
    if (receptor) {
      invoice.rfcReceptor = receptor.getAttribute('Rfc') || 
                           receptor.getAttribute('rfc');
    }
    
    // Extract description from concepts
    const conceptos = xmlDoc.querySelectorAll('Concepto, cfdi\\:Concepto');
    if (conceptos.length > 0) {
      const descriptions = [];
      conceptos.forEach(concepto => {
        const desc = concepto.getAttribute('Descripcion') || 
                    concepto.getAttribute('descripcion') ||
                    concepto.getAttribute('Description');
        if (desc) {
          descriptions.push(desc);
        }
      });
      invoice.description = descriptions.join(', ');
    }
    
    // Extract UUID (Folio Fiscal)
    const timbreFiscal = xmlDoc.querySelector('TimbreFiscalDigital, tfd\\:TimbreFiscalDigital');
    if (timbreFiscal) {
      invoice.uuid = timbreFiscal.getAttribute('UUID') || 
                    timbreFiscal.getAttribute('uuid');
    }
    
    // Extract taxes (Impuestos)
    const impuestos = xmlDoc.querySelector('Impuestos, cfdi\\:Impuestos');
    if (impuestos) {
      // IVA Trasladado
      const traslados = xmlDoc.querySelectorAll('Traslado, cfdi\\:Traslado');
      traslados.forEach(traslado => {
        const impuesto = traslado.getAttribute('Impuesto') || 
                        traslado.getAttribute('impuesto');
        const importe = parseFloat(
          traslado.getAttribute('Importe') || 
          traslado.getAttribute('importe') || 
          '0'
        );
        
        // 002 = IVA
        if (impuesto === '002') {
          invoice.iva += importe;
        }
      });
      
      // Retenciones
      const retenciones = xmlDoc.querySelectorAll('Retencion, cfdi\\:Retencion');
      retenciones.forEach(retencion => {
        const impuesto = retencion.getAttribute('Impuesto') || 
                        retencion.getAttribute('impuesto');
        const importe = parseFloat(
          retencion.getAttribute('Importe') || 
          retencion.getAttribute('importe') || 
          '0'
        );
        
        // 002 = IVA, 001 = ISR
        if (impuesto === '002') {
          invoice.retencionIVA += importe;
        } else if (impuesto === '001') {
          invoice.retencionISR += importe;
        }
      });
    }
    
    // If IVA not found in Traslados, calculate from subtotal
    if (invoice.iva === 0 && invoice.subtotal > 0) {
      // Check if total includes IVA
      const difference = invoice.total - invoice.subtotal;
      if (difference > 0 && difference < invoice.subtotal * 0.2) {
        invoice.iva = difference;
      }
    }
    
    return invoice;
  } catch (error) {
    console.error('Error parsing CFDI:', error);
    throw new Error(`Error al procesar CFDI: ${error.message}`);
  }
}

/**
 * Process multiple XML files
 */
export async function processXMLFiles(files) {
  const invoices = [];
  
  for (const file of files) {
    try {
      const xmlText = await extractTextFromXML(file);
      const invoice = parseCFDI(xmlText, file.name);
      invoices.push(invoice);
    } catch (error) {
      console.error(`Error processing ${file.name}:`, error);
      // Add error invoice
      invoices.push({
        fileName: file.name,
        format: 'XML',
        date: new Date(),
        subtotal: 0,
        iva: 0,
        retencionIVA: 0,
        retencionISR: 0,
        total: 0,
        certified: false,
        error: error.message
      });
    }
  }
  
  return invoices;
}

/**
 * Validate if file is XML
 */
export function isXMLFile(file) {
  return file.type === 'text/xml' || 
         file.type === 'application/xml' || 
         file.name.toLowerCase().endsWith('.xml');
}

/**
 * Validate if file is PDF
 */
export function isPDFFile(file) {
  return file.type === 'application/pdf' || 
         file.name.toLowerCase().endsWith('.pdf');
}
