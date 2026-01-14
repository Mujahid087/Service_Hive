import { apiSlice } from "../apiSlices";

const BID_URL = "/bid";

export const bidApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 🔹 CREATE BID
    createBid: builder.mutation({
      query: (data) => ({
        url: BID_URL,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Bid"],
    }),

    // 🔹 GET BIDS BY GIG (Client view)
    getBidsByGig: builder.query({
      query: (gigId) => ({
        url: `${BID_URL}/${gigId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Bid"],
    }),

    // 🔹 HIRE BID
    hireBid: builder.mutation({
      query: (bidId) => ({
        url: `${BID_URL}/${bidId}/hire`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Bid", "Gig"],
    }),

    getMyBids: builder.query({
  query: () => ({
    url: "/bid/my",
    method: "GET",
    credentials: "include",
  }),
  providesTags: ["Bid"],
}),

getBidsReceived: builder.query({
  query: () => ({
    url: "/bid/received",
    method: "GET",
    credentials: "include",
  }),
  providesTags: ["Bid", "Gig"],
}),



  }),
});

export const {
  useCreateBidMutation,
  useGetBidsByGigQuery,
  useHireBidMutation,
  useGetMyBidsQuery,
  useGetBidsReceivedQuery
} = bidApiSlice;
