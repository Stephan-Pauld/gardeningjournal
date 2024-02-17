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
exports.plantResolvers = void 0;
const plantSchema_1 = require("../models/plantSchema");
const seasonSchema_1 = require("../models/seasonSchema");
exports.plantResolvers = {
    Query: {
        getAllPlants: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield plantSchema_1.Plant.find({});
            }
            catch (error) {
                throw new Error("Failed to fetch plants");
            }
        }),
        getPlantById: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield plantSchema_1.Plant.findById(id).populate("notes");
            }
            catch (error) {
                throw new Error("Failed to fetch plant");
            }
        }),
    },
    Mutation: {
        addPlantToSeason: (_, { name, variety, plantingDate, harvestDate, notes, seasonId }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const newPlant = new plantSchema_1.Plant({
                    name,
                    variety,
                    plantingDate,
                    harvestDate,
                    notes,
                });
                const savedPlant = yield newPlant.save();
                if (seasonId) {
                    yield seasonSchema_1.Season.findByIdAndUpdate(seasonId, {
                        $push: { plants: savedPlant._id },
                    }, { new: true });
                }
                return savedPlant;
            }
            catch (error) {
                console.log("Error adding plant to season:", error);
                throw new Error("Failed to add plant to season");
            }
        }),
        updatePlant: (_, { id, name, variety, plantingDate, harvestDate, notes }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield plantSchema_1.Plant.findByIdAndUpdate(id, { name, variety, plantingDate, harvestDate, notes }, { new: true });
            }
            catch (error) {
                throw new Error("Failed to update plant");
            }
        }),
    },
};
