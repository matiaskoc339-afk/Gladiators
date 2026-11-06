# Casa de Ceniza

Un juego de gestión de gladiadores en español. El jugador dirige una casa: adquiere contratos, descubre talentos, entrena atributos, compra equipo y observa cómo combaten sus gladiadores con su propia IA.

HTML, CSS y módulos JavaScript nativos. Gráficos originales dibujados con Canvas 2D, sonido sintetizado con Web Audio y partidas en LocalStorage. Sin frameworks, CDN, cuentas, API ni dependencias de producción.

## Ejecutar

Necesitas un navegador moderno y Python 3 para servir los archivos estáticos:

```bash
# Desde la carpeta del proyecto
python3 -m http.server 8000
```

Abre `http://localhost:8000` en tu navegador. Con Node instalado también puedes usar `npm start`, que ejecuta el mismo servidor. **No hace falta ejecutar `npm install`.**

El servidor solo entrega archivos; toda la lógica y el guardado se ejecutan en el navegador. No abras `index.html` mediante `file://`, porque los módulos necesitan un origen HTTP. Una vez servidos los archivos, el juego no solicita ningún recurso externo.

## Empezar a jugar

1. Pulsa **Nueva partida**: recibes 1.500 monedas, tres plazas y ocho instalaciones de nivel 1.
2. Visita el **Mercado de Condenados**. Compara historias, rasgos, atributos, talento y precio antes de adquirir un contrato.
3. En **Entrenamiento**, selecciona a un gladiador y asígnale una instalación. Pulsa **Avanzar día** para acumular XP. Puedes cambiarlo de puesto o asignarlo al descanso.
4. Compra en **Tiendas**. Desde **Inventario**, equipa las unidades adquiridas o consume pergaminos para aprender hechizos. Los requisitos se cumplen con atributos, no con el nivel general.
5. Abre **Gladiadores** para ajustar seis preferencias tácticas y preparar hasta cuatro hechizos conocidos.
6. Inscribe al representante en **Arena**. Observa las decisiones, pausa, cambia la velocidad o consulta el razonamiento táctico.
7. Cobra los resultados, descansa y prepara la siguiente competición. El nivel y el prestigio abren circuitos superiores.

Los días son internos: no hay esperas de tiempo real. Los combates son estilizados y no implican muerte permanente.

## Sistemas incluidos

- Generación de personajes adultos con 17 antecedentes, 14 rasgos y apariencia consistente entre fichas, base y arena.
- Ocho atributos y barras de experiencia independientes. El potencial oculto, talento, personalidad, estado físico y nivel de la instalación afectan al aprendizaje.
- Ocho instalaciones con cinco niveles, capacidades reales y figuras animadas. Cinco niveles de alojamiento, hasta 16 gladiadores.
- Mercado renovado cada tres días; feria con descuento cada cinco; evolución de un rival cada siete.
- 20 armas diferenciadas por daño, alcance, velocidad, coste y requisitos; 20 piezas de protección y dos piezas adicionales.
- 12 pergaminos con daño, curación, escudo, debilitamiento, silencio, evasión, control de movimiento y recuperación de energía.
- 13 habilidades distintivas con condiciones, consumo, enfriamientos y dominio creciente.
- Inventario de unidades únicas, siete ranuras, venta al 45 % y exclusión entre armas a dos manos y escudos.
- Combate por turnos con distancia, salud, energía, maná, efectos temporales, guardia, contraataques y movimiento.
- IA de utilidad compartida por ambos bandos. Usa recursos, alcance, equipo, atributos, pasado, personalidad, preferencias, capacidad táctica y memoria observable del rival. El razonamiento muestra los factores que realmente puntuaron la acción.
- Duelos y cuatro torneos: regional, mayor, de campeones y gran campeonato. Hay tres campeones persistentes con estilos propios, rutas de varias rondas, premios y títulos.
- Recuperación entre jornadas y rondas, cuidados pagados, gastos sin deuda y apoyo de un patrocinador cuando queda poco oro.
- Historial de combates y eventos, resultados, prestigio, progresión general sin incrementos automáticos de atributos.
- Guardado automático después de cada acción y turno, continuación de combates, copia previa, importación validada y exportación JSON.
- Controles de pausa, velocidades ×1/×2/×4, sonido opcional y adaptación a pantallas pequeñas.

## Guardado

La clave principal es `casa-ceniza-v1`; `casa-ceniza-v1-backup` conserva la versión válida anterior. Se valida la estructura antes de guardar o cargar. Un guardado dañado intenta recuperar la copia previa y muestra un aviso. Si el almacenamiento está bloqueado o lleno, el juego avisa y permite exportar.

La partida pertenece al origen del navegador: cambiar de puerto, navegador o perfil cambia el espacio de LocalStorage. Usa **Opciones → Exportar JSON** para trasladarla. **Nueva partida** e **Importar** piden confirmación antes de reemplazar progreso existente.

Las recompensas se liquidan una sola vez y el estado de un combate se guarda entre turnos. Una pestaña que pierde visibilidad pausa el combate. Evita abrir la misma partida en varias pestañas a la vez: no hay sincronización entre pestañas.

## Pruebas

Las pruebas de lógica no necesitan paquetes. Se verificaron con Node 24:

```bash
npm test
```

La suite contiene 27 pruebas y simula 60 combates completos. Cubre nueva partida; compras individuales y múltiples; falta de oro y capacidad; entrenamiento; mejoras; todas las habilidades y conjuros; requisitos; exclusividad de equipo; magia; IA distinta por personalidad; memoria; legalidad de acciones; días; recuperación; finalización; recompensas idempotentes; torneo completo; guardado, carga y daños en el almacenamiento.

La prueba opcional de navegador requiere Python con Playwright y Chromium. Con el servidor ya iniciado:

```bash
python3 -m pip install playwright
python3 -m playwright install chromium
python3 tests/browser_smoke.py
```

Para usar un Chromium del sistema:

```bash
CHROMIUM_PATH=/usr/bin/chromium python3 tests/browser_smoke.py --screenshots /tmp/ceniza-capturas
```

Comprueba compras de dos personajes, entrenamiento con incremento de atributo, mejora, equipo, aprendizaje de magia, preferencias, navegación a 1440/1024/390 px, pausa, reanudación tras recargar, recompensa, exportación, importación y rechazo de una copia dañada. Cada ejecución usa un contexto de navegador aislado.

La prueba adicional `CHROMIUM_PATH=/usr/bin/chromium python3 tests/browser_tournament.py` importa una plantilla con atributos altos para verificar rápidamente las dos rondas regionales, el campeón, el título y la bonificación mediante la interfaz real. Esa plantilla se genera exclusivamente dentro de la prueba; no forma parte de las partidas nuevas.

## Organización

```text
index.html, style.css       Interfaz y presentación
js/main.js                 Navegación, eventos, reloj visual y coordinación
js/gameState.js             Estado de partida y reglas de mutación
js/saveSystem.js            Validación, guardado, carga y copia previa
js/gladiators/              Generación y progresión
js/base/                    Instalaciones, calendario, recuperación y eventos
js/economy/                 Mercado, compras, unidades y equipo
js/combat/                  Fórmulas, acciones legales, IA y motor por turnos
js/competitions/            Rivales, duelos, rondas, premios y títulos
js/ui/                     Pantallas, componentes, personajes, escenarios y sonido
data/                      Catálogos, antecedentes, rasgos y parámetros
tests/                     Pruebas de lógica y flujo de navegador
```

## Equilibrio y alcance de esta versión

Las fórmulas están en `data/rules.js` y `js/combat/combatBalance.js`. La precisión tiene límites de 32 % y 94 %; el peso aumenta el consumo; la guardia reduce daño; la magia consume maná y respeta alcance y recargas. Tras 180 turnos, los jueces comparan la proporción de salud; diferencias inferiores al 4 % dan empate.

El potencial limita el desarrollo sin establecer clases rígidas. Un ladrón puede entrenar fuerza y utilizar un mandoble; la IA recalcula su utilidad con el arma actual.

Los torneos representan la ruta del gladiador seleccionado, con rivales sorteados y un campeón final. No simulan todas las ramas de un cuadro ajeno. La evolución del mundo es por eventos de jornada, no una simulación económica completa de las otras casas. Los gráficos y animaciones son vectoriales sencillos; la prioridad de esta versión es completar el ciclo jugable y mantener los sistemas ampliables.

No hay compilación ni backend. Para publicar el juego basta servir estáticamente el contenido de esta carpeta; se necesita aprobación separada para cualquier publicación externa.
