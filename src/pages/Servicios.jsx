import { motion } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'

import imgAutodiagnostico from '../assets/Dollarphotoclub_80013806 Autod emprendedor.jpg'
import imgGimnasioMente from '../assets/iStock-978387300.jpg'
import imgGimnasioEmocional from '../assets/iStock-180722619.jpg'
import imgOrquesta from '../assets/iStock-139960732.jpg'
import imgEquipos from '../assets/iStock-1013419622.jpg'
import imgArquitectura from '../assets/iStock-1396403593.jpg'
import imgArteHabitar from '../assets/iStock-979946330.jpg'

// Section label in navy — blends with the card fades
const SectionDivider = ({ label }) => (
  <div className="flex items-center gap-5 px-10 lg:px-16 py-6 bg-navy-deep">
    <div className="w-4 h-px bg-gold shrink-0" />
    <span className="font-body font-bold text-gold/80 tracking-[0.18em] text-sm uppercase">
      {label}
    </span>
  </div>
)

export default function Servicios() {
  return (
    <main className="bg-navy-deep">
      {/* Page header */}
      <div className="bg-navy-deep py-20 pt-36 text-center">
        <motion.h1
          className="font-display text-white text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Servicios
        </motion.h1>
        <motion.div
          className="w-12 h-px bg-gold mx-auto mt-6"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      </div>

      {/* ── PARA LÍDERES ── */}
      <SectionDivider label="Para líderes" />

      <ServiceCard
        title="Autodiagnóstico de Vitalidad y Propósito Emprendedor"
        description='La transición entre el segundo y el quinto año de vida de una empresa es el lapso de mayor vulnerabilidad y, a la vez, de mayor potencial. Este diagnóstico está diseñado para que el fundador se detenga a observar el ecosistema que ha construido. Más allá de las métricas financieras, evaluamos la alineación entre la visión personal, la salud del modelo de negocio y la capacidad de delegar.'
        image={imgAutodiagnostico}
        imageLeft={true}
        moreHref="/autoevaluacion"
        moreLabel="Hacer la autoevaluación →"
        index={0}
      />
      <ServiceCard
        title="Gimnasio de Liderazgo"
        description={[
          'Entrenamiento para emprendedores y líderes que quieren pensar mejor, ejecutar mejor y crecer con menos soledad.',
          'Hay momentos en los que liderar se siente más pesado de lo que imaginabas.',
          'Tenés muchas decisiones encima, demasiadas cosas abiertas al mismo tiempo y, aunque sigas avanzando, sentís que te falta orden, foco y alguien con quien pensar mejor.',
          'Gimnasio de Liderazgo nace para acompañarte en ese punto.',
          'Es un espacio de entrenamiento, comunidad y destrabe para emprendedores y líderes que quieren crecer con más claridad, más criterio y menos desgaste.',
        ]}
        image={imgGimnasioMente}
        imageLeft={false}
        moreHref="/gimnasio-liderazgo"
        autoHeight
        index={1}
      />
      <ServiceCard
        title="Gimnasio Emocional"
        description="El desarrollo emocional requiere práctica deliberada y medible, y no es un don innato reservado a unos pocos. Talleres semanales (presenciales y online) enfocados en el autoconocimiento, la comunicación no violenta y el manejo del estrés, coordinados por psicólogos, coaches y terapeutas. Con ejercicios específicos que integran la mente, la palabra y el cuerpo, se exploran prácticas de autoconciencia y regulación emocional."
        image={imgGimnasioEmocional}
        imageLeft={true}
        index={2}
      />
      <ServiceCard
        title="Liderazgo, la dinámica de la orquesta: Sincronía, Escucha y Visión Compartida"
        description="¿Alguna vez te viste como el Director de una orquesta? En este taller dialogarás, practicarás y discutirás sobre dirección (estrategia), armonía (valores) y afinación (ética del equipo) con músicos profesionales y coaches organizacionales. El liderazgo, al igual que la música, no es una imposición de volumen, sino una gestión precisa del tiempo, el silencio y la escucha."
        image={imgOrquesta}
        imageLeft={false}
        index={3}
      />

      {/* ── PARA EQUIPOS ── */}
      <SectionDivider label="Para equipos" />

      <div id="equipos" className="scroll-mt-28">
        <ServiceCard
          title="Potenciamos el Rendimiento Colectivo desde la Estrategia y la Vivencia"
          description='Aunque no siempre se ven, todos tenemos "palancas" y "barreras". A través de nuestros procesos de Team Development ofrecemos un verdadero Colisionador de Hadrones organizacional para movilizar las partículas fundamentales que llevan a un Equipo al siguiente nivel. Incluye fortalecimiento del equipo, reconocimiento del efecto contexto (presencial, híbrido, dispersión geográfica) y offsites de alto impacto: Arte colectivo, Haka, Aikido Training, Percusión orquestal.'
          image={imgEquipos}
          imageLeft={true}
          index={0}
        />
      </div>

      {/* ── PARA TODOS ── */}
      <SectionDivider label="Para todos" />

      <ServiceCard
        title="La Arquitectura del Momento: Productividad con Sentido"
        description="La mayoría de los programas de gestión del tiempo fallan porque tratan el día como una lista de tareas y al tiempo como un recurso más. Te invitamos a un taller donde integrar la práctica de otro paradigma: convertir el tiempo en un espacio de presencia total y propósito. Tres pilares: la serenidad del instante, la ética del bienestar y el estado de flujo."
        image={imgArquitectura}
        imageLeft={true}
        index={0}
      />
      <ServiceCard
        title="El Arte de Habitar el Tiempo"
        description='Una jornada vivencial diseñada para la generación Silver donde el arte y la filosofía se fusionan para transformar la perspectiva del porvenir. A través del estoicismo, el epicureísmo y el "Efecto Bruckner", resignificamos el "ahora" como un apasionante recomienzo. Percusión colectiva, creación plástica y espacios de deleite consciente.'
        image={imgArteHabitar}
        imageLeft={false}
        split
        index={1}
      />
    </main>
  )
}
