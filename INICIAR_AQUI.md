# 🚀 INICIAR APLICACIÓN - PASO A PASO

## ✅ Todo está listo

Las dependencias ya están instaladas. Solo necesitas iniciar el servidor.

---

## 📋 Opción 1: Terminal Integrada de VS Code

### Paso 1: Abrir Terminal
- Presiona **Ctrl + `** (tecla acento grave)
- O ve a: **Terminal → Nueva Terminal**

### Paso 2: Verificar la Ruta
Asegúrate de estar en la carpeta correcta:
```
PS C:\Users\W11\Documents\Contagramm\sat>
```

Si no estás en esa carpeta, ejecuta:
```powershell
cd c:\Users\W11\Documents\Contagramm\sat
```

### Paso 3: Iniciar el Servidor
```powershell
npm run dev
```

### Paso 4: Abrir en el Navegador
Verás algo como:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Haz Ctrl + Click** en el link `http://localhost:5173/` o cópialo y pégalo en tu navegador.

---

## 📋 Opción 2: Terminal Externa (PowerShell)

### Paso 1: Abrir PowerShell
- Presiona **Windows + X**
- Selecciona **Windows PowerShell** o **Terminal**

### Paso 2: Navegar a la Carpeta
```powershell
cd c:\Users\W11\Documents\Contagramm\sat
```

### Paso 3: Iniciar el Servidor
```powershell
npm run dev
```

### Paso 4: Abrir Navegador
Abre tu navegador y ve a: **http://localhost:5173**

---

## 📋 Opción 3: Explorador de Archivos

### Paso 1: Abrir Carpeta
1. Abre el Explorador de Archivos
2. Navega a: `C:\Users\W11\Documents\Contagramm\sat`

### Paso 2: Abrir Terminal Aquí
1. Haz clic en la barra de direcciones
2. Escribe `powershell` y presiona Enter

### Paso 3: Iniciar
```powershell
npm run dev
```

---

## 🎯 ¿Qué Verás?

### En la Terminal:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### En el Navegador:
```
╔═══════════════════════════════════════════════════════════════╗
║              🧮 Calculadora RESICO                            ║
║        Calcula automáticamente tus declaraciones al SAT       ║
╚═══════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────┐
│  Tipo de Factura                                              │
│  ⚪ Facturas Emitidas (Ingresos)  ⚪ Facturas Recibidas (Gastos)│
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              📤 Arrastra tus PDFs aquí                  │ │
│  │                                                         │ │
│  │         o haz clic para seleccionar archivos            │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

---

## ✅ Verificación Rápida

### ¿El servidor está corriendo?
Deberías ver en la terminal:
- ✅ `VITE v5.0.8 ready`
- ✅ `Local: http://localhost:5173/`

### ¿La página carga?
Deberías ver:
- ✅ Fondo con gradiente morado/índigo
- ✅ Título "Calculadora RESICO"
- ✅ Zona de drag & drop para PDFs

---

## 🎬 Primer Uso

### 1. Seleccionar Tipo
- Haz clic en **"Facturas Emitidas (Ingresos)"** para facturas que emitiste
- O en **"Facturas Recibidas (Gastos)"** para facturas que recibiste

### 2. Subir PDFs
- **Arrastra** tus archivos PDF a la zona de drop
- O **haz clic** en "Seleccionar PDFs" para buscar archivos

### 3. Esperar Procesamiento
- Verás un spinner con el mensaje "Procesando PDFs..."
- Aparecerá una notificación verde cuando termine

### 4. Revisar Resultados
- Verás una tabla con el resumen mensual
- Cada mes muestra: facturas, totales, IVA, retenciones, pagos

### 5. Exportar Datos
- Haz clic en **"Exportar CSV"** para un archivo CSV
- O en **"Exportar Excel"** para un archivo Excel completo

---

## 🔧 Solución de Problemas

### ❌ Error: "Cannot find module"
**Solución:**
```powershell
npm install
npm run dev
```

### ❌ Error: "Port 5173 already in use"
**Solución:** Usa otro puerto:
```powershell
npm run dev -- --port 3000
```
Luego abre: http://localhost:3000

### ❌ La página no carga
**Solución:**
1. Verifica que el servidor esté corriendo (mira la terminal)
2. Intenta recargar la página (Ctrl + R)
3. Abre la consola del navegador (F12) para ver errores
4. Intenta con otro navegador (Chrome, Firefox, Edge)

### ❌ Los PDFs no se procesan
**Solución:**
1. Verifica que sean PDFs con texto (no imágenes escaneadas)
2. Abre la consola del navegador (F12) para ver errores
3. Intenta con un PDF diferente
4. Revisa que el PDF tenga campos como "Subtotal", "IVA", "Total"

---

## 🎨 Navegadores Recomendados

✅ **Google Chrome** (Recomendado)
✅ **Microsoft Edge** (Recomendado)
✅ **Mozilla Firefox**
✅ **Opera**
⚠️ **Safari** (Puede tener problemas con PDF.js)
❌ **Internet Explorer** (No soportado)

---

## 📱 Atajos Útiles

### En la Terminal:
- **Ctrl + C** - Detener el servidor
- **R** - Reiniciar el servidor
- **H** - Mostrar ayuda

### En el Navegador:
- **F12** - Abrir consola de desarrollador
- **Ctrl + R** - Recargar página
- **Ctrl + Shift + R** - Recargar sin caché
- **Ctrl + +** - Zoom in
- **Ctrl + -** - Zoom out
- **Ctrl + 0** - Restablecer zoom

---

## 📞 Necesitas Más Ayuda?

### Documentación Disponible:
1. **LEEME.txt** - Lectura rápida
2. **INICIO_RAPIDO.txt** - Guía de 3 pasos
3. **INSTRUCCIONES.md** - Guía detallada
4. **README.md** - Documentación técnica
5. **EJEMPLO_DATOS.md** - Datos de prueba
6. **GUIA_VISUAL.md** - Guía visual
7. **COMANDOS.txt** - Comandos útiles

---

## 🎉 ¡Listo!

Una vez que el servidor esté corriendo y la página cargue, estarás listo para:

✅ Subir tus facturas en PDF
✅ Ver los cálculos automáticos
✅ Revisar el resumen mensual
✅ Exportar tus datos
✅ Preparar tu declaración al SAT

---

**¡Buena suerte con tus declaraciones RESICO! 🇲🇽**

*Si tienes problemas, revisa la consola del navegador (F12) para ver mensajes de error.*
