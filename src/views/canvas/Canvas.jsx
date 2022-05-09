import React, { useRef, useState, useEffect, forwardRef } from "react";
export const Canvas = forwardRef((props, myRef) => {


    // const childRef = useRef();


    let index = 100;
    useEffect(() => {
        if (myRef.current) {
            let context = myRef.current.getContext("2d");
            context.fillRect(25, 25, 100, 100);
            drawGrid(20 * index, 10 * index, myRef.current);
        }
    }, []);



    const drawGrid = function (w, h, canvas) {
        let ctx = canvas.getContext("2d");
        ctx.canvas.width = w;
        ctx.canvas.height = h;

        for (let x = 0.5; x <= w; x += 20) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            for (let y = 0.5; y <= h; y += 20) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
        }
        ctx.stroke();
    };


    return (
        <>
            <canvas ref={myRef} height={10 * index} width={20 * index}></canvas>
        </>
    )
})



