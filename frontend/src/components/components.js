import '../assets/static/components.css'
import React from "react";
import {getDate} from "date-fns";

export default function MyModal({selectedEntity = null, onSubmit, inputs, modalID, modalType = "Create New"}) {
    // const [selectedDate, setSelectedDate] = useState(new Date())
    // if (selectedEntity) {
    //     selectedDate = useState(initialValue);
    // } else {
    //     selectedDate = null;
    // }

    return (
        <>
            <div className="modal fade" id={modalID} tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {modalType}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                {inputs.map((input, index) => (
                                    <div className="mb-3" key={index}>
                                        <label htmlFor={`${input}Input`} className="form-label">
                                            {input.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase())}
                                        </label>
                                        <input
                                            type={"text"}
                                            className="form-control"
                                            id={`${input}Input`}
                                            aria-describedby="emailHelp"
                                            name={input}
                                            defaultValue={selectedEntity ? selectedEntity[input] : ""}
                                        />
                                    </div>
                                ))}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function Bubbles() {
    return (
        <>
            <div className="bubbles">
                <span style={{'--i': 11}}></span>
                <span style={{'--i': 12}}></span>
                <span style={{'--i': 24}}></span>
                <span style={{'--i': 10}}></span>
                <span style={{'--i': 14}}></span>
                <span style={{'--i': 23}}></span>
                <span style={{'--i': 18}}></span>
                <span style={{'--i': 16}}></span>
                <span style={{'--i': 19}}></span>
                <span style={{'--i': 20}}></span>
                <span style={{'--i': 22}}></span>
                <span style={{'--i': 25}}></span>
                <span style={{'--i': 18}}></span>
                <span style={{'--i': 21}}></span>
                <span style={{'--i': 15}}></span>
                <span style={{'--i': 13}}></span>
                <span style={{'--i': 26}}></span>
                <span style={{'--i': 17}}></span>
                <span style={{'--i': 19}}></span>
                <span style={{'--i': 20}}></span>
                <span style={{'--i': 22}}></span>
                <span style={{'--i': 25}}></span>
                <span style={{'--i': 18}}></span>
                <span style={{'--i': 21}}></span>
                <span style={{'--i': 15}}></span>
                <span style={{'--i': 13}}></span>
                <span style={{'--i': 26}}></span>
                <span style={{'--i': 17}}></span>
                <span style={{'--i': 19}}></span>
                <span style={{'--i': 20}}></span>
                <span style={{'--i': 22}}></span>
                <span style={{'--i': 25}}></span>
                <span style={{'--i': 18}}></span>
                <span style={{'--i': 21}}></span>
                <span style={{'--i': 15}}></span>
                <span style={{'--i': 13}}></span>
                <span style={{'--i': 26}}></span>
                <span style={{'--i': 17}}></span>
            </div>
        </>
    )
}
