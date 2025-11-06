[![Abrir sitio web][ea-badge]][ea-url]

# 🚀 Estructura del Proyecto

Dentro del proyecto Astro, verá las siguientes carpetas y archivos:

```
/
├── public/
    └── assets/
    └── fonts/
    └── robots.txt
├── src/
│   └── actions/
│   └── components/
│       └── cards/
│       └── email/
│       └── extras/
│       └── global/
│       └── pages/
│       └── sections/
│   └── data/
│   └── i18n/
│   └── img/
│       └── icons/
│   └── layouts/
│   └── pages/
│   └── services/
│   └── styles/
│   └── utils/
│   └── content.config.ts
└── astro.config.mjs
```

## Components

Dentro de `src/components` se encuentran todos los componentes ordenados por categoría o uso.

- `cards:` Hace referencia a todos los componentes como tal de las fichas/bloques/tarjetas que son utilizadas para mapear datos únicos en cada sección ó página, nombradas bajo la nomenclatura [Uso ó referencia en donde se usara]Card.[extension(astro, tsx)]. En algunas cosas se asigna una orientación y se define.
- `email:`  Hace referencia a los templates usados para el envío de un correo, dentro se encuentra el formato de correo para un usuario y el admin en caso de requerirse, en caso de usar diferentes formatos del cuerpo del correo se crea un folder bajo el nombre del uso ó referencia y se crean los archivos correspondientes.
- `extras:` Hace referencia a todos los componentes que son usados una vez en cualquier parte del proyecto ó son usados para casos especiales, en caso de que el componente sea reutilizable se reasignara a un folder correspondiente. Comunmente son componentes para un uso pequeño.
- `global:` Hace referencia a todos los componentes generales del sitio o que serán reutilizados más de una vez, comunmente pertenecen a un Layout.
- `pages:` Hace referencia a las páginas creadas dentro de `src/pages/` esto es de ayuda para mantener un solo archivo y poder hacerlo dinamico mediante la **i18n**, se debe mantener un nombre acorde al slug de la página ó alguna referencia. Nomenclatura: [Nombre de la Página]Page.astro, en caso de requerirse agrupar un uso especifico crear un folder con el nombre de la página y dentro agregar sus archivos/componentes correspondientes.
> [!IMPORTANT]
> Evitar nombrar el componente/archivo de la misma manera que el archivo ó slug que llevara dentro de `src/pages`
- `sections:` Hace referencia a los bloques ó secciones grandes de una página, comunmente se engloban varios mini componentes dentro para poder reutilizarse y hacer mas legible el codigo.

## Data

Dentro de `src/data` se encuentran las colecciones de contenido manejadas por Astro, dentro de cada colección va un folder por producto y dentro van los archivos **MDX**, el formato de creación es el siguiente:

```
├── src/
│   └── data/
│       └── coleccion/
│           └── producto/
│               └── en.mdx
│               └── es.mdx
```

- `coleccion` Hace referencia al nombre de la colección, ej. activites, packages, etc.
- `producto` Hace referencia al nombre del producto, *debe ser un folder no un archivo*.
- `.mdx` Los archivos mdx deben mantenerse bajo el nombre del prefijo de idioma para identificar a cual pertenece.

> [!NOTE]
> Todos los productos deben tener el idioma base **EN** como minimo.

Para el manejo y filtrado de esta data existen dos archivos **content.config.ts** y **contentCollection.ts**

- **content.config.ts:** Incluye toda la configuración y los esquemas de las colecciones, utiliza **Zod** para la validación de los datos. Ubicado en `src/content.config.ts`
- **contentCollection.ts:** Incluye todas las funciones para filtrar las colecciones y obtener los productos con base al idioma. Ubicado en `src/services/contentCollection.ts`

> [!NOTE]
> Al nombrar un producto el ordenamiento es basado de manera alfabetica, por ende se asigna un cero para casos como 1,2,3.

## I18n

Dentro de ``src/i18n` se encuentran archivos que sirven para la traducción completa de los elementos del sitio y funcionalidades.
- **index.ts:** contiene una constante que retornara el archivo de traducción dependiendo el prefijo pasado con base a la URL.
- **ui.ts:** contiene las constantes de lenguaje y traducciones ui generales. *Las traducciones UI solo debe ser creadas para elementos breves y muy generales como el caso del Header o Footer*.
- **utils.ts:** contiene las funciones utilizadas en el sitio web para su correcta traducción de los elementos UI, adicional del enrutado dinamico por medio de los parametros pasados mediante la URL.

## Icons

Dentro de `src/icons` se encuentra únicamente de momento recursos de iconos para el sitio.

- **allIcons.ts:** Incluye todos los iconos importados desde `src/icons` para utilizar en los componentes **.astro**

> [!NOTE]
> Las imagenes de todo el proyecto se encuentran alojadas dentro de `public`.

## Layouts

Dentro de `src/layouts` se encuentran todos los componentes base para la construcción de cada apartado, como lo sería el caso del home o la vista de detalle de cada categoría de nuestras colecciones. De esta manera mantenemos un mismo formato sin tener que replicar elementos que utilizamos con frecuencia.

## Services

Dentro de `src/services` se encuentran y deben ir todos los archivos que contenga la lógica del negocio, funciones que interactúen con alguna base de datos ó interaccion con alguna API externa, todo lo que se relacione con procesamiento de datos y comunicación con otros sistemas. Unica "excepción" el archivo `contentCollection.ts` que son las funciones propias para la manipulación de la data interna por parte de las colecciones de astro.

## Pages

Dentro de `src/pages` se encuentran nuestras rutas del sitio, es el único directorio reservado por **Astro**, este directorio no debe ser alterado porque sin el no tendríamos páginas ni rutas.

Dentro de este directorio el nombre que sea asignado al archivo será el nombre de la ruta, el **slug** de la web.

> [!NOTE]
> `src/pages` solo es utilizado para la creación de la ruta pero su contenido debe ser importado desde su componente correspondiente de `src/components/pages`. Esto con el fin de tener organizado y mantenible el código y facilitar la creación de nuevos lenguajes en un futuro.

## Scripts y Styles

Dentro de `src/scripts` y `src/styles` se encuentran los archivos globales para el sitio web.
Actualmente no existe el folder script, de ser necesario un archivo global asignarlo, sino solo usar el js necesario en el archivo/componente y asignarle el atributo **is:inline**

## Utils

Dentro de `src/utils` se encuentran y deben ir todos los archivos de funciones o modulos de utilidad que sean reutilizables en diferentes partes del proyecto, se centralizan aquí para facilitar su acceso y mantenimiento.

## Archivo de configuración

El archivo de configuración del proyecto esta ubicado en la raiz bajo el nombre de `astro.config.mjs`
Dentro de este archivo se define toda la configuración global que tendra el proyecto, integraciones, ajustes del renderizado, creación del sitemap y demas ajustes.

## 📅 Updated
> [!NOTE]
> Última actualización 24 de agosto 2025

## 🛠️ Stack

[![Astro][astro-badge]][astro-url]
[![MDX JS][mdx-badge]][mdx-url]
[![Typescript][typescript-badge]][typescript-url] 
[![Tailwind CSS][tailwind-badge]][tailwind-url] 
[![React JS][react-badge]][react-url]  

[sa-badge]: http://snorkeladventuring.com/assets/img/logo-snorkel.png
[sa-url]: https://snorkeladventuring.com/
[astro-url]: https://astro.build/
[astro-badge]: https://img.shields.io/badge/Astro-fff?style=for-the-badge&logo=astro&logoColor=bd303a&color=352563
[mdx-badge]: https://img.shields.io/badge/mdx-fff?style=for-the-badge&logo=mdx&logoColor=fff&color=black
[mdx-url]: https://mdxjs.com/
[typescript-badge]: https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&color=blue
[typescript-url]: https://www.typescriptlang.org/
[tailwind-badge]: https://img.shields.io/badge/Tailwind-ffffff?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8
[tailwind-url]: https://tailwindcss.com/
[react-url]: https://es.react.dev/
[react-badge]: https://img.shields.io/badge/react-007ACC?style=for-the-badge&logo=react&logoColor=white&color=58c4dc