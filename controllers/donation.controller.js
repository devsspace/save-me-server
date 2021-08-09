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
        const skip =  parseInt(req.query.skip);
        
        const filter = {};
        if(role !== "admin") filter["askedBy._id"] = userId;
        if(req.query.bloodGroup) filter["askedTo.bloodGroup"] = req.query.bloodGroup;
        if(req.query.location) filter["askedTo.location"] = req.query.location;

        const data = await Donation.find(filter).sort({date: 1}).skip(skip).limit(limit);
        const total = await Donation.countDocuments(filter);
        // console.log(filter, skip, typeof limit);
        res.status(200).json({donors: data, total});
    } catch (error) {
        console.log(error);
        res.json({ message: error.message || "something went wrong" });
    }
};
