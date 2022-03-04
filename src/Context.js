import React from 'react';

export const MyContext = React.createContext(null);

const Context = ({ children }) => {
    // https://jsonplaceholder.typicode.com/posts/1/comments
    const [id, setID] = React.useState(1);
    return (
        <MyContext.Provider value={{ id, setID }}>
            {children}
        </MyContext.Provider>
    );
};

export default Context;
