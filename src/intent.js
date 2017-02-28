const intent = ({DOM}) => ({
  click$: DOM
    .select('.menuButton')
    .events('click')
    .mapTo(null)
})

export default intent
