/**
 * Deduction Validator for RESICO
 * Validates if expenses are deductible for professional services
 */

// Non-deductible categories and keywords
const NON_DEDUCTIBLE_KEYWORDS = {
  // Personal expenses
  personal: [
    'netflix', 'spotify', 'hbo', 'disney', 'amazon prime', 'streaming',
    'gimnasio', 'gym', 'fitness', 'yoga', 'pilates',
    'supermercado', 'walmart', 'soriana', 'chedraui', 'bodega aurrera',
    'farmacia', 'medicina', 'medicamento', 'doctor', 'hospital',
    'ropa', 'zapatos', 'calzado', 'vestido', 'pantalon',
    'peluqueria', 'salon de belleza', 'estetica', 'barberia',
    'juguetes', 'jugueteria',
    'mascotas', 'veterinaria', 'alimento para mascota',
    'entretenimiento', 'cine', 'teatro', 'concierto',
    'videojuegos', 'playstation', 'xbox', 'nintendo'
  ],
  
  // Restaurants and food (limited deduction)
  restaurants: [
    'restaurante', 'restaurant', 'comida', 'cafeteria', 'cafe',
    'bar', 'cantina', 'antro', 'discoteca',
    'pizza', 'hamburguesa', 'tacos', 'sushi',
    'mcdonalds', 'burger king', 'kfc', 'subway', 'dominos',
    'starbucks', 'italian coffee'
  ],
  
  // Travel and tourism
  travel: [
    'hotel', 'hospedaje', 'airbnb', 'motel',
    'aerolinea', 'volaris', 'aeromexico', 'viva aerobus',
    'agencia de viajes', 'turismo', 'tour',
    'parque', 'museo', 'zoologico', 'acuario'
  ],
  
  // Personal vehicles (limited)
  vehicles: [
    'agencia automotriz', 'compra de auto', 'vehiculo nuevo',
    'seguro de auto personal', 'tenencia', 'verificacion'
  ],
  
  // Education (personal)
  education: [
    'colegiatura', 'escuela', 'universidad', 'kinder',
    'guarderia', 'maternal'
  ],
  
  // Home and personal services
  home: [
    'muebleria', 'muebles para casa', 'decoracion hogar',
    'jardineria personal', 'plomero casa', 'electricista casa',
    'tintoreria', 'lavanderia personal'
  ]
};

// Deductible categories and keywords
const DEDUCTIBLE_KEYWORDS = {
  // Technology and equipment
  technology: [
    'computadora', 'laptop', 'pc', 'mac', 'imac',
    'monitor', 'teclado', 'mouse', 'webcam',
    'impresora', 'escaner', 'multifuncional',
    'tablet', 'ipad', 'disco duro', 'memoria usb',
    'software', 'licencia', 'microsoft', 'adobe', 'office',
    'antivirus', 'servidor', 'hosting', 'dominio'
  ],
  
  // Office and workspace
  office: [
    'renta de oficina', 'coworking', 'espacio de trabajo',
    'escritorio', 'silla de oficina', 'archivero',
    'papeleria', 'papel', 'toner', 'tinta',
    'telefono de oficina', 'internet', 'telefonia'
  ],
  
  // Professional services
  professional: [
    'contador', 'contabilidad', 'servicios contables',
    'abogado', 'servicios legales', 'notario',
    'consultor', 'consultoria', 'asesoria',
    'facturacion electronica', 'pac', 'timbrado'
  ],
  
  // Training and education (professional)
  training: [
    'curso', 'capacitacion', 'certificacion',
    'diplomado', 'seminario', 'conferencia',
    'taller', 'entrenamiento profesional',
    'libro tecnico', 'libro profesional'
  ],
  
  // Business transport
  transport: [
    'uber', 'taxi', 'didi', 'transporte ejecutivo',
    'gasolina', 'combustible', 'estacionamiento',
    'caseta', 'peaje'
  ],
  
  // Communication
  communication: [
    'telefono celular', 'plan telefonico', 'datos moviles',
    'internet empresarial', 'zoom', 'teams',
    'correo', 'paqueteria', 'mensajeria'
  ]
};

// RFC patterns for known non-deductible providers
const NON_DEDUCTIBLE_RFC_PATTERNS = [
  'WAL', // Walmart
  'SOR', // Soriana
  'CHE', // Chedraui
  'OXX', // Oxxo
  'SEV', // 7-Eleven
];

/**
 * Validate if an expense is deductible
 */
export function validateDeduction(invoice) {
  // Only validate received invoices (expenses)
  if (invoice.type !== 'recibida') {
    return {
      isDeductible: true,
      reason: null,
      category: 'income'
    };
  }
  
  const description = (invoice.description || invoice.fileName || '').toLowerCase();
  const rfcEmisor = (invoice.rfcEmisor || '').toUpperCase();
  
  // Check non-deductible keywords
  for (const [category, keywords] of Object.entries(NON_DEDUCTIBLE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (description.includes(keyword.toLowerCase())) {
        return {
          isDeductible: false,
          reason: getReasonByCategory(category),
          category: category,
          confidence: 'high'
        };
      }
    }
  }
  
  // Check non-deductible RFC patterns
  for (const pattern of NON_DEDUCTIBLE_RFC_PATTERNS) {
    if (rfcEmisor.includes(pattern)) {
      return {
        isDeductible: false,
        reason: 'Gasto personal (supermercado/tienda)',
        category: 'personal',
        confidence: 'high'
      };
    }
  }
  
  // Check if it's a restaurant (limited deduction)
  for (const keyword of NON_DEDUCTIBLE_KEYWORDS.restaurants) {
    if (description.includes(keyword.toLowerCase())) {
      return {
        isDeductible: 'limited',
        reason: 'Alimentos: Máximo 8.5% del total de deducciones',
        category: 'restaurants',
        confidence: 'medium',
        limitPercentage: 8.5
      };
    }
  }
  
  // Check if it's clearly deductible
  let deductibleScore = 0;
  let matchedCategory = null;
  
  for (const [category, keywords] of Object.entries(DEDUCTIBLE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (description.includes(keyword.toLowerCase())) {
        deductibleScore++;
        matchedCategory = category;
      }
    }
  }
  
  if (deductibleScore > 0) {
    return {
      isDeductible: true,
      reason: null,
      category: matchedCategory,
      confidence: 'high'
    };
  }
  
  // Uncertain - let user decide
  return {
    isDeductible: 'uncertain',
    reason: 'Verifica si es estrictamente indispensable para tu actividad',
    category: 'uncertain',
    confidence: 'low'
  };
}

/**
 * Get reason message by category
 */
function getReasonByCategory(category) {
  const reasons = {
    personal: 'Gasto personal - No deducible',
    restaurants: 'Alimentos - Deducción limitada al 8.5%',
    travel: 'Viaje/Turismo - Solo deducible si es por trabajo',
    vehicles: 'Vehículo - Deducción limitada',
    education: 'Educación personal - No deducible',
    home: 'Gasto del hogar - No deducible'
  };
  
  return reasons[category] || 'Posiblemente no deducible';
}

/**
 * Get deduction status badge info
 */
export function getDeductionBadge(validation) {
  if (!validation) {
    return null;
  }
  
  switch (validation.isDeductible) {
    case true:
      return {
        text: '✅ Deducible',
        color: 'bg-green-100 text-green-800',
        icon: '✅'
      };
    case false:
      return {
        text: '❌ No Deducible',
        color: 'bg-red-100 text-red-800',
        icon: '❌'
      };
    case 'limited':
      return {
        text: '⚠️ Limitado (8.5%)',
        color: 'bg-yellow-100 text-yellow-800',
        icon: '⚠️'
      };
    case 'uncertain':
      return {
        text: '❓ Verificar',
        color: 'bg-gray-100 text-gray-800',
        icon: '❓'
      };
    default:
      return null;
  }
}

/**
 * Filter deductible invoices
 */
export function filterDeductibleInvoices(invoices, includeUncertain = true) {
  return invoices.filter(invoice => {
    const validation = invoice.deductionValidation;
    if (!validation) return true;
    
    if (validation.isDeductible === true) return true;
    if (validation.isDeductible === 'limited') return true;
    if (validation.isDeductible === 'uncertain' && includeUncertain) return true;
    
    return false;
  });
}

/**
 * Get deduction statistics
 */
export function getDeductionStats(invoices) {
  const stats = {
    total: 0,
    deductible: 0,
    nonDeductible: 0,
    limited: 0,
    uncertain: 0,
    totalAmount: 0,
    deductibleAmount: 0,
    nonDeductibleAmount: 0
  };
  
  invoices.forEach(invoice => {
    if (invoice.type !== 'recibida') return;
    
    stats.total++;
    stats.totalAmount += invoice.subtotal || 0;
    
    const validation = invoice.deductionValidation;
    if (!validation) {
      stats.uncertain++;
      return;
    }
    
    switch (validation.isDeductible) {
      case true:
        stats.deductible++;
        stats.deductibleAmount += invoice.subtotal || 0;
        break;
      case false:
        stats.nonDeductible++;
        stats.nonDeductibleAmount += invoice.subtotal || 0;
        break;
      case 'limited':
        stats.limited++;
        stats.deductibleAmount += invoice.subtotal || 0;
        break;
      case 'uncertain':
        stats.uncertain++;
        break;
    }
  });
  
  return stats;
}
