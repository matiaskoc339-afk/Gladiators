# Verificación de la versión entregada

Entorno comprobado: Node 24.22.1, Python 3.12.14 y Chromium 155.0.8059.79.

- `npm test`: **27 pruebas aprobadas**, 0 fallos, 0 omitidas. Incluye 60 combates completos, todas las habilidades y los doce conjuros. El runner informa las 27 pruebas individuales.
- `CHROMIUM_PATH=/usr/bin/chromium python3 tests/browser_smoke.py`: **aprobado**, sin errores JavaScript. Partida nueva; dos contratos; 10 jornadas; aumento de fuerza; mejora de instalación; compra y equipo de daga; compra y aprendizaje de Proyectil Arcano; preferencias tácticas; nueve pantallas a 1440, 1024 y 390 píxeles sin desbordamiento horizontal; pausa; continuación tras recarga; duelo completo y recompensa; exportación; importación; copia dañada rechazada sin sustituir la partida válida.
- Torneo regional en Chromium: **dos rondas ganadas**, campeón final, título persistido, 280 monedas de bonificación y 10 de prestigio total. Sin errores JavaScript. El caso es reproducible en `tests/browser_tournament.py`.
- Los archivos se sirven con `python3 -m http.server 8000 --bind 0.0.0.0`. No se instalaron dependencias de producción.

Las pruebas de navegador usan contextos aislados y no contienen partidas de demostración permanentes dentro del juego. Los módulos de lógica verifican los casos de error y los requisitos que bloquean torneos superiores. No se jugó una campaña completa hasta el Gran Campeonato.

No se ha publicado el juego como sitio web ni comprobado una restauración en una tarea nueva. El sistema de archivos contiene todas las fuentes; las instrucciones de arranque se guardaron en el borrador de configuración del entorno.
