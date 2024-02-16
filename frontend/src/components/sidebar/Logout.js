import axios from "axios";
import Cookies from "js-cookie";

const userLogout = async ({ redirectUri }) => {
	try {
		const token = Cookies.get('access');
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

		if (response.status === 200) {
			Cookies.remove('access');
		} else {
			console.log('Logout failed', response);
		}
	} catch (error) {
		console.log(error);
	}
};

export default userLogout;
