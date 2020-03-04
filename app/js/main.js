'use strict'

const dataResumeUrl = '../../datas/resume-datas.json'

function fectchJSON(url) {
    return fetch(url)
        .then(function(resp) {
            return resp.json()
        })
        .catch(function(err) {
            throw err
        })
}

// create basic html + class
function createNewElement(elementName = 'div', className = '') {
    const element = document.createElement(elementName)
    if (className) {
        element.className = className
    }
    return element
}

// create category with html + class + title from datas
function createCategory(categoryName, className, title) {
    const category = createNewElement(categoryName, className)
    category.textContent = title
    return category
}

// create title with parameters
function getTitle(title) {
    return createCategory('h2', 'title is-1 is-capitalized', title)
}

//create content with parameters
function getContent(content) {
    const newContent = createNewElement('div', '')

    const arrayContent = content.map(element => {
        const contentEl = createNewElement('div', 'column')
        //map on "content" of json and if it's strings, display it on ul>li elements
        if (typeof element === 'string') {
            // contentEl.classList.add('is-paddingless')
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
                    valueSubskill.append(...getRatings(value))
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

function getRatings(value) {
    const yellowStar = () => createNewElement('span', 'yellow-star fas fa-star')
    const greyStar = () => createNewElement('span', 'far fa-star')

    const stars = '*'.repeat(value).padEnd(5, '-')

    return stars
        .split('')
        .map(char => (char === '*' ? yellowStar() : greyStar()))
}
// create html structure of hero section
function createSection(contentSection) {
    const { title, content } = contentSection

    if (title !== 'education' && title !== 'experience') {
        const titleTag = getTitle(title)
        let contentTag = getContent(content)
        const newSection = createNewElement('section', 'hero is-medium')
        newSection.setAttribute('id', 'section-' + title)
        const newContainer = createNewElement('div', 'container')
        const bodySection = createNewElement('div', 'hero-body')
        const newDiv = createNewElement('div', 'column is-6')
        const newContent = createNewElement('div', 'column is-6')

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

function createNodesFromData(resumes) {
    return resumes.map(function(resume) {
        const newDiv = createSection(resume)
        return newDiv
    })
}
document.addEventListener('DOMContentLoaded', () => {
    fectchJSON(dataResumeUrl)
        .then(function(resumes) {
            // console.log(resumes)
            // console.log(createNodesFromData(resumes))
            const nodesFromData = createNodesFromData(resumes)
            // console.log(nodesFromData)
            document.body.append(...nodesFromData)
        })
        .catch(function(e) {
            console.error(e)
        })
})
