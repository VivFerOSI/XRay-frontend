/**
 * Imagen con "difuminado" hacia el navy (arriba y abajo), al estilo de las
 * cards de Servicios — para que la foto se integre al fondo en vez de verse
 * como una foto enmarcada. El tamaño/relación lo define className.
 */
export default function FadedImage({ src, alt, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {/* Tinte navy sutil para cohesión */}
      <div className="absolute inset-0 bg-navy-deep/10 pointer-events-none" />
      {/* Fundidos en los 4 lados hacia el fondo */}
      <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-navy-deep to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-navy-deep to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-navy-deep to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-navy-deep to-transparent pointer-events-none" />
    </div>
  )
}
