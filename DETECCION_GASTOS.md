# 🎯 Detección Automática de Gastos No Deducibles

## ✅ Nueva Funcionalidad Implementada

La aplicación ahora **detecta automáticamente** gastos no deducibles y los **excluye de los cálculos** para RESICO.

---

## 🆕 ¿Cómo Funciona?

### 1. **Detección Automática**
Cuando subes facturas recibidas (gastos), el sistema analiza:
- ✅ **Descripción del concepto** (del XML)
- ✅ **Nombre del emisor** (proveedor)
- ✅ **RFC del emisor**

### 2. **Clasificación Inteligente**
Cada gasto se clasifica en:
- ✅ **Deducible** - Se incluye en cálculos
- ❌ **No Deducible** - Se excluye automáticamente
- ⚠️ **Limitado** - Alimentos (máx 8.5%)
- ❓ **Verificar** - Requiere revisión manual

### 3. **Exclusión Automática**
Los gastos marcados como **No Deducibles**:
- ❌ NO se incluyen en el IVA acreditable
- ❌ NO reducen tu pago al SAT
- ⚠️ Aparecen con badge rojo en la lista
- 📊 Se cuentan en las estadísticas

---

## 🔍 Gastos que Detecta como NO Deducibles

### 🛒 **Supermercados y Tiendas**
- ❌ Walmart, Soriana, Chedraui, Bodega Aurrera
- ❌ Oxxo, 7-Eleven
- ❌ Cualquier compra de supermercado

### 🎬 **Entretenimiento**
- ❌ Netflix, Spotify, HBO, Disney+, Amazon Prime
- ❌ Cine, teatro, conciertos
- ❌ Videojuegos (PlayStation, Xbox, Nintendo)

### 💪 **Gimnasios y Bienestar**
- ❌ Gimnasio, fitness, yoga, pilates
- ❌ Spa, masajes personales
- ❌ Peluquería, salón de belleza, estética

### 👕 **Ropa y Accesorios**
- ❌ Ropa casual, zapatos, calzado
- ❌ Vestidos, pantalones (uso personal)
- ❌ Accesorios personales

### 🏥 **Salud Personal**
- ❌ Farmacias (medicamentos personales)
- ❌ Doctor, hospital (consultas personales)
- ❌ Análisis clínicos personales

### 🐕 **Mascotas**
- ❌ Veterinaria
- ❌ Alimento para mascotas
- ❌ Accesorios para mascotas

### 🎓 **Educación Personal**
- ❌ Colegiaturas
- ❌ Escuela, universidad (hijos)
- ❌ Guardería, maternal

### 🏠 **Hogar**
- ❌ Mueblería (muebles para casa)
- ❌ Decoración del hogar
- ❌ Jardinería personal

---

## ✅ Gastos que Detecta como DEDUCIBLES

### 💻 **Tecnología y Equipo**
- ✅ Computadora, laptop, tablet
- ✅ Software, licencias (Office, Adobe)
- ✅ Impresora, escáner
- ✅ Hosting, dominios

### 🏢 **Oficina**
- ✅ Renta de oficina, coworking
- ✅ Escritorio, silla de oficina
- ✅ Papelería, toner, tinta
- ✅ Internet, telefonía

### 👔 **Servicios Profesionales**
- ✅ Contador, contabilidad
- ✅ Abogado, servicios legales
- ✅ Consultor, asesoría
- ✅ Facturación electrónica (PAC)

### 📚 **Capacitación Profesional**
- ✅ Cursos, certificaciones
- ✅ Diplomados, seminarios
- ✅ Libros técnicos/profesionales

### 🚗 **Transporte de Trabajo**
- ✅ Uber, taxi (reuniones)
- ✅ Gasolina (uso profesional)
- ✅ Estacionamiento
- ✅ Casetas, peajes

---

## ⚠️ Gastos LIMITADOS

### 🍽️ **Alimentos y Restaurantes**
- ⚠️ Máximo 8.5% del total de deducciones
- ⚠️ Solo comidas de negocios
- ⚠️ Debe haber relación con clientes/proveedores

**Detecta:**
- Restaurantes, cafeterías
- McDonald's, Burger King, KFC
- Starbucks, Italian Coffee
- Pizza, hamburguesas, tacos, sushi

---

## 🎨 Cómo se Ve en la Aplicación

### **Lista de Facturas:**

```
📋 laptop_dell.xml  [🛡️ Certificado SAT] [✅ Deducible]
   15/01/2024 | Subtotal: $15,000 | Total: $17,400

📋 walmart_compra.xml  [🛡️ Certificado SAT] [❌ No Deducible]
   20/01/2024 | Subtotal: $3,000 | Total: $3,480
   Gasto personal - No deducible

📋 restaurante.xml  [🛡️ Certificado SAT] [⚠️ Limitado (8.5%)]
   25/01/2024 | Subtotal: $500 | Total: $580
   Alimentos: Máximo 8.5% del total de deducciones

📋 curso_react.xml  [🛡️ Certificado SAT] [✅ Deducible]
   28/01/2024 | Subtotal: $2,000 | Total: $2,320
```

### **Notificaciones:**

```
✅ "3 archivos XML procesados con precisión 100%"

⚠️ "3 archivos XML procesados | ⚠️ 1 no deducibles detectados"
```

---

## 📊 Impacto en los Cálculos

### **Antes (Sin Detección):**
```
Facturas Recibidas:
- Laptop: $15,000 ✅
- Walmart: $3,000 ❌ (incluido por error)
- Curso: $2,000 ✅

IVA Acreditable: $3,200 (de $20,000)
Pago al SAT: Menor (incorrecto)
```

### **Ahora (Con Detección):**
```
Facturas Recibidas:
- Laptop: $15,000 ✅ Incluido
- Walmart: $3,000 ❌ EXCLUIDO automáticamente
- Curso: $2,000 ✅ Incluido

IVA Acreditable: $2,720 (de $17,000)
Pago al SAT: Correcto ✅
```

---

## 🎯 Ventajas

### 1. **Cumplimiento Automático**
- ✅ Evita errores en deducciones
- ✅ Cumple con reglas del SAT
- ✅ Reduce riesgo de auditorías

### 2. **Ahorro de Tiempo**
- ✅ No necesitas revisar cada factura manualmente
- ✅ Detección instantánea
- ✅ Clasificación automática

### 3. **Transparencia**
- ✅ Ves claramente qué se incluye y qué no
- ✅ Razón de exclusión visible
- ✅ Puedes revisar las decisiones

### 4. **Precisión**
- ✅ Cálculos correctos desde el inicio
- ✅ No incluye gastos personales por error
- ✅ Declaraciones más precisas

---

## ❓ Casos Especiales

### **Gastos Mixtos (Uso Personal y Profesional)**

Si un gasto se marca como **"❓ Verificar"**:
- ⚠️ El sistema no está seguro
- ⚠️ Se incluye en los cálculos por defecto
- ⚠️ **TÚ decides** si eliminarlo

**Ejemplo:**
- Celular: ❓ Verificar (puede ser mixto)
- Internet: ❓ Verificar (puede ser mixto)

**Recomendación:**
- Si es 100% trabajo → Déjalo
- Si es mixto → Calcula proporción
- Si es personal → Elimínalo

---

## 🔧 Cómo Usar la Función

### **Paso 1: Sube tus Gastos**
1. Selecciona "Facturas Recibidas (Gastos)"
2. Sube tus XMLs del SAT
3. Espera el procesamiento

### **Paso 2: Revisa las Clasificaciones**
1. Ve a la lista de facturas
2. Busca los badges:
   - ✅ Verde = Deducible
   - ❌ Rojo = No deducible
   - ⚠️ Amarillo = Limitado
   - ❓ Gris = Verificar

### **Paso 3: Verifica los Excluidos**
1. Los gastos no deducibles tienen badge rojo
2. Lee la razón de exclusión
3. Si estás de acuerdo, déjalos (ya están excluidos)
4. Si no estás de acuerdo, elimínalos y vuelve a subirlos

### **Paso 4: Revisa los Cálculos**
1. La tabla mensual solo incluye deducibles
2. El IVA acreditable es correcto
3. Tu pago al SAT es preciso

---

## 📋 Estadísticas

La notificación te muestra:
```
"3 archivos XML procesados | ⚠️ 1 no deducibles detectados"
```

Esto significa:
- 3 facturas procesadas correctamente
- 1 fue detectada como no deducible
- Esa 1 NO se incluye en cálculos

---

## ⚠️ Importante

### **El Sistema es Conservador**
- Si tiene duda, marca como "❓ Verificar"
- Prefiere incluir que excluir por error
- **Siempre revisa** las clasificaciones

### **No es Infalible**
- Algunos gastos pueden no detectarse
- Revisa siempre tus facturas
- Consulta con tu contador

### **Puedes Eliminar Manualmente**
- Si algo se clasificó mal
- Usa el botón 🗑️ para eliminarlo
- Vuelve a subirlo si es necesario

---

## 🎉 Resultado Final

Con esta función:
1. ✅ **Subes todas tus facturas** sin preocuparte
2. ✅ **El sistema detecta** las no deducibles
3. ✅ **Se excluyen automáticamente** de los cálculos
4. ✅ **Tus declaraciones son precisas** desde el inicio
5. ✅ **Cumples con el SAT** automáticamente

---

## 📞 ¿Dudas?

Si un gasto se clasificó incorrectamente:
1. Revisa la descripción en el XML
2. Verifica que sea realmente deducible
3. Si es correcto pero se marcó mal, elimínalo y reporta el caso
4. Consulta con tu contador si tienes dudas

---

**¡Ahora tu calculadora RESICO es más inteligente y te ayuda a cumplir con el SAT automáticamente! 🇲🇽**
