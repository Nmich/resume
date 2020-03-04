import newElement from './createNewElement.js'
import getContent from './createContent.js'
import getTitle from './createTitle.js'

// create html structure of hero section
export default function createSection(contentSection) {
    const { title, content } = contentSection

    if (title !== 'education' && title !== 'experience') {
        const titleTag = getTitle(title)
        let contentTag = getContent(content)
        const newSection = newElement('section', 'hero is-medium')
        newSection.setAttribute('id', 'section-' + title)
        const newContainer = newElement('div', 'container')
        const bodySection = newElement('div', 'hero-body')
        const newDiv = newElement('div', 'column is-6')
        const newContent = newElement('div', 'column is-6')

        if (contentSection !== '') {
            newContainer.append(titleTag, contentTag)
            if (title === 'portfolio') {
                contentTag.classList.add('content-portfolio', 'columns')
                newContainer.classList.add('columns')
                newDiv.classList.add('title-portfolio', 'is-capitalized')
                newDiv.append(titleTag)
                newContent.append(contentTag)
                newContainer.append(newDiv, newContent)
            }
            if (title === 'passions') {
                contentTag.classList.add('content-passions', 'columns')
                newContainer.classList.add('is-marginless')
                // bodySection.classList.add('is-paddingless')
            }
            if (title === 'skills') {
                newSection.style.backgroundColor = '#EDAE49'
                titleTag.classList.add('has-text-centered')
            }

            bodySection.append(newContainer)
            newSection.append(bodySection)
            return newSection
        }
    }
}
