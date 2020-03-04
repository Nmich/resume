import newElement from './createNewElement.js'

// create category with html + class + title from datas
export default function createCategory(categoryName, className, title) {
    const category = newElement(categoryName, className)
    category.textContent = title
    return category
}
