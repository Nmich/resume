import createCategory from './createCategory.js'

// create title with parameters
export default function getTitle(title) {
    return createCategory('h2', 'title is-1 is-capitalized', title)
}
