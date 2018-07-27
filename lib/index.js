"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tuple_1 = __importDefault(require("./erlang-types/tuple"));
const pid_1 = __importDefault(require("./erlang-types/pid"));
const reference_1 = __importDefault(require("./erlang-types/reference"));
const bit_string_1 = __importDefault(require("./erlang-types/bit_string"));
exports.default = {
    Tuple: tuple_1.default,
    PID: pid_1.default,
    Reference: reference_1.default,
    BitString: bit_string_1.default,
};
