"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const index_1 = require("./typeDefs/index");
const index_2 = require("./resolvers/index");
const mongoose_1 = __importDefault(require("mongoose"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new apollo_server_express_1.ApolloServer({ typeDefs: index_1.typeDefs, resolvers: index_2.resolvers });
        yield server.start();
        const app = (0, express_1.default)();
        server.applyMiddleware({ app });
        mongoose_1.default
            .connect("mongodb://127.0.0.1:27017/garden", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log("Connected to MongoDB"))
            .catch((err) => console.error("Could not connect to MongoDB...", err));
        app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
    });
}
startServer();
