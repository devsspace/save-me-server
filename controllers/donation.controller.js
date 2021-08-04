import Donation from "../models/Donation.model.js";

export const askDonation = async (req, res) => {
  const donationInfo = req.body;
  const {userId} = req

  try {
    if(donationInfo?.askedBy?._id != userId) return res.json({message: "Unauthorized!"})

    const data = await Donation.create({...donationInfo, requestedBy: userId})
    
    res.status(200).json(data)

  } catch (error) {
    console.log(error)
    res.json({message: error.message || "something went wrong"})
  }
} 