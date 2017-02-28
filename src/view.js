import xs from 'xstream'
import {curry, compose, not} from 'ramda'
import {div, h} from '@cycle/dom'

const reverseFrom = curry((from, transition) => (from - transition))
const reverse50 = reverseFrom(50)
const less50 = x => x < 50
const more50 = compose(not, less50)

const dom = ({l1x1, l1y1, l1x2, l1y2,
              l2x1, l2y1, l2x2, l2y2,
              l3x1, l3y1, l3x2, l3y2}) =>
  div('.menuButton', [
    h('svg', [
      h('line', {attrs: {
        x1: l1x1 + '%',
        y1: l1y1 + '%',
        x2: l1x2 + '%',
        y2: l1y2 + '%',
        'stroke-width': '10%',
        'stroke-linecap': 'round'
      }}),
      h('line', {attrs: {
        x1: l2x1 + '%',
        y1: l2y1 + '%',
        x2: l2x2 + '%',
        y2: l2y2 + '%',
        'stroke-width': '10%',
        'stroke-linecap': 'round'
      }}),
      h('line', {attrs: {
        x1: l3x1 + '%',
        y1: l3y1 + '%',
        x2: l3x2 + '%',
        y2: l3y2 + '%' ,
        'stroke-width': '10%',
        'stroke-linecap': 'round'
      }})
    ])
  ])
// open === X      = 100
// close == Burger = 0
const view = (state$) => {
  const rememberedState$ = state$.remember()
  // from X to nothing
  const seq1 = rememberedState$
    .filter(less50)
    .map(transition => ({
      l1x1: transition + 5,
      l1y1: transition + 5,
      l1x2: reverse50(transition) + 45,
      l1y2: reverse50(transition) + 45,
      l2x1: 50,
      l2y1: 50,
      l2x2: 50,
      l2y2: 50,
      l3x1: transition + 5,
      l3y1: reverse50(transition) + 45,
      l3x2: reverse50(transition) + 45,
      l3y2: transition + 5,
    }))
  // from nothing to Burger
  const seq2 = rememberedState$
    .filter(more50)
    .map(transition => ({
      l1x1: 105 - transition,
      l1y1: 105 - transition,
      l1x2: transition - 5,
      l1y2: 105 - transition,
      l2x1: reverse50(transition) + 55,
      l2y1: 50,
      l2x2: transition - 5,
      l2y2: 50,
      l3x1: reverse50(transition) + 55,
      l3y1: transition - 5,
      l3x2: transition - 5,
      l3y2: transition - 5,
    }))
  return xs
    .merge(seq1, seq2)
    .map(dom)
}

export default view
