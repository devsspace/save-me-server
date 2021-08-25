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

export const handleVideoChat = (io, socket) => {
  socket.on("start-call", (userId, doctorId) => {
    socket.emit("me", userId);
    socket.join(doctorId)
  })

    socket.on("disconnect", () => {
    });
    socket.on("callEnded", () => {
      socket.broadcast.emit("callEnded");
    })

    socket.on("callUser", ({ userToCall, signalData, from, docName, patientName }) => {
      console.log("Calling: "+ from + " ===>" + userToCall)
      console.log("Calling: "+ docName + " ===>" + patientName)
      
      io.to(from).emit("callUser", { signal: signalData, from, docName, patientName });
    });
    socket.on("answerCall", ({signal, to}) => {
      io.to(to).emit("callAccepted", signal);
    });
    socket.on("cm", (camera, mic) => {
      socket.broadcast.emit("cm", camera, mic)
    })
}
