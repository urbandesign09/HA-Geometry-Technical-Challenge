/** 
 * Find Neighboring Faces - Algorithm #2
**/

/**
 * Question
 * Algorithm 2: Write an algorithm that processes the output of Algorithm 1 in order to find
the neighboring faces of any face. It should take the output of Algorithm 1 as input,
unique identifier for the face and output an array of face identifiers. The face identifiers
might be an integer or string. Include tests (with text descriptions of the input data)
demonstrating that it works. Comment your code with specifics about the computational
complexity of your implementation.
**/


/**
 *Pseudocode Solution 
 *Iterate through Algo #1 Solution to identify if faces share half-edge twins with each other. 
 *For each face, identify if edges share between (while keeping time complexity 0(n) down)
 *If possible, use a map instead of an array to "find" half-edge twins
 *Add a new object attribute to identify neighboring faces to each face object
**/

/*
  Function that takes in the result of Algo #1 and a selected face
  and returns a list of neighboring faces
*/
export function neighborFaces(input,faceName){
  const index = input.findIndex(elem=>
    elem.name == faceName
  )
  //faceName does not exist
  if (index == -1){
    return 'face does not exist in JSON'
  }
  //element to find adjacent faces
  const faceElem = input.splice(index, 1) 
  //find twinEdges to search for in other faces
  const searchList = faceElem[0].edges.map(elem => {
    const tStart = elem[1]
    const tEnd = elem[0]
    return [tStart, tEnd]
  })
  
  //search through other faces
  //i, j, k loop
  const neighborFaces = []
  input.forEach(face => {
    face.edges.forEach(elem => {
      searchList.forEach(tEdge => {
        if (JSON.stringify(elem) == JSON.stringify(tEdge)){
          neighborFaces.push(face.name)
        }
      })
    })
  })
  return neighborFaces;
}
