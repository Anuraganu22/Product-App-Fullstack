const AppRoutes = {
    Base: '/services',
    GetUser : '/get-user',
    RegisterUser: '/register-user',
    DeleteUser: '/delete-user/:id',
    Products:'/productslist',
    ViewWishList:'/viewwishlist/:userId',
    WishList:'/wishlist',
    DeleteWishListItem:'/wishlist/:productId/:userId'
    
}
const ClientRoutes = {
    Base: '/client',
    Login : '/login',
    Register: '/register',
    Home:'/home',
    Order:'/order',
    Cart:'/cart',
    WishList:'/WishListPage'
}

module.exports = {ClientRoutes,AppRoutes};