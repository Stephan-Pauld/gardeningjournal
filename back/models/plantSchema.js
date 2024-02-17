"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plant = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const plantSchema = new mongoose_1.default.Schema({
    name: String,
    variety: String,
    plantingDate: String,
    harvestDate: String,
    notes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Note" }],
});
exports.Plant = mongoose_1.default.model("Plant", plantSchema);
