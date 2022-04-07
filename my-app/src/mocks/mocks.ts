export type LoadingPointType = {
  loadingPointAddress: string,
  lat?: number, // Широта
  lng?: number, // Долгота
};

export type UnloadingPointType = {
  unloadingPointAddress: string,
  lat?: number,
  lng?: number,
};

export type DataType = {
  readonly key: number
  readonly title: string,
  currentLoadingPoint: string,
  currentUnloadingPoint: string,
  loadingPoint: LoadingPointType[],
  unloadingPoint: UnloadingPointType[],
};

export const dataSource: DataType[] = [
  {
    key: 1,
    title: 'Заявка 1',
    currentLoadingPoint: '',
    currentUnloadingPoint: '',
    loadingPoint: [
      {
        loadingPointAddress: 'aaaaaa',
      },
      {
        loadingPointAddress: 'bbb',
      },
      {
        loadingPointAddress: 'cccc',
      },
      {
        loadingPointAddress: 'dddd',
      },
    ],
    unloadingPoint: [
      {
        unloadingPointAddress: 'zzz',
      },
      {
        unloadingPointAddress: 'xxxx',
      },
      {
        unloadingPointAddress: 'ccc',
      },
      {
        unloadingPointAddress: 'vvvv',
      },
    ],
  },
  {
    key: 2,
    title: 'Заявка 2',
    currentLoadingPoint: '',
    currentUnloadingPoint: '',
    loadingPoint: [
      {
        loadingPointAddress: 'hghhg',
      },
      {
        loadingPointAddress: 'jhgjg',
      },
      {
        loadingPointAddress: 'drtrd',
      },
      {
        loadingPointAddress: 'fdgdfgfd',
      },
    ],
    unloadingPoint: [
      {
        unloadingPointAddress: 'ujjuuj',
      },
      {
        unloadingPointAddress: 'uuytuyt',
      },
      {
        unloadingPointAddress: 'jghmnbv',
      },
      {
        unloadingPointAddress: 'kuikuy',
      },
    ],
  },
  {
    key: 3,
    title: 'Заявка 3',
    currentLoadingPoint: '',
    currentUnloadingPoint: '',
    loadingPoint: [
      {
        loadingPointAddress: 'retre',
      },
      {
        loadingPointAddress: 'hhhgnvbnvb',
      },
      {
        loadingPointAddress: 'dd',
      },
      {
        loadingPointAddress: 'rrr',
      },
    ],
    unloadingPoint: [
      {
        unloadingPointAddress: 'ee',
      },
      {
        unloadingPointAddress: 'rr',
      },
      {
        unloadingPointAddress: 'tt',
      },
      {
        unloadingPointAddress: 'yy',
      },
    ],
  }
];
