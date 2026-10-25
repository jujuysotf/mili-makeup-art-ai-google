# Criterios de diseño

El logo de Milagros manda sobre las referencias. Las otras páginas sirven para jerarquía y navegación, no para copiarles la paleta.

Sitios de referencia: [Bettina Frúmboli](https://www.bettinafrumboli.com/), [Regina K](https://reginak.com/), [AC Maquillajes de Andrea Cuneo](https://acmaquillajes.com.ar/) y [Mila](https://www.mila.com.ar/). Maybelline queda como referencia de marca de campaña; no se describe una pieza puntual de su home.

## Logo y paleta

Archivo: `z-docs/material-exclusivo/logo/logo-v1.jpeg`.

Se usa ese logo, sin redibujarlo. Ya tiene la marca **Mili** en manuscrita negra, **makeup** en rosa y **art** en negro, más el monograma. Encaja con el nombre del sitio, Milimakeupart.

Paleta de trabajo, sacada de ese archivo:

| Uso | Color | Valor |
| --- | --- | --- |
| Tinta, textos, botones principales | Negro del logo | `#1A1A1A` |
| Acento, la palabra makeup, enlaces activos | Rosa del logo | `#F4A7C1` |
| Fondo de página | Blanco del logo | `#FFFFFF` |
| Fondos de sección y tarjetas | Rosa muy lavado | `#FBF4F6` |
| Texto secundario | Gris cálido | `#5C5558` |
| Líneas | Rosa grisáceo | `#E7D5DB` |

El rosa `#F4A7C1` es la lectura de trabajo del rosa de "makeup". Si al implementar un píxel del archivo cae un poco más claro o más oscuro, se ajusta el valor y se mantiene el resto.

No conviene cambiar el logo por otro. Una versión solo tipográfica, sin el monograma, puede ir en el pie o en tamaños chicos. El isotipo completo va en el encabezado.

Tipografía de la página, para acercarse al logo sin depender de la letra dibujada:

- Nombre "Mili": una manuscrita (por ejemplo Great Vibes o Allura).
- "makeup" y "art", títulos y botones: una sans geométrica en negrita (por ejemplo Montserrat o Outfit).
- Textos: la misma sans, en peso regular.

WhatsApp sigue en su verde `#25D366`, solo en ese botón.

## Qué aporta cada referencia

| Sitio | Qué se toma |
| --- | --- |
| Bettina Frúmboli | Hero fotográfico, escuela y servicios de evento separados de las notas. |
| Andrea Cuneo | Maquilladora que toma turnos: retrato, servicios por ocasión, WhatsApp, preguntas frecuentes. |
| Regina K | Fichas limpias y categorías. No se copia la tienda. |
| Mila | Bloque de videos y WhatsApp siempre a mano. No se copia el popup que pide el teléfono ni el carrito. |
| Maybelline | La foto manda sobre el texto. El catálogo se entiende por grupos. |

## Jerarquía

1. Logo Milimakeupart en el encabezado.
2. Una foto real del material exclusivo en el primer pantallazo, con reservar y ver servicios.
3. Servicios agrupados: eventos, novias, producciones, formación y peinado. Sin precio.
4. Trabajos y videos.
5. Escuela y magazine, más cortos que el catálogo.
6. Acerca de, con una foto de Milagros trabajando.
7. Opiniones de ejemplo.
8. Contacto, mapa y WhatsApp.

Menú:

Inicio · Servicios · Trabajos · Escuela · Magazine · Acerca de · Opiniones · Contacto · Reservar turno

## Estilo

- Fondo blanco y mucho aire, como el logo.
- Fotos grandes de los looks reales. Poco texto encima: nombre del trabajo y la categoría.
- Tarjetas de servicio iguales entre sí: ocasión, duración, qué incluye, estudio o domicilio, botón. Sin precio.
- Galería en grilla, con filtro por categoría.
- Botones negros con forma de píldora. El hover puede pasar al rosa del logo.
- Nada de carrito, precios tachados ni popup de teléfono antes de ver la página.

## Tono

Español de Argentina, de vos. El nombre de marca se escribe **Milimakeupart**. En los servicios se dice maquillaje.

- Botón principal: **Reservar turno**
- Botón secundario: **Ver servicios**
- Flotante: **Escribir por WhatsApp**

## Preguntas frecuentes

Van al cierre de Contacto, con las respuestas de ejemplo de [06-textos-de-ejemplo.md](./06-textos-de-ejemplo.md): turno previo, horario 09:00 a 22:00, estudio y domicilio, sin precios en la página, prueba de novia como turno aparte.

## Material que ya está

- Logo: `z-docs/material-exclusivo/logo/logo-v1.jpeg`
- Fotos y dos videos: `z-docs/material-exclusivo`
- Listado editable de trabajos: [05-trabajos-realizados.md](./05-trabajos-realizados.md)
- Reels: https://www.instagram.com/mili_makeupart/reels/
