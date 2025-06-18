/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const OrdersController = () => import('#controllers/orders_controller')

router
  .group(() => {
    router.get('/orders', [OrdersController, 'index'])
    router.post('/orders', [OrdersController, 'store'])
    router.get('/orders/:id', [OrdersController, 'show'])
  })
  .prefix('/api/v1')
