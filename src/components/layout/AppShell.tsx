import { useState, useCallback, useEffect } from 'react';

import FloatingButtons from './FloatingButtons';
import MobileDrawer from './MobileDrawer';
import SidebarHeader from './SidebarHeader';
import TabBar from './TabBar';
import { useLocationStore } from '../../store/useLocationStore';
import { getUserLocation } from '../../utils/geo';
import LocationDetail from '../locations/LocationDetail';
import LocationList from '../locations/LocationList';
import MapView from '../map/MapView';
import SearchBar from '../search/SearchBar';
import Modal from '../ui/Modal';

export default function AppShell() {
  const selectedLocationId = useLocationStore((s) => s.selectedLocationId);
  const selectLocation = useLocationStore((s) => s.selectLocation);
  const setUserLocation = useLocationStore((s) => s.setUserLocation);
  const setSearchQuery = useLocationStore((s) => s.setSearchQuery);

  const [drawerExpanded, setDrawerExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'nearby' | 'previous'>('nearby');
  const [searchOpen, setSearchOpen] = useState(false);
  const [modal, setModal] = useState({ open: false, title: '', message: '' });

  const showError = useCallback((title: string, message: string) => {
    setModal({ open: true, title, message });
  }, []);

  const handleSearchToggle = useCallback(() => {
    setSearchOpen((prev) => {
      if (prev) setSearchQuery('');
      return !prev;
    });
  }, [setSearchQuery]);

  const handleBack = useCallback(() => {
    if (selectedLocationId) {
      selectLocation(null);
    } else {
      setDrawerExpanded(false);
    }
  }, [selectedLocationId, selectLocation]);

  useEffect(() => {
    if (selectedLocationId) {
      setDrawerExpanded(true);
    }
  }, [selectedLocationId]);

  const handleNavigate = useCallback(async () => {
    if (selectedLocationId) {
      const location = useLocationStore
        .getState()
        .locations.find((l) => l.id === selectedLocationId);
      if (location) {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}&travelmode=walking`;
        window.open(url, '_blank');
        return;
      }
    }
    try {
      const coords = await getUserLocation();
      setUserLocation(coords);
    } catch {
      showError(
        'Location Unavailable',
        'Unable to get your location. Please allow location access in your browser settings.',
      );
    }
  }, [selectedLocationId, setUserLocation, showError]);

  const contentPanel = selectedLocationId ? (
    <div key="detail" className="animate-slide-in h-full">
      <LocationDetail />
    </div>
  ) : (
    <div key="list" className="animate-slide-out h-full">
      <LocationList />
    </div>
  );

  const previousEmpty = (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <p className="text-sm font-semibold text-th-secondary">No previous locations</p>
      <p className="text-[13px] text-th-faint mt-1">Locations you visit will appear here</p>
    </div>
  );

  const drawerContent = (
    <>
      <TabBar
        activeTab={activeTab}
        onSearchToggle={handleSearchToggle}
        onTabChange={setActiveTab}
      />
      <div className="h-px bg-border mx-5" />
      {activeTab === 'nearby' && searchOpen && <SearchBar onError={showError} />}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'nearby' ? contentPanel : previousEmpty}
      </div>
    </>
  );

  return (
    <div className="h-dvh w-screen flex flex-col md:flex-row overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-96 bg-surface border-r border-border shrink-0">
        <SidebarHeader />
        {drawerContent}
      </aside>

      {/* Map + mobile overlay */}
      <main className="flex-1 relative">
        <MapView />

        <FloatingButtons
          drawerExpanded={drawerExpanded}
          onBack={handleBack}
          onNavigate={handleNavigate}
        />

        <MobileDrawer expanded={drawerExpanded} onToggle={() => setDrawerExpanded((prev) => !prev)}>
          {drawerContent}
        </MobileDrawer>
      </main>

      <Modal
        message={modal.message}
        open={modal.open}
        title={modal.title}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
      />
    </div>
  );
}
