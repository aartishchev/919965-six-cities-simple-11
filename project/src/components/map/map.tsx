import { memo, useEffect, useRef, useState } from 'react';
import { Icon, LayerGroup, Marker, PointTuple } from 'leaflet';
import { IconSize, PinIcon } from '../../const';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | null;
  classList: string;
};

const iconSize: PointTuple = [IconSize.Width, IconSize.Height];
const iconAnchor: PointTuple = [IconSize.Width / 2, IconSize.Height];

const defaultCustomIcon = new Icon({
  iconUrl: PinIcon.Default,
  iconSize,
  iconAnchor,
});

const currentCustomIcon = new Icon({
  iconUrl: PinIcon.Active,
  iconSize,
  iconAnchor,
});

function Map(props: MapProps): JSX.Element {
  const { city, offers, selectedOffer, classList } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const [currentCity, setCurrentCity] = useState<City['name']>(city.name);

  useEffect(() => {
    if (map) {
      if (currentCity !== city.name) {
        map.flyTo(
          [city.location.latitude, city.location.longitude],
          city.location.zoom,
          { animate: true, duration: 1 }
        );
        setCurrentCity(city.name);
      }

      const markers = offers.map(
        (offer) =>
          new Marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon:
                offer.id === selectedOffer?.id
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
      );

      const markersLayer = new LayerGroup(markers);
      markersLayer.addTo(map);

      return () => {
        map.removeLayer(markersLayer);
      };
    }
  }, [selectedOffer, city, currentCity, map, offers]);

  return <section className={classList} ref={mapRef} />;
}

export default memo(Map);
