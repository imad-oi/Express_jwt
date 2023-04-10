const  express = require("express");

const  {
    getPatients,
    createPatient,
    getPatient,
    deletePatient,
    updatePatient,
} = require( "../controllers/patient.controller.js");


const router = express.Router();



router.get("/", getPatients);
router.post("/", createPatient);
router.get("/:id", getPatient);
router.delete("/:id", deletePatient);
router.patch("/:id", updatePatient);

module.exports = router;
