const AppRoutes = {
    Base: '/services',
    GetUser : '/get-user',
    RegisterUser: '/register-user',
    DeleteUser: '/delete-user/:id',
}
const ClientRoutes = {
    Base: '/client',
    Login : '/login',
    Register: '/register',
    Home:'/home'
}

module.exports = {ClientRoutes,AppRoutes};