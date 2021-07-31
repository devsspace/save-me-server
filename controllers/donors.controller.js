import User from "../models/User.model.js"

export const getDonors = async (req, res) => {
  const { bloodGroup, location, date, eligibility } = req.query
  const bloodGroupRegex = new RegExp(bloodGroup, "i")
  const locationRegex = new RegExp(location, "i")
  try {
    const donors = await User.find({
      role: "donor",
      bloodGroup: bloodGroupRegex,
      location: locationRegex,
    })
    console.log(donors)

    res.status(200).json(donors)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong!" })
  }
}
