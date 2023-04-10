const Patient = require("../models/Patient.js");
const bcrypt = require("bcrypt");

// get all patients
const getPatients = async (req, res) => {
  try {
    let patients = await Patient.findAll();

    if (!patients.length) {
      return res.status(404).json({ success: false, error: "no data found" });
    }

    res.status(200).json({ success: true, data: patients });
  } catch (error) {
    res.status(400).json({ success: false, error: err });
  }
};

//  create patient
const createPatient = async (req, res) => {
  const body = req.body;
  const { nom, prenom, email,  dateNaissance , pays , telephone } = req.body;

  if (!nom || !prenom || !email   || !dateNaissance || !pays || !telephone ) {
    return res.status(400).json({
      success: false,
      error: " Missing data ,You must provide a full data",
    });
  }

  try {
    let patient = await Patient.findOne({ where: { email: email } });

    if (patient) {
      return res
        .status(400)
        .json({ success: false, error: "Patient already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(password, salt);

      patient = await Patient.create(body);
      res
        .status(201)
        .json({ success: true, id: patient.id, message: "Patient created!" });
    
  } catch (error) {
    res.status(500).json({ err, message: "Database error ", error: err });
  }
};

// get patient by id
const getPatient = async (req, res) => {
  const patientId = parseInt(req.params.id);

  if (!patientId) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a patient id" });
  }
  try {
    let patient = await Patient.findOne({ where: { id: patientId } });

    if (!patient) {
      return res.status(404).json({ success: false, error: `Patient not found` });
    }
    return res.status(200).json({ success: true, data: patient });

  } catch (error) {
    res.status(400).json({ success: false, error: err });
  }
};


// update patient
const updatePatient = async (req, res) => {
  const patientId = parseInt(req.params.id);
  console.log(patientId);
  const { nom, prenom, email , telephone , sexe , dateNaissance  , pays } = req.body;
  console.log(req.body);

  if (!nom || !prenom || !email || !telephone || !sexe || !dateNaissance || !pays) {
    return res.status(400).json({ success: false, error: "Missing data ! " });
  }

  try {
    let patient = await Patient.findOne({ where: { id: patientId }});
    
    if (!patient) {
      throw new Error("Patient not found!");
    }
    patient.nom = nom;
    patient.email = email;
    patient.prenom = prenom;
    patient.telephone = telephone;
    patient.sexe = sexe;
    patient.dateNaissance = dateNaissance;
    patient.pays = pays;

  
    // const salt = await bcrypt.genSalt(10);
    // patient.password = await bcrypt.hash(password, salt);
   
      patient = await patient.save();
      const data = await Patient.findAll();
      res.status(200).json({ success: true, id: patient.id, message: "Patient updated!" , data : data });
    
  } catch (error) {
    res.status(500).json({ message: "Database error: "+error, });
  }
};

// delete patient
const deletePatient = async (req, res) => {
  let patientId = parseInt(req.params.id);
  if (!patientId) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide a patient id" });
  }

  Patient.destroy({ where: { id: patientId }, force: true })
    .then((data) =>
      res.status(200).json({ success: true, message: `${data} Patient deleted!` })
    )
    .catch((error) =>
      res
        .status(500)
        .json({ error, message: " Database error: Patient not deleted!" })
    );
};

module.exports = {
  getPatients,
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
};
