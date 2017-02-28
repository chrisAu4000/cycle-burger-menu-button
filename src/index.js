import xs from 'xstream'
import intent from './intent'
import model from './model'
import view from './view'
/**
 * Displays a Button that is able to be shown as button or as loading spinner.
 * ---
 * Installation:
 * ```bash
 * $ npm install --save git+https://github.com/chrisAu4000/cycle-burger-menu-button.git
 * ```
 * @param {Object} sources - Source streams.
 * @param {DOMSource} sources.DOM - DOMDriver to select elements and invoke events.
 * @param {Stream} props - Contains the initial state of the HttpButton.
 * @param {String} props.open - Determines if the button will be displayed as burger or X.
 * @param {Number} props.duration - transition time from one appearance to the other.
 * @param {Function} [props.easing = linear ease] - xstream/extra/tween easing function.
 * @returns {Object} {
 *    DOM :: vtree,
 *    state$ :: Stream,
 *    toggle$ :: Stream
 * }
 * @example <caption>app.js</caption>
 * import {run} from '@cycle/xstream-run'
 * import {makeDOMDriver} from '@cycle/dom'
 * import xs from 'xstream'
 * import tween from 'xstream/extra/tween'
 * import delay from 'xstream/extra/delay'
 * import MenuButton from '../src/index'
 *
 * function main(sources) {
 *   const props$ = xs.of({
 *     open: false,
 *     duration: 250,
 *     easing: tween.power4.easeOut
 *   })
 *   const menuButton = MenuButton(sources, props$)
 *   return {
 *     DOM: menuButton.DOM
 *   }
 * }
 * const drivers = {
 *   DOM: makeDOMDriver('#app')
 * }
 * run(main, drivers)
**/

const MenuButton = (sources, props$) => {
  const bypass$ = xs.create().mapTo(null)
  const actions = intent(sources)
  const state$ = model(props$, actions)
  const vtree$ = view(state$)
  return {
    DOM: vtree$,
    state$: actions.click$,
    toggle$: bypass$
  }
}

export default MenuButton
