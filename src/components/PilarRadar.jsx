/**
 * Radar de los 5 pilares (una sola serie: el puntaje 5–25 de cada pilar).
 * SVG inline, sin librerías. Muestra la "forma" del perfil de un vistazo;
 * el detalle con color por banda va en las barras.
 */
export default function PilarRadar({ pilares }) {
  const N = pilares.length
  if (!N) return null

  // El lienzo es más ancho que alto para que entren las etiquetas laterales:
  // con un cuadrado de 340 el navegador recortaba "Conciencia" por la derecha
  // y "Continuidad" por la izquierda.
  const ancho = 440
  const alto = 340
  const cx = ancho / 2
  const cy = alto / 2
  const R = 106
  const maxScore = 25
  const rings = [5, 10, 15, 20, 25]

  const angle = (i) => (-90 + i * (360 / N)) * (Math.PI / 180)
  const point = (i, r) => [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))]
  const scoreR = (s) => (s / maxScore) * R
  const poly = (pts) => pts.map((p) => p.join(',')).join(' ')

  const ringPoly = (r) => poly(pilares.map((_, i) => point(i, r)))
  const dataPts = pilares.map((p, i) => point(i, scoreR(p.score)))

  return (
    <svg viewBox={`0 0 ${ancho} ${alto}`} className="w-full max-w-md mx-auto" role="img" aria-label="Radar de puntajes por pilar">
      {/* Grilla (rings) */}
      {rings.map((r) => (
        <polygon key={r} className="radar-grid" points={ringPoly(scoreR(r))} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
      ))}
      {/* Ejes */}
      {pilares.map((_, i) => {
        const [x, y] = point(i, R)
        return <line key={i} className="radar-grid" x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
      })}
      {/* Área de datos */}
      <polygon className="radar-area" points={poly(dataPts)} fill="rgba(200,146,42,0.22)" stroke="#C8922A" strokeWidth="2" strokeLinejoin="round" />
      {/* Vértices */}
      {dataPts.map(([x, y], i) => (
        <circle key={i} className="radar-dot" cx={x} cy={y} r="3.5" fill="#C8922A" />
      ))}
      {/* Etiquetas de pilar */}
      {pilares.map((p, i) => {
        const [x, y] = point(i, R + 20)
        const a = angle(i)
        const cos = Math.cos(a)
        const anchor = Math.abs(cos) < 0.3 ? 'middle' : cos > 0 ? 'start' : 'end'
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="11"
            fontFamily="Inter, sans-serif"
            className="radar-label"
            fill="rgba(255,255,255,0.6)"
          >
            {/* Primera palabra, sin la puntuación que arrastra: "Continuidad,
                Coaching y Seguimiento" queda en "Continuidad". */}
            {p.name.split(' ')[0].replace(/[,.;:]+$/, '')}
          </text>
        )
      })}
    </svg>
  )
}
