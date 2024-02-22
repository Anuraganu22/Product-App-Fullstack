function showSnackBox({ error, message }) {
  // Get the snackbar DIV
  const x = document.getElementById("snackbar");
  x.innerHTML = message;
  if (error) {
    x.classList.add("error");
  } else x.classList.add("success");
  // Add the "show" class to DIV
  x.classList.add("show");
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

function showLoader(status) {
  const x = document.getElementById("loader-container");
  if (status) x.classList.remove("d-none");
  else x.classList.add("d-none");
}

const loginUser = async (event) => {
  try {
    event.preventDefault(); // Prevent the default form submission behavior
    showLoader(true);

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("services/register-user", {
      method: "POST",
      body: JSON.stringify({ username: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    showLoader(false);

    if (response.status === 400) {
      const errorResponse = await response.json();
      showSnackBox({ error: true, message: errorResponse.message || "User already present!" });
    } else if (response.status === 200 || response.status === 201) {
      const responseData = await response.json();
      showSnackBox({ error: false, message: "Login successful!" });
      console.log(responseData, "Kkkkk");
      localStorage.setItem("token", responseData.token);
      window.location.href = '/home'; 
    } else {
      // Handle other status codes here
      showSnackBox({ error: true, message: "Unexpected error occurred" });
    }
    // Prevent the form from being submitted and refreshing the page
    return false;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};


