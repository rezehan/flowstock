import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard  from '../pages/Dashboard.vue'
import Katalog    from '../pages/Katalog.vue'
import Inventory  from '../pages/Inventory.vue'
import Pembelian  from '../pages/Pembelian.vue'

const routes = [
  { path: '/',           redirect: '/dashboard' },
  { path: '/dashboard',  component: Dashboard,  name: 'Dashboard'  },
  { path: '/katalog',    component: Katalog,    name: 'Katalog'    },
  { path: '/inventory',  component: Inventory,  name: 'Inventory'  },
  { path: '/pembelian',  component: Pembelian,  name: 'Pembelian'  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
