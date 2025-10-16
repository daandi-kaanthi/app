import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoadedItems } from './TravelSlice';
import Request from '../../../Backend/apiCall.tsx';
import { type ApiError, type ApiSuccess } from '../../../Datatypes/interface';

export const fetchTravelPackagesApi = createAsyncThunk(
  'travelCollection/setLoadedItems',
  async (
    params: {
      pageSize?: number;
      page?: number;
      status?: string;
      location?: string | null;
      travelType?: string;
      category?: string | null; 
      select?: string;
      dateAvailabilities?: string;
    },
    { rejectWithValue, dispatch }: { rejectWithValue: (value: unknown) => unknown; dispatch: any }
  ) => {

    // Set loading state for each field
    dispatch(setLoadedItems({
      loading: true,
    }));

    try {
      const queryParams = new URLSearchParams();
      if (params?.status) queryParams.append('status', params.status);
      if (params?.location) queryParams.append('location', params.location);
      if (params?.category) queryParams.append('category', params.category);
      if (params?.pageSize) queryParams.append('pageSize', String(params.pageSize));
      if (params?.dateAvailabilities) queryParams.append('dateAvailabilities', params.dateAvailabilities);
      if (params?.travelType) queryParams.append('travelType', params.travelType);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.select) queryParams.append('select', params.select);

      const slug = queryParams.toString() ? `?${queryParams.toString()}` : '';

      const response = await Request({
        endpointId: "GET_TRAVEL_ITEMS",
        slug,
      });

      const { data, total, page, pageSize, totalPages } = response;

      dispatch(setLoadedItems({
        itemData: data,
        loading: false,
        pagination: {
          currentPage: page || 1,
          pageSize: pageSize || 10,
          totalItems: total || 0,
          totalPages: totalPages || 1,
        }
      }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Items fetched successfully',
        data: response.data,
      };

      return apiSuccess;
    } catch (error) {
      dispatch(setLoadedItems({
        loading: false,
      }));
      const castedError = error as ApiError;
      return rejectWithValue(
        typeof castedError?.error === 'string' ? castedError?.error : 'Unknown Error'
      );
    }
  }
);