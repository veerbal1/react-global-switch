import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store';

const queryClient = new QueryClient();

/**
 * @return {JSX.Element}
 */
function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <h1>Global State Testing</h1>
                <SelectedID />
                <SetID />
                <ParentOne />
            </QueryClientProvider>
        </Provider>
    );
}

const ParentOne = () => {
    console.log('ParentOne');
    return (
        <div>
            <hr />
            <h1>Parent One</h1>
            <SetName />
            <SelectedName />
        </div>
    );
};

const SetName = () => {
    const dispatch = useDispatch();
    const [name, setName] = React.useState('');
    return (
        <div>
            <h2>Set Name</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    dispatch({ type: 'SET_NAME', name: e.target.value });
                }}
            />
        </div>
    );
};

const SelectedName = () => {
    console.log('SelectedName');
    const name = useSelector((state) => state.name);
    return (
        <div>
            <h2>Selected Name: {name}</h2>
        </div>
    );
};

// const ParentTwo = () => {
//     console.log('ParentTwo');
//     return (
//         <div>
//             <h1>Parent Two</h1>
//             <CommentsTwo />
//             <ParentThree />
//         </div>
//     );
// };

// const ParentThree = () => {
//     console.log('ParentThree');
//     return (
//         <div>
//             <h1>Parent Three</h1>
//             <CommentsOne />
//         </div>
//     );
// };

const SetID = () => {
    const state = useSelector((state) => state.id);
    const dispatch = useDispatch();
    // useCallback is used to prevent infinite loop
    const handleClick = React.useCallback(() => {
        dispatch({
            type: 'SET_ID',
            id: Math.floor(Math.random() * 10),
        });
    }, []);

    console.log('SetID', state);

    return (
        <div>
            <h1>SetID</h1>
            <button onClick={handleClick}>Set ID</button>
        </div>
    );
};

// const CommentsOne = () => {
//     const id = useSelector((state) => state.id);
//     const { data } = useQuery(
//         ['comments', id],
//         () =>
//             fetch(
//                 `https://jsonplaceholder.typicode.com/posts/${id}/comments`
//             ).then((res) => res.json()),
//         {
//             notifyOnChangeProps: ['id'],
//         }
//     );
//     console.log('CommentsOne', id, data);
//     return (
//         <div>
//             <h1>Comments</h1>
//             <ul>
//                 {data?.map((comment) => (
//                     <li key={comment.id}>{comment.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// const CommentsTwo = () => {
//     const id = useSelector((state) => state.id);

//     const { data } = useQuery(['comments', id * 2], () =>
//         fetch(
//             `https://jsonplaceholder.typicode.com/posts/${id * 2}/comments`
//         ).then((res) => res.json())
//     );
//     console.log('CommentsTwo', id * 2, data);
//     return (
//         <div style={{}}>
//             <h1>Comments Two</h1>
//             <ul>
//                 {data?.map((comment) => (
//                     <li key={comment.id}>{comment.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

const SelectedID = () => {
    const id = useSelector((state) => state.id);
    return (
        <h1>
            Selected ID: {id} - {id * 2}
        </h1>
    );
};
export default App;
