import newElement from './createNewElement.js'
import rating from './rating.js'

// create title with parameters
export default function getContent(content) {
  const newContent = newElement('div', '')

  const arrayContent = content.map(element => {
      const contentEl = newElement('div', 'column')
      //map on "content" of json and if it's strings, display it on ul>li elements
      if (typeof element === 'string') {
          // contentEl.classList.add('is-paddingless')
          const itemEl = newElement('li', 'passions-element')
          const passionsCard = newElement('div', 'card-image')

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
          let contentValue = newElement('p', 'content-value')
          if (key === 'img_url') {
              const cardImg = newElement('div', 'card-image')
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
              contentValue = newElement(
                  'h3',
                  'subtitle is-3 is-capitalized'
              )
          }
          if (key === 'subskill') {
              const subskillItems = newElement(
                  'ul',
                  'ul-skill has-text-white'
              )
              contentValue = newElement('div', 'content-skill-values')
              // @ts-ignore
              const subArray = Object.entries(value).map(([key, value]) => {
                  const arraySubskill = newElement(
                      'li',
                      'columns is-mobile is-marginless is-vcentered content'
                  )
                  const keySubskill = newElement(
                      'p',
                      'column subtitle has-text-white'
                  )
                  const valueSubskill = newElement('p', 'column')

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
