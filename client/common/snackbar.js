export const showSnackbar = ({ message }) => {
  // Create a new alert element
  const alertElement = document.createElement("div");
  alertElement.className = "alert alert-info";
  alertElement.innerHTML = message;

  // Append the alert to the document body
  document.body.appendChild(alertElement);

  // Automatically remove the alert after 3 seconds (adjust as needed)
  setTimeout(() => {
    alertElement.remove();
  }, 3000);
};
