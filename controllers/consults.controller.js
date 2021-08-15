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
    const newPatient = await WaitingList.create(patientInfo);
    
    io.emit("update-patient", newPatient);
  });
};
