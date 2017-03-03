const intent = ({DOM}) => ({
  click$: DOM
    .select('.menu-button')
    .events('click')
    .mapTo(null)
})

export default intent
