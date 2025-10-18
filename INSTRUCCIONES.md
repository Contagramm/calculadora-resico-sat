# 🚀 Instrucciones de Inicio Rápido

## ✅ Instalación Completada

Ya se han instalado todas las dependencias necesarias.

## 🎯 Cómo Iniciar la Aplicación

### Opción 1: Desde la Terminal

1. Abre una terminal en la carpeta del proyecto
2. Ejecuta:
```bash
npm run dev
```
3. Abre tu navegador en la URL que aparece (generalmente `http://localhost:5173`)

### Opción 2: Desde VS Code

1. Abre la terminal integrada (Ctrl + `)
2. Asegúrate de estar en la carpeta `sat`
3. Ejecuta `npm run dev`
4. Haz clic en la URL que aparece en la terminal

## 📱 Uso de la Aplicación

### Paso 1: Preparar tus Facturas
- Ten listos los PDFs de tus facturas (emitidas y recibidas)
- Los PDFs deben contener texto (no imágenes escaneadas)

### Paso 2: Subir Facturas Emitidas
1. Selecciona "Facturas Emitidas (Ingresos)"
2. Arrastra los PDFs o haz clic para seleccionarlos
3. Espera a que se procesen

### Paso 3: Subir Facturas Recibidas
1. Selecciona "Facturas Recibidas (Gastos)"
2. Arrastra los PDFs o haz clic para seleccionarlos
3. Espera a que se procesen

### Paso 4: Revisar Cálculos
- Verás una tabla con el resumen mensual
- Haz clic en cualquier mes para ver detalles
- Revisa los totales anuales al final de la tabla

### Paso 5: Exportar Datos
- Haz clic en "Exportar CSV" para un archivo CSV simple
- Haz clic en "Exportar Excel" para un archivo Excel con dos hojas:
  - Resumen Mensual
  - Detalle de Facturas

## 🧮 Qué Calcula la Aplicación

### Para Facturas Emitidas (Ingresos):
- **IVA Trasladado**: 16% del subtotal
- **Retención IVA**: 10.6667% del subtotal
- **Retención ISR**: 1.25% del subtotal
- **Total Recibido**: Lo que realmente recibes después de retenciones

### Para Facturas Recibidas (Gastos):
- **IVA Acreditable**: 16% del subtotal (lo que puedes deducir)

### Pago Mensual al SAT:
```
IVA a Pagar = IVA Trasladado - IVA Acreditable - Retenciones IVA
Pago Mensual = IVA a Pagar + Saldo a Favor del mes anterior
```

### Saldos a Favor:
- Si el IVA a pagar es negativo, se genera un saldo a favor
- Este saldo se arrastra automáticamente al siguiente mes

## 🎨 Características de la Interfaz

### Tabla Mensual
- **Verde**: Facturas emitidas
- **Azul**: Facturas recibidas
- **Expandible**: Haz clic en cualquier mes para ver detalles
- **Totales**: Los totales anuales aparecen al final

### Lista de Facturas
- **Filtros**: Filtra por tipo (Todas, Emitidas, Recibidas)
- **Eliminar**: Haz clic en el icono de basura para eliminar una factura
- **Errores**: Las facturas con errores se muestran en rojo

### Notificaciones
- **Verde**: Operación exitosa
- **Amarillo**: Advertencia (algunas facturas con errores)
- **Rojo**: Error

## 🔧 Solución de Problemas

### El PDF no se lee correctamente
**Problema**: Los datos extraídos son incorrectos o están en cero

**Soluciones**:
1. Verifica que el PDF contenga texto (no sea una imagen)
2. Asegúrate de que tenga campos como "Subtotal", "IVA", "Total"
3. Elimina la factura y súbela de nuevo
4. Si persiste, los datos se pueden editar manualmente después

### La aplicación no inicia
**Problema**: `npm run dev` no funciona

**Soluciones**:
1. Asegúrate de estar en la carpeta correcta (`sat`)
2. Verifica que Node.js esté instalado: `node --version`
3. Reinstala dependencias: `npm install`
4. Intenta con: `npm run dev -- --host`

### Los cálculos no son correctos
**Problema**: Los totales no coinciden con tus expectativas

**Soluciones**:
1. Verifica que las facturas estén clasificadas correctamente (emitidas vs recibidas)
2. Revisa que los PDFs se hayan leído correctamente
3. Haz clic en un mes para ver el desglose detallado
4. Consulta con tu contador si tienes dudas

### No puedo exportar
**Problema**: Los botones de exportar no funcionan

**Soluciones**:
1. Asegúrate de tener al menos una factura procesada
2. Verifica que tu navegador permita descargas
3. Intenta con otro navegador (Chrome, Firefox, Edge)

## 📊 Ejemplo de Uso

### Escenario:
Tienes 3 facturas emitidas en enero por $10,000 cada una y 1 factura recibida por $5,000.

### Proceso:
1. Sube las 3 facturas emitidas seleccionando "Facturas Emitidas"
2. Sube la factura recibida seleccionando "Facturas Recibidas"
3. La aplicación calculará automáticamente:
   - Subtotal Emitidas: $30,000
   - IVA Trasladado: $4,800 (16%)
   - Retención IVA: $3,200 (10.6667%)
   - Retención ISR: $375 (1.25%)
   - Subtotal Recibidas: $5,000
   - IVA Acreditable: $800 (16%)
   - IVA a Pagar: $4,800 - $800 - $3,200 = $800
   - Pago Mensual: $800
   - Total Recibido: $30,000 + $4,800 - $3,200 - $375 = $31,225

## ⚠️ Importante

1. **Privacidad**: Todos los datos se procesan en tu navegador. No se envía nada a internet.
2. **Validación**: Siempre revisa los datos antes de usarlos para declaraciones oficiales.
3. **Contador**: Consulta con tu contador para la declaración oficial al SAT.
4. **Backup**: Exporta tus datos regularmente para tener un respaldo.

## 🆘 Ayuda Adicional

Si tienes problemas o preguntas:
1. Revisa el archivo README.md para más detalles técnicos
2. Verifica que todos los archivos estén en su lugar
3. Consulta la consola del navegador (F12) para ver errores

## 🎉 ¡Listo!

Tu calculadora RESICO está lista para usar. ¡Buena suerte con tus declaraciones!
