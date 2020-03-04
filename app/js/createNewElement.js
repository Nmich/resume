// create basic html + class
export default function createNewElement(elementName = 'div', className = '') {
    const element = document.createElement(elementName)
    if (className) {
        element.className = className
    }
    return element
}
