"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoteSchema = exports.createNoteSchema = void 0;
const zod_1 = require("zod");
exports.createNoteSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
    content: zod_1.z.string().min(1, 'Content is required')
});
exports.updateNoteSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less').optional(),
    content: zod_1.z.string().min(1, 'Content is required').optional()
});
//# sourceMappingURL=validation.js.map