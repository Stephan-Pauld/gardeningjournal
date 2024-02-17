"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const seasonSchema = new mongoose_1.default.Schema({
    name: String,
    plantingZone: String,
    lastFrostDate: String,
    seasonEndDate: String,
    notes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Note" }],
    plants: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Plant" }],
});
exports.Season = mongoose_1.default.model("Season", seasonSchema);
