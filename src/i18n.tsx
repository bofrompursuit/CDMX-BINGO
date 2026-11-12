import { useSyncExternalStore } from 'react'

// ─── English / Spanish toggle ────────────────────────────────────────────────
// English strings are the keys; anything without an entry (e.g. custom squares) shows as-is.

export type Lang = 'en' | 'es'
const LANG_KEY = 'cdmx-lang'

const ES: Record<string, string> = {
  // Squares
  'Karol G': 'Karol G',
  'Creepy Doll': 'Muñeca tenebrosa',
  'Lucha libre mask': 'Máscara de lucha libre',
  'Tacos al pastor': 'Tacos al pastor',
  'Angel of Independence': 'Ángel de la Independencia',
  'Xochimilco boat': 'Trajinera en Xochimilco',
  'A red object': 'Algo rojo',
  'Mariachi band': 'Mariachis',
  'Papel picado': 'Papel picado',
  'The Mexican Flag': 'La bandera de México',
  'Pan dulce': 'Pan dulce',
  'Pink & white taxi': 'Taxi rosa y blanco',
  'FREE': 'LIBRE',
  'Churros': 'Churros',
  'Tortillas': 'Tortillas',
  'Concert wristband': 'Pulsera de concierto',
  'A green object': 'Algo verde',
  'Street art mural': 'Mural callejero',
  'Marigolds': 'Cempasúchil',
  'Palacio de Bellas Artes': 'Palacio de Bellas Artes',
  'Plane window view': 'Vista desde el avión',
  'Mezcal toast': 'Brindis con mezcal',
  'Elote': 'Elote',
  'A white object': 'Algo blanco',
  'Airport moment': 'Momento en el aeropuerto',

  // Landing page
  'Ready to Play?': '¿Listo para jugar?',
  'Enter your email address to instantly unlock your free digital bingo board.':
    'Escribe tu correo para desbloquear al instante tu tablero de bingo digital gratis.',
  'Email Address': 'Correo electrónico',
  'Please enter your email address to continue.': 'Escribe tu correo para continuar.',
  'Please enter a valid email address.': 'Escribe un correo válido.',
  'SAVING…': 'GUARDANDO…',
  'PLAY NOW': 'JUGAR AHORA',

  // Board
  'How many can you check off?': '¿Cuántas puedes completar?',
  'Your exclusive VIP board — customize & collect ✦': 'Tu tablero VIP exclusivo — personaliza y colecciona ✦',
  'Mute ambient': 'Silenciar música',
  'Play ambient music': 'Poner música',
  'Go VIP': 'Hazte VIP',
  'DONE': 'LISTO',
  'Done': 'Listo',
  'SELFIE': 'SELFIE',
  'Share My Bingo': 'Compartir mi bingo',
  'Share My Bingo 📲': 'Compartir mi bingo 📲',
  'Progress restored! Pick up where you left off.': '¡Progreso recuperado! Sigue donde te quedaste.',
  'Card reset. Fresh adventure awaits!': 'Tablero reiniciado. ¡Una nueva aventura te espera!',
  'Playing a custom board': 'Jugando un tablero personalizado',
  'Shared with you by a VIP member · Play and check off your own progress':
    'Compartido por un miembro VIP · Juega y marca tu propio avance',
  'Edit mode on — tap any square to customize it': 'Modo edición — toca una casilla para personalizarla',
  'VIP Edit Mode — tap any square to customize': 'Modo edición VIP — toca una casilla para personalizarla',
  'Generate Player Link': 'Crear enlace para jugadores',
  'Done Editing Board': 'Terminar edición',
  'Unlock VIP & Customize Your Board — $2.99': 'Desbloquea VIP y personaliza tu tablero — $2.99',
  'Saving…': 'Guardando…',
  'Saved to device': 'Guardado en el dispositivo',

  // Bingo / share
  'Full board — you own Ciudad de México. ¡Felicidades!': 'Tablero completo — la CDMX es tuya. ¡Felicidades!',
  'Three rows in? You literally ate the whole board!': '¿Tres líneas? ¡Te comiste el tablero!',
  'Double bingo! Double the drama. We love to see it.': '¡Doble bingo! Doble drama. Nos encanta.',
  '¡Viva México! 🇲🇽': '¡Viva México! 🇲🇽',
  'Text\nMessage': 'Enviar\nmensaje',
  'Send\nEmail': 'Enviar\ncorreo',
  'Copied!': '¡Copiado!',
  'Copy\nLink': 'Copiar\nenlace',
  'Download HD Card (VIP)': 'Descargar tablero HD (VIP)',
  'Your unique board link': 'El enlace de tu tablero',
  'Link Copied!': '¡Enlace copiado!',
  'Copy Player Link': 'Copiar enlace',
  'Text Players': 'Enviar por mensaje',
  'Email Players': 'Enviar por correo',
  'Double-tap to reset · Drag to pan': 'Doble toque para restablecer · Arrastra para mover',
  'Pinch to zoom · Double-tap to expand · Tap outside to close':
    'Pellizca para hacer zoom · Doble toque para ampliar · Toca fuera para cerrar',

  // Affirmations
  'GOOD JOB!': '¡BUEN TRABAJO!',
  'PERFECT!': '¡PERFECTO!',
  'UNSTOPPABLE!': '¡IMPARABLE!',
  'CRUSHED IT!': '¡LA ROMPISTE!',
  'ABSOLUTE LEGEND!': '¡UNA LEYENDA!',
  "THAT'S HOW IT'S DONE!": '¡ASÍ SE HACE!',
  'BINGO MASTER!': '¡MAESTRO DEL BINGO!',
  "YOU'RE THAT GIRL!": '¡ERES LA MERA MERA!',
  'ICONIC BEHAVIOR!': '¡ICÓNICO!',
  'MAIN CHARACTER!': '¡PROTAGONISTA!',
  'WE LOVE TO SEE IT!': '¡NOS ENCANTA!',
  'SLAYING ACCORDINGLY!': '¡ARRASANDO!',
}

function readLang(): Lang {
  try { return localStorage.getItem(LANG_KEY) === 'es' ? 'es' : 'en' } catch { return 'en' }
}

let current: Lang = readLang()
const listeners = new Set<() => void>()

export function setLang(lang: Lang) {
  current = lang
  try { localStorage.setItem(LANG_KEY, lang) } catch { /* storage unavailable */ }
  document.documentElement.lang = lang
  listeners.forEach(l => l())
}

export function useLang(): Lang {
  return useSyncExternalStore(
    cb => { listeners.add(cb); return () => { listeners.delete(cb) } },
    () => current,
  )
}

export function tr(s: string): string {
  return current === 'es' ? ES[s] ?? s : s
}

export function LangToggle({ className = '' }: { className?: string }) {
  const lang = useLang()
  return (
    <div role="group" aria-label="Language / Idioma"
      className={`flex rounded-full overflow-hidden text-[11px] font-black ${className}`}
      style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', backdropFilter:'blur(8px)' }}>
      {(['en', 'es'] as const).map(l => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
          className="px-2.5 py-1.5 transition-colors"
          style={lang === l ? { background:'#E0218A', color:'white' } : { color:'rgba(255,255,255,0.7)' }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LangToggle
