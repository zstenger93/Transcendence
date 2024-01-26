import axios from "axios";

const userLogout = async ({ redirectUri }) => {
	console.log("userLogout", redirectUri);
	try {
		const token = localStorage.getItem("access");
		console.log(localStorage.getItem("access"));
		const response = await axios.post(
			`${redirectUri}/api/logout`,
			{},
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(response.data);
		localStorage.removeItem("refresh");
		localStorage.removeItem("access");
		console.log(localStorage.getItem("access"));
	} catch (error) {
		console.log(error);
	}
};

export default userLogout;
