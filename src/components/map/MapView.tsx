import { APIProvider, Map } from '@vis.gl/react-google-maps';

import LocationMarkers from './LocationMarkers';
import MapErrorFallback from './MapErrorFallback';
import { NYC_CENTER } from '../../constants';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
const MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID || 'blank-street-map';

export default function MapView() {
  if (!API_KEY) {
    return <MapErrorFallback hasApiKey={false} />;
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        zoomControl
        className="w-full h-full"
        defaultCenter={NYC_CENTER}
        defaultZoom={12}
        disableDefaultUI={false}
        fullscreenControl={false}
        gestureHandling="greedy"
        mapId={MAP_ID}
        mapTypeControl={false}
        streetViewControl={false}
      >
        <LocationMarkers />
      </Map>
    </APIProvider>
  );
}
