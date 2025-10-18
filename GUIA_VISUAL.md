# 🎨 Guía Visual - Calculadora RESICO

## 📱 Interfaz de Usuario

### 1. Pantalla Principal

```
╔═══════════════════════════════════════════════════════════════╗
║                    🧮 Calculadora RESICO                      ║
║        Calcula automáticamente tus declaraciones al SAT       ║
╚═══════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────┐
│  Tipo de Factura                                              │
│  ○ Facturas Emitidas (Ingresos)  ○ Facturas Recibidas (Gastos)│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              📤 Arrastra tus PDFs aquí                  │ │
│  │                                                         │ │
│  │         o haz clic para seleccionar archivos            │ │
│  │                                                         │ │
│  │              [📄 Seleccionar PDFs]                      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  💡 Los PDFs se procesarán automáticamente para extraer:      │
│     • Fecha de la factura                                     │
│     • Subtotal, IVA y retenciones                            │
│     • Total de la factura                                     │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│  [📥 Exportar CSV]  [📊 Exportar Excel]  [🗑️ Limpiar Todo]   │
└───────────────────────────────────────────────────────────────┘
```

---

### 2. Tabla de Resumen Mensual

```
╔═══════════════════════════════════════════════════════════════╗
║                      Resumen Mensual                          ║
╚═══════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────────┐
│ Mes          │Facturas│Subtotal  │IVA Tras.│Ret.IVA│Ret.ISR│IVA Acred│Pago Mens│
├─────────────────────────────────────────────────────────────────────────────────┤
│▼ Enero 2024  │ 3E 1R  │$30,000.00│$4,800.00│$3,200 │$375   │$800.00  │$800.00  │
│  └─ Detalles:                                                                   │
│     Subtotal Recibidas: $5,000.00                                              │
│     IVA a Pagar: $800.00                                                       │
│                                                                                 │
│▶ Febrero 2024│ 2E 2R  │$20,000.00│$3,200.00│$2,133 │$250   │$1,200.00│$867.00  │
│▶ Marzo 2024  │ 4E 1R  │$35,000.00│$5,600.00│$3,733 │$437   │$600.00  │$1,267.00│
├─────────────────────────────────────────────────────────────────────────────────┤
│TOTALES ANUALES│ 9E 4R │$85,000.00│$13,600  │$9,066 │$1,062 │$2,600   │$2,934.00│
└─────────────────────────────────────────────────────────────────────────────────┘

E = Emitidas (Ingresos) | R = Recibidas (Gastos)
Tasas RESICO: IVA 16% | Ret. IVA 10.6667% | Ret. ISR 1.25%
```

---

### 3. Lista de Facturas Procesadas

```
╔═══════════════════════════════════════════════════════════════╗
║           Facturas Procesadas (12)                            ║
║  [Todas] [Emitidas] [Recibidas]                              ║
╚═══════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────┐
│ 📄 factura_enero_001.pdf                              [🗑️]    │
│    15/01/2024 | Subtotal: $10,000.00 | Total: $10,787.50     │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│ 📄 factura_enero_002.pdf                              [🗑️]    │
│    20/01/2024 | Subtotal: $15,000.00 | Total: $16,181.25     │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│ 📄 gasto_enero_001.pdf                                [🗑️]    │
│    25/01/2024 | Subtotal: $5,000.00 | Total: $5,800.00       │
└───────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Trabajo

### Paso 1: Subir Facturas Emitidas

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ Selecciona "Facturas Emitidas"
       │ Arrastra PDFs
       ▼
┌─────────────────┐
│  PDF.js Parser  │ ──► Extrae texto del PDF
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ Invoice Parser   │ ──► Busca: Fecha, Subtotal, IVA, Total
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ RESICO Calculator│ ──► Calcula retenciones y totales
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Tabla Mensual   │ ──► Muestra resultados
└──────────────────┘
```

### Paso 2: Subir Facturas Recibidas

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ Selecciona "Facturas Recibidas"
       │ Arrastra PDFs
       ▼
┌─────────────────┐
│  PDF.js Parser  │ ──► Extrae texto del PDF
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ Invoice Parser   │ ──► Busca: Fecha, Subtotal, IVA
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ RESICO Calculator│ ──► Calcula IVA acreditable
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Recalcula Todo  │ ──► Actualiza tabla con gastos
└──────────────────┘
```

### Paso 3: Exportar Datos

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │ Clic en "Exportar Excel"
       ▼
┌──────────────────┐
│  Export Utils    │ ──► Genera archivo Excel
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  XLSX Library    │ ──► Crea 2 hojas:
└────────┬─────────┘     • Resumen Mensual
         │               • Detalle Facturas
         ▼
┌──────────────────┐
│   Descarga       │ ──► resico-declaracion.xlsx
└──────────────────┘
```

---

## 🎯 Elementos Visuales

### Colores por Tipo

```
┌─────────────────────────────────────────┐
│  FACTURAS EMITIDAS (Ingresos)           │
│  ┌───────────────────────────────────┐  │
│  │ 🟢 Verde (#10B981)                │  │
│  │ Representa dinero que entra       │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  FACTURAS RECIBIDAS (Gastos)            │
│  ┌───────────────────────────────────┐  │
│  │ 🔵 Azul (#3B82F6)                 │  │
│  │ Representa dinero que sale        │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ERRORES                                │
│  ┌───────────────────────────────────┐  │
│  │ 🔴 Rojo (#EF4444)                 │  │
│  │ PDFs que no se pudieron leer      │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Estados de Notificación

```
┌─────────────────────────────────────────┐
│ ✅ 5 facturas procesadas correctamente  │ ← Verde (Éxito)
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ⚠️ 3 procesadas, 1 con errores          │ ← Amarillo (Advertencia)
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ❌ Error al procesar los archivos       │ ← Rojo (Error)
└─────────────────────────────────────────┘
```

---

## 📊 Ejemplo Visual de Cálculos

### Factura Emitida: $10,000

```
┌─────────────────────────────────────────┐
│  FACTURA EMITIDA                        │
├─────────────────────────────────────────┤
│  Subtotal:           $10,000.00         │
│  + IVA (16%):        $ 1,600.00         │
│  ─────────────────────────────           │
│  Subtotal:           $11,600.00         │
│  - Ret. IVA (10.67%):$ 1,066.67         │
│  - Ret. ISR (1.25%): $   125.00         │
│  ═════════════════════════════           │
│  TOTAL RECIBIDO:     $10,408.33 ✅      │
└─────────────────────────────────────────┘
```

### Factura Recibida: $5,000

```
┌─────────────────────────────────────────┐
│  FACTURA RECIBIDA (Gasto)               │
├─────────────────────────────────────────┤
│  Subtotal:           $ 5,000.00         │
│  + IVA (16%):        $   800.00         │
│  ─────────────────────────────           │
│  TOTAL PAGADO:       $ 5,800.00         │
│                                         │
│  IVA ACREDITABLE:    $   800.00 ✅      │
│  (Se resta del IVA a pagar)             │
└─────────────────────────────────────────┘
```

### Cálculo Mensual

```
┌─────────────────────────────────────────┐
│  ENERO 2024 - CÁLCULO MENSUAL           │
├─────────────────────────────────────────┤
│  Facturas Emitidas:                     │
│    3 facturas × $10,000 = $30,000       │
│    IVA Trasladado:        $ 4,800       │
│    Retención IVA:         $ 3,200       │
│    Retención ISR:         $   375       │
│                                         │
│  Facturas Recibidas:                    │
│    1 factura × $5,000 = $ 5,000         │
│    IVA Acreditable:       $   800       │
│                                         │
│  ─────────────────────────────           │
│  IVA a Pagar:                           │
│    $4,800 - $800 - $3,200 = $800        │
│                                         │
│  ═════════════════════════════           │
│  PAGO MENSUAL AL SAT:    $   800 💰     │
│  TOTAL RECIBIDO:         $31,225 ✅     │
└─────────────────────────────────────────┘
```

---

## 🎨 Diseño Responsive

### Desktop (> 1024px)

```
┌─────────────────────────────────────────────────────────────┐
│  [Header]                                                   │
│  [File Uploader - Full Width]                              │
│  [Action Buttons - Horizontal]                             │
│  [Monthly Table - Full Width with Scroll]                  │
│  [Invoices List - Full Width]                              │
└─────────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1024px)

```
┌───────────────────────────────────┐
│  [Header]                         │
│  [File Uploader]                  │
│  [Action Buttons - Wrapped]       │
│  [Monthly Table - Scroll X]       │
│  [Invoices List]                  │
└───────────────────────────────────┘
```

### Mobile (< 768px)

```
┌─────────────────┐
│  [Header]       │
│  [File Upload]  │
│  [Actions]      │
│  [Table]        │
│  [Invoices]     │
└─────────────────┘
```

---

## 🔍 Detalles de Interacción

### Hover Effects

```
Botón Normal:     [📥 Exportar CSV]
                   ↓ Mouse over
Botón Hover:      [📥 Exportar CSV] ← Más oscuro + Sombra
```

### Click Effects

```
Mes Colapsado:    ▶ Enero 2024
                   ↓ Click
Mes Expandido:    ▼ Enero 2024
                     └─ Detalles adicionales
```

### Drag & Drop States

```
Estado Normal:
┌─────────────────────────────────┐
│  📤 Arrastra tus PDFs aquí      │
│  (Borde gris punteado)          │
└─────────────────────────────────┘

Estado Dragging:
┌═════════════════════════════════┐
║  📤 Suelta aquí los archivos    ║
║  (Borde azul + Fondo azul claro)║
└═════════════════════════════════┘

Estado Processing:
┌─────────────────────────────────┐
│  ⏳ Procesando PDFs...           │
│  (Spinner animado)              │
└─────────────────────────────────┘
```

---

## 📱 Iconos Utilizados

```
🧮 Calculator      - Logo principal
📤 Upload          - Subir archivos
📄 FileText        - Facturas individuales
🗑️ Trash2          - Eliminar
📥 Download        - Exportar CSV
📊 FileSpreadsheet - Exportar Excel
⚠️ AlertCircle     - Notificaciones
✅ CheckCircle     - Éxito
❌ XCircle         - Error
🔽 ChevronDown     - Expandir
🔼 ChevronUp       - Colapsar
⏳ Loader2         - Cargando
```

---

## 🎯 Puntos Clave de UX

1. **Feedback Inmediato**: Notificaciones aparecen al procesar archivos
2. **Estados Visuales**: Colores diferentes para emitidas/recibidas
3. **Información Contextual**: Tooltips y ayudas en cada sección
4. **Acciones Reversibles**: Botón de eliminar para cada factura
5. **Confirmaciones**: Diálogo de confirmación antes de limpiar todo
6. **Progreso Visible**: Spinner durante procesamiento de PDFs
7. **Datos Claros**: Formato de moneda consistente
8. **Navegación Fácil**: Todo en una sola página, sin menús complejos

---

**Esta guía visual te ayudará a entender cómo funciona la interfaz de la aplicación.**
