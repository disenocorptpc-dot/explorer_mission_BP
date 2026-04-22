import { useAppStore } from '../store/useAppStore';
import { Map, Compass } from 'lucide-react';

export function Onboarding() {
  const { language, setLanguage, setCurrentView } = useAppStore();
  const langKey = (language as 'es' | 'en') || 'es';

  const content = {
    es: {
      title: 'Desafío Palace',
      desc: 'Tu viaje acaba de comenzar. Mientras te acercas al paraíso, presta atención a la ruta. Descubriremos juntos 5 puntos de interés.',
      rules: 'Responde correctamente a las trivias en cada punto para desbloquear una letra. Forma la palabra clave para tu recompensa.',
      btn: 'Comenzar Aventura'
    },
    en: {
      title: 'Palace Challenge',
      desc: 'Your journey has just begun. As you approach paradise, pay attention to the route. We will discover 5 points of interest together.',
      rules: 'Answer the trivia correctly at each point to unlock a letter. Form the keyword for your reward.',
      btn: 'Start Adventure'
    }
  };

  const t = content[langKey];

  return (
    <div className="app-container" style={{ padding: '40px 24px', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <select 
          value={language || 'es'} 
          onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
          style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd', background: 'transparent' }}
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', color: 'var(--accent-color)' }}>
          <Map size={64} />
        </div>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>{t.title}</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
          {t.desc}
        </p>
        
        <div className="card" style={{ marginBottom: '32px', textAlign: 'left', display: 'flex', gap: '16px' }}>
          <Compass size={24} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5 }}>
            {t.rules}
          </p>
        </div>
      </div>

      <button className="btn" onClick={() => setCurrentView('home')}>
        {t.btn}
      </button>
    </div>
  );
}
