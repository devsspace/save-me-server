import User from "../models/User.model.js";


export const getDonors = async (req, res) => {
    const {bloodGroup, location, date, eligibility} = req.query;

    try {
        const donors = await User.find({ role: "donor", bloodGroup, location });

        res.status(200).json(donors);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}
