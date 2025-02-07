"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subjectController_1 = __importDefault(require("../controllers/subjectController"));
const router = (0, express_1.Router)();
// Get all subjects for a specific school
router.get("/school/:schoolId", subjectController_1.default.getSubjectsBySchool);
// Get a specific subject by ID
router.get("/:id", subjectController_1.default.getSubjectById);
// Create a new subject
router.post("/", subjectController_1.default.createSubject);
// Update a subject by ID
router.put("/:id", subjectController_1.default.updateSubject);
// Delete a subject by ID
router.delete("/:id", subjectController_1.default.deleteSubject);
exports.default = router;
