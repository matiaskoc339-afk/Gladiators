# Verificación del rediseño visual

Entorno comprobado: Node 24.22.1, Python 3.12.14, Chromium 155 y Firefox ESR 153.6.0.

- `npm test`: **29 pruebas aprobadas**, sin fallos ni omisiones. Incluye 60 combates completos, todos los conjuros y habilidades, economía, entrenamiento, equipo, guardado y arranque con scripts clásicos.
- `npm run check:bundle`: **aprobado**. La versión distribuida corresponde a las fuentes.
- `tests/browser_smoke.py` con Chromium: **aprobado sin errores JavaScript**. Selección de mandoble/daga en la forja; selección de pergaminos en el expositor; compra y equipo; selección de una unidad del almacén; aprendizaje de magia; dos contratos; 10 jornadas; incremento de fuerza; mejora; tácticas; nueve pantallas a 1440/1024/390 píxeles; pausa; continuación tras recargar; duelo de 78 turnos; recompensa; exportación; importación y rechazo de una copia dañada.
- `tests/browser_file.py` con Firefox ESR: **aprobado con `index.html` abierto por `file://`**, sin servidor del juego. Compra, entrenamiento, avance de día, compra/equipo de daga, guardado tras recargar, pausa, combate de 91 turnos y recompensa. Una distribución incompleta mostró el aviso de arranque.
- `tests/browser_tournament.py` con Chromium: **aprobado**. Dos rondas, campeón, título, bonificación de 280 monedas y 10 de prestigio total. El nuevo resultado superpuesto permite continuar la siguiente ronda.
- Botón de pantalla completa: entrada y salida verificadas en Chromium.
- Revisión visual directa del menú, campamento, reclutamiento, ficha, forja y arena. Los personajes, instalaciones, equipo y HUD se renderizaron correctamente. El CSS se verificó sin advertencias de análisis.

Las capturas y pruebas usan perfiles aislados. La generación de arte se realiza localmente con Canvas y SVG; no hay recursos visuales remotos. Los fondos conservan una caché limitada y las animaciones se dibujan por separado.

El Chromium administrado del entorno bloquea `file://`; esa política se mantuvo intacta y la apertura directa se comprobó en Firefox. No se ha publicado el juego como sitio web ni se ha jugado una campaña completa hasta el Gran Campeonato.
