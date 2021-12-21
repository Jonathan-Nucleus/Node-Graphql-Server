const { User, Product } = require("../../../../../database/index");
const { verifyUser } = require("../../../../../auth/authentication");

const removeProduct = async (_, args, context) => {
  const user = await verifyUser(context.auth);
  const product = await Product.findOne({
    _id: args._id,
  });
  try {
    const res = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $pull: {
          myCart: product._id,
        },
      },
      {
        new: true,
      }
    );
    res.save();
    return true;
  } catch (error) {
    console.log(`Error : ${error}`);
    return false;
  }
};

module.exports = { removeProduct };
