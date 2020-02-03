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
    return createCategory('h2', 'title', title)
}

//create content with parameters
function getContent(content) {
    const newContent = createNewElement('div')

    const arrayContent = content.map(element => {
        const contentEl = createNewElement('div', 'column')
        //map on "content" of json and if it's strings, display it on ul>li elements
        if (typeof element === 'string') {
            const itemEl = createNewElement('li')
            itemEl.append(element)
            contentEl.append(itemEl)
            return contentEl
        }
        const sublistItems = Object.entries(element).map(([key, value]) => {
            let contentValue = createNewElement('p')
            if (key === 'skill') {
                contentValue = createNewElement('h3')
            }
            if (key === 'subskill') {
                const subskillItems = createNewElement('ul', 'ul-skill')
                const subArray = Object.entries(value).map(([key, value]) => {
                    const arraySubskill = createNewElement('li')
                    const keySubskill = createNewElement('p')
                    const valueSubskill = createNewElement('p')

                    keySubskill.append(key)
                    valueSubskill.append(...getRatings(value))
                    arraySubskill.append(keySubskill, valueSubskill)
                    return arraySubskill
                })
                subskillItems.append(...subArray)
                contentValue.append(subskillItems)
            }
            if (key === 'dates') {
                contentValue.append(`${element.dates.date_start} ${element.dates.date_end}`)
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
    const yellowStar = () => createNewElement('span', 'fas  fa-star')
    const greyStar = () => createNewElement('span', 'far  fa-star')

    const stars = '*'.repeat(value).padEnd(5, '-')

    return stars.split('').map(char =>
      (char === '*' ?
        yellowStar() :
        greyStar()))
}
// create html structure of hero section
function createSection(contentSection) {
    const { title, content } = contentSection

    const titleTag = getTitle(title)
    let contentTag = getContent(content)
    const newSection = createNewElement('section', 'hero  is-fullheight')
    const newContainer = createNewElement('div', 'container')
    const bodySection = createNewElement('div', 'hero-body')

    if (title === 'portfolio') {
        contentTag.classList.add('content-portfolio', 'columns')
    }
    if (title === 'passions') {
        contentTag.classList.add('content-skills', 'columns')
    }

    newContainer.append(titleTag, contentTag)
    bodySection.append(newContainer)
    newSection.append(bodySection)

    return newSection
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
