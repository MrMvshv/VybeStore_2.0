import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const youtubeV3Api = createApi({
    reducerPath: 'youtubeV3Api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://youtube-v31.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '7d336a8b87msh603e2a5ed95cc86p1f2e50jsn98647fd536d8');
            headers.set('X-RapidAPI-Host', 'youtube-v31.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ 
            query: () => ({
                url: '/search',
                params: {
                    q: 'top music playlists this week',
                    part: 'snippet,id',
                    maxResults: '50',
                    order: 'date',
                    type: 'playlist',
                },
            })
        }),
    }),
});

export const {
    useGetTopChartsQuery,
} = youtubeV3Api;