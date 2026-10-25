# Reutilización de yourplace y de Vercel

El brief llama al proyecto **your-place**. El ejemplo se toma de este repositorio:

https://github.com/jujuysotf/yourplace-peluqueria

Este sitio está en:

`C:\Users\PC-MR\Documents\GitHub\mili-makeup-art`

De ese repo se reutilizan la forma de la página, los turnos, el login con Google y el despliegue. En local y en QA también se reutilizan **la misma cuenta y las mismas claves**, porque el calendario de prueba es `jujuysotf@gmail.com`.

Las claves no están en el repositorio ni se copian en este documento. En una copia local del repo viven fuera de git:

- `.env`
- `google-credentials.json`

Al programar Milimakeupart, el `.env` local y las variables de QA en Vercel usan esos mismos valores.

## Qué ya resuelve yourplace

Stack: React 19, Vite, Tailwind 4, Express en local, funciones de Vercel para la API, Google Identity Services en el navegador y Google Calendar con cuenta de servicio.

Flujo de un turno:

1. La visitante elige servicio, día y hora.
2. El navegador pide `GET /api/calendar/availability` con la fecha y la duración.
3. El servidor lee los eventos ocupados del calendario y devuelve cada hora como libre o bloqueada.
4. Si Google no responde, el navegador calcula los huecos con las reservas de ese dispositivo. La fuente real es el calendario.
5. La visitante entra con Google o sigue como invitada. El perfil se guarda en `localStorage`.
6. Al confirmar, `POST /api/calendar/book` crea el evento.
7. Se muestra el código y se puede abrir WhatsApp. También se puede bajar un `.ics`.

Rutas:

- `GET /api/health`
- `GET /api/calendar/status`
- `GET /api/calendar/availability`
- `POST /api/calendar/book`

Variables que se reutilizan tal cual en local y en QA:

| Variable | Para qué |
| --- | --- |
| `VITE_GOOGLE_CLIENT_ID` | Login de la visitante. El origen autorizado tiene que incluir `http://localhost:3000` y el dominio de QA. |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | JSON de la cuenta de servicio, en una línea. |
| `GOOGLE_CLIENT_EMAIL` y `GOOGLE_PRIVATE_KEY` | Alternativa al JSON, si el `.env` de yourplace las usa. |
| `google-credentials.json` | Misma cuenta de servicio, solo en la PC. |
| `ALLOW_INSECURE_TLS` | Solo si esta PC tiene un antivirus que intercepte HTTPS. No va a Vercel. |

`GEMINI_API_KEY` y `APP_URL` están en yourplace y no participan de turnos, login ni WhatsApp. No se traen.

El calendario de QA es `jujuysotf@gmail.com`, el mismo que yourplace ya tiene compartido con la cuenta de servicio. Horario de Milimakeupart: 09:00 a 22:00, con la duración de ejemplo de cada servicio. El cierre de la peluquería (20:00) no se copia.

WhatsApp no pasa por el servidor. El sitio arma `https://wa.me/5493886074857?text=...`.

## Qué se reutiliza

- Una vista, menú por anclas, reserva en cuatro pasos.
- Componentes separados de los datos.
- Disponibilidad y alta de eventos en Google Calendar.
- Build de Vite a `public/` más funciones en `api/`, y el `vercel.json` de yourplace.
- Login con Google o invitada.
- WhatsApp flotante, formulario y confirmación del turno.
- Las claves y el email de calendario de yourplace, para local y QA.

## Qué cambia el contenido

| En yourplace | En Milimakeupart |
| --- | --- |
| Your place, servicios de pelo | Milimakeupart, servicios de maquillaje |
| Cierre 20:00, domingo cerrado | 09:00 a 22:00, todos los días, hasta que se marque un día cerrado |
| Libertad y Lavalle | General Paz 1060, San Miguel de Tucumán |
| Sin mapa | Mapa embebido |
| Galería de peluquería | Trabajos de `z-docs/material-exclusivo` y reels de @mili_makeupart |
| Precios publicados | Sin precios |
| Clave `yourplace_client_user` | Clave propia, `milimakeupart_client_user` |

## Despliegue de QA

El proyecto de Vercel de Milimakeupart es uno nuevo. El esquema de build es el de yourplace. Las variables de QA son las mismas claves, y el calendario sigue siendo `jujuysotf@gmail.com`.

Cuando el sitio deje de ser una prueba, se puede pasar el calendario a una cuenta definitiva. Hasta ese momento no hace falta otro cliente OAuth ni otra cuenta de servicio.

## Carpetas previstas al programar

```text
src/
  components/
  data/           servicios, contacto, trabajos, textos
  utils/
  types.ts
server/
  calendarService.ts
  handlers/
api/              generada en el build
vercel.json
```

Sin enrutador, sin estado global y sin base de datos.
