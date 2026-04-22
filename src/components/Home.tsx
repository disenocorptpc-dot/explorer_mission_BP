import { useAppStore } from '../store/useAppStore';
import { Map, Bell, Type } from 'lucide-react';

export function Home() {
  const { setCurrentView, language } = useAppStore();

  const t = {
    es: {
      title: 'Tu Misión',
      subtitle: '¡Hola pequeño explorador! Cumple estas tareas para encontrar el tesoro:',
      step1Title: 'SIGUE EL MAPA',
      step1Desc: 'Usa el simulador o tu GPS para avanzar.',
      step2Title: 'ALERTA DE SONIDO',
      step2Desc: 'Al escuchar la alarma, ¡llegaste a un paradero!',
      step3Title: 'ATRAPA LAS LETRAS',
      step3Desc: 'Resuelve las trivias y forma la palabra BEACH.',
      btn: '¡Comenzar Aventura!'
    },
    en: {
      title: 'Your Mission',
      subtitle: 'Hello little explorer! Complete these tasks to find the treasure:',
      step1Title: 'FOLLOW THE MAP',
      step1Desc: 'Use the simulator or your GPS to advance.',
      step2Title: 'SOUND ALERT',
      step2Desc: 'When you hear the alarm, you have arrived at a stop!',
      step3Title: 'CATCH THE LETTERS',
      step3Desc: 'Solve the trivia and form the word BEACH.',
      btn: 'Start Adventure!'
    }
  };

  const text = t[(language as 'es' | 'en')];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px', overflowY: 'auto' }}>
      
      {/* Playroom Logo at the top */}
      <img src="/assets/logo_Playroom.svg" alt="Playroom Logo" style={{ width: '120px', marginBottom: '24px', zIndex: 10 }} />

      <div className="animate-pop" style={{ textAlign: 'center', marginBottom: '24px', background: 'rgba(255,255,255,0.95)', padding: '20px', borderRadius: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.2)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--palace-dark)', fontSize: '30px', margin: '0 0 12px 0' }}>{text.title}</h2>
        <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.5 }}>{text.subtitle}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        
        <div className="animate-pop" style={{ animationDelay: '0.1s', animationFillMode: 'both', background: 'white', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <div className="animate-float" style={{ background: 'var(--palace-accent)', padding: '12px', borderRadius: '12px', color: 'white', flexShrink: 0 }}>
            <Map size={28} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontFamily: 'var(--font-heading)', color: 'var(--palace-dark)', fontSize: '16px' }}>{text.step1Title}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{text.step1Desc}</p>
          </div>
        </div>

        <div className="animate-pop" style={{ animationDelay: '0.2s', animationFillMode: 'both', background: 'white', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <div className="animate-float" style={{ animationDelay: '0.5s', background: '#4cc9f0', padding: '12px', borderRadius: '12px', color: 'white', flexShrink: 0 }}>
            <Bell size={28} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontFamily: 'var(--font-heading)', color: 'var(--palace-dark)', fontSize: '16px' }}>{text.step2Title}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{text.step2Desc}</p>
          </div>
        </div>

        <div className="animate-pop" style={{ animationDelay: '0.3s', animationFillMode: 'both', background: 'white', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <div className="animate-float" style={{ animationDelay: '1s', background: '#55a630', padding: '12px', borderRadius: '12px', color: 'white', flexShrink: 0 }}>
            <Type size={28} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontFamily: 'var(--font-heading)', color: 'var(--palace-dark)', fontSize: '16px' }}>{text.step3Title}</h3>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{text.step3Desc}</p>
          </div>
        </div>

      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '220px', height: '220px', margin: 'auto', marginBottom: '32px' }}>
        <div className="radar-pulse" style={{ width: '100%', height: '100%', animationDelay: '0s' }} />
        <div className="radar-pulse" style={{ width: '100%', height: '100%', animationDelay: '1s' }} />
        <div className="radar-pulse" style={{ width: '100%', height: '100%', animationDelay: '2s' }} />
        <img src="/assets/Franky_explorer.webp" alt="Franky" className="animate-float" style={{ height: '220px', position: 'relative', zIndex: 10, filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.4))' }} />
      </div>

      <button className="btn-gold" style={{ animation: 'popIn 0.5s 0.4s both', width: '100%', maxWidth: '600px', marginBottom: '24px' }} onClick={() => setCurrentView('map')}>
        {text.btn}
      </button>

      <div style={{ marginTop: 'auto' }}>
        <img src="/assets/Logo_BP.svg" alt="Beach Palace" style={{ height: '35px', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
      </div>
    </div>
  );
}
