import { useAppStore } from '../store/useAppStore';

export function SuccessView() {
  const { language, resetGame } = useAppStore();
  const text = language === 'es' 
    ? '¡Felicidades! Has conseguido todas las letras de nuestra palabra secreta. Menciona esta palabra clave en recepción para recibir tu recompensa.' 
    : 'Congratulations! You have collected all the letters of our secret word. Mention this keyword at the reception to receive your reward.';
  const btnText = language === 'es' ? 'Volver a Jugar' : 'Play Again';

  return (
    <div className="modal-overlay" style={{ background: 'var(--palace-blue)', zIndex: 9999 }}>
      {/* CSS Confetti */}
      <div className="confetti-container">
        {[...Array(60)].map((_, i) => (
          <div key={i} className={`confetti confetti-${i % 5}`} style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}></div>
        ))}
      </div>

      <div className="animate-pop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px' }}>
        <img src="/assets/Franky_explorer.webp" alt="Franky" style={{ width: '240px', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.6))', marginBottom: '32px' }} />
        
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {['B','E','A','C','H'].map((l, i) => (
             <div key={i} className="animate-pop" style={{ animationDelay: `${0.5 + (i * 0.2)}s`, width: '60px', height: '70px', background: 'var(--palace-accent)', borderRadius: '12px', border: '4px solid #d48000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontFamily: 'var(--font-heading)', color: 'var(--palace-dark)', boxShadow: '0 8px 15px rgba(0,0,0,0.3)' }}>
               {l}
             </div>
          ))}
        </div>

        <p className="animate-pop" style={{ animationDelay: '1.5s', color: 'white', fontSize: '18px', fontWeight: 'bold', maxWidth: '400px', lineHeight: 1.5, marginBottom: '32px', background: 'rgba(2, 62, 138, 0.7)', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.2)' }}>
          {text}
        </p>

        <button className="animate-pop btn-gold" style={{ animationDelay: '2s', width: '200px' }} onClick={resetGame}>
          {btnText}
        </button>
      </div>
    </div>
  );
}
