import User from "../models/User.model.js";

export const getDonors = async (req, res) => {
  let filter = { role: "donor"};
  if(Object.keys(req.query)?.length){
    const { bloodGroup, location, date, eligibility } = req.query
    const bloodGroupRegex = new RegExp(bloodGroup, "i")
    const locationRegex = new RegExp(location, "i")

    filter.bloodGroup = bloodGroupRegex
    filter.location = locationRegex
  }
  
  try {
    const donors = await User.find(filter)

    res.status(200).json(donors)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong!" })
  }
}

export const getDonor = async (req, res) => {

  const {donorId} = req.params;
  
  if (!donorId.match(/^[0-9a-fA-F]{24}$/)) return res.json({message: "No profile found"})

  try {
    const donor = await User.findOne({_id: donorId});
    
    res.status(200).json({donor})

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
}