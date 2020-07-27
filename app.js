const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const saveBtn = document.getElementById("jsSave");
const resetBtn =
document.getElementById("reset")
const DEFAULT_COLOR = "#2c2c2c"

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle= "white";
ctx.fillRect(0,0,canvas.width,canvas.height)

let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else{
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

function onMouseDown(event){
  painting = true;
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color
}

function handleRangeChange(event){
 size = event.target.value;
 ctx.lineWidth = size
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Paint"
    
  } else{
    filling = true;
    mode.innerText = "Fill"
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0,0,canvas.width,canvas.height)
  }
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))


if(range){
 range.addEventListener("input", handleRangeChange) 
}

if(mode){
  mode.addEventListener("click",handleModeClick)
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

function handleRestBtn(){
  ctx.fillStyle= "white";
  ctx.fillRect(0,0,canvas.width,canvas.height)
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (resetBtn) {
  resetBtn.addEventListener("click", handleRestBtn)
}