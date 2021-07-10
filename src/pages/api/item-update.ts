const requireAuth = require("./_require-auth.js");
const { getItem, updateItem } = require("./_db.ts");

export default requireAuth(async (req, res) => {
  const authUser = req.user;
  const body = req.body;
  const { id } = req.query;

  const fetchedItem = await getItem(parseInt(id));

  if (!fetchedItem) {
    return res.send({
      status: "error",
      message: "Item does not exist",
    });
  }

  // Make sure authenticated user is the item owner
  if (fetchedItem.ownerId !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Cannot update an item that you don't own",
    });
  }

  await updateItem(parseInt(id), body);

  res.send({
    status: "success",
  });
});
