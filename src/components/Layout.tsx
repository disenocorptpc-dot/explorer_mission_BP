import { Home, Map, Box } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function Layout({ children }: { children: React.ReactNode }) {
  const { currentView, setCurrentView } = useAppStore();

  return (
    <div className="app-container">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </div>
      
      <div className="nav-bottom">
        <button className={`nav-item ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>
          <Home size={28} />
          <span>Basecamp</span>
        </button>
        <button className={`nav-item ${currentView === 'map' ? 'active' : ''}`} onClick={() => setCurrentView('map')}>
          <Map size={28} />
          <span>Map</span>
        </button>
        <button className={`nav-item ${currentView === 'pack' ? 'active' : ''}`} onClick={() => setCurrentView('pack')}>
          <Box size={28} />
          <span>Pack</span>
        </button>
      </div>
    </div>
  );
}
