# Umbrella - Asistente de Comunicación Empática

Umbrella es una aplicación web diseñada para ayudarte a gestionar por ti conversaciones con agresores con los cuales estás obligado/a a interactuar. Utilizando inteligencia artificial, Umbrella te guía a través de situaciones comunicativas complejas, ofreciendo sugerencias y estrategias personalizadas.

## Características Principales

- **Asistencia con IA:** Integración con modelos de lenguaje avanzados (vía OpenRouter) para analizar y sugerir respuestas en conversaciones con agresores.
- **Diseño Mobile-First:** Una interfaz intuitiva y moderna, optimizada para dispositivos móviles con una navegación fluida.
- **Sistema de Diseño Premium:** Estética cuidada con un tema oscuro (Dark Navy), gradientes sutiles y animaciones suaves para una experiencia de usuario agradable.
- **Gestión de Perfiles:** Personalización de la experiencia basada en tus necesidades y preferencias de comunicación.

## Tecnologías Utilizadas

Este proyecto está construido con un stack moderno y robusto:

- **Core:** [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/), [DaisyUI](https://daisyui.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Base de Datos:** [Prisma](https://www.prisma.io/) (PostgreSQL / SQLite)
- **IA:** [Vercel AI SDK](https://sdk.vercel.ai/), [OpenRouter](https://openrouter.ai/)
- **Estado Global:** [Zustand](https://github.com/pmndrs/zustand)
- **Iconos:** [Lucide React](https://lucide.dev/)

## Comenzando

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- Node.js (versión 18 o superior recomendada)
- Un gestor de paquetes (npm, yarn, pnpm o bun)

### Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/mundovacio/anti-umbrella.git
   cd anti-umbrella
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   # o si usas yarn
   yarn install
   # o si usas pnpm
   pnpm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto (puedes basarte en `.env.example`) y configura las variables necesarias, como la URL de la base de datos y las claves de API para OpenRouter.

4. **Prepara la base de datos:**

   Genera el cliente de Prisma y realiza las migraciones necesarias (si aplica).

   ```bash
   npx prisma generate
   # Si tienes migraciones pendientes
   # npx prisma migrate dev
   ```

5. **Ejecuta el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

6. **Abre la aplicación:**

   Visita [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run start`: Inicia el servidor de producción.
- `npm run lint`: Ejecuta el linter para encontrar problemas en el código.
- `npm run postinstall`: Genera el cliente de Prisma (se ejecuta automáticamente tras instalar dependencias).

## Estructura del Proyecto

- `src/app`: Contiene las rutas y páginas de la aplicación (Next.js App Router).
- `src/components`: Componentes de UI reutilizables y layouts.
- `src/features`: Módulos que agrupan lógica y componentes por funcionalidad (ej. `onboarding`).
- `src/styles`: Archivos de estilos globales y configuración de CSS.
- `prisma`: Esquema de la base de datos (`schema.prisma`) y archivos relacionados.

---

Desarrollado con el objetivo de no tener que tratar con agresores directamentes de modo que los usuarios puedan estar menos pendientes de las conversaciones desagradables a través de la tecnología.
