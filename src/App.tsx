import { useAppStore } from './store/useAppStore';
import { useGeolocation } from './hooks/useGeolocation';
import { Layout } from './components/Layout';
import { LanguageSelect } from './components/LanguageSelect';
import { Home } from './components/Home';
import { MapRoute } from './components/MapRoute';
import { PackView } from './components/PackView';
import { TriviaModal } from './components/TriviaModal';
import { GPSSimulator } from './components/GPSSimulator';
import { SuccessView } from './components/SuccessView';

function App() {
  const { language, currentView, collectedLetters } = useAppStore();
  
  // Initialize geolocation watching
  useGeolocation();

  if (!language) {
    return (
      <div className="app-container">
        <LanguageSelect />
      </div>
    );
  }

  return (
    <Layout>
      {currentView === 'home' && <Home />}
      {currentView === 'map' && <MapRoute />}
      {currentView === 'pack' && <PackView />}
      
      <TriviaModal />
      <GPSSimulator />
      {collectedLetters.length === 5 && <SuccessView />}
    </Layout>
  );
}

export default App;
