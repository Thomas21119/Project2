const txtUserNameSU = document.querySelector("#nameSignup");
const txtPasswordSU = document.querySelector("#passwordSignup");
const signUpFrm = document.querySelector("#signUpForm");

const signup = async (event) => {
  event.preventDefault();

  const username = txtUserNameSU.value.trim();
  const password = txtPasswordSU.value.trim();

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    //console.log(data["user"]["id"]);
    if (response.ok) {
      const walletResponse = await fetch("/api/wallet/createWallet", {
        // method: "POST",
        // body: JSON.stringify({}),
        // headers: { 
        //   "Content-Type": "application/json" 
        // },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (walletResponse.ok) {
        location.reload();
        window.location.replace("/dashboard");
      } else {
        alert(`Username already exist. Please try again.`);
        txtUserNameSU.value = '';
        txtPasswordSU.value = '';
        txtUserNameSU.focus();
        return;
      }

    } else {
      console.log(response.status);
    }
  }
};

txtUserNameSU.focus();

signUpFrm.addEventListener("submit", signup);
