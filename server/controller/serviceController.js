const { ObjectId } = require("mongodb");
const {
  getServiceServices,
  getServiceServicesById,
} = require("../services/serviceServices");

exports.getServices = async (req, res) => {
  try {
    const services = await getServiceServices();
    if (!services.length) {
      return res.send({ status: false, data: "No data found" });
    }
    res.json({ status: true, services });
  } catch (error) {
    console.log(error);
  }
};
exports.getServiceById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.send({
      success: false,
      message: "Id is not valid",
    });
  }
  try {
    const service = await getServiceServicesById(id);
    res.json({
      success: true,
      service,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
};
