# 📊 Calculadora RESICO - Resumen del Proyecto

## ✅ Estado del Proyecto: COMPLETADO

Tu calculadora RESICO está **100% funcional** y lista para usar.

---

## 📁 Estructura del Proyecto

```
sat/
├── 📄 index.html                      # Página principal
├── 📦 package.json                    # Dependencias del proyecto
├── ⚙️ vite.config.js                  # Configuración de Vite
├── 🎨 tailwind.config.js              # Configuración de Tailwind CSS
├── 📝 postcss.config.js               # Configuración de PostCSS
├── 🚫 .gitignore                      # Archivos ignorados por Git
│
├── 📚 README.md                       # Documentación completa
├── 📋 INSTRUCCIONES.md                # Guía detallada de uso
├── 📝 EJEMPLO_DATOS.md                # Ejemplos de datos de prueba
├── 🚀 INICIO_RAPIDO.txt               # Guía de inicio rápido
├── 📊 RESUMEN_PROYECTO.md             # Este archivo
│
├── 📂 src/
│   ├── 🎯 main.jsx                    # Punto de entrada de React
│   ├── 🎨 index.css                   # Estilos globales
│   ├── 📱 App.jsx                     # Componente principal
│   │
│   ├── 📂 components/
│   │   ├── FileUploader.jsx          # Subida de archivos PDF
│   │   ├── MonthlyTable.jsx          # Tabla de resumen mensual
│   │   ├── InvoicesList.jsx          # Lista de facturas procesadas
│   │   └── ActionButtons.jsx         # Botones de acción
│   │
│   └── 📂 utils/
│       ├── pdfParser.js              # Extracción de datos de PDFs
│       ├── resicoCalculator.js       # Cálculos RESICO
│       └── exportUtils.js            # Exportación a CSV/Excel
│
└── 📂 node_modules/                   # Dependencias instaladas (185 paquetes)
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Lectura de PDFs
- [x] Extracción automática de texto usando PDF.js
- [x] Reconocimiento de fechas en múltiples formatos
- [x] Extracción de subtotal, IVA, retenciones y total
- [x] Manejo de errores y PDFs mal formados
- [x] Procesamiento de múltiples archivos simultáneamente

### ✅ Cálculos RESICO
- [x] IVA Trasladado (16%)
- [x] Retención IVA (10.6667%)
- [x] Retención ISR (1.25%)
- [x] IVA Acreditable para gastos
- [x] Cálculo de IVA a pagar mensual
- [x] Saldos a favor con arrastre automático
- [x] Total recibido después de retenciones
- [x] Totales anuales

### ✅ Interfaz de Usuario
- [x] Drag & drop para subir PDFs
- [x] Selector de tipo de factura (emitida/recibida)
- [x] Tabla mensual expandible con detalles
- [x] Lista de facturas con filtros
- [x] Contador de facturas por mes
- [x] Notificaciones de éxito/error
- [x] Diseño responsive y moderno
- [x] Gradientes y animaciones

### ✅ Gestión de Datos
- [x] Eliminar facturas individuales
- [x] Limpiar todos los datos
- [x] Filtrar por tipo de factura
- [x] Recálculo automático al modificar datos

### ✅ Exportación
- [x] Exportar a CSV con resumen mensual
- [x] Exportar a Excel con dos hojas:
  - Resumen Mensual
  - Detalle de Facturas
- [x] Incluye totales anuales
- [x] Formato profesional

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.2.0 | Framework de UI |
| **Vite** | 5.0.8 | Build tool y dev server |
| **Tailwind CSS** | 3.3.6 | Framework de estilos |
| **PDF.js** | 3.11.174 | Lectura de archivos PDF |
| **XLSX** | 0.18.5 | Exportación a Excel |
| **Lucide React** | 0.294.0 | Iconos modernos |

---

## 🚀 Cómo Iniciar

### Opción 1: Terminal
```bash
cd c:/Users/W11/Documents/Contagramm/sat
npm run dev
```

### Opción 2: VS Code
1. Abre la carpeta `sat` en VS Code
2. Abre la terminal integrada (Ctrl + `)
3. Ejecuta `npm run dev`
4. Abre http://localhost:5173 en tu navegador

---

## 📊 Ejemplo de Flujo de Trabajo

### 1️⃣ Preparación
```
Reúne tus PDFs de facturas:
├── Facturas Emitidas (Ingresos)
│   ├── factura_enero_2024.pdf
│   ├── factura_febrero_2024.pdf
│   └── ...
└── Facturas Recibidas (Gastos)
    ├── gasto_enero_2024.pdf
    ├── gasto_febrero_2024.pdf
    └── ...
```

### 2️⃣ Procesamiento
1. Inicia la aplicación
2. Selecciona "Facturas Emitidas"
3. Arrastra todos los PDFs de ingresos
4. Espera a que se procesen
5. Selecciona "Facturas Recibidas"
6. Arrastra todos los PDFs de gastos
7. Espera a que se procesen

### 3️⃣ Revisión
- Revisa la tabla mensual
- Haz clic en cada mes para ver detalles
- Verifica que los datos sean correctos
- Elimina facturas con errores si es necesario

### 4️⃣ Exportación
- Haz clic en "Exportar Excel"
- Abre el archivo descargado
- Revisa los datos
- Úsalos para tu declaración

---

## 🧮 Fórmulas de Cálculo

### Facturas Emitidas
```javascript
IVA Trasladado = Subtotal × 0.16
Retención IVA = Subtotal × 0.106667
Retención ISR = Subtotal × 0.0125
Total Recibido = Subtotal + IVA Trasladado - Retención IVA - Retención ISR
```

### Facturas Recibidas
```javascript
IVA Acreditable = Subtotal × 0.16
```

### Pago Mensual
```javascript
IVA a Pagar = IVA Trasladado - IVA Acreditable - Retenciones IVA

Si IVA a Pagar > 0:
    Pago Mensual = IVA a Pagar
Sino:
    Saldo a Favor += |IVA a Pagar|
    Pago Mensual = 0
```

---

## 🎨 Características de Diseño

### Colores
- **Gradiente principal**: Índigo a Púrpura (#667eea → #764ba2)
- **Facturas emitidas**: Verde (#10B981)
- **Facturas recibidas**: Azul (#3B82F6)
- **Errores**: Rojo (#EF4444)
- **Advertencias**: Amarillo (#F59E0B)

### Componentes
- **Drag & drop**: Zona visual con animaciones
- **Tabla**: Expandible con hover effects
- **Botones**: Con iconos de Lucide React
- **Notificaciones**: Auto-dismiss después de 5 segundos
- **Cards**: Con sombras y bordes redondeados

---

## 📈 Capacidades

| Característica | Capacidad |
|----------------|-----------|
| **PDFs simultáneos** | Ilimitados |
| **Tamaño de PDF** | Limitado por memoria del navegador |
| **Meses** | Todos los meses del año |
| **Años** | Múltiples años soportados |
| **Facturas** | Ilimitadas |
| **Exportación** | CSV y Excel |

---

## ⚠️ Limitaciones Conocidas

1. **Extracción de PDFs**
   - Solo funciona con PDFs que contengan texto
   - PDFs escaneados (imágenes) no se pueden leer
   - Formatos no estándar pueden dar errores

2. **Navegador**
   - Requiere navegador moderno (Chrome, Firefox, Edge)
   - JavaScript debe estar habilitado
   - Cookies/LocalStorage no son necesarios

3. **Datos**
   - Los datos se pierden al cerrar el navegador
   - No hay persistencia automática
   - Debes exportar antes de cerrar

---

## 🔒 Seguridad y Privacidad

✅ **100% Local**: Todos los datos se procesan en tu navegador
✅ **Sin servidor**: No se envía información a internet
✅ **Sin cookies**: No se almacenan datos personales
✅ **Sin tracking**: No hay analíticas ni seguimiento
✅ **Código abierto**: Puedes revisar todo el código

---

## 🆘 Solución de Problemas

### Problema: La aplicación no inicia
**Solución**:
```bash
npm install
npm run dev
```

### Problema: PDF no se lee correctamente
**Solución**:
1. Verifica que sea PDF con texto (no imagen)
2. Asegúrate de que tenga campos estándar
3. Intenta con otro PDF para confirmar

### Problema: Cálculos incorrectos
**Solución**:
1. Verifica la clasificación (emitida vs recibida)
2. Revisa los datos extraídos
3. Haz clic en el mes para ver detalles

### Problema: No puedo exportar
**Solución**:
1. Asegúrate de tener facturas procesadas
2. Verifica permisos de descarga del navegador
3. Intenta con otro navegador

---

## 📞 Soporte

Si necesitas ayuda:
1. Lee el README.md completo
2. Revisa INSTRUCCIONES.md
3. Consulta EJEMPLO_DATOS.md
4. Abre un issue en GitHub (si aplica)

---

## 🎉 ¡Todo Listo!

Tu calculadora RESICO está completamente funcional y lista para usar.

### Próximos Pasos:
1. ✅ Inicia la aplicación: `npm run dev`
2. ✅ Sube tus primeras facturas
3. ✅ Revisa los cálculos
4. ✅ Exporta tus datos
5. ✅ Úsalos para tu declaración al SAT

---

## 📝 Notas Finales

- **Validación**: Siempre revisa los datos con tu contador
- **Backup**: Exporta regularmente tus datos
- **Actualizaciones**: Las tasas RESICO pueden cambiar
- **Privacidad**: Tus datos nunca salen de tu computadora

---

**Desarrollado con ❤️ para facilitar tus declaraciones RESICO**

*Versión 1.0.0 - Octubre 2024*
