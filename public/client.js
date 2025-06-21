document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const canvas = document.getElementById('whiteboard');
    const context = canvas.getContext('2d');

    const colorPicker = document.getElementById('colorPicker');
    const lineWidth = document.getElementById('lineWidth');
    const clearBtn = document.getElementById('clearBtn');

    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(x0, y0, x1, y1, color, width, emit) {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = width;
        context.lineCap = 'round';
        context.stroke();
        context.closePath();

        if (!emit) { return; }

        socket.emit('drawing', {
            x0: x0 / canvas.width,
            y0: y0 / canvas.height,
            x1: x1 / canvas.width,
            y1: y1 / canvas.height,
            color: color,
            width: width
        });
    }
    
    function onMouseDown(e) {
        drawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function onMouseMove(e) {
        if (!drawing) { return; }
        draw(lastX, lastY, e.offsetX, e.offsetY, colorPicker.value, lineWidth.value, true);
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    
    function onMouseUp(e) {
        if (!drawing) { return; }
        drawing = false;
    }

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseout', () => drawing = false);

    socket.on('drawing', (data) => {
        const w = canvas.width;
        const h = canvas.height;
        draw(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.width, false);
    });
    
    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function onClear() {
        clearCanvas();
        socket.emit('clear');
    }

    clearBtn.addEventListener('click', onClear);
    
    socket.on('clear', () => {
        clearCanvas();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        // This is a simplified resize handler. A more robust solution
        // would involve saving the canvas state and redrawing it.
        // For this example, we'll just resize the canvas element.
        canvas.width = window.innerWidth * 0.9;
        canvas.height = window.innerHeight * 0.7;
    });
}); 