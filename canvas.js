const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let startX, startY;

canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	startX = e.clientX - canvas.offsetLeft;
	startY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener('mouseup', (e) => {
	isDrawing = false;
});

canvas.addEventListener('mousemove', (e) => {
	e.preventDefault();
	if (!isDrawing) return;
	const x = e.clientX - canvas.offsetLeft;
	const y = e.clientY - canvas.offsetTop;
	drawLine(startX, startY, x, y);
	startX = x;
	startY = y;
});

canvas.addEventListener('touchstart', (e) => {
	e.preventDefault();
	isDrawing = true;
	startX = e.touches[0].clientX - canvas.offsetLeft;
	startY = e.touches[0].clientY - canvas.offsetTop;
});

canvas.addEventListener('touchend', (e) => {
	e.preventDefault();
	isDrawing = false;
});

canvas.addEventListener('touchmove', (e) => {
	e.preventDefault();
	if (!isDrawing) return;
	const x = e.touches[0].clientX - canvas.offsetLeft;
	const y = e.touches[0].clientY - canvas.offsetTop;
	drawLine(startX, startY, x, y);
	startX = x;
	startY = y;
});

function drawLine(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = document.getElementById('colorInput').value;
	ctx.lineWidth = document.getElementById('thicknessInput').value;
	ctx.stroke();
}

document.getElementById('saveButton').addEventListener('click', () => {
	const dataURL = canvas.toDataURL();
	const link = document.createElement('a');
	link.href = dataURL;
	link.download = 'drawing.png';
	link.click();
});

document.getElementById('clearButton').addEventListener('click', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	startX = null;
	startY = null;
	isDrawing = false;
});