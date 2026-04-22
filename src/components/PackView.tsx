import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { POIS_ROUTE } from '../data/mockData';

export function PackView() {
  const { language, collectedLetters } = useAppStore();
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % POIS_ROUTE.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const langKey = language as 'es' | 'en';
  const fact = POIS_ROUTE[factIndex].funFact[langKey];

  return (
    <div style={{ flex: 1, padding: '40px 24px', textAlign: 'center', overflowY: 'auto' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '32px', textShadow: '2px 2px 0 var(--palace-dark)' }}>
        Tu Mochila
      </h2>

      {/* Pool de letras recolectadas */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px', marginTop: '24px' }}>
        {['B','E','A','C','H'].map((targetLetter, i) => {
          const isCaught = collectedLetters.includes(targetLetter);
          return (
            <div key={i} className={isCaught ? 'animate-pop' : ''} style={{ 
              width: '50px', height: '60px', 
              background: isCaught ? 'var(--palace-accent)' : 'rgba(255,255,255,0.2)', 
              border: `4px solid ${isCaught ? '#d48000' : 'rgba(255,255,255,0.4)'}`,
              borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: isCaught ? 'var(--palace-dark)' : 'transparent',
              fontSize: '32px', fontFamily: 'var(--font-heading)',
              boxShadow: isCaught ? '0 4px 10px rgba(0,0,0,0.3)' : 'none',
              transition: 'all 0.3s'
            }}>
              {isCaught ? targetLetter : '?'}
            </div>
          );
        })}
      </div>
      
      <div className="parchment" style={{ marginTop: '20px', marginBottom: '40px' }}>
        <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: 'var(--text-secondary)' }}>
          Atrapa todas las letras para reclamar el tesoro en la recepción.
        </p>
      </div>

      {/* Rotating Sticky Note Fun Facts */}
      <div style={{ position: 'relative', marginTop: '40px' }}>
        <div key={factIndex} className="animate-pop" style={{
          background: '#ffe169',
          padding: '30px 20px',
          borderRadius: '4px',
          boxShadow: '4px 8px 15px rgba(0,0,0,0.2)',
          transform: `rotate(${factIndex % 2 === 0 ? '-3deg' : '3deg'})`,
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          borderBottomRightRadius: '30px 4px',
          margin: '0 auto',
          maxWidth: '300px'
        }}>
          {/* Tape */}
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '24px', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.05)', backdropFilter: 'blur(4px)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
          
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--palace-dark)', margin: '0 0 16px 0', textTransform: 'uppercase' }}>
            Tip de Explorador
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 'bold', color: '#5e442c', lineHeight: 1.4, margin: 0 }}>
            "{fact}"
          </p>
        </div>
      </div>
    </div>
  );
}
