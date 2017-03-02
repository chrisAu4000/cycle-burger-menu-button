import xs from 'xstream'
import tween from 'xstream/extra/tween'
import concat from 'xstream/extra/concat'

const model = (props$, {toggle$}) => {
  const tweenOpts = props => props.open
    ? {from: 100, to: 0, duration: props.duration, ease: props.easing}
    : {from: 0, to: 100, duration: props.duration, ease: props.easing}
  const onProps$ = concat(
    props$
      .take(1)
      .map(({open}) => open ? 0 : 100),
    props$
      .map(props => tween(tweenOpts(props)))
      .flatten()
  )
  const onClick$ = toggle$
    .mapTo((props) => Object.assign({}, props, {open: !props.open}))
    .fold((state$, transform) => state$.map(transform), props$)
    .flatten()
    .drop(1)
    .map(props => tween(tweenOpts(props)))
    .flatten()
  const state$ = xs.merge(onProps$, onClick$)
  return state$
}

export default model
