import rating from './rating.js'

// create basic html + class
export function createNewElement(elementName = 'div', className = '') {
    const element = document.createElement(elementName)
    if (className) {
        element.className = className
    }
    return element
}

// create category with html + class + title from datas
export function createCategory(categoryName, className, title) {
    const category = createNewElement(categoryName, className)
    category.textContent = title
    return category
}

// create title with parameters
export function getTitle(title) {
    return createCategory('h2', 'title is-1 is-capitalized', title)
}

// create title with parameters
export function getContent(content) {
    const newContent = createNewElement('div', '')

    const arrayContent = content.map(element => {
        const contentEl = createNewElement('div', 'column')
        //map on "content" of json and if it's strings, display it on ul>li elements
        if (typeof element === 'string') {
            const itemEl = createNewElement('li', 'passions-element')
            const passionsCard = createNewElement('div', 'card-image')

            const img = new Image()
            img.src = element
            img.className = 'image'
            passionsCard.append(img)
            itemEl.append(passionsCard)
            contentEl.append(itemEl)
            return contentEl
        }
        // @ts-ignore
        const sublistItems = Object.entries(element).map(([key, value]) => {
            let contentValue = createNewElement('p', 'content-value')
            if (key === 'img_url') {
                const cardImg = createNewElement('div', 'card-image')
                const img = new Image()
                img.src = element.img_url
                img.className = 'image'
                cardImg.append(img)
                return cardImg
            }
            if (key === 'text_content') {
                contentValue.className =
                    'portfolio-content content is-variable is-8'
                contentEl.className = 'column is-full card is-shadowless'
            }
            if (key === 'skill') {
                contentValue = createNewElement(
                    'h3',
                    'subtitle is-3 is-capitalized'
                )
            }
            if (key === 'subskill') {
                const subskillItems = createNewElement(
                    'ul',
                    'ul-skill has-text-white'
                )
                contentValue = createNewElement('div', 'content-skill-values')
                // @ts-ignore
                const subArray = Object.entries(value).map(([key, value]) => {
                    const arraySubskill = createNewElement(
                        'li',
                        'columns is-mobile is-marginless is-vcentered content'
                    )
                    const keySubskill = createNewElement(
                        'p',
                        'column subtitle has-text-white'
                    )
                    const valueSubskill = createNewElement('p', 'column')

                    keySubskill.append(key)
                    valueSubskill.append(...rating(value))
                    arraySubskill.append(keySubskill, valueSubskill)
                    return arraySubskill
                })
                subskillItems.append(...subArray)
                contentValue.append(subskillItems)
            }
            if (key === 'dates') {
                contentValue.append(
                    `${element.dates.date_start} ${element.dates.date_end}`
                )
            } else if (typeof value !== 'object') {
                contentValue.append(value)
            }
            return contentValue
        })
        contentEl.append(...sublistItems)
        return contentEl
    })
    newContent.append(...arrayContent)
    return newContent
}

// create html structure of hero section
export function createSection(contentSection) {
    const { title, content } = contentSection

    const titleTag = getTitle(title)
    let contentTag = getContent(content)
    const newSection = createNewElement('section', 'hero is-medium')
    newSection.setAttribute('id', 'section-' + title)
    const newContainer = createNewElement('div', 'container')
    const bodySection = createNewElement('div', 'hero-body')
    const newDiv = createNewElement('div', 'column is-6')
    const newContent = createNewElement('div', 'column is-6')

    if (title === 'education' || title === 'experience') {
        return ''
    }

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
    }
    if (title === 'skills') {
        newSection.style.backgroundColor = '#EDAE49'
        titleTag.classList.add('has-text-centered')
    }

    bodySection.append(newContainer)
    newSection.append(bodySection)
    return newSection
}
