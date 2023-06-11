import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core7.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '07d336a8b87msh603e2a5ed95cc86p1f2e50jsn98647fd536d8')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/get-top-songs-in-world'}),
        getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${ songid }`}),
        getSongRelated: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${ songid }`}),
    }),
  });

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
} = shazamCoreApi;