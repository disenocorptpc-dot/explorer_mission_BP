import { useAppStore } from '../store/useAppStore';
import { POIS_ROUTE } from '../data/mockData';

export function MapRoute() {
  const { collectedLetters, language, distanceToNext } = useAppStore();

  return (
    <div className="map-bg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', gap: '40px' }}>
      
      <div className="parchment" style={{ position: 'sticky', top: '20px', zIndex: 10, width: '100%', maxWidth: '600px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--palace-dark)', margin: '0', fontSize: '24px', textAlign: 'center' }}>Ruta del Explorador</h2>

        {distanceToNext !== null && (
          <div className="animate-pop" style={{ textAlign: 'center', marginTop: '8px' }}>
            <span style={{ background: 'var(--palace-dark)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Siguiente a: {distanceToNext > 1000 ? (distanceToNext/1000).toFixed(1) + ' km' : distanceToNext + ' m'}
            </span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', width: '100%', alignItems: 'center', padding: '20px 0' }}>
        {POIS_ROUTE.map((poi, idx) => {
          const isCompleted = collectedLetters.includes(poi.letter);
          const isNext = !isCompleted && (idx === 0 || collectedLetters.includes(POIS_ROUTE[idx - 1].letter));
          const offset = idx % 2 === 0 ? '-40px' : '40px';
          
          return (
            <div key={poi.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', transform: `translateX(${offset})` }}>
              
              {idx < POIS_ROUTE.length - 1 && (() => {
                const isNextCompleted = collectedLetters.includes(POIS_ROUTE[idx + 1].letter);
                const color1 = isNextCompleted ? 'var(--palace-accent)' : '#caf0f8';

                return (
                  <div style={{ 
                    position: 'absolute', 
                    top: '40px', 
                    height: '130px', 
                    width: '10px', 
                    background: `repeating-linear-gradient(to bottom, ${color1}, ${color1} 10px, transparent 10px, transparent 20px)`, 
                    zIndex: 0,
                    transform: idx % 2 === 0 ? 'rotate(-25deg)' : 'rotate(25deg)',
                    transformOrigin: 'top center',
                    transition: 'background 0.5s'
                  }} />
                );
              })()}

              <div className={isNext ? 'animate-pulse' : ''} style={{ 
                zIndex: 1,
                transition: 'all 0.3s',
                filter: isCompleted ? 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))' : 'brightness(0) opacity(0.4)'
              }}>
                <img 
                   src={poi.trivia.iconImage} 
                   alt={poi.id}
                   style={{ 
                     width: '100px', height: '100px', objectFit: 'contain', 
                     transition: 'all 0.5s'
                   }} 
                />
              </div>

              {/* Van Indicator on Map */}
              {(isNext || (isCompleted && idx === POIS_ROUTE.length - 1 && collectedLetters.length === 5)) && (
                <div className="animate-float" style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  left: idx % 2 === 0 ? '-50px' : 'auto',
                  right: idx % 2 === 0 ? 'auto' : '-50px',
                  zIndex: 20,
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
                }}>
                  <img src="/assets/van_icon.webp" alt="Van" style={{ width: '50px', height: 'auto', objectFit: 'contain' }} />
                </div>
              )}
              
              <div className="animate-pop" style={{ 
                animationDelay: `${idx * 0.1}s`,
                background: 'white', 
                border: '3px solid var(--palace-light)', 
                padding: '8px 16px', 
                borderRadius: '12px', 
                marginTop: '16px', 
                fontFamily: 'var(--font-heading)', 
                fontSize: '14px', 
                zIndex: 1, 
                boxShadow: '0 4px 0px var(--palace-light)',
                color: 'var(--palace-dark)',
                textTransform: 'uppercase'
              }}>
                {poi.name[(language as 'es'|'en')]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
