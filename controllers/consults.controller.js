import WaitingList from "../models/WaitingList.model.js";


export const getWaitingList = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const list = await WaitingList.find({ doctorId });
    res.json(list);
  } catch (error) {
    console.log(error);
  }
};

export const handlePatients = (io, socket) => {
  console.log("hello i am connected!");

  socket.on("add-patient", async (patientInfo, waiting) => {

    // const serial = await WaitingList.countDocuments({
    //   doctorId: patientInfo.doctorId,
    // });

    const newPatient = await WaitingList.create(patientInfo);

    io.emit("patient-added", newPatient, waiting + 1);
  });

  socket.on("remove-patient", async (patientId, serial) => {
    await WaitingList.deleteOne({ patientId });
    io.emit("patient-removed", patientId, serial - 1);
  });
};
