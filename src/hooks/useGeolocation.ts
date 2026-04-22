import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { POIS_ROUTE } from '../data/mockData';

// Haversine formula
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function playChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1); // C6
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1);
  } catch (e) {
    console.warn("Audio play failed", e);
  }
}

export function useGeolocation() {
  const { isSimulatorActive, setCurrentLocation, currentLocation, setActivePOI, activePOIId, collectedLetters, setDistanceToNext } = useAppStore();

  useEffect(() => {
    if (isSimulatorActive) return;

    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Error watching position", error);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isSimulatorActive, setCurrentLocation]);

  useEffect(() => {
    if (!currentLocation) return;
    if (activePOIId) return;

    let minDistance = Infinity;
    let hitPOI = false;

    for (const poi of POIS_ROUTE) {
      if (collectedLetters.includes(poi.letter)) continue;

      const distance = getDistance(
        currentLocation.lat,
        currentLocation.lng,
        poi.coordinates.lat,
        poi.coordinates.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
      }

      if (distance <= poi.triggerRadius) {
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        playChime();
        setActivePOI(poi.id);
        hitPOI = true;
        break;
      }
    }

    if (!hitPOI && minDistance !== Infinity) {
      setDistanceToNext(Math.round(minDistance));
    } else if (minDistance === Infinity) {
      setDistanceToNext(null);
    }
  }, [currentLocation, activePOIId, collectedLetters, setActivePOI, setDistanceToNext]);
}
