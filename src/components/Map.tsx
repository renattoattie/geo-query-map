import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import 'ol/ol.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BASEMAPS = {
  osm: {
    name: "OpenStreetMap",
    source: new OSM()
  },
  satellite: {
    name: "Satélite",
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maxZoom: 19
    })
  }
};

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentBasemap, setCurrentBasemap] = useState('osm');

  useEffect(() => {
    if (!map.current) {
      map.current = new Map({
        target: mapContainer.current,
        layers: [
          new TileLayer({
            source: BASEMAPS.osm.source
          })
        ],
        view: new View({
          center: [-8288043.591739182, 4969814.9146726515],
          zoom: 4
        })
      });
    }

    return () => {
      if (map.current) {
        map.current.setTarget(undefined);
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (map.current) {
      const layers = map.current.getLayers();
      layers.getArray()[0].setSource(BASEMAPS[currentBasemap].source);
    }
  }, [currentBasemap]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200 relative">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-md">
        <Select value={currentBasemap} onValueChange={setCurrentBasemap}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Escolha o mapa base" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(BASEMAPS).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MapComponent;