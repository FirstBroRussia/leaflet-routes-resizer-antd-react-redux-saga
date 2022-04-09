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
        loadingPointAddress: 'Москва Главный кремль',
      },
      {
        loadingPointAddress: 'Петербург Смольный храм',
      },
      {
        loadingPointAddress: 'Рязань Главная почта',
      },
      {
        loadingPointAddress: 'Сочи площадь Флага',
      },
    ],
    unloadingPoint: [
      {
        unloadingPointAddress: 'Москва площадь васильевский спуск',
      },
      {
        unloadingPointAddress: 'Химки Главнй стадион',
      },
      {
        unloadingPointAddress: 'Липецк Хлебкомбинат',
      },
      {
        unloadingPointAddress: 'Ростов на дону Ростов арена',
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
        loadingPointAddress: 'Москва Главный кремль',
      },
      {
        loadingPointAddress: 'Петербург Смольный храм',
      },
      {
        loadingPointAddress: 'Рязань Главная почта',
      },
      {
        loadingPointAddress: 'Сочи площадь Флага',
      },
    ],
    unloadingPoint: [
      {
        unloadingPointAddress: 'Москва тц Атриум',
      },
      {
        unloadingPointAddress: 'Химки Главнй стадион',
      },
      {
        unloadingPointAddress: 'Липецк Хлебкомбинат',
      },
      {
        unloadingPointAddress: 'Ростов на дону Ростов арена',
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
        loadingPointAddress: 'Москва Главный кремль',
      },
      {
        loadingPointAddress: 'Петербург Смольный храм',
      },
      {
        loadingPointAddress: 'Рязань Главная почта',
      },
      {
        loadingPointAddress: 'Сочи площадь Флага',
      },
    ],
    unloadingPoint: [
      {
        unloadingPointAddress: 'Москва тц Атриум',
      },
      {
        unloadingPointAddress: 'Химки Главнй стадион',
      },
      {
        unloadingPointAddress: 'Липецк Хлебкомбинат',
      },
      {
        unloadingPointAddress: 'Ростов на дону Ростов арена',
      },
    ],
  }
];
