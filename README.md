# Calculadora RESICO - SAT

Aplicación web moderna para calcular declaraciones RESICO automáticamente mediante la lectura de PDFs de facturas.

## 🚀 Características

- **Lectura automática de PDFs**: Extrae datos de facturas automáticamente usando PDF.js
- **Cálculos RESICO**: Calcula IVA trasladado (16%), Retenciones IVA (10.6667%), Retenciones ISR (1.25%)
- **Gestión de facturas**: Clasifica facturas emitidas (ingresos) y recibidas (gastos)
- **Resumen mensual**: Tabla interactiva con totales por mes
- **Saldos a favor**: Calcula y arrastra saldos a favor automáticamente
- **Exportación**: Exporta a CSV y Excel con todos los detalles
- **Interfaz moderna**: Drag & drop, diseño responsive con Tailwind CSS

## 📋 Requisitos

- Node.js 16 o superior
- npm o yarn

## 🔧 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## 📖 Uso

### 1. Subir Facturas

1. Selecciona el tipo de factura (Emitida o Recibida)
2. Arrastra los PDFs a la zona de drop o haz clic para seleccionar
3. La aplicación extraerá automáticamente:
   - Fecha de la factura
   - Subtotal
   - IVA
   - Retenciones (si están en el PDF)
   - Total

### 2. Revisar Cálculos

- **Tabla Mensual**: Muestra totales por mes con:
  - Número de facturas emitidas y recibidas
  - Subtotales e IVA
  - Retenciones
  - Pago mensual al SAT
  - Saldo a favor acumulado
  - Total recibido

- **Detalles**: Haz clic en cualquier mes para ver detalles adicionales

### 3. Exportar Datos

- **CSV**: Exporta resumen mensual y totales anuales
- **Excel**: Exporta dos hojas:
  - Resumen Mensual
  - Detalle de todas las facturas

### 4. Gestionar Facturas

- **Filtrar**: Filtra por tipo (Todas, Emitidas, Recibidas)
- **Eliminar**: Elimina facturas individuales
- **Limpiar Todo**: Elimina todos los datos

## 🧮 Cálculos RESICO

### Facturas Emitidas (Ingresos)

```
IVA Trasladado = Subtotal × 16%
Retención IVA = Subtotal × 10.6667%
Retención ISR = Subtotal × 1.25%
Total Recibido = Subtotal + IVA Trasladado - Retención IVA - Retención ISR
```

### Facturas Recibidas (Gastos)

```
IVA Acreditable = Subtotal × 16%
```

### Pago Mensual al SAT

```
IVA a Pagar = IVA Trasladado - IVA Acreditable - Retenciones IVA
Pago Mensual = IVA a Pagar + Saldo a Favor del mes anterior
```

Si el IVA a Pagar es negativo, se genera un saldo a favor que se arrastra al siguiente mes.

## 📁 Estructura del Proyecto

```
sat/
├── src/
│   ├── components/
│   │   ├── FileUploader.jsx      # Componente de carga de archivos
│   │   ├── MonthlyTable.jsx      # Tabla de resumen mensual
│   │   ├── InvoicesList.jsx      # Lista de facturas procesadas
│   │   └── ActionButtons.jsx     # Botones de acción
│   ├── utils/
│   │   ├── pdfParser.js          # Extracción de datos de PDFs
│   │   ├── resicoCalculator.js   # Cálculos RESICO
│   │   └── exportUtils.js        # Exportación a CSV/Excel
│   ├── App.jsx                   # Componente principal
│   ├── main.jsx                  # Punto de entrada
│   └── index.css                 # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Tecnologías

- **React 18**: Framework de UI
- **Vite**: Build tool y dev server
- **Tailwind CSS**: Framework de estilos
- **PDF.js**: Lectura de archivos PDF
- **XLSX**: Exportación a Excel
- **Lucide React**: Iconos modernos

## ⚠️ Notas Importantes

1. **Extracción de PDFs**: La precisión depende del formato del PDF. Los PDFs escaneados o con formatos no estándar pueden no extraerse correctamente.

2. **Validación**: Siempre revisa los datos extraídos antes de usarlos para declaraciones oficiales.

3. **Cálculos**: Los cálculos son aproximados según las tasas RESICO vigentes. Consulta con tu contador para la declaración oficial.

4. **Privacidad**: Todos los datos se procesan localmente en tu navegador. No se envía información a ningún servidor.

## 🔍 Solución de Problemas

### El PDF no se procesa correctamente

- Verifica que el PDF contenga texto (no sea una imagen escaneada)
- Asegúrate de que el PDF tenga un formato estándar con campos como "Subtotal", "IVA", "Total"
- Puedes editar manualmente los datos después de la extracción

### Los montos no son correctos

- Revisa que el PDF tenga los campos claramente etiquetados
- Verifica que los números usen el formato correcto (con puntos o comas)
- Elimina la factura y súbela nuevamente, o edita manualmente

### Error al exportar

- Asegúrate de tener al menos una factura procesada
- Verifica que tu navegador permita descargas
- Intenta con otro navegador si el problema persiste

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## 📧 Soporte

Para preguntas o soporte, por favor abre un issue en el repositorio.
