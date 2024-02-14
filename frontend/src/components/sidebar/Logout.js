import axios from "axios";

const userLogout = async ({ redirectUri }) => {
  try {
    const token = localStorage.getItem("access");
    await axios.post(
      `${redirectUri}/api/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("access");
  } catch (error) {
    console.log(error);
  }
};

export default userLogout;
