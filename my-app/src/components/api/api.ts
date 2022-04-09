import axios from "axios";
import { CoordinateType } from "../../store/slice/map-slice";

type YaGetGeocoordinateApiParamsType = {
  loadingCoordinates: CoordinateType,
  unloadingCoordinates: CoordinateType,
};

const DOUBLE_GIS_API_KEY = 'ruoxfy4628';
const YANDEX_API_KEY = 'b62e139a-08d2-42e6-b203-6bcc83ec4318';
const MAPBOX_API_KEY = 'pk.eyJ1IjoiZmlyc3Ricm9ydXNzaWEiLCJhIjoiY2wxcjJkOWFtMXFqODNrbzI4cGJ6aWFkNiJ9.LO_Kn_Rb6iASawhmHwqH5A';
const GRAPHHOPPER_API_KEY = '1131d90b-7ce0-4af0-80fd-bcf64502dd35';

type PointData = string;

export const DGgetGeocoordinateApi = async (pointData: PointData): Promise<any> => {
  try {
    const {data} = await axios.get(`https://catalog.api.2gis.com/3.0/items/geocode?q=${pointData}&fields=items.point&key=${DOUBLE_GIS_API_KEY}`);
    const point = data.result.items[0].point;
    return point;
  } catch (error) {
    console.log(error);
    // throw new Error(err);
  }
}

export const getPolylineCoordinateApi = async (pointsData: YaGetGeocoordinateApiParamsType) => {
  const {loadingCoordinates, unloadingCoordinates}: YaGetGeocoordinateApiParamsType = pointsData;
  const routingType = 'car';
  console.log(pointsData);
  const postData = {
    "points": [
      {
        "lon1": loadingCoordinates.lon,
        "lat1": loadingCoordinates.lat,
        "lon2": unloadingCoordinates.lon,
        "lat2": unloadingCoordinates.lat
      }
    ],
    "type": "shortest",
    "output": "full"
  };

  try {
    const {data} = await axios.post(`https://catalog.api.2gis.com/get_pairs/1.0/${routingType}?key={API_KEY}`, postData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};


export const yaGetGeocoordinateApi = async (pointData: PointData) => {
  try {
    const {data} = await axios.get(`https://geocode-maps.yandex.ru/1.x?geocode=${pointData}&apikey=${YANDEX_API_KEY}&format=json`);
    const coordinateText = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
    const coordinate = {
      lon: +coordinateText.split(' ')[0],
      lat: +coordinateText.split(' ')[1],
    };
    return coordinate;
  } catch (error) {
    console.log(error);
  }

}

export const mapBoxGetPolylineCoordinateApi = async (pointsData: YaGetGeocoordinateApiParamsType) => {
  const {loadingCoordinates, unloadingCoordinates}: YaGetGeocoordinateApiParamsType = pointsData;
  const routingType = 'mapbox/driving-traffic';

  try {
    const {data} = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${loadingCoordinates.lon},${loadingCoordinates.lat};${unloadingCoordinates.lon},${unloadingCoordinates.lat}?geometries=geojson&access_token=${MAPBOX_API_KEY}`);
    const coordinatesList = data.routes[0].geometry.coordinates;
    console.log(coordinatesList);
    return coordinatesList;
  } catch (error) {
    console.log(error);
  }
};

export const graphHopperGetPolylineCoordinateApi = async (pointsData: YaGetGeocoordinateApiParamsType) => {
  const {loadingCoordinates, unloadingCoordinates}: YaGetGeocoordinateApiParamsType = pointsData;
  const routingType = 'car';
  // console.log(pointsData);
  // const postData = {
  //   "points": [
  //     {
  //       "lon1": loadingCoordinates.lon,
  //       "lat1": loadingCoordinates.lat,
  //       "lon2": unloadingCoordinates.lon,
  //       "lat2": unloadingCoordinates.lat
  //     }
  //   ],
  //   "type": "shortest",
  //   "output": "full"
  // };

  try {
    const {data} = await axios.get(`https://graphhopper.com/api/1/route?point=${loadingCoordinates.lat},${loadingCoordinates.lon}&point=${unloadingCoordinates.lat},${unloadingCoordinates.lon}&profile=car&locale=ru&calc_points=false&points_encoded=false&key=${GRAPHHOPPER_API_KEY}`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
