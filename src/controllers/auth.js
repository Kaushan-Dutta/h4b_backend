const { entityModel } = require("../models/entity");
const md5 = require("md5");
const {generateToken}=require('../middleware/index');

async function accountLogin(req, res) {
  try {
    const { email, password } = req.body;
    const account = await entityModel.findOne({ email });
    if (account) {
      if (account.password === md5(password)) {
        const token=generateToken({_id:account._id,email,role:account.role});
        return res.status(200).json({ message: "Login successful" , token:token});
      }
    }
    return res.status(401).json({ message: "Login failed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
async function accountSignup(req, res) {
  try {
    const { email, password } = req.body;
    const hashedPassword = md5(password);
    const account = new entityModel({ email, password:hashedPassword });
    await account.save();
    return res.status(201).json({ message: "Account created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports = { accountLogin, accountSignup };
