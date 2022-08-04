/** 
 * Unit & Functional Testing for Face Search Algorithm
**/
const chai = window.chai
const expect = chai.expect

//Sample JSON - 2 Faces
const tSample1 = {
  "vertices": [[0,0], [2,0], [2,2], [0,2]],
  "edges": [[0,1], [1,2], [0,2], [0,3], [2,3]]}

const tOutcome1 = [
  {"name":"Face 1","vertices":[[2,0],[0,0],[2,2]],"edges":[[1,0],[0,2],[2,1]]},
  {"name":"Face 2","vertices":[[2,2],[0,0],[0,2]],"edges":[[2,0],[0,3],[3,2]]}
]

//Sample JSON - 1 Face
const tSample2 = {
  "vertices": [[0,0], [2,0], [2,2]],
  "edges": [[0,1],[1,2],[2,0]]
}

//Sample JSON - 3 Faces
const tSample3 = {
  "vertices":[[6,0],[50,2],[25,10],[12,20],[0,15]],
  "edges":[[0,1],[1,2],[0,2],[2,4],[2,3],[3,4],[0,4]]
}

//basic test for sample Output
describe('SampleOutput', ()=> {
  it('should output a JSON list of faces with name, vertices, and edges attributes', ()=>{
    expect(textOutput(tSample1)).to.deep.equal(tOutcome1)
  })
})

//test for accurate # of interior faces, excluding exterior face
describe('FaceCount', ()=> {
  it('should return the correct number of faces', ()=>{
    expect(textOutput(tSample1)).to.have.lengthOf(2)
    expect(textOutput(tSample2)).to.have.lengthOf(1)
    expect(textOutput(tSample3)).to.have.lengthOf(3)
  })
})
