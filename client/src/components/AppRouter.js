import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Shop from '../pages/Shop.js'
import Login from '../pages/Login.js'
import Signup from '../pages/Signup.js'
import Basket from '../pages/Basket.js'
import Checkout from '../pages/Checkout.js'
import Delivery from '../pages/Delivery.js'
import Device from '../pages/Device.js'
import Contacts from '../pages/Contacts.js'
import NotFound from '../pages/NotFound.js'
import User from '../pages/User.js'
import UserOrder from '../pages/UserOrder.js'
import UserOrders from '../pages/UserOrders.js'
import Admin from '../pages/Admin.js'
import AdminOrder from '../pages/AdminOrder.js'
import AdminOrders from '../pages/AdminOrders.js'
import AdminTypes from '../pages/AdminTypes.js'
import AdminBrands from '../pages/AdminBrands.js'
import AdminDevices from '../pages/AdminDevices.js'
import { AppContext } from './AppContext.js'


const publicRoutes = [
    {path: '/', Component: Shop},
    {path: '/login', Component: Login},
    {path: '/signup', Component: Signup},
    {path: '/device/:id', Component: Device},
    {path: '/basket', Component: Basket},
    {path: '/checkout', Component: Checkout},
    {path: '/delivery', Component: Delivery},
    {path: '/contacts', Component: Contacts},
    {path: '*', Component: NotFound},
]


const authRoutes = [
    {path: '/user', Component: User},
    {path: '/user/orders', Component: UserOrders},
    {path: '/user/order/:id', Component: UserOrder},
]

const adminRoutes = [
    {path: '/admin', Component: Admin},
    {path: '/admin/orders', Component: AdminOrders},
    {path: '/admin/order/:id', Component: AdminOrder},
    {path: '/admin/types', Component: AdminTypes},
    {path: '/admin/brands', Component: AdminBrands},
    {path: '/admin/devices', Component: AdminDevices},
]


const AppRouter = observer(() => {
    const { user } = useContext(AppContext)
  return (
    <Routes>
        {publicRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={<Component />} />
        )}
        {user.isAuth && authRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={<Component />} />
        )}
        {user.isAdmin && adminRoutes.map(({path, Component}) => 
            <Route key={path} path={path} element={<Component />} />
        )}
    </Routes>
  );
})


export default AppRouter;