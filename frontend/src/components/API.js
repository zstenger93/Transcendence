import axios from "axios";
import Cookies from "js-cookie";

export const getFriendList = async ({ redirectUri }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.get(`${redirectUri}/api/friends/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const blockUser = async ({ redirectUri, userName }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.get(`${redirectUri}/api/friend/block/${userName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const unblockUser = async ({ redirectUri, userName }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.get(
      `${redirectUri}/api/friend/unblock/${userName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const friendRequest = async ({ redirectUri, userName }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
	console.log("uname ", userName.userName);
	console.log("uri ", redirectUri);
    response = await axios.get(
      `${redirectUri}/api/friend/add/${userName.userName}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  console.log(response);
  return response;
};

export const getBlockedUsers = async ({ redirectUri }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.get(`${redirectUri}/api/friend/blocks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const getUserProfile = async ({ redirectUri, userName }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.get(`${redirectUri}/api/user_data/${userName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const fetchUserDetails = async (
  setUserDetails,
  setUsername,
  setImageUrl,
  redirectUri
) => {
  const response = await getUserDetails({ redirectUri });
  setUserDetails(response.data.user);
  setUsername(response.data.user.username);
  if (response.data.user.profile_picture) {
    let url = response.data.user.profile_picture;
    setImageUrl(url);
  }
};

export const getUserDetails = async ({ redirectUri }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.get(`${redirectUri}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const changeUsername = async ({ redirectUri, username }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.post(
      `${redirectUri}/api/updateProfile`,
      { username: username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const changeAbout = async ({ redirectUri, about }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.post(
      `${redirectUri}/api/updateProfile`,
      { AboutMe: about },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const changePassword = async ({ redirectUri, password }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.post(
      `${redirectUri}/api/updateProfile`,
      { password: password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const changeAvatar = async ({ redirectUri, file }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    const formData = new FormData();
    formData.append("profile_picture", file);

    response = await axios.post(`${redirectUri}/api/updateProfile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const activate2FA = async ({ redirectUri }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.post(
      `${redirectUri}/api/activateTwoFa`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const deactivate2FA = async ({ redirectUri }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.post(
      `${redirectUri}/api/deactivateTwoFa`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};

export const deleteAccount = async ({ redirectUri }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.post(
      `${redirectUri}/api/accountDeletion`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  return response;
};
