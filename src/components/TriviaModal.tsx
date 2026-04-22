import { useAppStore } from '../store/useAppStore';
import { POIS_ROUTE } from '../data/mockData';
import { useState } from 'react';
import { CheckCircle2, XCircle, Star, Search } from 'lucide-react';

export function TriviaModal() {
  const { language, activePOIId, setActivePOI, addLetter, setCurrentView } = useAppStore();
  const [selectedSingle, setSelectedSingle] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState(false);

  if (!activePOIId || !language) return null;

  const poi = POIS_ROUTE.find(p => p.id === activePOIId);
  if (!poi) return null;

  const langKey = language as 'es' | 'en';

  const handleValidate = () => {
    if (!selectedSingle) return;
    setIsValidated(true);
    const correct = selectedSingle === poi.trivia.correctAnswer;
    if (correct) {
      addLetter(poi.letter);
    }
  };

  const handleClose = () => {
    setActivePOI(null);
    setSelectedSingle(null);
    setIsValidated(false);
    // Vuelve al inventario ("Mapa") para ver la ruta
    setCurrentView('map');
  };

  const isCorrectAnswer = selectedSingle === poi.trivia.correctAnswer;

  return (
    <div className="modal-overlay">
      <div className="animate-pop" style={{ width: '100%', maxWidth: '600px', maxHeight: '95vh', overflowY: 'auto', background: 'white', borderRadius: '32px', border: '6px solid var(--palace-dark)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', padding: '20px', position: 'relative' }}>
        
        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', color: 'var(--palace-dark)', fontSize: '24px', margin: '0 0 16px 0' }}>
          {poi.trivia.title[langKey]}
        </h2>

        {/* Imagen principal */}
        {poi.trivia.image && (
          <div style={{ position: 'relative', borderRadius: '16px', background: '#eef6fc', padding: '8px', border: '2px solid #b8dbf2', marginBottom: '16px' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '-12px', background: '#1498d5', borderRadius: '50%', padding: '8px', border: '2px solid white', zIndex: 10 }}>
              <Search size={20} color="white" />
            </div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '160px', background: 'var(--palace-dark)' }}>
              <img src={poi.trivia.image} alt="Trivia" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: (poi.trivia.blurImage && !isCorrectAnswer) ? 'blur(15px)' : 'none', transition: 'filter 0.5s' }} />
            </div>
          </div>
        )}

        <div style={{ background: '#f4f9fd', borderRadius: '16px', padding: '12px', border: '1px solid #d6eaf8', marginBottom: '20px' }}>
          <p style={{ margin: 0, color: 'var(--palace-dark)', fontWeight: 'bold', textAlign: 'center', fontSize: '15px' }}>
            {poi.trivia.question[langKey]}
          </p>
        </div>

        {/* Opciones */}
        <div style={{ display: poi.trivia.isImageOptions ? 'grid' : 'flex', gridTemplateColumns: '1fr 1fr', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {poi.trivia.options.map((opt) => {
            const isSelected = selectedSingle === opt.id;
            let bg = 'linear-gradient(to bottom, #3bc1eb, #0e94d2)';
            let borderColor = '#074a87';
            if (isSelected) {
              if (!isValidated) {
                bg = 'linear-gradient(to bottom, #ffe169, #fca311)';
                borderColor = '#d48000';
              } else if (opt.id === poi.trivia.correctAnswer) {
                bg = 'linear-gradient(to bottom, #4ade80, #16a34a)';
                borderColor = '#14532d';
              } else {
                bg = 'linear-gradient(to bottom, #f87171, #dc2626)';
                borderColor = '#7f1d1d';
              }
            } else if (isValidated) {
              if (opt.id === poi.trivia.correctAnswer) {
                bg = 'linear-gradient(to bottom, #4ade80, #16a34a)';
                borderColor = '#14532d';
              } else {
                bg = '#e2e8f0';
                borderColor = '#94a3b8';
              }
            }

            if (poi.trivia.isImageOptions) {
              return (
                <button 
                  key={opt.id}
                  disabled={isValidated}
                  onClick={() => setSelectedSingle(opt.id)}
                  style={{ position: 'relative', background: bg, border: 'none', borderBottom: `6px solid ${borderColor}`, borderRadius: '16px', padding: '6px', cursor: isValidated ? 'default' : 'pointer', transition: 'transform 0.1s', transform: (isSelected && !isValidated) ? 'translateY(4px)' : 'none', ...(opt.id === 'E' ? { gridColumn: '1 / -1', width: '60%', margin: '0 auto' } : {}) }}
                >
                  <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '30px', height: '30px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', fontWeight: 'black', color: 'var(--palace-dark)', zIndex: 10 }}>
                    {opt.id}
                  </div>
                  <div style={{ width: '100%', height: '80px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={opt.image} alt={opt.id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {isValidated && isSelected && opt.id === poi.trivia.correctAnswer && <CheckCircle2 style={{ position: 'absolute', top: '8px', right: '8px', color: 'white', zIndex: 20 }} />}
                  {isValidated && isSelected && opt.id !== poi.trivia.correctAnswer && <XCircle style={{ position: 'absolute', top: '8px', right: '8px', color: 'white', zIndex: 20 }} />}
                </button>
              );
            }

            return (
              <button 
                key={opt.id}
                disabled={isValidated}
                onClick={() => setSelectedSingle(opt.id)}
                style={{ position: 'relative', width: '100%', height: '60px', background: bg, border: 'none', borderBottom: `6px solid ${borderColor}`, borderRadius: '16px', display: 'flex', alignItems: 'center', padding: '0 12px', cursor: isValidated ? 'default' : 'pointer', transition: 'transform 0.1s', transform: (isSelected && !isValidated) ? 'translateY(4px)' : 'none', color: (isValidated && !isSelected && opt.id !== poi.trivia.correctAnswer) ? '#64748b' : 'white' }}
              >
                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'black', color: 'var(--palace-dark)', fontSize: '20px' }}>
                  {opt.id}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontWeight: '900', fontSize: '16px', textShadow: (isValidated && !isSelected && opt.id !== poi.trivia.correctAnswer) ? 'none' : '1px 1px 2px rgba(0,0,0,0.3)' }}>{opt.text}</span>
                  {opt.arrows && <span style={{ fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', textShadow: (isValidated && !isSelected && opt.id !== poi.trivia.correctAnswer) ? 'none' : '1px 1px 2px rgba(0,0,0,0.3)' }}>{opt.arrows}</span>}
                </div>
              </button>
            );
          })}
        </div>

        {!isValidated ? (
          <button 
            disabled={!selectedSingle}
            onClick={handleValidate}
            className="btn-gold" 
            style={{ width: '100%', opacity: selectedSingle ? 1 : 0.5, cursor: selectedSingle ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <Star size={24} /> VALIDAR
          </button>
        ) : (
          <div className="animate-pop" style={{ textAlign: 'center' }}>
            <div style={{ padding: '12px', borderRadius: '12px', marginBottom: '16px', background: isCorrectAnswer ? '#dcfce7' : '#fee2e2', color: isCorrectAnswer ? '#16a34a' : '#dc2626', fontWeight: 'bold', fontSize: '18px' }}>
              {isCorrectAnswer ? '¡Excelente observación!' : '¡Oops! Fíjate bien para la próxima.'}
            </div>
            {isCorrectAnswer && (
              <p style={{ margin: '0 0 16px 0', fontSize: '16px', color: 'var(--palace-dark)', fontWeight: 'bold' }}>
                ¡Encontraste la letra {poi.letter}!
              </p>
            )}
            <button className="btn-palace" onClick={handleClose}>
              Guardar en la Mochila
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
