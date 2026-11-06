// Este archivo se carga antes del juego para que un fallo de arranque nunca deje la pantalla vacía.
(() => {
  const app = document.getElementById('app');
  function showFailure() {
    if (app.dataset.ready === 'true') return;
    const status = document.getElementById('boot-status');
    if (status) {
      status.setAttribute('role', 'alert');
      status.textContent = 'No se pudo iniciar el juego. Vuelve a descargar o extraer la carpeta completa y abre index.html. Deben estar presentes style.css y la carpeta js.';
    }
  }
  window.addEventListener('error', showFailure, true);
  window.addEventListener('unhandledrejection', showFailure);
  window.addEventListener('load', () => {
    if (app.dataset.ready !== 'true') showFailure();
  }, {once: true});
})();
