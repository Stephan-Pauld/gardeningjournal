"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const plantResolvers_1 = require("./plantResolvers");
const seasonResolvers_1 = require("./seasonResolvers");
const noteResolvers_1 = require("./noteResolvers");
// Correctly combine resolvers
const resolvers = {
    Query: Object.assign(Object.assign(Object.assign({}, plantResolvers_1.plantResolvers.Query), seasonResolvers_1.seasonResolvers.Query), noteResolvers_1.noteResolvers.Query),
    Mutation: Object.assign(Object.assign(Object.assign({}, plantResolvers_1.plantResolvers.Mutation), seasonResolvers_1.seasonResolvers.Mutation), noteResolvers_1.noteResolvers.Mutation),
};
exports.resolvers = resolvers;
