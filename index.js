/** 
 * Face Search Algorithm
 * @desc An implementation of an algorithm to identify poylgon faces given a set of vertices and segments, referencing the DCEL data structure.
 * @author Edbert Cheng
**/

/*
Sample Data. Data provided is a planar subdivision.
Edges array pair corresponds to index of vertices list
*/
const sample = {"vertices": [[0,0], [2,0], [2,2], [0,2]],"edges": [[0,1], [1,2], [0,2], [0,3], [2,3]]};
/*
Create a list of all half edges in the data.
Edges are unmarked at initialization.
*/
function allHalfEdges(data){
  const totalEdges = [];
  data.edges.forEach(elem => {
    const elemTwin = [elem[1], elem[0]];
    totalEdges.push({edge: elem, marked: false})
    totalEdges.push({edge: elemTwin, marked: false})
  })
  return totalEdges;
}
/*
Finds incident angle of a half edge from data
*/
function angleHalfEdge(edge, data){
  let start = edge[0];
  let end = edge[1];
  let p1 = data.vertices[start];
  let p2 = data.vertices[end];
  let x = p2[0]-p1[0];
  let y = p2[1]-p1[1];
  let angle = Math.atan2(y,x)*180/Math.PI;
  //if angle is negative
  if(angle < 0){
    angle = angle + 360
  }
  return angle;
}

/*
Finds the curve orientation of a face via cross product
*/
function orientPolygon(face, data){
  //find vertex with lowest y-coordinate
  //get all vertices of the face
  /*
  const vertsFace = [...new Set(face.flat())];
  console.log(vertsFace);
  const pointsFace = vertsFace.map(elem => {
    return data.vertices[elem]
  })
  console.log(pointsFace);
  const minVert = pointsFace.findIndex
  */

  //find edge pair
  //[[1,0],[0,2],[2,1]]
  //[1,0,2]
  //get the first two edges of face
  //technically, should be the lowest vertex to test concavity
  let edge1 = face[0]
  let edge2 = face[1]
  //get three points
  let p1 = data.vertices[edge1[0]] //x,y
  let p2 = data.vertices[edge1[1]] //x,y
  let p3 = data.vertices[edge2[1]] //x,y
  //cross product
  let area = (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0])
  if (area < 0){
    return -1; //clockwise -- remove these
  }
  if (area > 0){
    return 1; //counter-clockwise -- keep 
  }
  else {
    return 0 //collinear -- keep 
  }
}

/*
Create a Map of all vertices in the given data.
Each vertex key contains a object of all half edges which originate from the vertex, sorted in increasing angle
*/
function allVerts(data){ //unsorted
  //create a list of total vertices
  const tEdges = allHalfEdges(data);
  //list of all vertices and attributes
  const totalVerts = [];
  //loop through each vertex to find all half edge spokes
  data.vertices.forEach((vert, index) => {
    const vertex = vert;
    let edgeList = [];
    //loop through each half edge spoke to identify angle
    tEdges.forEach(elem => {
      if(elem.edge[0] === index){
        //find incident angle of each edge
        const angle = angleHalfEdge(elem.edge, data)
        //create defining half edge and incident angle
        edgeList.push({
          edge: elem.edge,
          angle: angle,
        })
      }
    })
    //sort edgeList based on increasing angle from x-axis
    edgeList.sort((a,b) =>
      (a.angle > b.angle) ? 1 : ((b.angle > a.angle) ? -1: 0)
    );
    //create an object consisting of vertex and edges
    const vertObj = {
      vertex: vertex,
      edges: edgeList
    }
    totalVerts.push(vertObj);
  })
  //create a JS Map of vertices
  const vertMap = new Map();
  totalVerts.forEach(elem => {
    const key = JSON.stringify(elem.vertex)
    vertMap.set(key, elem.edges)
  })
  return vertMap;
  //sort list of edges based on degrees from x-axis
}

/*
Finds a list of all faces bounded by edges and vertices in the provided dataset
*/
function allFaces(data){
  //list of all faces from data
  let totalFaces = [];
  //get all half edges from data
  let allEdges = allHalfEdges(data);
  //get the vertex Map
  const vertMap = allVerts(data);
  
  //loop through data to find face
  
  allEdges.forEach(elem => {
    const face = []
    //construct single face object
    //face object should have at least 3 edges
    if (elem.marked){
      return
    }
    while (!elem.marked){ //repeat this action until you've found a polygon
      elem.marked = true;
      //add first edge to face
      face.push(elem.edge); 
      //loop through vertMap to find the next edge //WRITE A SEPARATE FUNCTION FOR THIS
      //a single instance
      //get the next vertex
      const nextVert = JSON.stringify(data.vertices[elem.edge[1]]);
      //return all spokes
      const spokes = vertMap.get(nextVert);
      //get the next spoke
      const twinEdge = JSON.stringify([elem.edge[1], elem.edge[0]])
      const twinEdgeIndex = spokes.findIndex(elem => 
        JSON.stringify(elem.edge) == twinEdge)
      //do a ternary operator
        //nextEdge is index + 1 
        //but if spoke is the last item, then nextEdge is index 0
        //circular
      const nextEdge = spokes[twinEdgeIndex + 1] == undefined ? spokes[0].edge : spokes[twinEdgeIndex + 1].edge;
      //find index 
      const nextEdgeIndex = allEdges.findIndex(elem => JSON.stringify(elem.edge) == JSON.stringify(nextEdge));
      //find the next dart
      //set as next element
      elem = allEdges[nextEdgeIndex];
    }
    totalFaces.push(face)
  })
  return totalFaces;
}

/*
Culls all faces list to only include interior face
Identifies the clockwise-oriented face and deletes
*/
function interFaces(data){
  let total = allFaces(data);
  total.forEach(elem => {
    const result = orientPolygon(elem, data)
    if (result >= 0){
      total.splice(elem, 1)
    }
  })
  return total;
}

/*
Create Text Output to the UI
Generate a text JSON of polygons
Convert face edge list to vertices for canvas drawing
*/
function textOutput(data){
  const output = interFaces(data);
  const outJSON = output.map((elem, index)=>{
    let vertsFace = [...new Set(elem.flat())];
    //vertsFace.push(vertsFace[0]) //close the loop, go back to the original
    let vertices = vertsFace.map(elem => data.vertices[elem])
    return({
      name: 'Face '+(index+1),
      vertices: vertices,
      edges: elem
    })
  })
  return outJSON;
}

/*
Creates Visual Output to UI
List of points will plug into canvas drawing function
*/
function vizOutput(data){
  const output = interFaces(data);
  const outCanvas = output.map(elem => {
    let vertsFace = [...new Set(elem.flat())];
    vertsFace.push(vertsFace[0])
    let vertices = vertsFace.map(elem => data.vertices[elem])
    return vertices;
  })
  return outCanvas;
}
//console.log(vizOutput(data));
//[{Polygon 0},{Polygon }]

