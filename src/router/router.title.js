let routerTitle = {
  Home: 'Home',
  NewGame: '新游戏',
  Game: '游戏',
  Play: '游戏'
}

export default function getRouterTitle(name, title = routerTitle) {
  if(routerTitle[name] !== undefined && routerTitle[name]) {
    return routerTitle[name]
  } else {
    return 'Fightlist';
  }
}
