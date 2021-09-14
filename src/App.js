import React, {useEffect, useMemo, useRef, useState} from "react";
import "./App.css";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap/dist/css/bootstrap.min.css";
import BindableInput from "./components/BindableInput";

const App = () => {
    const imgCanvas = useRef((() => {
        const canvas = document.createElement("canvas");
        canvas.style.display = "none";
        return canvas;
    })());
    const imgCanvasContext = useRef(imgCanvas.current.getContext("2d"));

    useEffect(() => {
        document.body.appendChild(imgCanvas.current);
    }, []);

    const initialImgParameters = {
        size: {
            width: 1280,
            height: 720
        },
        imgColor: "#42a5f5"
    };

    const [imgParameters, setImgParameters] = useState(initialImgParameters);
    const imgSource = useMemo(() => generateImage(imgParameters), [imgParameters]);

    function onWidthChange(value) {
        setImgParameters(state => {
            return {
                ...state,
                size: {
                    ...state.size,
                    width: value
                }
            };
        });
    }

    function onHeightChange(value) {
        setImgParameters(state => {
            return {
                ...state,
                size: {
                    ...state.size,
                    height: value
                }
            };
        });
    }

    function onImgColorChange(value) {
        setImgParameters(state => {
            return {
                ...state,
                imgColor: value
            };
        });
    }

    function generateImage(state) {
        if (!state.size.width
            || state.size.width < 0
            || !state.size.height
            || state.size.height < 0
            || !state.imgColor
            || !imgCanvas.current) {
            return;
        }

        imgCanvas.current.width = state.size.width;
        imgCanvas.current.height = state.size.height;
        imgCanvasContext.current.fillStyle = state.imgColor;
        imgCanvasContext.current.fillRect(0, 0, imgCanvas.current.width, imgCanvas.current.height);
        return imgCanvas.current.toDataURL("image/png");
    }

    return (
        <div className="App">
            <div className="container my-3">
                <div className="top-menu input-group mb-3">
                    <BindableInput type="number" min="0" className="form-control" placeholder="Width"
                        value={imgParameters.size.width} setValue={onWidthChange}/>
                    <BindableInput type="number" min="0" className="form-control" placeholder="Height"
                        value={imgParameters.size.height} setValue={onHeightChange}/>
                    <BindableInput type="color" className="form-control form-control-color"
                        value={imgParameters.imgColor} setValue={onImgColorChange}/>
                    <BindableInput type="text" className="form-control font-monospace" placeholder="Color"
                        value={imgParameters.imgColor} setValue={onImgColorChange}/>
                </div>
                <img className="result-image" src={imgSource} alt="Image"/>
            </div>
        </div>
    );
};

export default App;