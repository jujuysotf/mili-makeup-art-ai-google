# Briefing: Diseño y desarrollo de sitio web en React para centro de maquillaje (Milagros Arce)

Actúa como un ingeniero front-end senior especializado en React, con experiencia en arquitectura de aplicaciones modernas, componentes reutilizables y despliegue en Vercel. Escribe todo en español.

Necesito que me ayudes a planificar y estructurar el desarrollo de una página web en **React** para una profesional de maquillaje llamada **Milagros Arce**. El nombre de la página puede ser **Maquillateconmili** o **Milimakeupart**; si me propones una alternativa que encaje mejor con la marca, puedes sugerirla.

**Qué debe incluir el sitio:**
- Vista principal (home)
- Catálogo de servicios de maquillaje ofrecidos
- Sección "Acerca de", con el perfil profesional de Milagros Arce
- Gestión de turnos
- Contacto directo por WhatsApp
- Sección de trabajos realizados
- Muestra de redes sociales
- Muestra de últimos trabajos, por ejemplo los videos más recientes de Instagram
- Ubicación del lugar de trabajo integrada con Google Maps

**Referencias visuales que me sirven de guía para el diseño** (analízalas para extraer criterios de estilo, jerarquía y navegación, sin copiarlas):
- https://www.bettinafrumboli.com/
- https://reginak.com/?srsltid=AYCX9vKBlLePpGujw7ljRiANo9uM9ITuwEQ6J5ujqRzZObvy1OnoRBgV
- https://acmaquillajes.com.ar/
- https://www.mila.com.ar/?srsltid=AYCX9vKAnIrlgu7NJrjIz4RaOVZuyY1gCdHJQm26wvYE-ODZpNRsOupk
- https://www.maybelline.com.ar/?gclsrc=aw.ds&gad_source=1&gad_campaignid=22285694562&gclid=Cj0KCQjwrvHWBhDKARIsABmp7h0AUHqJML27tgPLIK-W-82toeqfHlEK79vTwct_hbrxi5JTLCbbViYaAs5jEALw_wcB

**Base técnica existente:** tengo un proyecto en GitHub (también en mi PC local) llamado **your-place**, que ya implementa servicios similares: autenticación con Google, uso de calendario y contacto por WhatsApp. Revísalo y reutiliza esos patrones donde correspondan para la gestión de turnos y la autenticación. Del mismo modo, reutiliza la configuración de despliegue de **your-place** en **Vercel**, ya resuelta, para el despliegue del servidor de esta nueva página.

**Criterios de código y arquitectura:** el planteo debe seguir buenas prácticas de codificación y patrones de desarrollo front-end para React, con componentes modernos (componentes funcionales, hooks, separación clara entre presentación y lógica, componentes reutilizables y estructura de carpetas mantenible). No introduzcas abstracciones o patrones que el alcance no necesite.

**Lo que necesito que entregues primero, antes de programar:** un análisis completo de la página que muestre un panorama de todas sus secciones y funciones. Organízalo en dos grupos:
1. **Servicios del sistema:** calendario y turnos, autenticación, contacto por WhatsApp, integración con Google Maps, redes sociales, despliegue en Vercel, etc.
2. **Servicios de la profesional:** maquillaje social, maquillaje de novia, maquillaje artístico, y los demás que identifiques en el contexto, expresados como servicios que el cliente puede contratar.

Este análisis debe quedar claro y estructurado para que yo pueda validarlo antes de avanzar al desarrollo. No escribas todavía el código de la aplicación.