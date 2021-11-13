import {
  ApolloClient,
  InMemoryCache, split
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createUploadLink } from 'apollo-upload-client';


const webSocketLink = new WebSocketLink({
  uri: 'ws://localhost:8080/subscriptions'
});


const URL = "http://localhost:8080/graphql";


const client = new ApolloClient({
  link: split((operation) => {
    return operation.operationName === "statusWatch"
  }, webSocketLink, createUploadLink({ uri: URL })),

  cache: new InMemoryCache()
})

export default client;
