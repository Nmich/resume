import {createNewElement} from './dom-utils.js'

export default
function getRatings(value) {
  const yellowStar = () => createNewElement('span', 'yellow-star fas fa-star')
  const greyStar = () => createNewElement('span', 'far fa-star')

  // @ts-ignore
  const stars = '*'.repeat(value).padEnd(5, '-')

  return stars
      .split('')
      .map(char => (char === '*' ? yellowStar() : greyStar()))
}
