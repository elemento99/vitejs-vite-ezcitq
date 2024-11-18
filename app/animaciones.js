/**
 * Alterna la visibilidad de un contenedor en el DOM y actualiza el texto del botón asociado.
 *
 * @param {string} containerId - ID del contenedor cuyo estado de visibilidad se alternará.
 * @param {string} buttonId - ID del botón que alterna la visibilidad.
 * @param {string} showText - Texto del botón cuando el contenedor está oculto.
 * @param {string} hideText - Texto del botón cuando el contenedor está visible.
 */
export function toggleVisibility(
  containerId,
  buttonId,
  showText = 'Mostrar',
  hideText = 'Ocultar'
) {
  const container = document.getElementById(containerId);
  const button = document.getElementById(buttonId);

  if (container && button) {
    const isHidden = container.style.display === 'none';
    container.style.display = isHidden ? 'block' : 'none';
    button.textContent = isHidden ? hideText : showText;
  }
}
