import { defineApolloClient } from "@nuxtjs/apollo";
export default defineApolloClient({
    httpEndpoint: process.env.VITE_GRAPH_URL,
    // tokenStorage: "cookie",
    // authHeader: "Authorization",
    // tokenName: "PrimaryToken",
    // httpLinkOptions: {},
    defaultOptions: {},
    inMemoryCacheOptions: {},
});