import home from '@/assets/home.png'
import profile from '@/assets/profile.png'
import ranking from '@/assets/ranking.png'
import shop from '@/assets/shop.png'
import settings from '@/assets/settings.png'

const tabbars = [{
  title: 'Home',
  link: '/',
  icon: home,
  show: true,
  selected: true
},{
  title: 'Profile',
  link: '/profile',
  icon: profile,
  show: false,
  selected: false
},{
  title: 'Ranking',
  link: '/ranking',
  icon: ranking,
  show: false,
  selected: false
},{
  title: 'Shop',
  link: '/shop',
  icon: shop,
  show: false,
  selected: false
},{
  title: 'Settings',
  link: '/settings',
  icon: settings,
  show: false,
  selected: false
}]

export default tabbars
