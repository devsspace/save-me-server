import Client from "twilio";
import Donation from "../models/Donation.model.js";

const sendTextMessage = async (askedTo, askedBy) => {
    const client = new Client(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN)
    
    try {
        const result = await client.messages.create({
            body: `Hello ${askedTo.name}, you have a donation request from ${askedBy.name}. Please contact at ${askedBy.phoneNumber}`,
            to: askedTo.phoneNumber,
            from: process.env.TWILIO_FROM_NUMBER
         });
        console.log(result);
        return result.sid ? true : false;
    } catch (error) {
        console.log(error);    
        return;
    } 
}

export const askDonation = async (req, res) => {
    const donationInfo = req.body;
    const { userId } = req;

    try {
        if (donationInfo?.askedBy?._id != userId) return res.json({ message: "Unauthorized!" });

        const data = await Donation.create({ ...donationInfo, requestedBy: userId });
        const done = sendTextMessage(data.askedTo, data.askedBy)
        if(done) return res.status(200).json(data);
        return res.json({message: "Something went wrong. Please try again."})
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
        const bloodGroup = new RegExp(req.query.bloodGroup.replace("+", "\\+"), "i"); // regex for ignoring case
        const location = new RegExp(req.query.location, "i");
        
        const filter = {};

        if (role !== "admin") filter["askedBy._id"] = userId;

        if (bloodGroup && !"all".match(bloodGroup)) filter["askedTo.bloodGroup"] = bloodGroup;
        
        if (location && !"all".match(location)) filter["askedTo.location"] = location;

        const data = await Donation.find(filter).sort({ date: 1 }).skip(skip).limit(limit);
        const total = await Donation.countDocuments(filter);
        
        res.status(200).json({ donors: data, total });

    } catch (error) {
        console.log(error);
        res.json({ message: error.message || "something went wrong" });
    }
};
