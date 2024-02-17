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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seasonResolvers = void 0;
const seasonSchema_1 = require("../models/seasonSchema");
exports.seasonResolvers = {
    Plant: {
        // Convert MongoDB _id to GraphQL's id field for each Plant
        id: (plant) => plant._id.toString(),
        // id: (plant) => plant._id.toString(),
    },
    Query: {
        getAllSeasons: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                //TODO:
                // we dont need to populate notes for now
                // and really we dont need to get all plants... thats a bit insane
                // all we do is plants.length to display how many plants there is...
                // need to fix this
                return yield seasonSchema_1.Season.find({}).populate("plants");
            }
            catch (error) {
                throw new Error("Failed to fetch seasons");
            }
        }),
        //TODO:
        // this populate would limit 5 and bring back the 5 most recently created notes
        // sorted by createdAt (date), this could become helpful when/if we had dozens of plants or seasons
        // that have dozens of notes each...
        // .populate('notes', null, null, { limit: 5, sort: { createdAt: -1 } })
        getSeasonById: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield seasonSchema_1.Season.findById(id)
                    .populate("plants")
                    .populate("notes");
            }
            catch (error) {
                throw new Error("Failed to fetch season");
            }
        }),
    },
    Mutation: {
        addSeason: (_, { name, plantingZone, lastFrostDate, seasonEndDate, notes, plants }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newSeason = new seasonSchema_1.Season({
                    name,
                    plantingZone,
                    lastFrostDate,
                    seasonEndDate,
                    notes,
                    plants,
                });
                return yield newSeason.save();
            }
            catch (error) {
                console.log("err?", error);
                throw new Error("Failed to add season");
            }
        }),
        updateSeason: (_, { id, name, plantingZone, lastFrostDate, seasonEndDate, notes, plants }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield seasonSchema_1.Season.findByIdAndUpdate(id, { name, plantingZone, lastFrostDate, seasonEndDate, notes, plants }, { new: true });
            }
            catch (error) {
                throw new Error("Failed to update season");
            }
        }),
    },
};
