import { MOBILE_DRAWER_HEIGHT } from '../../constants';

/**
 * Compute an offset map center so the target pin appears in the visible area
 * above the mobile drawer instead of behind it.
 */
export function getOffsetCenter(
  map: google.maps.Map,
  target: { lat: number; lng: number },
): { lat: number; lng: number } | null {
  const projection = map.getProjection();
  if (!projection) return null;

  const point = projection.fromLatLngToPoint(new google.maps.LatLng(target.lat, target.lng));
  if (!point) return null;

  const mapHeight = map.getDiv().offsetHeight;
  const offsetPx = (mapHeight * MOBILE_DRAWER_HEIGHT) / 2;
  const scale = Math.pow(2, map.getZoom() ?? 15);

  const shifted = new google.maps.Point(point.x, point.y + offsetPx / scale);
  const offsetLatLng = projection.fromPointToLatLng(shifted);
  if (!offsetLatLng) return null;

  return { lat: offsetLatLng.lat(), lng: offsetLatLng.lng() };
}
