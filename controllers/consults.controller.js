import WaitingList from "../models/WaitingList.model.js";


export const getWaitingList = async (req, res) => {
  try {
    const list = await WaitingList.find({});
    res.json(list)
  } catch (error) {}
}

export const handlePatients = (io, socket) => {
  console.log("hello i am connected!");

  socket.on("add-patient", async (patientInfo) => {
    const serial = await WaitingList.countDocuments({doctorId: patientInfo.doctorId})
    const newPatient = await WaitingList.create({...patientInfo, serial: serial + 1});
    
    io.emit("update-patient", newPatient);
  });
};
