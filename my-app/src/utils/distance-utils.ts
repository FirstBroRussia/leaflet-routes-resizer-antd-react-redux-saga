const enum Distance {
  is6000km = 6000000,
  is3000km = 3000000,
  is1200km = 1200000,
  is800km = 800000,
  is350km = 350000,
  is180km = 180000,
  is120km = 120000,
  is60km = 600000,
  is25km = 25000,
  is15km = 15000,
  is7km = 7000,
  is2km = 2000,
  is1000m = 1000,
  is500m = 500,
  is250m = 250,
};

function toRadian(degree: any) {
  return degree*Math.PI/180;
}

export const getDistance = (origin: any, destination: any) => { // ЭТУ ФУНКЦИЮ Я С ИНЕТА ВЗЯЛ, НО ТОЛЬКО ЭТУ ОДНУ
  const lon1 = toRadian(origin[1]);
  const lat1 = toRadian(origin[0]);
  const lon2 = toRadian(destination[1]);
  const lat2 = toRadian(destination[0]);

  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
};


export const betweenPoints = (origin: any, destination: any) => {
  const lon1 = origin[1];
  const lat1 = origin[0];
  const lon2 = destination[1];
  const lat2 = destination[0];

  const averageLat = lat1 + (lat2 - lat1)/2;
  const averageLon = lon1 + (lon2 - lon1)/2;

  return [averageLat, averageLon]
};

export const getZoom = (distance: number): number => {
  switch (true) {
    case (Distance.is6000km > distance && distance > Distance.is3000km): return 4;
    case (Distance.is3000km > distance && distance > Distance.is1200km): return 5;
    case (Distance.is1200km > distance && distance > Distance.is800km): return 6;
    case (Distance.is800km > distance && distance > Distance.is350km): return 7;
    case (Distance.is350km > distance && distance > Distance.is180km): return 8;
    case (Distance.is180km > distance && distance > Distance.is120km): return 9;
    case (Distance.is120km > distance && distance > Distance.is60km): return 10;
    case (Distance.is60km > distance && distance > Distance.is25km): return 11;
    case (Distance.is25km > distance && distance > Distance.is15km): return 12;
    case (Distance.is15km > distance && distance > Distance.is7km): return 13;
    case (Distance.is7km > distance && distance > Distance.is2km): return 14;
    case (Distance.is2km > distance && distance > Distance.is1000m): return 15;
    case (Distance.is1000m > distance && distance > Distance.is500m): return 16;
    case (Distance.is500m > distance && distance > Distance.is250m): return 17;
    case (distance < Distance.is250m): return 18;
    default: return 1;
  }
};
