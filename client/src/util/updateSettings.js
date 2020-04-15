import axios from "axios";

const updateSettings = async (data, type) => {
  try {
    const url =
      type === "accountInfo"
        ? "/api/users/updateMe "
        : "/api/users/updatePassword";

    const res = await axios.patch(url, data, { withCredentials: true });

    console.log("🥐 user update result: ", res);

    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export default updateSettings;
