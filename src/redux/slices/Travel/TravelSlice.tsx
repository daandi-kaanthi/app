import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { generateFutureDatesDynamic } from './dateGenerator';
import { mockTravelPackages } from './PackagesData';


export interface ITravelPackage {
  id: string;
  image: string;
  geoLocation: number[]
  dateAvailabilities?: DateAvailability[];
  images?: string[];
  videos?: IVideosResponse | any;
  travelType?: string
  translations: {
    en: TravelPackageTranslation;
    hi?: TravelPackageTranslation;
    es?: TravelPackageTranslation;
  };
}

export interface TravelPackageTranslation {
  title: string;
  subtitle?: string;
  overview?: Overview;
  activities?: string[];
  days?: Day[];
}

export interface IVideoItem {
  id: string;
  awsUrl: string;
}

export interface IVideosResponse {
  videoCount: number;
  allVideos?: IVideoItem[];
  randomVideo?: IVideoItem;
}

export interface DateAvailability {
  id?: string;
  startDate: number;
  endDate: number;
  maxTravelers: number;
  availableSpots: number;
  price: number;
  originalPrice?: number;
  travelPackageId?: string;
}

interface Day {
  day: number;
  title: string;
  activities: string[];
  stay: string;
  meals: string;
}

interface Overview {
  description: string;
  duration: string;
  pickup: string;
  destinations: string;
  bestTime: string;
  type: string;
}

export interface TravelState {
  travelPackages: ITravelPackage[];
  loading: boolean;
}

// Apply it
mockTravelPackages.forEach((pkg:ITravelPackage) => {
  pkg.dateAvailabilities = generateFutureDatesDynamic(pkg);
});

const initialState: TravelState = {
  travelPackages: mockTravelPackages,
  loading: false,
};

// -------------------------
// 🧭 Slice
// -------------------------
const travelSlice = createSlice({
  name: 'travelCollection',
  initialState,
  reducers: {
    setLoadedItems: (
      state,
      action: PayloadAction<{
        itemData?: ITravelPackage[];
        loading: boolean;
        pagination?: {
          currentPage: number;
          pageSize: number;
          totalItems: number;
          totalPages: number;
        };
      }>
    ) => {
      const { loading } = action.payload;

      state.loading = loading;

    },
  },
});

export const { setLoadedItems } = travelSlice.actions;

export default travelSlice.reducer;

export const selectedTravelPackages = (state: { travelCollection: TravelState }) =>
  state.travelCollection;




// Selector to get dateAvailabilities by travel package id
export const selectPackageDates = (id: string) => (state: { travelCollection: TravelState }) => {
  const pkg = state.travelCollection.travelPackages.find((item) => item.id === id);
  return pkg?.dateAvailabilities ?? [];
};

export type FlattenedTravelPackage = Omit<ITravelPackage, "translations"> &
  TravelPackageTranslation;

export const useSelectedTravelPackage = (id: string): FlattenedTravelPackage | undefined => {
  const { i18n } = useTranslation();
  const travelPackage = useSelector((state: { travelCollection: TravelState }) =>
    state.travelCollection.travelPackages.find((pkg) => pkg.id === id)
  );

  if (!travelPackage) return undefined;

  const lang = i18n.language as keyof typeof travelPackage.translations;
  const translation = travelPackage.translations[lang] || travelPackage.translations.en;

  return {
    ...travelPackage,
    ...translation,
  } as FlattenedTravelPackage;
};

