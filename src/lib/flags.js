/**
 * Interruptores de publicación del sitio.
 *
 * Permiten desplegar algo terminado sin que se vea todavía, y publicarlo
 * después cambiando una variable y volviendo a compilar. Son del lado del
 * frontend: lo que esconden es la *oferta* (el bloque, el enlace). Que el
 * cuestionario en sí no se pueda abrir lo decide el backend con la columna
 * `activo`, que se cambia desde el panel.
 *
 * Vite reemplaza `import.meta.env.*` en tiempo de compilación, así que el
 * bloque escondido ni siquiera queda en el bundle.
 */

/**
 * Las dos autoevaluaciones de gestión del desempeño en la página de Servicios.
 *
 * Visible salvo que se pida esconderla: si la variable falta en un build, es
 * preferible que el bloque aparezca a que alguien despliegue y no entienda por
 * qué no está.
 */
export const GESTION_DESEMPENO_VISIBLE =
  import.meta.env.VITE_GESTION_DESEMPENO !== 'false'

/**
 * Las pantallas del panel de administración.
 *
 * Al revés que el bloque anterior: **escondido salvo que se pida mostrarlo**.
 * El backend ya responde 404 en `/admin` cuando `ADMIN_PANEL_ENABLED` no está
 * en `true`, pero sin esto la pantalla de login igual se dibuja y deja ver que
 * el panel existe. Acá el error caro es publicarlo de más, no de menos.
 */
export const ADMIN_VISIBLE = import.meta.env.VITE_ADMIN === 'true'
