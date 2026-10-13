import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'

const boton =
  'p-1.5 rounded text-white/35 hover:text-gold hover:bg-white/8 ' +
  'disabled:opacity-20 disabled:hover:text-white/35 disabled:hover:bg-transparent ' +
  'transition-colors duration-150'

/**
 * Subir / bajar / eliminar de un elemento de lista.
 * `onEliminar` en null oculta el botón de borrar (último elemento de su grupo).
 */
export default function ControlesOrden({
  indice,
  total,
  onSubir,
  onBajar,
  onEliminar,
  etiqueta = 'elemento',
}) {
  return (
    <div className="flex items-center gap-0.5 shrink-0">
      <button
        type="button"
        onClick={onSubir}
        disabled={indice === 0}
        className={boton}
        aria-label={`Subir ${etiqueta}`}
        title="Subir"
      >
        <ChevronUp size={15} />
      </button>
      <button
        type="button"
        onClick={onBajar}
        disabled={indice === total - 1}
        className={boton}
        aria-label={`Bajar ${etiqueta}`}
        title="Bajar"
      >
        <ChevronDown size={15} />
      </button>
      {onEliminar && (
        <button
          type="button"
          onClick={onEliminar}
          className={`${boton} hover:text-rose-400`}
          aria-label={`Eliminar ${etiqueta}`}
          title="Eliminar"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  )
}
