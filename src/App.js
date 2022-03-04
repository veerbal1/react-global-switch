import React, { useEffect } from 'react';
import './App.css';
import Context, { MyContext } from './Context';

/**
 * @return {JSX.Element}
 */
function App() {
    return (
        <div>
            <Context>
                <h1>Global State Testing</h1>
                <SetID />
                <Comments />
            </Context>
        </div>
    );
}

const SetID = () => {
    const { setID } = React.useContext(MyContext);
    // useCallback is used to prevent infinite loop
    const handleClick = React.useCallback(() => {
        return setID(Math.floor(Math.random() * 10));
    }, [setID]);
    
    return (
        <div>
            <h1>SetID</h1>
            <button onClick={handleClick}>Set ID</button>
        </div>
    );
};

const Comments = () => {
    const { id } = React.useContext(MyContext);
    const [comments, setComments] = React.useState([]);
    useEffect(() => {
        console.log('id', id);
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((res) => res.json())
            .then((data) => setComments(data));
    }, [id]);
    return (
        <div>
            <h1>Comments</h1>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
