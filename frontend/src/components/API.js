import axios from "axios";
import Cookies from "js-cookie";

export const fetchUserDetails = async (
  setUserDetails,
  setUsername,
  setImageUrl,
  redirectUri
) => {
  const response = await getUserDetails({ redirectUri });
  if (!response.data || response.data.user === undefined) {
    return;
  }
  setUserDetails(response.data.user);

  console.log(response.data.user);

  setUsername(response.data.user.username);

  if (response.data.user.profile_picture) {
    let url = decodeURIComponent(
      response.data.user.profile_picture.replace("/media/", "")
    ).replace(":", ":/");
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
