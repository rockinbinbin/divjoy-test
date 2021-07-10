const requireAuth = require("./_require-auth.js");
const { getItem } = require("./_db.ts");

export default requireAuth(async (req, res) => {
  const authUser = req.user;
  const { id } = req.query;

  const item = await getItem(parseInt(id));

  if (!item) {
    return res.send({
      status: "error",
      message: "Item does not exist",
    });
  }

  // Make sure authenticated user is the item owner
  if (item.ownerId !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot fetch an item that you don't own",
    });
  }

  res.send({
    status: "success",
    data: item,
  });
});
