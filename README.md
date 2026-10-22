# Librería PACIFICO

## Estructura

```
libreria-ecommerce-proyectoESFRT/
├── .github/
│   └── workflows/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   ├── .env
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── pnpm-workspace.yaml
│
├── dist/
│
├── node_modules/
│
├── public/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── index.html
├── vite.config.js
└── README.md

```

- `assets/icons`: iconos propios de la interfaz.
- `assets/images`: imágenes de portadas, banners y recursos visuales.
- `components/common`: componentes reutilizables, como botones, tarjetas o inputs.
- `components/books`: componentes específicos del catálogo de libros.
- `data`: datos locales temporales, por ejemplo el catálogo mientras no haya API.
- `layouts`: estructuras compartidas de página, como el encabezado, pie y contenedor principal.
- `pages`: una carpeta por vista o ruta, como inicio, catálogo, detalle y carrito.
- `styles`: estilos globales, variables y utilidades CSS.
