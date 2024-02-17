"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const plant_1 = require("./plant");
const season_1 = require("./season");
const note_1 = require("./note");
const typeDefs = [plant_1.plantTypeDefs, season_1.seasonTypeDefs, note_1.noteTypeDefs];
exports.typeDefs = typeDefs;
