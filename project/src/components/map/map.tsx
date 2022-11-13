import { useEffect, useRef } from 'react';
import { Icon, Marker, PointTuple } from 'leaflet';
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

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(offer.id === selectedOffer?.id ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <section className={classList} ref={mapRef} />;
}

export default Map;
