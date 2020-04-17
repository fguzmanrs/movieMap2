import axios from "axios";

const updateSettings = async (data, type) => {
  try {
    const url =
      type === "accountInfo"
        ? "http://localhost:3000/api/users/updateMe "
        : "http://localhost:3000/api/users/updatePassword";

    const res = await axios.patch(url, data, { withCredentials: true });
    console.log("🥐updated user info:", res);

    return res.data;

    if (res.data.status === "success") {
      //   showAlert('success', `${type.toUpperCase()} updated successfully!`);
      console.log(res);
    }
  } catch (err) {
    // showAlert('error', err.response.data.message);
    console.log(err);
  }
};

export default updateSettings;
