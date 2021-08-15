import User from "../models/User.model.js";

export const getDoctors = async (req, res) => {
  let filter = { role: "doctor" };
  if (Object.keys(req.query)?.length) {
    const { bloodGroup, location, date, eligibility } = req.query;
    const bloodGroupRegex = new RegExp(bloodGroup, "i");
    const locationRegex = new RegExp(location, "i");

    filter.bloodGroup = bloodGroupRegex;
    filter.location = locationRegex;
  }

  try {
    const doctors = await User.find(filter);

    res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getDoctor = async (req, res) => {
  const { doctorId } = req.params;
  console.log(req.params)

  if (!doctorId.match(/^[0-9a-fA-F]{24}$/)) return res.json({ message: "No profile found" });


  try {
    const existingUser = await User.findOne({ _id: doctorId });
    if (!existingUser) return res.json({ message: "User doesn't exist!" });

    res.status(200).json(existingUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};