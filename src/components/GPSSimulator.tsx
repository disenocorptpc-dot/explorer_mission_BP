import { useAppStore } from '../store/useAppStore';
import { POIS_ROUTE } from '../data/mockData';
import { Play, Square, FastForward, GripHorizontal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function GPSSimulator() {
  const { isSimulatorActive, toggleSimulator, setCurrentLocation } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const targetIndex = useRef(0);

  // Drag logic
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    if (!isSimulatorActive) {
      setIsPlaying(false);
      targetIndex.current = 0;
    }
  }, [isSimulatorActive]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        const state = useAppStore.getState();
        if (!state.isSimulatorActive) {
          setIsPlaying(false);
          return;
        }
        if (state.activePOIId) return; // Pause movement if trivia is active
        const currentLoc = state.currentLocation;
        const targetPOI = POIS_ROUTE[targetIndex.current];

        if (!targetPOI) {
          setIsPlaying(false);
          return;
        }

        const target = targetPOI.coordinates;

        if (!currentLoc) {
          setCurrentLocation(POIS_ROUTE[0].coordinates);
          return;
        }

        const latDiff = target.lat - currentLoc.lat;
        const lngDiff = target.lng - currentLoc.lng;
        const dist = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

        if (dist < 0.0005) { 
          if (targetIndex.current < POIS_ROUTE.length - 1) {
            targetIndex.current += 1;
          } else {
            setIsPlaying(false);
          }
        } else {
          const moveStep = 0.0006;
          const ratio = Math.min(moveStep / dist, 1);
          setCurrentLocation({
            lat: currentLoc.lat + latDiff * ratio,
            lng: currentLoc.lng + lngDiff * ratio
          });
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, setCurrentLocation]);

  if (!isSimulatorActive) {
    return (
      <button 
        onClick={toggleSimulator}
        className="animate-float"
        style={{
          position: 'fixed', bottom: '100px', right: '20px',
          background: 'var(--palace-dark)', color: 'white',
          border: '2px solid var(--palace-light)', padding: '12px 16px',
          borderRadius: '30px', cursor: 'pointer', display: 'flex',
          alignItems: 'center', gap: '8px', zIndex: 100,
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          fontFamily: 'var(--font-heading)'
        }}
      >
        <FastForward size={18} /> SIMULADOR
      </button>
    );
  }

  return (
    <div className="animate-pop" style={{
      position: 'fixed', top: `${pos.y}px`, left: `${pos.x}px`, width: '280px',
      background: 'rgba(255,255,255,0.85)', padding: '12px',
      borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
      border: '2px solid var(--palace-light)', zIndex: 1000,
      backdropFilter: 'blur(10px)',
      touchAction: 'none' // Prevent scrolling while dragging on touch devices
    }}>
      {/* Draggable Handle */}
      <div 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab', 
          display: 'flex', justifyContent: 'center', 
          padding: '4px', background: 'rgba(0,0,0,0.05)', 
          borderRadius: '8px', marginBottom: '8px' 
        }}
      >
        <GripHorizontal size={20} color="#888" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '14px', color: 'var(--palace-dark)', fontFamily: 'var(--font-heading)' }}>GPS Van Simulator</h3>
        <button onClick={toggleSimulator} style={{ border: 'none', background: 'transparent', color: '#888', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
      </div>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: isPlaying ? 'var(--danger-color)' : 'var(--success-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: 'var(--font-heading)', cursor: 'pointer', fontSize: '14px' }}
        >
          {isPlaying ? <Square size={16} /> : <Play size={16} />} {isPlaying ? 'Pausar' : 'Avanzar Van'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
        {POIS_ROUTE.map((poi, idx) => (
          <button
            key={poi.id}
            onClick={() => {
              targetIndex.current = idx;
              setCurrentLocation(poi.coordinates);
            }}
            style={{
              padding: '6px 8px', borderRadius: '6px',
              border: '2px solid var(--palace-light)', background: '#f0f9ff',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '4px', color: 'var(--palace-dark)',
              fontWeight: 'bold', flexShrink: 0, fontSize: '12px'
            }}
          >
            POI {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
