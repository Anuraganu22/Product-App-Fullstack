const AppQueries = {
    GetAllUserQueries: "SELECT * FROM users WHERE username=?",
    AddAUserQuery: "INSERT INTO users (username, password) VALUES (?, ?)",
    DeleteAUserQuery: "DELETE FROM users WHERE id=?",
    CheckUserExists: "SELECT * FROM users WHERE username=?",
    SearchUserName: "SELECT  id ,username FROM users WHERE username LIKE '?%' "

}

module.exports = AppQueries;