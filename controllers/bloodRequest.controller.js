import BloodRequest from "../models/BloodRequest.model.js";

export const addBloodRequest = async (req, res) => {
  const reqInfo = req.body;

  try {
    const data = await BloodRequest.create({...reqInfo, requestedBy: req.userId})
    
    res.status(200).json(data)

  } catch (error) {
    console.log(error)
    res.json({message: error.message || "something went wrong"})
  }
} 