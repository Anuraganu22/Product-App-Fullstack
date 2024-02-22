function logout() {
    // Clear local storage
    localStorage.clear();
  
    // Navigate to the login page
    window.location.href = '/login'; // Replace '/login' with the actual URL of your login page
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
  
    logoutBtn.addEventListener('click', logout);
  });
  