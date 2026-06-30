# 🧮 Calculadora RESICO - SAT México

> Calculadora automática de declaraciones RESICO con lectura inteligente de facturas XML/PDF y detección de gastos no deducibles.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Descripción

Aplicación web moderna para calcular automáticamente tus declaraciones mensuales de **RESICO** (Régimen Simplificado de Confianza) en México. Lee facturas en formato **XML (CFDI)** o **PDF**, extrae los datos fiscales, calcula IVA, retenciones y pagos mensuales al SAT, y detecta automáticamente gastos no deducibles.

### ✨ Características Principales

- 📋 **Lectura de XML (CFDI 3.3 y 4.0)** - Precisión del 100%
- 📄 **Lectura de PDF** - Extracción automática de datos
- 🎯 **Detección de Gastos No Deducibles** - Identifica automáticamente gastos personales
- 🧮 **Cálculos RESICO Automáticos** - IVA, retenciones, pagos mensuales
- 💰 **Saldos a Favor** - Arrastre automático mes a mes
- 📊 **Tabla Mensual Expandible** - Resumen completo por mes
- 📈 **Totales Anuales** - Consolidado del año fiscal
- 💾 **Exportación** - CSV y Excel con múltiples hojas
- 🔒 **100% Privado** - Todo se procesa localmente en tu navegador
- 🎨 **Interfaz Moderna** - Diseño responsive con Tailwind CSS

---

## 🚀 Demo

![Calculadora RESICO](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Calculadora+RESICO)

---

## 📦 Instalación

### Requisitos Previos

- Node.js 16 o superior
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/calculadora-resico.git
cd calculadora-resico

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

---

## 🎯 Uso Rápido

### 1. Subir Facturas Emitidas (Ingresos)

```
1. Selecciona "Facturas Emitidas (Ingresos)"
2. Haz clic en "XML (Recomendado)" o arrastra tus archivos
3. El sistema extrae automáticamente todos los datos
4. Verás el badge "✅ Deducible" en cada factura
```

### 2. Subir Facturas Recibidas (Gastos)

```
1. Selecciona "Facturas Recibidas (Gastos)"
2. Sube tus XMLs de gastos
3. El sistema detecta automáticamente:
   ✅ Gastos deducibles (se incluyen)
   ❌ Gastos no deducibles (se excluyen)
   ⚠️ Gastos limitados (alimentos 8.5%)
```

### 3. Revisar Cálculos

```
- Tabla mensual con todos los cálculos
- IVA a pagar
- Retenciones
- Pago mensual al SAT
- Saldos a favor
- Totales anuales
```

### 4. Exportar Datos

```
- CSV: Resumen mensual simple
- Excel: Dos hojas (Resumen + Detalle)
```

---

## 🧮 Cálculos RESICO

### Para Facturas Emitidas (Ingresos):

- **IVA Trasladado**: 16% del subtotal
- **Retención IVA**: 10.6667% del subtotal
- **Retención ISR**: 1.25% del subtotal
- **Total Recibido**: Subtotal + IVA - Retenciones

### Para Facturas Recibidas (Gastos):

- **IVA Acreditable**: 16% del subtotal (solo gastos deducibles)

### Cálculo Mensual:

- **IVA a Pagar**: IVA Trasladado - IVA Acreditable - Retención IVA
- **Pago Mensual**: IVA a Pagar (o $0 si hay saldo a favor)
- **Saldo a Favor**: Se arrastra al siguiente mes automáticamente

---

## 🎯 Detección de Gastos No Deducibles

El sistema detecta automáticamente y **excluye** de los cálculos:

### ❌ No Deducibles:
- Supermercados (Walmart, Soriana, Oxxo)
- Streaming (Netflix, Spotify, HBO)
- Gimnasios y fitness
- Ropa y zapatos personales
- Farmacias y medicamentos
- Mascotas y veterinaria
- Educación de hijos
- Entretenimiento personal

### ✅ Deducibles:
- Equipo de trabajo (computadoras, software)
- Renta de oficina y coworking
- Capacitación profesional
- Servicios contables y legales
- Internet y telefonía (proporcional)
- Transporte a reuniones

### ⚠️ Limitados:
- Alimentos y restaurantes (máx 8.5%)

---

## 📊 Tecnologías

- **React 18.2** - Framework de UI
- **Vite 5.0** - Build tool ultra rápido
- **Tailwind CSS 3.3** - Framework de estilos
- **PDF.js 3.11** - Lectura de PDFs
- **XLSX 0.18** - Exportación a Excel
- **Lucide React** - Iconos modernos

---

## 📁 Estructura del Proyecto

```
calculadora-resico/
├── src/
│   ├── components/          # Componentes React
│   │   ├── FileUploader.jsx
│   │   ├── MonthlyTable.jsx
│   │   ├── InvoicesList.jsx
│   │   └── ActionButtons.jsx
│   ├── utils/              # Utilidades
│   │   ├── xmlParser.js    # Parser de XML/CFDI
│   │   ├── pdfParser.js    # Parser de PDF
│   │   ├── fileProcessor.js # Procesador universal
│   │   ├── resicoCalculator.js # Cálculos RESICO
│   │   ├── deductionValidator.js # Detección de gastos
│   │   └── exportUtils.js  # Exportación CSV/Excel
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
├── docs/                   # Documentación
│   ├── INSTRUCCIONES.md
│   ├── EJEMPLO_XML.md
│   ├── DETECCION_GASTOS.md
│   └── ACTUALIZACION_XML.md
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔒 Privacidad y Seguridad

- ✅ **100% Local** - Todo se procesa en tu navegador
- ✅ **Sin Servidor** - No se envía información a internet
- ✅ **Sin Cookies** - No se rastrea tu actividad
- ✅ **Sin Almacenamiento** - Los datos no se guardan
- ✅ **Código Abierto** - Puedes revisar el código

---

## 📖 Documentación Completa

- [Instrucciones de Uso](INSTRUCCIONES.md)
- [Ejemplos de XML](EJEMPLO_XML.md)
- [Detección de Gastos](DETECCION_GASTOS.md)
- [Actualización XML](ACTUALIZACION_XML.md)
- [Guía Visual](GUIA_VISUAL.md)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Roadmap

- [ ] Soporte para CFDI 4.0 completo
- [ ] Importación desde Portal del SAT
- [ ] Gráficas de ingresos/gastos
- [ ] Comparación año anterior
- [ ] Proyección anual
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Exportación a PDF

---

## ⚠️ Disclaimer

Esta aplicación es una **herramienta de ayuda** para calcular tus declaraciones RESICO. Los cálculos son aproximados y deben ser **verificados por un contador profesional** antes de presentar tu declaración oficial al SAT.

**No nos hacemos responsables** por errores en los cálculos o por el uso incorrecto de la información generada.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: jorgebenitoalavez@gmail.com

---

## 🙏 Agradecimientos

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PDF.js](https://mozilla.github.io/pdf.js/)
- [Lucide Icons](https://lucide.dev/)

---

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](docs/)
2. Busca en [Issues](https://github.com/tu-usuario/calculadora-resico/issues)
3. Crea un nuevo Issue si no encuentras solución

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ para facilitar las declaraciones RESICO en México 🇲🇽

</div>
