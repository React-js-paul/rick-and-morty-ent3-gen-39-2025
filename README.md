# Rick and Morty Explorer

Este proyecto es una aplicación web construida con React y Vite que permite explorar ubicaciones y personajes del universo de Rick and Morty usando la API pública.

## Características principales

- Búsqueda de ubicaciones por nombre.
- Visualización de información detallada de cada ubicación.
- Listado de residentes (personajes) con paginación.
- Loader animado mientras se cargan los datos.
- Componentes reutilizables y optimizados.
- Estilos modernos y responsivos con CSS.

## Tecnologías utilizadas

- React 19
- Vite
- Axios
- CSS puro

## Estructura del proyecto

```
├── public/
│   ├── img/
│   └── vite.png
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   ├── components/
│   │   ├── LocationInfo.jsx
│   │   ├── ResidentCard.jsx
│   │   ├── Pagination.jsx
│   │   └── styles/
│   ├── helpers/
│   │   └── getNumbers.js
│   └── hooks/
│       ├── getRandomNumber.js
│       └── useFetch.js
├── package.json
├── vite.config.js
└── README.md
```

## Instalación y uso

1. Clona el repositorio o descarga el código.
2. Instala las dependencias:
   ```
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```
4. Abre tu navegador en [http://localhost:5173](http://localhost:5173)

## Créditos

- API: [Rick and Morty API](https://rickandmortyapi.com/)
- Proyecto realizado por paul.z

---

¡Disfruta explorando el universo de Rick and Morty!
