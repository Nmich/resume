import fetchJSON from './fetchJson.js';
import section from './createSection.js'

const dataResumeUrl = '../../datas/resume-datas.json'


function createNodesFromData(resumes) {
    return resumes.map(function(resume) {
        const newDiv = section(resume)
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
        })
        .catch(function(e) {
            console.error(e)
        })
})
