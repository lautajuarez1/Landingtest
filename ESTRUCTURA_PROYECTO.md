# Documentación de Estructura y Arquitectura — Creato

Esta documentación detalla la arquitectura técnica, la jerarquía de componentes, el flujo de navegación, la capa de datos y el comportamiento interactivo/responsivo de la landing page de **Creato**.

---

## 1. Visión General del Proyecto

**Creato** es una plataforma web comercial orientada a comunicar una propuesta de valor integral para empresas y comercios: resolver múltiples áreas de negocio (arquitectura comercial, eventos y producción, diseño/marca, tecnología y sistemas, y gestión operativa) bajo **un único interlocutor y un único presupuesto**.

- **Enfoque de diseño:** Landing page fluida de alto impacto visual, con soporte completo para desktop y mobile, transiciones interactivas calibradas, modales modulares sin trampas de scroll, carruseles optimizados para touch/mouse y canales de contacto directo (WhatsApp y Calendly).
- **Idioma del sitio:** Español (`es-AR`).

---

## 2. Stack Tecnológico

| Herramienta / Librería | Versión | Propósito |
| :--- | :--- | :--- |
| **Next.js** | 16.3.x (App Router) | Framework React con arquitectura basada en componentes cliente y servidor. |
| **React** | 19.x | Biblioteca base para componentes UI, estado y ciclo de vida. |
| **Tailwind CSS** | 4.x | Motor de estilos utilitarios y variables temáticas en CSS (`@theme inline`). |
| **TypeScript** | 5.7.x | Tipado estático estricto y modelos de datos de dominio. |
| **Lucide React** | 1.16.x | Conjunto de iconos vectoriales SVG. |
| **@vercel/analytics** | 1.6.x | Medición de tráfico y analíticas en producción. |

---

## 3. Estructura de Directorios

```text
Creato/
├── app/
│   ├── globals.css              # Variables de tema, reglas base, animaciones y parches accesibles (<dialog>)
│   ├── layout.tsx               # Root Layout: fuentes (Poppins, Inter), meta tags, viewport y Analytics
│   └── page.tsx                 # Página principal que orquesta secciones y el widget flotante
├── components/
│   ├── landing/
│   │   ├── hero.tsx             # Portada a pantalla completa con navegación superior autohiding
│   │   ├── pillars.tsx          # Sección "Áreas": acordeón elástico (desktop) y chips + swipe card (mobile)
│   │   ├── pillar-card.tsx      # Tarjeta de pilar y modal nativo (<dialog>) con encabezado y footer fijos
│   │   ├── one-team.tsx         # Sección "Un solo equipo" y carrusel de especialistas
│   │   ├── services.tsx         # Sección "Casos de éxito": marquee interactivo (desktop) y snap-scroll (mobile)
│   │   ├── process.tsx          # Sección "Metodología" en 4 etapas y enlace de transición a contacto
│   │   ├── budget-cta.tsx       # Sección "Trabajemos juntos" (comparativa) y footer corporativo (#contacto)
│   │   ├── contact-links.tsx    # Botones reutilizables de WhatsApp, Calendly y correo electrónico
│   │   ├── help-panel.tsx       # Asistente de frases para conectar necesidades con áreas
│   │   ├── site-footer.tsx      # Subcomponente auxiliar de pie de página
│   │   ├── section-carousel.tsx # Contenedor de scroll y snapping de secciones
│   │   ├── section-dots.tsx     # Indicador de navegación lateral por puntos
│   │   └── whatsapp-float.tsx   # Widget flotante no invasivo dual (WhatsApp + Calendly) con scroll-awareness
│   └── ui/
│       └── button.tsx           # Componente base de botón estilizado con CVA
├── data/                        # Documentación complementaria y briefs de contenido
├── lib/
│   ├── content.ts               # Fuente única de verdad: textos, pilares, casos de éxito y datos de contacto
│   └── utils.ts                 # Utilidad `cn` (clsx + tailwind-merge)
└── public/
    ├── images/                  # Imágenes optimizadas de pilares, equipo, servicios y casos de estudio
    └── icons                    # Favicons y logos en formatos vectoriales y rasterizados
```

---

## 4. Estructura y Flujo de la Landing Page (`app/page.tsx`)

La página se organiza en una sola ruta vertical dividida en secciones lógicas mediante `SectionCarousel` y `snap-section`:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Hero (#inicio)                                                      │
│    - Navbar autohiding con enlaces ancla hacia secciones clave         │
│    - Tipografía identificatoria "creato." con acento naranja           │
│    - Título: "Muchas soluciones, un solo contacto."                    │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Áreas (#pilares)                                                    │
│    - Desktop: Acordeón horizontal elástico con hover / selección       │
│    - Mobile: Chips horizontales auto-desplazables + tarjeta swipeable  │
│    - Modal (<dialog>): Encabezado fijo, scroll de texto y footer CTA   │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Un solo equipo (#equipo)                                            │
│    - Propuesta de valor centralizada vs. contratar proveedores sueltos │
│    - Subsección "Muchos profesionales": Carrusel paginado de perfiles  │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Casos de éxito (#casos)                                             │
│    - Desktop: Marquee continuo con aceleración/reversa por bordes      │
│    - Mobile: Carrusel táctil nativo con snap, peek y contador          │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Metodología (#proceso)                                              │
│    - 4 etapas secuenciales claras (visión, equipo, presupuesto, obra)  │
│    - Transición limpia hacia el área de contacto                       │
├────────────────────────────────────────────────────────────────────────┤
│ 6. Presupuesto & Contacto (#presupuesto / #contacto)                   │
│    - Comparativa: "Camino tradicional" vs. "Experiencia creato"       │
│    - Hub de contacto corporativo en columnas (estilo Autocity)         │
│    - Teléfono/WhatsApp, horarios de atención y cobertura geográfica    │
│    - Subfooter de copyright y legales                                  │
├────────────────────────────────────────────────────────────────────────┤
│ * Widget Flotante Global (WhatsAppFloat)                               │
│    - Desktop: Dual pill elegante (WhatsApp + Agenda)                   │
│    - Mobile: Mini-pill ultra compacto (~135px) con atenuación y hide   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Descripción Detallada de Componentes y Mejoras Implementadas

### 5.1. Encabezado y Navegación (`components/landing/hero.tsx`)
- **Fondo inmersivo:** Utiliza `next/image` con `priority` y capas de gradientes oscuros en `--color-navy`.
- **Barra de navegación dinámica:** Se oculta automáticamente cuando el usuario comienza a scrollear (`window.scrollY < 40`).
- **Anclajes rápidos:** Enlaces a `#pilares`, `#casos`, `#proceso`, `#equipo` y `#contacto`.

### 5.2. Pilares de Servicio (`pillars.tsx` y `pillar-card.tsx`)
- **Desktop (>= lg):** Acordeón horizontal elástico. Al posicionar el cursor sobre una tarjeta, se expande a `flex: 4` mientras las otras se contraen armónicamente.
- **Mobile (< lg) — Opción A:**
  - **Chips horizontales:** Barra de píldoras (`01 Arquitectura`, `02 Eventos`, etc.) con indicador de scroll derecho (`ChevronRight` y gradiente de desvanecimiento).
  - **Sincronización suave:** El chip activo se centra automáticamente usando `container.scrollTo` (evitando `scrollIntoView` que afectaba el viewport de la página).
  - **Rotación automática controlada:** Avanza cada 4.5 segundos únicamente cuando la sección está visible en pantalla (`IntersectionObserver`), pausándose de inmediato ante toques táctiles o interacción del usuario.
- **Modal de Detalle (`PillarModal`):**
  - **Estructura fija:** Encabezado con miniatura compacta (para no tapar la pantalla en móviles), cuerpo scrollable exclusivamente para la descripción y lista de servicios, y pie de página fijo con botones directos de WhatsApp y Calendly.
  - **Aislamiento DOM:** Renderizado condicional en React (`{open && <PillarModal />}`) sumado a regla CSS `dialog:not([open]) { display: none !important; }`, garantizando que modales cerrados no interfieran en el flujo del documento.

### 5.3. Un solo equipo (`components/landing/one-team.tsx`)
- **Escala visual proporcionada:** Se normalizó la jerarquía tipográfica (`text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem]`) y se compactaron márgenes e imagen (`max-h-[30dvh]`).
- **Subsección "Muchos profesionales":** Actúa como complemento directo con carrusel paginado de especialistas, permitiendo visualizar los 8 roles sin generar saltos de escala ni desbordar la pantalla.

### 5.4. Casos de Éxito (`components/landing/services.tsx`)
- **Desktop (>= lg):**
  - **Marquee continuo:** Animación mediante `requestAnimationFrame` con interpolación suave de velocidad (*lerp*).
  - **Controles direccionales por proximidad de bordes:** El tercio derecho acelera hacia adelante, el tercio izquierdo invierte la marcha para retroceder, y el centro pausa la marcha para permitir leer.
  - **Hover Intent (130 ms):** Evita aperturas o expansiones involuntarias al scrollear rápidamente por encima.
  - **Scroll sin bloqueos:** Se eliminó la captura del wheel para permitir la continuidad fluida del scroll vertical de la página.
- **Mobile (< lg) — MobileServices:**
  - Implementación nativa basada en `snap-x snap-mandatory` con CSS puro y aceleración por GPU.
  - Efecto *peek* de la siguiente tarjeta para invitar al deslizamiento táctil intuitivo.
  - Indicadores visuales de posición (puntos de progreso y contador `01 / 06`).
  - El motor JS del marquee se apaga en pantallas móviles (`< 1024px`) para optimizar el consumo de batería y CPU.

### 5.5. Metodología de Trabajo (`components/landing/process.tsx`)
- Se conservaron los **4 pasos estratégicos principales** de trabajo unificado.
- Se eliminaron los botones repetitivos de contacto al pie, reemplazándolos por un enlace de transición elegante (*"¿Arrancamos con el paso 1? → Hablemos de tu caso"*) que guía de manera natural hacia `#contacto`.

### 5.6. Presupuesto y Hub de Contacto (`components/landing/budget-cta.tsx`)
- **Comparativa (`#presupuesto`):** Sistema de pestañas en móvil para contrastar "El camino tradicional" vs. "La experiencia creato"; visualización en 2 columnas en desktop.
- **Zona de Contacto (`#contacto`):**
  - Se eliminó la lista intermedia redundante de 3 pasos ("¿Cómo seguimos?").
  - Se diseñó un footer corporativo integral sin tarjetas pesadas (inspirado en la referencia Autocity), manteniendo el fondo oscuro de identidad (`bg-navy` / `#171717`):
    - **Columna 1:** Logotipo `creato.` y accesos vectoriales a redes (Instagram, LinkedIn, WhatsApp, Email).
    - **Columna 2 (Áreas):** Enlaces directos a los 5 pilares de servicio.
    - **Columna 3 (Nosotros):** Accesos a Casos de éxito, Metodología, Equipo y Presupuesto.
    - **Columna 4 (Contacto):** Vías rápidas de comunicación (WhatsApp directo, Calendly, Email).
    - **Columna 5 (Horarios y Cobertura):** Teléfono destacado, horarios de oficina en Córdoba Capital (Lunes a Viernes 9:00 a 18:00 hs), atención presencial en región centro y operatoria remota para todo el país.
    - **Subfooter:** Derechos reservados, términos, políticas de privacidad y lema de marca (*"Muchas soluciones, un solo contacto."*).

### 5.7. Widget Flotante No Invasivo (`components/landing/whatsapp-float.tsx`)
- **Desktop:** Píldora flotante con efecto blur y botones completos para WhatsApp y Agendar llamada.
- **Mobile:**
  - Mini-pill ultra compacto de apenas **~135px de ancho** en la esquina inferior derecha (`bottom-4 right-4`).
  - Acceso directo en **1 solo tap** tanto a WhatsApp como a Calendly.
  - **Scroll-Awareness:** Al desplazarse hacia abajo (lectura activa), el widget se atenúa al 30% de opacidad y se desplaza ligeramente para despejar el texto. Al detenerse o subir, recupera su nitidez total.
  - **Auto-Hide inteligente:** Al entrar en la sección `#contacto`, el widget desaparece completamente mediante `IntersectionObserver` para no duplicar los canales que ya están en pantalla.

---

## 6. Fuente de Datos Centralizada (`lib/content.ts`)

Todo el contenido estático, enlaces y textos se encuentran desacoplados en `lib/content.ts`:

- **Canales de contacto:** `WHATSAPP_URL`, `SCHEDULE_URL`, `CONTACT_EMAIL`.
- **Estructura de negocio:**
  - `PILLARS`: Datos tipados (`Pillar`) con los 5 ejes, imágenes, descripciones y servicios detallados.
  - `CASES`: Proyectos reales documentados con áreas vinculadas, capturas y galerías fotográficas.
  - `STEPS`: Los 4 pasos de la metodología de trabajo.
  - `ON_YOUR_OWN` y `WITH_US`: Puntos de dolor y beneficios para la sección comparativa.

---

## 7. Identidad Visual y Paleta de Colores (`globals.css`)

El proyecto utiliza variables semánticas en CSS integradas en Tailwind v4:

| Variable | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `--color-navy` | `#171717` | Fondo principal oscuro (`on-dark`), encabezados y pie de página corporativo. |
| `--color-graphite` | `#242424` | Fondo de la sección de equipo y contenedores intermedios. |
| `--color-mist` | `#f4f2ee` | Fondo claro cálido para la sección de casos de éxito. |
| `--color-orange` | `#e96d45` | Color de acento primario de la marca, puntos focales y botones de acción. |
| `--background` | `#faf9f6` | Tono blanco cálido base de la aplicación. |

---

## 8. Guía de Mantenimiento

1. **Actualizar información de contacto o enlaces:** Modificar las constantes `WHATSAPP_URL`, `SCHEDULE_URL` o `CONTACT_EMAIL` en `lib/content.ts`.
2. **Agregar o editar servicios de un pilar:** Actualizar la entrada correspondiente en el arreglo `PILLARS` dentro de `lib/content.ts`.
3. **Incorporar un nuevo caso de éxito:** Añadir el objeto respectivo al arreglo `CASES` en `lib/content.ts` con sus imágenes en `public/images/`.

---

## 9. Actualizacion visual y de movimiento

- `components/landing/smooth-scroll.tsx` inicializa Lenis solo desde `1024px` y cuando el usuario no solicita movimiento reducido. Se integra con GSAP y `ScrollTrigger`; los modales de pilares lo pausan y reanudan mediante contexto.
- `lib/animation.ts` concentra duraciones, easing y stagger para las revelaciones GSAP de hero, pilares, equipo y proceso.
- `components/landing/scroll-progress.tsx` reemplaza los puntos laterales por una barra global de progreso sin dependencias extra.
- El hero suma navegacion flotante, capas de gradiente y revelacion tipografica. La escena conserva una imagen de fondo liviana en lugar de WebGL para proteger el rendimiento movil.
- El equipo se representa como una red de ocho especialidades alrededor del nodo central `creato.`. El proceso usa una linea de avance animada en desktop y permanece lineal y tactil en mobile.

### Datos y fuentes locales

`lib/content.ts` incorpora `HERO`, `TEAM_COPY`, `TEAM_ROLES`, `SOCIAL_LINKS` y `CONTACT_DETAILS`, junto al contenido de negocio existente. Inter y Poppins se sirven localmente con `@fontsource-variable/inter` y `@fontsource/poppins`, por lo que el build no depende de Google Fonts.

### Fallbacks

- Con `prefers-reduced-motion`, Lenis y las revelaciones GSAP no se activan; la composicion queda completamente estatica y navegable.
- En mobile se conserva el scroll nativo, los chips y swipe de pilares, el carrusel snap de casos y el widget flotante compacto.
