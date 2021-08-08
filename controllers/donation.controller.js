import Donation from "../models/Donation.model.js";

export const askDonation = async (req, res) => {
    const donationInfo = req.body;
    const { userId } = req;

    try {
        if (donationInfo?.askedBy?._id != userId) return res.json({ message: "Unauthorized!" });

        const data = await Donation.create({ ...donationInfo, requestedBy: userId });

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.json({ message: error.message || "something went wrong" });
    }
};

export const getDonations = async (req, res) => {
    const { userId, role } = req;

    try {
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const data =
        role === "admin"
        ? await Donation.find({}).sort({date: 1}).skip(skip).limit(limit)
        : await Donation.find({ "askedBy._id": userId }).sort({date: 1}).skip(skip).limit(limit);
        // console.log(data);
        const total = await Donation.countDocuments({});
        res.status(200).json({donors: data, total});
    } catch (error) {
        console.log(error);
        res.json({ message: error.message || "something went wrong" });
    }
};
