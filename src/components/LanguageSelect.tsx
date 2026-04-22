import { useAppStore } from '../store/useAppStore';

export function LanguageSelect() {
  const { setLanguage } = useAppStore();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <img src="/assets/nvo_logo.webp" alt="Misión del Explorador" className="animate-float" style={{ width: '100%', maxWidth: '250px', marginBottom: '60px', filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.5))' }} />
      
      <div className="animate-pop" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'white', textShadow: '1px 2px 4px rgba(0,0,0,0.5)', marginBottom: '24px' }}>Select Language / Idioma</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button className="btn-palace" onClick={() => setLanguage('es')}>
            Español
          </button>
          <button className="btn-palace" onClick={() => setLanguage('en')}>
            English
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
        <img src="/assets/Logo_BP.svg" alt="Beach Palace Logo" style={{ height: '50px', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
      </div>
    </div>
  );
}
