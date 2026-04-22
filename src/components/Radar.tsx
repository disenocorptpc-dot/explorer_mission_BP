import { useAppStore } from '../store/useAppStore';
import { POIS_ROUTE } from '../data/mockData';
import { Navigation } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Radar() {
  const { language, collectedLetters } = useAppStore();
  const targetWord = "BEACH";
  const [funFactIndex, setFunFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFunFactIndex((prev) => (prev + 1) % POIS_ROUTE.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const t = {
    es: {
      radar: 'Explorando la zona...',
      word: 'Tu Palabra:',
      waiting: 'Siguiente punto de interés en camino...'
    },
    en: {
      radar: 'Exploring the area...',
      word: 'Your Word:',
      waiting: 'Next point of interest on the way...'
    }
  };

  const currentFact = POIS_ROUTE[funFactIndex].funFact[language];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
          <div className="radar-ring" style={{ animationDelay: '0s' }}></div>
          <div className="radar-ring" style={{ animationDelay: '0.6s' }}></div>
          <div className="radar-ring" style={{ animationDelay: '1.2s' }}></div>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, color: 'white' }}>
            <Navigation size={28} />
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', fontWeight: 500, marginBottom: '8px' }}>
          {t[language].radar}
        </p>
        <p style={{ color: '#aaa', fontSize: '14px' }}>{t[language].waiting}</p>
      </div>

      <div className="card" style={{ marginBottom: '24px', background: 'rgba(212, 163, 115, 0.1)', border: '1px solid rgba(212, 163, 115, 0.2)' }}>
        <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '14px', lineHeight: 1.6, textAlign: 'center' }}>
          "{currentFact}"
        </p>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          {t[language].word}
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {targetWord.split('').map((letter, i) => {
            const hasLetter = collectedLetters.includes(letter);
            return (
              <div key={i} className={`letter-slot ${hasLetter ? '' : 'empty'}`}>
                {hasLetter ? letter : ''}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
