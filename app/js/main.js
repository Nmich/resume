import fetchJSON from './fetchJson.js'
import expSection from './experienceSection.js'
import { createSection } from './dom-utils.js'
const dataResumeUrl = '../../datas/resume-datas.json'

function createNodesFromData(resumes) {
    return resumes.map(function(resume) {
        const newDiv = createSection(resume)
        return newDiv
    })
}
document.addEventListener('DOMContentLoaded', () => {
    fetchJSON(dataResumeUrl)
        .then(function(resumes) {
            // console.log(resumes)
            // console.log(createNodesFromData(resumes))
            const nodesFromData = createNodesFromData(resumes)
            // console.log(nodesFromData)
            document.body.append(...nodesFromData)
            // document.getElementById('exp').addEventListener('click', expSection)
        })
        .catch(function(e) {
            console.error(e)
        })
})
