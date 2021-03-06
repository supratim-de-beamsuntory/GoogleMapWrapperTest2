import * as React from 'react';
import styles from './GoogleMapWrapperTest2.module.scss';
import { IGoogleMapWrapperTest2Props } from './IGoogleMapWrapperTest2Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MyMapComponent } from './MyMapComponent';
import NewMapComponent from './NewMapComponent';
import { MyMarker } from './MyMarker';
import { MapCluster } from './MapCluster';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

// export default class GoogleMapWrapperTest2 extends React.Component<IGoogleMapWrapperTest2Props, {}> {
export const GoogleMapWrapperTest2: React.VFC<IGoogleMapWrapperTest2Props> = () => {
  // const Header = () => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input
        type="number"
        id="zoom"
        name="zoom"
        value={zoom}
        onChange={(event) => setZoom(Number(event.target.value))}
      />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input
        type="number"
        id="lat"
        name="lat"
        value={center.lat}
        onChange={(event) =>
          setCenter({ ...center, lat: Number(event.target.value) })
        }
      />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input
        type="number"
        id="lng"
        name="lng"
        value={center.lng}
        onChange={(event) =>
          setCenter({ ...center, lng: Number(event.target.value) })
        }
      />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => (
        <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div id="map" style={{height : '500px', width: '1000px' }}></div>
      <Wrapper apiKey={"AIzaSyD0wAUgW8Zz3bPSY0ZvsrYxTpa5Gg8-b6Q"} render={render}>
      {/* <div id="map"></div> */}
        <MapCluster ></MapCluster>
        {/* <MyMapComponent
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <MyMarker key={i} position={latLng} />
          ))}
        </MyMapComponent> */}
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {/* {form} */}

      {/* <NewMapComponent
        center={center}
        onClick={onClick}
        onIdle={onIdle}
        zoom={zoom}
        style={{ flexGrow: "1", height: "100%" }}
      >
        {clicks.map((latLng, i) => (
          <MyMarker key={i} position={latLng} />
        ))}
      </NewMapComponent> */}

    </div>
  );
}
