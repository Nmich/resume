import newElement from './createNewElement.js'

export default
function getRatings(value) {
  const yellowStar = () => newElement('span', 'yellow-star fas fa-star')
  const greyStar = () => newElement('span', 'far fa-star')

  const stars = '*'.repeat(value).padEnd(5, '-')

  return stars
      .split('')
      .map(char => (char === '*' ? yellowStar() : greyStar()))
}
