# Internxt Drive Clone

Simulación de un gestor de archivos en la nube construido como prueba técnica frontend para Internxt. Toda la lógica es client-side: sin backend, sin base de datos.

🔗 **[Demo en vivo](#)** <!-- Sustituye con tu URL de Vercel/Netlify -->

---

## Tecnologías utilizadas

| | |
|---|---|
| Framework | React 19 |
| Bundler / Dev server | Vite 8 |
| Lenguaje | TypeScript 6 |
| Estilos | Tailwind CSS 3 |
| Iconos | Lucide React |
| Tests | Vitest + Testing Library |

---

## Instalación y uso

**Requisitos:** Node.js 18+

```bash
# 1. Clona el repositorio
git clone https://github.com/PAMABA261/internxt-drive-test.git
cd internxt-drive-test

# 2. Instala dependencias
npm install

# 3. Arranca el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

```bash
# Ejecutar tests
npm run test

# Build de producción
npm run build
```

---

## Funcionalidades

### Obligatorias
- **Subir archivos** — botón en la barra superior (y FAB en móvil) que abre un selector de archivos. Los archivos aparecen al instante en el listado con nombre, tamaño formateado, fecha y un icono según el tipo (imagen, PDF, vídeo, audio, documento, carpeta, etc.)
- **Búsqueda en tiempo real** — filtrado por nombre mientras se escribe
- **Eliminar con confirmación** — modal de confirmación antes de borrar
- **Vista grid ↔ lista** — botón de alternancia en la barra de herramientas
- **Responsive / mobile-first** — en móvil la sidebar se oculta y se abre con un botón hamburguesa; el botón de subir archivo se convierte en un FAB flotante
- **Dark mode** — botón luna/sol en la barra superior; la preferencia se persiste en `localStorage` y también respeta `prefers-color-scheme` del sistema

### Bonus
- **Drag & Drop** — zona de drop global sobre el área principal con overlay animado; usa un contador de entradas para evitar el parpadeo (*flickering*) al arrastrar sobre elementos hijos
- **Preview de imágenes** — clic en cualquier archivo de tipo imagen abre un modal de previsualización con navegación entre imágenes (botones anterior / siguiente)
- **Ordenar por nombre, fecha y tamaño** — selector + botón de dirección (ascendente / descendente) en la barra de herramientas
- **Paginación ("Cargar más")** — la vista lista muestra los archivos en bloques y ofrece un botón para cargar más
- **TypeScript estricto** — tipos propios en `src/types/file.types.ts` para `DriveFile`, `FileType`, `ViewMode`, `SortField` y `SortOrder`
- **Tests unitarios** — suite con Vitest y Testing Library sobre las funciones de utilidad (`formatFileSize`, `formatFileDate`)
- **Desplegado** en Vercel/Netlify (ver enlace al inicio)

---

## Estructura del proyecto

```
src/
├── components/
│   ├── file-manager/
│   │   ├── FileGrid.tsx        # Vista en tarjetas
│   │   ├── FileList.tsx        # Vista en tabla con paginación
│   │   └── SortControl.tsx     # Selector de ordenación
│   ├── layout/
│   │   ├── DashboardLayout.tsx # Shell principal
│   │   ├── Navbar.tsx          # Barra superior (búsqueda, upload, dark mode, avatar)
│   │   └── Sidebar.tsx         # Navegación lateral con overlay en móvil
│   └── ui/
│       ├── ConfirmModal.tsx    # Modal de confirmación de borrado
│       └── PreviewModal.tsx    # Modal de previsualización de imágenes
├── context/
│   ├── FileContext.tsx         # Estado global de archivos (lista, ordenación, búsqueda, modales)
│   └── ThemeContext.tsx        # Estado global del tema (light/dark + localStorage)
├── types/
│   └── file.types.ts           # Tipos TypeScript compartidos
├── utils/
│   ├── fileHelpers.ts          # formatFileSize, formatFileDate
│   ├── fileHelpers.test.ts     # Tests unitarios
│   └── mockData.ts             # 27 archivos de ejemplo
├── App.tsx                     # Componente raíz + lógica de Drag & Drop
└── main.tsx
```

---

## Decisiones técnicas

**React Context en lugar de Redux / Zustand**
Todo el estado de la aplicación vive en `FileContext`. La app es de página única sin comunicación entre rutas ni lógica asíncrona compleja, por lo que añadir una librería de estado global habría sido sobreingeniería. El contexto cubre perfectamente los casos de uso actuales.

**Vitest en lugar de Jest**
El proyecto usa Vite como bundler, y Vitest comparte su configuración y pipeline de transformación. Usar Jest habría requerido configuración adicional (babel, resolvers) sin ningún beneficio funcional. La API es prácticamente idéntica.

**Contador de entradas para Drag & Drop**
En lugar de un simple booleano para `isDragging`, se usa un `useRef` como contador que se incrementa en `dragenter` y se decrementa en `dragleave`. Esto evita que el overlay parpadee cuando el cursor pasa por encima de elementos hijos dentro de la zona de drop, que es un bug clásico de las implementaciones más simples.

**`dragCounter` como `useRef` y no `useState`**
Actualizar el contador no debe provocar un re-render por sí solo; solo importa el estado booleano `isDragging` que se deriva de él. Usar `useState` para el contador habría generado renders innecesarios en cada movimiento del ratón.

**`ThemeContext` con `localStorage` + `prefers-color-scheme`**
El tema se inicializa con la preferencia guardada si existe, y si no, respeta la configuración del sistema operativo del usuario. Esto da una experiencia consistente desde la primera visita.

**Separación de `FileContext` y `ThemeContext`**
Son dos dominios de estado completamente independientes. Fusionarlos en un único contexto habría provocado re-renders innecesarios (un cambio de tema re-renderizaría todos los consumidores del estado de archivos y viceversa).

---

## Qué mejoraría con más tiempo

- **Navegación por carpetas** — el tipo `folder` existe en el modelo de datos pero no hay enrutamiento entre carpetas; añadiría rutas con React Router y una barra de breadcrumbs
- **Persistencia real** — los archivos se pierden al recargar; los serializaría en `localStorage` o `IndexedDB` para mayor capacidad
- **Más cobertura de tests** — actualmente solo hay tests sobre las utilidades; añadiría tests de integración para los componentes clave (`FileGrid`, `Navbar`, flujo de upload y borrado)
- **Accesibilidad (a11y)** — falta focus trapping en los modales, roles ARIA en el dropdown y navegación completa por teclado
- **Virtualización de la lista** — con muchos archivos, renderizar todas las filas del DOM es ineficiente; usaría `react-virtual` o `react-window`
- **Transiciones más pulidas** — las entradas y salidas de tarjetas al subir/borrar archivos se beneficiarían de animaciones con Framer Motion

---

## Autor

Pablo — [github.com/PAMABA261](https://github.com/PAMABA261)
