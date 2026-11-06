# Verificación de la versión entregada

Entorno comprobado: Node 24.22.1, Python 3.12.14, Chromium 155.0.8059.79 y Firefox ESR 153.6.0.

- `npm test`: **29 pruebas aprobadas**, 0 fallos, 0 omitidas. Incluye 60 combates completos, todas las habilidades y los doce conjuros. Las regresiones comprueban que el acceso denegado a LocalStorage no impide abrir el juego y que `index.html` carga scripts clásicos locales, sin importaciones ni peticiones en tiempo de ejecución.
- `npm run check:bundle`: **aprobado**. El bundle incluido coincide con las fuentes y puede analizarse como un script clásico.
- `python3 tests/browser_file.py` en Firefox ESR: **aprobado con el archivo real por `file://`**, sin servidor del juego. Nueva partida, adquisición de contrato, entrenamiento, avance de día, compra y equipo de daga, guardado tras recargar, pausa, duelo completo de 46 turnos y recompensa. Una distribución incompleta sin `game.bundle.js` mostró el aviso de arranque esperado.
- `CHROMIUM_PATH=/usr/bin/chromium python3 tests/browser_smoke.py`: **aprobado sobre la versión con bundle**, sin errores JavaScript. Dos contratos, 10 jornadas, incremento de fuerza, mejora, equipo, aprendizaje de magia, tácticas, nueve pantallas a 1440/1024/390 px, pausa, continuación tras recarga, duelo de 18 turnos y recompensa, exportación, importación y rechazo de una copia dañada.
- Torneo regional en Chromium, verificación original: dos rondas ganadas, campeón final, título persistido, 280 monedas de bonificación y 10 de prestigio total. Reproducible en `tests/browser_tournament.py`.

El Chromium administrado del entorno prohíbe navegar a `file://`. La prueba de apertura directa se realizó con Firefox, sin modificar esas políticas ni relajar la seguridad del navegador. Las instalaciones de herramientas no son requisitos para jugar: `index.html`, `style.css` y los archivos de `js/` se distribuyen listos.

Las pruebas de navegador usan perfiles aislados. No se jugó una campaña completa hasta el Gran Campeonato ni se publicó el juego como sitio web.
