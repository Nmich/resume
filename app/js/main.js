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

document.addEventListener('DOMContentLoaded', ()=>{
  fectchJSON(dataResumeUrl)
    .then(function(resumes) {
      console.log(resumes)
    })
    .catch(function(e){
      console.error(e)
    })
})
