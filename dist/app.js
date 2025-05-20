"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/hello', (req, res) => {
    res.json({ message: "Hello World from Typescript" });
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
