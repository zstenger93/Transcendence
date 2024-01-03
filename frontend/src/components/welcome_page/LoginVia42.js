import React from "react";

const OAuth = async ({ navigate, redirect_uri }) => {
  const auth = `${redirect_uri}/api/is_authenticated/`
  let response = await fetch(auth, {
    credentials: "include",
  });

  console.log(redirect_uri);
  console.log(`${redirect_uri}/api/oauth/authorize/`);
  let data = await response.json();

  if (!data.is_authenticated) {
    const authWindow = window.open(
      `${redirect_uri}/api/oauth/authorize/`
    );
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== redirect_uri) {
          return;
        }
        if (event.data.is_authenticated) {
          authWindow.close();
          navigate("/home");
        }
      },
      false
    );
  }
  navigate("/home");
};

const LoginButton = ({ t, navigate, redirect_uri }) => {
  return (
    <button
      onClick={() => OAuth({ navigate, redirect_uri })}
      className="bg-gray-900 text-gray-300 font-nosifer font-bold 
		px-4 py-2 rounded cursor-pointer hover:bg-gray-900 hover:bg-opacity-70
		border-b-2 border-r-2 border-purple-500"
    >
      {t("Sign In via 42")}
    </button>
  );
};

export default LoginButton;
