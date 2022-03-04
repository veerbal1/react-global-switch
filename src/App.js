import React, { useEffect } from 'react';
import './App.css';
import Context, { MyContext } from './Context';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

/**
 * @return {JSX.Element}
 */
function App() {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Context>
                    <h1>Global State Testing</h1>
                    <SetID />
                    <ParentOne />
                </Context>
            </QueryClientProvider>
        </div>
    );
}

const ParentOne = () => {
    console.log('ParentOne');
    return (
        <div>
            <h1>Parent One</h1>
            <ParentTwo />
        </div>
    );
};

const ParentTwo = () => {
    console.log('ParentTwo');
    return (
        <div>
            <h1>Parent Two</h1>
            <CommentsTwo />
            <ParentThree />
        </div>
    );
};

const ParentThree = () => {
    console.log('ParentThree');
    return (
        <div>
            <h1>Parent Three</h1>
            <CommentsOne />
        </div>
    );
};

const SetID = () => {
    const { setID } = React.useContext(MyContext);
    // useCallback is used to prevent infinite loop
    const handleClick = React.useCallback(() => {
        return setID(Math.floor(Math.random() * 5));
    }, [setID]);

    console.log('SetID');

    return (
        <div>
            <h1>SetID</h1>
            <button onClick={handleClick}>Set ID</button>
        </div>
    );
};

const CommentsOne = () => {
    const { id } = React.useContext(MyContext);

    const { data } = useQuery(['comments', id], () =>
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(
            (res) => res.json()
        )
    );
    console.log(id, data);
    return (
        <div>
            <h1>Comments</h1>
            <ul>
                {data?.map((comment) => (
                    <li key={comment.id}>{comment.name}</li>
                ))}
            </ul>
        </div>
    );
};

const CommentsTwo = () => {
    const { id } = React.useContext(MyContext);

    const { data } = useQuery(['comments', id * 2], () =>
        fetch(
            `https://jsonplaceholder.typicode.com/posts/${id * 2}/comments`
        ).then((res) => res.json())
    );
    console.log(id * 2, data);
    return (
        <div>
            <h1>Comments Two</h1>
            <ul>
                {data?.map((comment) => (
                    <li key={comment.id}>{comment.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
