# 📋 Ejemplos de Archivos XML (CFDI)

## 🎯 Cómo Usar Este Archivo

Este documento contiene ejemplos de archivos XML de CFDI que puedes usar para probar la aplicación.

---

## 📄 Ejemplo 1: Factura Emitida (Ingreso) - CFDI 3.3

Copia este contenido y guárdalo como `factura_emitida_enero.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd" Version="3.3" Fecha="2024-01-15T10:30:00" Folio="12345" SubTotal="10000.00" Total="10408.33" Moneda="MXN" TipoDeComprobante="I" MetodoPago="PUE" LugarExpedicion="06000">
  <cfdi:Emisor Rfc="XAXX010101000" Nombre="MI EMPRESA SA DE CV" RegimenFiscal="626"/>
  <cfdi:Receptor Rfc="CACX7605101P8" Nombre="CLIENTE EJEMPLO SA DE CV" UsoCFDI="G03"/>
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="84111506" Cantidad="1" ClaveUnidad="E48" Descripcion="Servicios de consultoría" ValorUnitario="10000.00" Importe="10000.00">
      <cfdi:Impuestos>
        <cfdi:Traslados>
          <cfdi:Traslado Base="10000.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="1600.00"/>
        </cfdi:Traslados>
        <cfdi:Retenciones>
          <cfdi:Retencion Base="10000.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.106667" Importe="1066.67"/>
          <cfdi:Retencion Base="10000.00" Impuesto="001" TipoFactor="Tasa" TasaOCuota="0.012500" Importe="125.00"/>
        </cfdi:Retenciones>
      </cfdi:Impuestos>
    </cfdi:Concepto>
  </cfdi:Conceptos>
  <cfdi:Impuestos TotalImpuestosTrasladados="1600.00" TotalImpuestosRetenidos="1191.67">
    <cfdi:Traslados>
      <cfdi:Traslado Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="1600.00"/>
    </cfdi:Traslados>
    <cfdi:Retenciones>
      <cfdi:Retencion Impuesto="002" Importe="1066.67"/>
      <cfdi:Retencion Impuesto="001" Importe="125.00"/>
    </cfdi:Retenciones>
  </cfdi:Impuestos>
  <cfdi:Complemento>
    <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd" Version="1.1" UUID="12345678-1234-1234-1234-123456789012" FechaTimbrado="2024-01-15T10:35:00" SelloCFD="..." NoCertificadoSAT="..." SelloSAT="..."/>
  </cfdi:Complemento>
</cfdi:Comprobante>
```

**Resultado esperado:**
- Subtotal: $10,000.00
- IVA Trasladado: $1,600.00
- Retención IVA: $1,066.67
- Retención ISR: $125.00
- Total: $10,408.33
- UUID: 12345678-1234-1234-1234-123456789012
- Badge: "Certificado SAT" ✅

---

## 📄 Ejemplo 2: Factura Emitida (Ingreso) - CFDI 4.0

Copia este contenido y guárdalo como `factura_emitida_febrero.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd" Version="4.0" Fecha="2024-02-10T14:20:00" Folio="12346" SubTotal="15000.00" Total="15612.50" Moneda="MXN" TipoDeComprobante="I" Exportacion="01" MetodoPago="PUE" LugarExpedicion="06000">
  <cfdi:Emisor Rfc="XAXX010101000" Nombre="MI EMPRESA SA DE CV" RegimenFiscal="626"/>
  <cfdi:Receptor Rfc="CACX7605101P8" Nombre="CLIENTE EJEMPLO SA DE CV" DomicilioFiscalReceptor="06000" RegimenFiscalReceptor="601" UsoCFDI="G03"/>
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="84111506" Cantidad="1" ClaveUnidad="E48" Descripcion="Desarrollo de software" ValorUnitario="15000.00" Importe="15000.00" ObjetoImp="02">
      <cfdi:Impuestos>
        <cfdi:Traslados>
          <cfdi:Traslado Base="15000.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="2400.00"/>
        </cfdi:Traslados>
        <cfdi:Retenciones>
          <cfdi:Retencion Base="15000.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.106667" Importe="1600.00"/>
          <cfdi:Retencion Base="15000.00" Impuesto="001" TipoFactor="Tasa" TasaOCuota="0.012500" Importe="187.50"/>
        </cfdi:Retenciones>
      </cfdi:Impuestos>
    </cfdi:Concepto>
  </cfdi:Conceptos>
  <cfdi:Impuestos TotalImpuestosTrasladados="2400.00" TotalImpuestosRetenidos="1787.50">
    <cfdi:Traslados>
      <cfdi:Traslado Base="15000.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="2400.00"/>
    </cfdi:Traslados>
    <cfdi:Retenciones>
      <cfdi:Retencion Impuesto="002" Importe="1600.00"/>
      <cfdi:Retencion Impuesto="001" Importe="187.50"/>
    </cfdi:Retenciones>
  </cfdi:Impuestos>
  <cfdi:Complemento>
    <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" Version="1.1" UUID="87654321-4321-4321-4321-210987654321" FechaTimbrado="2024-02-10T14:25:00" SelloCFD="..." NoCertificadoSAT="..." SelloSAT="..."/>
  </cfdi:Complemento>
</cfdi:Comprobante>
```

**Resultado esperado:**
- Subtotal: $15,000.00
- IVA Trasladado: $2,400.00
- Retención IVA: $1,600.00
- Retención ISR: $187.50
- Total: $15,612.50
- UUID: 87654321-4321-4321-4321-210987654321

---

## 📄 Ejemplo 3: Factura Recibida (Gasto)

Copia este contenido y guárdalo como `factura_recibida_enero.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="3.3" Fecha="2024-01-20T09:15:00" Folio="A-5678" SubTotal="5000.00" Total="5800.00" Moneda="MXN" TipoDeComprobante="I" MetodoPago="PUE" LugarExpedicion="06000">
  <cfdi:Emisor Rfc="PAXX010101000" Nombre="PROVEEDOR EJEMPLO SA DE CV" RegimenFiscal="601"/>
  <cfdi:Receptor Rfc="XAXX010101000" Nombre="MI EMPRESA SA DE CV" UsoCFDI="G03"/>
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="43231500" Cantidad="1" ClaveUnidad="E48" Descripcion="Equipo de cómputo" ValorUnitario="5000.00" Importe="5000.00">
      <cfdi:Impuestos>
        <cfdi:Traslados>
          <cfdi:Traslado Base="5000.00" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="800.00"/>
        </cfdi:Traslados>
      </cfdi:Impuestos>
    </cfdi:Concepto>
  </cfdi:Conceptos>
  <cfdi:Impuestos TotalImpuestosTrasladados="800.00">
    <cfdi:Traslados>
      <cfdi:Traslado Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="800.00"/>
    </cfdi:Traslados>
  </cfdi:Impuestos>
  <cfdi:Complemento>
    <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" Version="1.1" UUID="ABCDEF12-3456-7890-ABCD-EF1234567890" FechaTimbrado="2024-01-20T09:20:00" SelloCFD="..." NoCertificadoSAT="..." SelloSAT="..."/>
  </cfdi:Complemento>
</cfdi:Comprobante>
```

**Resultado esperado:**
- Subtotal: $5,000.00
- IVA: $800.00 (IVA Acreditable)
- Total: $5,800.00
- UUID: ABCDEF12-3456-7890-ABCD-EF1234567890

---

## 🎯 Cómo Crear los Archivos XML

### Opción 1: Copiar y Pegar
1. Abre el Bloc de notas (Notepad)
2. Copia uno de los ejemplos anteriores
3. Pega el contenido
4. Guarda como `factura_ejemplo.xml`
5. Asegúrate de seleccionar "Todos los archivos" en tipo

### Opción 2: Usar VS Code
1. Abre VS Code
2. Crea un nuevo archivo
3. Pega el contenido XML
4. Guarda con extensión `.xml`

---

## 🧪 Probar la Aplicación

### Paso 1: Crear los Archivos
1. Crea los 3 archivos XML de ejemplo
2. Guárdalos en una carpeta fácil de encontrar

### Paso 2: Subir Facturas Emitidas
1. Abre la aplicación
2. Selecciona "Facturas Emitidas (Ingresos)"
3. Arrastra `factura_emitida_enero.xml` y `factura_emitida_febrero.xml`
4. Verás el mensaje: "2 archivos XML procesados con precisión 100%"

### Paso 3: Subir Facturas Recibidas
1. Selecciona "Facturas Recibidas (Gastos)"
2. Arrastra `factura_recibida_enero.xml`
3. Verás el mensaje: "1 archivo XML procesado con precisión 100%"

### Paso 4: Verificar Resultados
- **Enero 2024:**
  - Facturas Emitidas: 1 ($10,000)
  - Facturas Recibidas: 1 ($5,000)
  - IVA a Pagar: $533.33
  - Pago Mensual: $533.33

- **Febrero 2024:**
  - Facturas Emitidas: 1 ($15,000)
  - Facturas Recibidas: 0
  - IVA a Pagar: $800.00
  - Pago Mensual: $800.00

---

## 🔍 Diferencias entre XML y PDF

| Característica | XML | PDF |
|----------------|-----|-----|
| **Precisión** | 100% ✅ | ~80% ⚠️ |
| **UUID** | Sí ✅ | No ❌ |
| **RFC** | Sí ✅ | No ❌ |
| **Certificación SAT** | Sí ✅ | No ❌ |
| **Retenciones** | Exactas ✅ | Aproximadas ⚠️ |
| **Validación** | No requiere ✅ | Requiere ⚠️ |

---

## 📥 Dónde Obtener tus XMLs Reales

### Facturas Emitidas:
1. **Tu sistema de facturación** (Facturama, Aspel, etc.)
2. **Portal de tu PAC**
3. **Correo electrónico** (los envía tu PAC)

### Facturas Recibidas:
1. **Portal del SAT:**
   - sat.gob.mx
   - Factura Electrónica → Consulta y recuperación
   - Descarga masiva de XMLs

2. **Correo electrónico** de tus proveedores

3. **Portal de proveedores** (Amazon, Office Depot, etc.)

---

## ✅ Ventajas de Usar XML

1. **Precisión Total:** Los datos vienen directamente del SAT
2. **Sin Errores:** No hay interpretación de texto
3. **Más Rápido:** Procesa instantáneamente
4. **Información Completa:** UUID, RFC, timbrado fiscal
5. **Cumplimiento:** Es el documento fiscal oficial
6. **Auditoría:** Puedes verificar el UUID en el SAT

---

## 🎉 ¡Listo para Probar!

Ahora tienes ejemplos de XML para probar la aplicación con **100% de precisión**.

**Recuerda:** Los XMLs son el formato oficial del SAT y te darán los datos más precisos para tus declaraciones RESICO.
