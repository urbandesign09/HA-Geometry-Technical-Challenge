/** 
 * HTML Front End Site
**/

//take data input from user
var button = document.getElementById("data-btn")
button.addEventListener('click', clickHandler);

//clickHandler
function clickHandler(){
  var input = document.getElementById("data-input").value;
  var obj = JSON.parse(input);
  if(!input){ //no input
    alert('Please input data')
  }
  else{
    //if time allowed, check the input object via regex
    //take data and run through textOutput()
    const txtResult = textOutput(obj);
    console.log(txtResult);
    var newResult = document.createElement('div');
    newResult.innerHTML = '<code>'+JSON.stringify(txtResult)+'</code>';

    const currentResult = document.getElementById('result-placeholder')
    currentResult.parentNode.replaceChild(newResult, currentResult);

    //take data and run through vizOutput()
    const vizResult = vizOutput(obj);
    drawFaces(vizResult);
  }
}

//randomize polygon fill colors
function randomColor(){
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = Math.floor(Math.random()*255);
  return ('rgb('+r+','+g+','+b+')'); 
}

//draw on canvas
//input list of vertices
function drawFaces(faces){
  //set up canvas
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.transform(1, 0, 0, -1, 0, c.height)
  ctx.scale(10,10);
  //ctx styling
  ctx.lineWidth = 1/10;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black'; 
  //loop through array of x,y coordinates
  faces.forEach(face => {
    ctx.beginPath();
    face.forEach(vert => {
      ctx.lineTo(vert[0], vert[1])
    })
    ctx.fillStyle = randomColor();
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  })
}