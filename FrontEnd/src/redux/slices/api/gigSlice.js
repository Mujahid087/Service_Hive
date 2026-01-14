import { apiSlice } from "../apiSlices";

const GIG_URL = "/gig";

export const gigApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 🔹 GET ALL GIGS
     browseGigs: builder.query({
      query: ({ search = "", status = "all" }) => ({
        url: `${GIG_URL}?search=${search}&status=${status}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Gig"],
    }),

    // 🔹 CREATE GIG
    createGig: builder.mutation({
      query: (data) => ({
        url: GIG_URL,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Gig"],
    }),
    getMyGigs: builder.query({
      query: () => ({
        url: "/gig/my",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Gig"],
    }),

    getGigById: builder.query({
  query: (id) => ({
    url: `/gig/${id}`,
    method: "GET",
    credentials: "include",
  }),
}),



  }),
});

export const {
  useBrowseGigsQuery,
  useCreateGigMutation,
   useGetMyGigsQuery,
   useGetGigByIdQuery
} = gigApiSlice;
