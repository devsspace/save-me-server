import BloodRequest from "../models/BloodRequest.model.js";

export const addBloodRequest = async (req, res) => {
  const reqInfo = req.body;

  try {
    const data = await BloodRequest.create(reqInfo);
    
    res.status(200).json(data);

  } catch (error) {
    console.log(error);
    res.json({ message: error.message || "something went wrong" });
  }
};

export const getRequests = async (req, res) => {
  const { userId, role } = req;
  let filter = {};

  try {
    if(!role.includes("admin")) filter["requestedBy._id"] = userId;

    const data = await BloodRequest.find(filter);

    res.status(200).json(data);

  } catch (error) {
    console.log(error);
    res.json({ message: error.message || "something went wrong" });
  }
};


export const updateRequest = async (req, res) => {
  const { requestId } = req.params;
  const requestInfo = req.body;

  try {
    // if (requestInfo?.askedBy?._id != userId) return res.json({ message: "Unauthorized!" });

    const data = await BloodRequest.updateOne(
      { _id: requestId },
      { status: requestInfo.status }
    );

    if (data.nModified) return res.status(200).json(requestInfo);

    return res.json({ message: "Nothing's Changed" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message || "something went wrong" });
  }
};