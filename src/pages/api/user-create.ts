import requireAuth from "./_require-auth";
import { createUser } from "./_db";

export default requireAuth(async (req, res) => {
  const authUser = req.user;
  const body = req.body;
  const uid = body.uid;
  delete body.uid;

  // Make sure authenticated user can only create themself in the database
  if (uid !== authUser.uid) {
    return res.send({
      status: "error",
      message: "Created user must have the same uid as authenticated user",
    });
  }
  await createUser(uid, body);

  res.send({
    status: "success",
  });
});