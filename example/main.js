import xs from 'xstream'
import tween from 'xstream/extra/tween'
import delay from 'xstream/extra/delay'
import MenuButton from '../src/index'

function main(sources) {
  const props$ = xs.of({
    open: false,
    duration: 250,
    easing: tween.power4.easeOut
  })
  const menuButton = MenuButton(sources, props$)
  return {
    DOM: menuButton.DOM
  }
}

export default main
