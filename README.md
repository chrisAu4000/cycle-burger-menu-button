<a name="MenuButton"></a>

## MenuButton(sources, props) ⇒ <code>Object</code>
Displays a Button that is able to be shown as button or as loading spinner.
---
Installation:
```bash
$ npm install --save git+https://github.com/chrisAu4000/cycle-burger-menu-button.git
```

**Kind**: global function  
**Returns**: <code>Object</code> - {
   DOM :: vtree,
   state$ :: Stream,
   toggle$ :: Stream
}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sources | <code>Object</code> |  | Source streams. |
| sources.DOM | <code>DOMSource</code> |  | DOMDriver to select elements and invoke events. |
| props | <code>Stream</code> |  | Contains the initial state of the HttpButton. |
| props.open | <code>String</code> |  | Determines if the button will be displayed as burger or X. |
| props.duration | <code>Number</code> |  | transition time from one appearance to the other. |
| [props.easing] | <code>function</code> | <code>linear ease</code> | xstream/extra/tween easing function. |

**Example** *(app.js)*  
```js
import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
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
const drivers = {
  DOM: makeDOMDriver('#app')
}
run(main, drivers)
```
