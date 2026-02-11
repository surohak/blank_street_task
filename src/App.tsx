import { useEffect } from 'react';

import AppShell from './components/layout/AppShell';
import { useLocationStore } from './store/useLocationStore';

export default function App() {
  const loadLocations = useLocationStore((s) => s.loadLocations);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  return <AppShell />;
}
