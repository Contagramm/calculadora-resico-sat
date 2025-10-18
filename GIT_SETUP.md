# 🚀 Guía para Subir a GitHub

## 📋 Pasos para Subir el Proyecto

### 1️⃣ Inicializar Git (si no está inicializado)

```bash
# Verificar si ya existe un repositorio
git status

# Si no existe, inicializar
git init
```

### 2️⃣ Configurar Git (primera vez)

```bash
# Configurar tu nombre
git config --global user.name "Tu Nombre"

# Configurar tu email
git config --global user.email "tu-email@ejemplo.com"

# Verificar configuración
git config --list
```

### 3️⃣ Agregar Archivos al Staging

```bash
# Ver estado de los archivos
git status

# Agregar todos los archivos
git add .

# O agregar archivos específicos
git add src/
git add package.json
git add README.md
```

### 4️⃣ Hacer el Primer Commit

```bash
# Commit con mensaje descriptivo
git commit -m "🎉 Initial commit: Calculadora RESICO con detección de gastos"

# O commit más detallado
git commit -m "feat: Calculadora RESICO completa

- Lectura de XML (CFDI 3.3 y 4.0) con precisión 100%
- Lectura de PDF con extracción automática
- Detección automática de gastos no deducibles
- Cálculos RESICO (IVA, retenciones, pagos)
- Saldos a favor con arrastre automático
- Exportación a CSV y Excel
- Interfaz moderna con React y Tailwind
- 100% privado y local"
```

### 5️⃣ Crear Repositorio en GitHub

#### Opción A: Desde GitHub Web

1. Ve a [github.com](https://github.com)
2. Haz clic en el botón **"+"** → **"New repository"**
3. Nombre: `calculadora-resico-sat`
4. Descripción: `Calculadora automática de declaraciones RESICO con detección de gastos no deducibles`
5. Selecciona **Public** o **Private**
6. **NO** marques "Initialize with README" (ya tenemos uno)
7. Haz clic en **"Create repository"**

#### Opción B: Desde GitHub CLI (si tienes gh instalado)

```bash
gh repo create calculadora-resico-sat --public --source=. --remote=origin
```

### 6️⃣ Conectar con el Repositorio Remoto

```bash
# Agregar el repositorio remoto
git remote add origin https://github.com/TU-USUARIO/calculadora-resico-sat.git

# Verificar que se agregó correctamente
git remote -v
```

### 7️⃣ Subir el Código a GitHub

```bash
# Cambiar el nombre de la rama a 'main' (si es necesario)
git branch -M main

# Subir el código
git push -u origin main
```

---

## 🔄 Comandos Git Comunes

### Ver Estado

```bash
# Ver archivos modificados
git status

# Ver diferencias
git diff

# Ver historial de commits
git log
git log --oneline
```

### Agregar Cambios

```bash
# Agregar todos los archivos
git add .

# Agregar archivo específico
git add src/App.jsx

# Agregar por tipo
git add *.js
```

### Hacer Commits

```bash
# Commit simple
git commit -m "Mensaje del commit"

# Commit con descripción larga
git commit -m "Título" -m "Descripción detallada"

# Modificar último commit
git commit --amend
```

### Subir Cambios

```bash
# Subir a la rama actual
git push

# Subir a rama específica
git push origin main

# Forzar push (cuidado!)
git push -f
```

### Descargar Cambios

```bash
# Descargar y fusionar
git pull

# Solo descargar
git fetch
```

### Ramas

```bash
# Ver ramas
git branch

# Crear rama
git branch feature/nueva-funcionalidad

# Cambiar de rama
git checkout feature/nueva-funcionalidad

# Crear y cambiar de rama
git checkout -b feature/nueva-funcionalidad

# Fusionar rama
git merge feature/nueva-funcionalidad

# Eliminar rama
git branch -d feature/nueva-funcionalidad
```

---

## 📝 Convenciones de Commits

### Formato Recomendado

```
tipo(alcance): descripción corta

Descripción larga (opcional)
```

### Tipos de Commits

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espacios, comas, etc.)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### Ejemplos

```bash
git commit -m "feat: agregar detección de gastos no deducibles"
git commit -m "fix: corregir cálculo de IVA en facturas recibidas"
git commit -m "docs: actualizar README con ejemplos de uso"
git commit -m "style: formatear código con prettier"
git commit -m "refactor: optimizar parser de XML"
git commit -m "chore: actualizar dependencias"
```

---

## 🔧 Solución de Problemas

### Error: "remote origin already exists"

```bash
# Eliminar el remoto existente
git remote remove origin

# Agregar el nuevo remoto
git remote add origin https://github.com/TU-USUARIO/calculadora-resico-sat.git
```

### Error: "failed to push some refs"

```bash
# Descargar cambios primero
git pull origin main --rebase

# Luego subir
git push origin main
```

### Error: "Permission denied (publickey)"

```bash
# Usar HTTPS en lugar de SSH
git remote set-url origin https://github.com/TU-USUARIO/calculadora-resico-sat.git
```

### Deshacer Cambios

```bash
# Deshacer cambios en archivo específico
git checkout -- archivo.js

# Deshacer todos los cambios no commiteados
git reset --hard

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (eliminar cambios)
git reset --hard HEAD~1
```

---

## 📦 Archivos que NO se Suben

El archivo `.gitignore` ya está configurado para excluir:

```
node_modules/      # Dependencias (se instalan con npm install)
dist/              # Build de producción
*.log              # Logs
.env               # Variables de entorno
.DS_Store          # Archivos de macOS
```

---

## 🎯 Flujo de Trabajo Recomendado

### Para Nuevas Funcionalidades

```bash
# 1. Crear rama
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "feat: descripción"

# 3. Subir rama
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request en GitHub

# 5. Después de aprobar, fusionar a main
git checkout main
git merge feature/nueva-funcionalidad
git push origin main

# 6. Eliminar rama
git branch -d feature/nueva-funcionalidad
```

### Para Correcciones Rápidas

```bash
# 1. Hacer cambios
git add .
git commit -m "fix: descripción del fix"

# 2. Subir directamente a main
git push origin main
```

---

## 🌐 URLs Importantes

- **Repositorio**: `https://github.com/TU-USUARIO/calculadora-resico-sat`
- **Issues**: `https://github.com/TU-USUARIO/calculadora-resico-sat/issues`
- **Pull Requests**: `https://github.com/TU-USUARIO/calculadora-resico-sat/pulls`

---

## ✅ Checklist Final

Antes de subir, verifica:

- [ ] `.gitignore` está configurado
- [ ] `README.md` está actualizado
- [ ] `LICENSE` está incluido
- [ ] No hay archivos sensibles (`.env`, claves, etc.)
- [ ] El código funciona localmente
- [ ] Los commits tienen mensajes descriptivos
- [ ] La documentación está completa

---

## 🎉 ¡Listo!

Tu proyecto ya está en GitHub y listo para compartir con el mundo.

**Siguiente paso:** Comparte el link con otros desarrolladores o en redes sociales.

```
🔗 https://github.com/TU-USUARIO/calculadora-resico-sat
```

---

**¿Necesitas ayuda?** Consulta la [documentación oficial de Git](https://git-scm.com/doc)
