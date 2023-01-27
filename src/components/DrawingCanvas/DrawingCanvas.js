import './DrawingCanvas.css';
import {useEffect, useRef, useState} from 'react';

const DrawingCanvas = () => {


    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [x, setX] = useState(1025);
    const [y, setY] = useState(750);

 console.log(x)


   const [ coordX , setCoordX] = useState(0)
   const [ coordY , setCoordY] = useState(0)

   

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 600;
        canvas.height = 200; 
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 3;
        contextRef.current = context;

    }, []);

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        setIsDrawing(true);
        nativeEvent.preventDefault();
    };

    const draw = ({nativeEvent}) => {
        if(!isDrawing) {
            return;
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        nativeEvent.preventDefault();

    
    };

    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const setToDraw = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);
    
    };



    const saveImageToLocal = (event) => {
        const img = event.currentTarget.parentElement.children[1]
        let image = canvasRef.current.toDataURL('image/jpg');
        img.setAttribute('src', `${image}`);
    };

    const dragStarted = (e) => { 
         console.log("Drag Has Staart")
         e.dataTransfer.setData("text/html", "dragstart");   
        setCoordX(e.clientX)
        console.log(e.pageY - e.clientY)
        setCoordY(e.clientY)       
    }

    // const onDrag = ( e) => { 
    //      console.log('Drag')
    //     console.log(e.offsetTop)

    // }
    const onDragEnd = ( e) => { 
        console.log('Drag end')
         setX((e.pageX) + 'px') ;
         setY((e.pageY) + 'px') 
   }

    return (
        <div>
            <canvas className="canvas-container"
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}>
            </canvas>
            <div>
                <button onClick={setToDraw}>
                    Delete
                </button>
                <img draggable onDragStart={dragStarted}   onDragEnd={onDragEnd}
                 style={ {
                    left: x,
                    top: y
                  }}
                className='imageSignature'/>
                <button   onClick={saveImageToLocal}>Download Image</button>
            </div>
        </div>
    )
}

export default DrawingCanvas;