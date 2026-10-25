# Análisis del sitio Milimakeupart

Documento de alcance para el sitio de **Milagros Arce**. El nombre de la página y del sitio es **Milimakeupart**.

## Datos confirmados

| Dato | Valor |
| --- | --- |
| Nombre del sitio | Milimakeupart |
| Profesional | Milagros Arce |
| Teléfono y WhatsApp | +54 9 3886 07-4857 |
| Email | jujuysotf@gmail.com |
| Dirección | General Paz 1060, San Miguel de Tucumán, Tucumán |
| Instagram | https://www.instagram.com/mili_makeupart/ |
| Reels | https://www.instagram.com/mili_makeupart/reels/ |
| Logo | `z-docs/material-exclusivo/logo/logo-v1.jpeg` |
| Fotos y videos | `z-docs/material-exclusivo` |
| Proyecto de ejemplo (turnos, Google, Vercel) | https://github.com/jujuysotf/yourplace-peluqueria |
| Este repositorio | `C:\Users\PC-MR\Documents\GitHub\mili-makeup-art` |

Facebook y TikTok se muestran desde el primer día con enlaces de ejemplo. Se reemplazan cuando la dueña pase los perfiles reales:

- Facebook de ejemplo: https://www.facebook.com/milimakeupart
- TikTok de ejemplo: https://www.tiktok.com/@mili_makeupart

No se publican precios. Si más adelante la dueña los quiere, se agregan en las tarjetas sin cambiar el resto del sitio.

Horario de atención de ejemplo, para armar la grilla de turnos: **09:00 a 22:00**. Un turno solo se ofrece si termina a las 22:00 o antes. Los días quedan como lunes a domingo hasta que se indique un día cerrado. Las duraciones por servicio también son de ejemplo y se afinan con ella.

Calendario, login de Google y despliegue de QA siguen el repositorio de ejemplo [yourplace-peluqueria](https://github.com/jujuysotf/yourplace-peluqueria), con el email `jujuysotf@gmail.com`. El detalle está en [03-reutilizacion-yourplace-y-vercel.md](./03-reutilizacion-yourplace-y-vercel.md).

## Tipo de sitio

Una sola página en React, con menú por anclas y la reserva en un cuadro. Incluye escuela, magazine y opiniones, además del catálogo, los trabajos y el contacto.

## Panorama de secciones y funciones

### 1. Barra y menú

Siempre visible. En escritorio muestra el horario 09:00 a 22:00, San Miguel de Tucumán, WhatsApp e Instagram.

Menú:

- Inicio
- Servicios
- Trabajos
- Escuela
- Magazine
- Acerca de
- Opiniones
- Contacto
- Botón **Reservar turno**

En el teléfono el menú se pliega. El botón de reserva sigue visible.

### 2. Inicio

Nombre **Milimakeupart**, firma Milagros Arce, y dos acciones: reservar turno y ver servicios. La imagen principal sale del material exclusivo (un look terminado, no el logo). El logo va en el encabezado.

### 3. Catálogo de servicios

Cada tarjeta muestra nombre, ocasión, duración de ejemplo, qué incluye y las dos modalidades: en el estudio o a domicilio. No muestra precio. El botón abre la reserva con ese servicio elegido.

Duraciones de ejemplo, para calcular los horarios:

| Servicio | Duración de ejemplo |
| --- | --- |
| Maquillaje social | 60 minutos |
| Maquillaje de novia | 120 minutos |
| Maquillaje artístico | 90 minutos |
| Prueba de maquillaje de novia | 90 minutos |
| Madrina, madre o invitada | 60 minutos |
| Quince años o egreso | 90 minutos |
| Sesión de fotos o producción | 75 minutos |
| Clase de automaquillaje | 120 minutos |
| Peinado junto al maquillaje | 45 minutos |

Con cierre a las 22:00, un servicio de 60 minutos puede empezar hasta las 21:00. Uno de 120 minutos, hasta las 20:00.

### 4. Trabajos realizados

Galería con las fotos de `z-docs/material-exclusivo`, agrupadas en trabajos de ejemplo. Títulos, categorías y textos se pueden cambiar. El listado completo, archivo por archivo, está en [05-trabajos-realizados.md](./05-trabajos-realizados.md).

Desde una pieza se puede pedir un turno del mismo tipo de servicio.

No entra en la galería la captura `Screenshot_20250820_110623_WhatsApp.jpg`: es un chat privado, no un trabajo.

### 5. Últimos trabajos en video

La fuente es el perfil de reels: https://www.instagram.com/mili_makeupart/reels/

En la página:

- Un acceso directo a esa grilla de reels.
- Los dos videos que ya están en el material exclusivo, para reproducirlos en el sitio: `C0292_1.mp4` y `MAH06358 (1).MP4`.

Esos dos archivos son el ejemplo local. Cuando se elijan reels puntuales, se reemplazan por sus enlaces. La carga automática de todo el feed sigue dependiendo de la API de Instagram y no hace falta para esta versión: la sección apunta al perfil real.

### 6. Acerca de

Texto de ejemplo, escrito para que Milagros lo ajuste. La versión editable está en [06-textos-de-ejemplo.md](./06-textos-de-ejemplo.md). La foto puede ser una de proceso del material exclusivo, donde se la ve trabajando.

### 7. Escuela y magazine

Entran en la primera versión, como secciones de la misma página.

- **Escuela:** cursos de ejemplo (automaquillaje, social, novias). Cada curso se puede reservar como turno largo.
- **Magazine:** notas cortas de ejemplo (cómo prepararse para el turno, prueba de novia, diferencia entre social y artístico).

Los textos están en [06-textos-de-ejemplo.md](./06-textos-de-ejemplo.md), marcados para corregirlos.

### 8. Opiniones

Reseñas de ejemplo, también en ese archivo de textos. Se presentan como contenido de muestra. Cuando haya opiniones reales, se reemplazan las de ejemplo.

### 9. Gestión de turnos

Cuadro de reserva, no una página aparte.

1. Elegir servicio. La duración de ejemplo define cuánto ocupa el turno.
2. Elegir día y horario libre entre las 09:00 y el último inicio que llegue a las 22:00.
3. Entrar con Google o seguir como invitada, y completar nombre y teléfono.
4. Confirmar. El evento se crea en el Google Calendar de `jujuysotf@gmail.com` y se ofrece abrir WhatsApp con el resumen.

La visitante ve el código, el servicio, el día y la hora. No hay pago online.

### 10. Contacto

Datos reales de la tabla de arriba y un formulario breve (nombre, teléfono, servicio, consulta). Enviar abre WhatsApp con el texto armado. No hay bandeja de correo en el servidor.

### 11. Ubicación

Mapa embebido de Google en **General Paz 1060, San Miguel de Tucumán**. El texto dice que también atiende a domicilio. No se ofrece modalidad en el salón del evento.

### 12. Redes

Instagram real en la barra, en videos y en el pie. Facebook y TikTok de ejemplo en el pie, con una marca interna de "ejemplo" en el contenido para no olvidar el reemplazo. En la página pública se ven como enlaces normales.

### 13. WhatsApp flotante

Botón fijo a +54 9 3886 07-4857, con un saludo a Milagros. El globo de ayuda se puede cerrar.

## Grupo 1. Servicios del sistema

### Calendario y turnos

- Grilla de 09:00 a 22:00.
- Cada servicio usa la duración de ejemplo de la tabla. Esas horas se reemplazan cuando la dueña las confirme.
- Consulta el Google Calendar `jujuysotf@gmail.com` y marca ocupado lo que ya tiene un evento.
- No ofrece un inicio si el turno pasaría de las 22:00 o si pisa otro evento.
- Crea el evento al confirmar y devuelve un código.
- Abre WhatsApp con el resumen.
- Guarda en el navegador una copia de la reserva de esa visitante.

En local y en QA se usan las mismas claves y la misma cuenta de servicio que [yourplace-peluqueria](https://github.com/jujuysotf/yourplace-peluqueria). No se crean credenciales nuevas para este ejemplo.

Qué no hace esta versión:

- No cobra online.
- No envía email automático.
- No tiene panel para cancelar desde la web. Mover o borrar el evento en Google Calendar libera el horario.
- La disponibilidad se lee al elegir el día. Dos reservas en el mismo segundo pueden pisarse. Con una sola agenda el riesgo es bajo.

### Autenticación

- Google (nombre, email y foto) o reserva como invitada.
- La sesión queda en el navegador, con una clave propia de Milimakeupart, separada de la peluquería.
- El cliente OAuth es el mismo `VITE_GOOGLE_CLIENT_ID` de yourplace, para local y QA.

Esto identifica a quien reserva. No es un acceso de administración. El calendario se conecta con la cuenta de servicio de yourplace.

### Contacto por WhatsApp

Tres entradas, todas a +54 9 3886 07-4857:

- Botón flotante.
- Formulario de contacto.
- Confirmación del turno, con servicio, fecha, hora, nombre, teléfono, nota y código.

No se usa la API de WhatsApp Business.

### Google Maps

Mapa embebido en General Paz 1060, San Miguel de Tucumán, Tucumán, con enlace a cómo llegar. No hace falta una clave de Maps de pago para un solo marcador.

### Redes y videos

- Instagram real y reels reales.
- Facebook y TikTok de ejemplo.
- Videos locales del material exclusivo más el enlace a la grilla de reels.

### Escuela, magazine y opiniones

Contenido de ejemplo en datos del sitio, separado de los componentes, para poder corregir textos sin rehacer la página.

### Despliegue

Mismo esquema que yourplace: Vite publica el sitio y las rutas de calendario son funciones. En QA se despliega con las variables ya usadas por yourplace y el calendario `jujuysotf@gmail.com`. Ver [03-reutilizacion-yourplace-y-vercel.md](./03-reutilizacion-yourplace-y-vercel.md).

```text
Visitante
  → recorre Milimakeupart
  → elige un servicio (con su duración de ejemplo)
  → ve horarios libres entre 09:00 y 22:00
  → entra con Google o como invitada
  → confirma en el calendario jujuysotf@gmail.com
  → se abre WhatsApp con el resumen
```

## Grupo 2. Servicios de la profesional

Todos estos se publican. No hay precios.

Modalidades, para cualquiera de ellos:

- En el lugar de trabajo: General Paz 1060, San Miguel de Tucumán.
- A domicilio.

### Eventos

| Servicio | Qué contrata la clienta | Duración de ejemplo |
| --- | --- | --- |
| Maquillaje social | Look para salida, cumpleaños, reunión o fiesta. Incluye piel, ojos, labios, pestañas y fijación. | 60 minutos |
| Quince años o egreso | Maquillaje de la festejada para una noche, con prueba opcional como turno aparte. | 90 minutos |
| Madrina, madre o invitada | Look del cortejo, más corto que el de la novia. | 60 minutos |

### Novias

| Servicio | Qué contrata la clienta | Duración de ejemplo |
| --- | --- | --- |
| Prueba de maquillaje de novia | Encuentro previo para definir piel, ojos y labios del día del casamiento. | 90 minutos |
| Maquillaje de novia | Maquillaje del día del casamiento, pensado para fotos y festejo. | 120 minutos |

### Producciones

| Servicio | Qué contrata la clienta | Duración de ejemplo |
| --- | --- | --- |
| Maquillaje artístico | Look creativo, de color, fantasía o caracterización. | 90 minutos |
| Sesión de fotos o producción | Maquillaje para book, campaña, clip o contenido. | 75 minutos |

### Formación y peinado

| Servicio | Qué contrata la clienta | Duración de ejemplo |
| --- | --- | --- |
| Clase de automaquillaje | Clase individual para maquillarse sola. También es la puerta de entrada a la sección Escuela. | 120 minutos |
| Peinado junto al maquillaje | Ondas, semirrecogido o planchado el mismo día, sumado a un maquillaje. | 45 minutos |

Cada tarjeta lleva: nombre, ocasión, duración de ejemplo, qué incluye, modalidad (estudio o domicilio) y botón de reserva. Sin precio.

## Qué no entra en esta versión

- Venta de productos, carrito y medios de pago.
- Newsletter.
- Panel de administración.
- Cobro con tarjeta o seña online.
- Atención en el salón del evento. Solo estudio y domicilio.
- La captura privada de WhatsApp que está en el material exclusivo.

Escuela, cursos, magazine y opiniones de ejemplo sí entran.

## Contenido para ajustar

- Trabajos: [05-trabajos-realizados.md](./05-trabajos-realizados.md)
- Biografía, opiniones, escuela y magazine: [06-textos-de-ejemplo.md](./06-textos-de-ejemplo.md)
- Lo que sigue abierto: [04-pendientes-para-validar.md](./04-pendientes-para-validar.md)
