import axios from "axios";
import Cookies from "js-cookie";


export const getGameRoom = async ({ redirectUri, roomName }) => {
	let response = {};
	try {
    const token = Cookies.get("access");
    const csrfToken = Cookies.get("csrftoken");
	  response = await axios.get(`${redirectUri}/game/1v1/asdfasdf/`, {
		headers: {
		  Authorization: `Bearer ${token}`,
		},
		withCredentials: true,
	  });
	} catch (error) {
	  console.log(error);
	}
	return response.data;
  };

export const addUserToFriendList = async ({ redirectUri, userName }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    const csrfToken = Cookies.get("csrftoken");
    response = await axios.get(
      `${redirectUri}/api/friend/add/${userName}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
  console.log(response);
  const parser = new DOMParser();
  const doc = parser.parseFromString(response.data, "text/html");

  const csrfTokenInput = doc.querySelector('input[name="csrfmiddlewaretoken"]');
  const csrfTokenValue = csrfTokenInput ? csrfTokenInput.value : null;
  Cookies.set("csrftoken", csrfTokenValue);
  console.log(csrfTokenValue);
  try {
    const token = Cookies.get("access");
    response = await axios.post(
      `${redirectUri}/api/friend/add/${userName}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRFToken": csrfTokenValue,
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
//   let requests = {};
//   try {
//     const token = Cookies.get("access");
//     requests = await axios.get(
//       `${redirectUri}/api/friend/requests/`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "X-CSRFToken": csrfTokenValue,
//         },
//         withCredentials: true,
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
//   console.log(requests);
//   try {
//     const token = Cookies.get("access");
//     response = await axios.post(
//       `${redirectUri}/api/friend/accept/${requests.data[0].id}/`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "X-CSRFToken": csrfTokenValue,
//         },
//         withCredentials: true,
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }

  return response;
};

export const getFriendList = async ({ redirectUri, userName }) => {
  let response = {};
  try {
    const token = Cookies.get("access");
    response = await axios.get(`${redirectUri}/api/friends/${userName}/`, {
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
