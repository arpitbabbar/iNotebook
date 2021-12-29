import React, {useContext, useEffect} from 'react';
import noteContext from '../context/noteContext';

function About() {
    const a = useContext(noteContext);

    useEffect(()=> {
        a.update();
        // eslint-disable-next-line
    },[])

    return (
        <>
            <h1>This is aBout {a.state.name} and he is {a.state.age} years old.</h1>
        </>
    )
}

export default About;
