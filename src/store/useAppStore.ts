import { create } from 'zustand';
import { POIS_ROUTE } from '../data/mockData';

type View = 'home' | 'map' | 'pack';

interface AppState {
  language: 'es' | 'en' | null;
  setLanguage: (lang: 'es' | 'en') => void;
  
  currentView: View;
  setCurrentView: (view: View) => void;
  
  collectedLetters: string[];
  addLetter: (letter: string) => void;
  
  currentLocation: { lat: number; lng: number } | null;
  setCurrentLocation: (loc: { lat: number; lng: number }) => void;
  
  distanceToNext: number | null;
  setDistanceToNext: (dist: number | null) => void;
  
  activePOIId: string | null;
  setActivePOI: (id: string | null) => void;
  
  isSimulatorActive: boolean;
  toggleSimulator: () => void;
  
  resetGame: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: null,
  setLanguage: (lang) => set({ language: lang }),
  
  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view }),
  
  collectedLetters: [],
  addLetter: (letter) => set((state) => {
    if (state.collectedLetters.includes(letter)) return state;
    return { collectedLetters: [...state.collectedLetters, letter] };
  }),
  
  currentLocation: null,
  setCurrentLocation: (loc) => set({ currentLocation: loc }),
  
  distanceToNext: null,
  setDistanceToNext: (dist) => set({ distanceToNext: dist }),
  
  activePOIId: null,
  setActivePOI: (id) => set({ activePOIId: id }),
  
  isSimulatorActive: false,
  toggleSimulator: () => set((state) => ({ isSimulatorActive: !state.isSimulatorActive })),
  
  resetGame: () => set({ 
    collectedLetters: [], 
    currentView: 'home', 
    isSimulatorActive: false,
    activePOIId: null,
    distanceToNext: null,
    currentLocation: null
  }),
}));
