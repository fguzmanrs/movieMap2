import axios from "axios";

const updateSettings = async (data, type) => {
  let res = {};
  try {
    const url =
      type === "accountInfo"
        ? "/api/users/updateMe "
        : "/api/users/updatePassword";

    res = await axios.patch(url, data, { withCredentials: true });

    console.log("🥐 user update result: ", res);

    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("🚨ERROR! err, res.data: ", err, res.data);
    return err;
  }
};

export default updateSettings;
