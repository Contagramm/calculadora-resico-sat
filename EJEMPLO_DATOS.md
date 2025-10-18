# 📝 Ejemplo de Datos de Prueba

## Formato Esperado en PDFs

Para que la aplicación pueda leer correctamente tus PDFs, deben contener texto con el siguiente formato:

### Factura Emitida (Ejemplo)

```
FACTURA
Folio: A-12345
Fecha: 15/01/2024

CONCEPTOS
Servicios profesionales de desarrollo

Subtotal: $10,000.00
IVA (16%): $1,600.00
Total: $11,600.00

Retención IVA: $1,066.67
Retención ISR: $125.00
```

### Factura Recibida (Ejemplo)

```
FACTURA
Folio: B-67890
Fecha de Emisión: 20/01/2024

DESCRIPCIÓN
Material de oficina

Subtotal: $2,000.00
IVA: $320.00
Total: $2,320.00
```

## Datos de Prueba Manual

Si no tienes PDFs para probar, puedes crear archivos de texto con el formato anterior y guardarlos como PDF.

### Ejemplo 1: Factura Emitida - Enero 2024

```
FACTURA EMITIDA
Fecha: 15/01/2024
Cliente: Empresa ABC S.A. de C.V.

Concepto: Servicios de consultoría
Subtotal: $15,000.00
IVA: $2,400.00
Retención IVA: $1,600.00
Retención ISR: $187.50
Total: $15,612.50
```

### Ejemplo 2: Factura Emitida - Febrero 2024

```
FACTURA
Folio: 12345
Fecha de emisión: 10/02/2024

Servicios profesionales
Subtotal: $20,000.00
IVA (16%): $3,200.00
Total: $23,200.00
Retenciones IVA: $2,133.34
Retenciones ISR: $250.00
```

### Ejemplo 3: Factura Recibida - Enero 2024

```
COMPROBANTE FISCAL
Fecha: 25/01/2024
Proveedor: Servicios XYZ

Concepto: Hosting y dominio
Subtotal: $1,500.00
IVA: $240.00
Total: $1,740.00
```

### Ejemplo 4: Factura Recibida - Febrero 2024

```
FACTURA
Fecha: 15/02/2024

Material de oficina
Subtotal: $3,000.00
IVA (16%): $480.00
Total: $3,480.00
```

## Resultados Esperados

Con los ejemplos anteriores, deberías ver:

### Enero 2024
- **Facturas Emitidas**: 1
- **Subtotal Emitidas**: $15,000.00
- **IVA Trasladado**: $2,400.00
- **Retención IVA**: $1,600.00
- **Retención ISR**: $187.50
- **Facturas Recibidas**: 1
- **Subtotal Recibidas**: $1,500.00
- **IVA Acreditable**: $240.00
- **IVA a Pagar**: $2,400 - $240 - $1,600 = $560.00
- **Pago Mensual**: $560.00
- **Total Recibido**: $15,612.50

### Febrero 2024
- **Facturas Emitidas**: 1
- **Subtotal Emitidas**: $20,000.00
- **IVA Trasladado**: $3,200.00
- **Retención IVA**: $2,133.34
- **Retención ISR**: $250.00
- **Facturas Recibidas**: 1
- **Subtotal Recibidas**: $3,000.00
- **IVA Acreditable**: $480.00
- **IVA a Pagar**: $3,200 - $480 - $2,133.34 = $586.66
- **Pago Mensual**: $586.66
- **Total Recibido**: $20,816.66

### Totales Anuales
- **Total Emitidas**: 2
- **Total Recibidas**: 2
- **Subtotal Emitidas**: $35,000.00
- **IVA Trasladado**: $5,600.00
- **Retenciones IVA**: $3,733.34
- **Retenciones ISR**: $437.50
- **Subtotal Recibidas**: $4,500.00
- **IVA Acreditable**: $720.00
- **Total Pagado al SAT**: $1,146.66
- **Total Recibido**: $36,429.16

## Cómo Crear PDFs de Prueba

### Opción 1: Microsoft Word
1. Copia uno de los ejemplos anteriores
2. Pégalo en Word
3. Guarda como PDF

### Opción 2: Google Docs
1. Crea un nuevo documento
2. Pega el texto del ejemplo
3. Descarga como PDF

### Opción 3: Herramienta Online
1. Ve a https://www.ilovepdf.com/es/word_a_pdf
2. Crea un documento de texto con el ejemplo
3. Conviértelo a PDF

## Validación de Datos

Después de subir tus PDFs, verifica:

1. ✅ **Fecha**: Se extrajo correctamente
2. ✅ **Subtotal**: Coincide con el PDF
3. ✅ **IVA**: Se calculó correctamente (16%)
4. ✅ **Retenciones**: Se aplicaron las tasas correctas
5. ✅ **Total**: Suma correctamente

Si algún dato es incorrecto:
- Elimina la factura (icono de basura)
- Vuelve a subirla
- O edita manualmente los datos (función futura)

## Formatos de Fecha Soportados

La aplicación reconoce estos formatos:
- DD/MM/YYYY (15/01/2024)
- DD-MM-YYYY (15-01-2024)
- YYYY-MM-DD (2024-01-15)
- Fecha: 15/01/2024
- Fecha de emisión: 15/01/2024

## Formatos de Moneda Soportados

La aplicación reconoce:
- $10,000.00
- 10,000.00
- $10000.00
- 10000
- 10,000

## Tips para Mejores Resultados

1. **Usa PDFs con texto**: No escanees documentos, usa PDFs generados digitalmente
2. **Etiquetas claras**: Asegúrate de que los campos digan "Subtotal", "IVA", "Total"
3. **Formato estándar**: Usa el formato de factura estándar del SAT
4. **Revisa siempre**: Verifica los datos extraídos antes de confiar en ellos
5. **Backup**: Guarda tus PDFs originales por si necesitas reprocessarlos
