import {createNewElement} from './dom-utils.js'

export default function expSection() {
    const newSection = createNewElement('section', 'toto')
    const sections = document.querySelectorAll('section')
    sections.forEach((section)=> section.remove())

}
