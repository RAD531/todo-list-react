import React, { useState } from 'react';

const ToDoList = () => {

    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    return (
        <>
            <h1 className="display-4" style={{ color:"#eb9278" }}>todos</h1>

            <div className="card card-bottom-right">
                <div className="card-inner">
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><input
                                style={{ outline: 'none' }}
                                type="text"
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                                placeholder="Enter Task"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setTodos(todos.concat(inputValue));
                                        setInputValue("")
                                    }
                                }}>
                            </input>
                            </li>

                            {todos.map((item, index) => (
                                <li className='list-group-item'>
                                    {item}{" "}
                                    <span className="removeItem" style={{ float: "right" }} onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}>X</span>
                                </li>))
                            }

                            <li className="list-group-item text-muted">
                                {todos.length === 1 ? `${todos.length} item left` : `${todos.length} items left`}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDoList;