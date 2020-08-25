import React from 'react';

export interface Props {
    title: string;
    content?: string;
}

const TestComponent: React.FC<Props> = (props) => {

    const [poems, setPoems] = React.useState([]);

    // initial load of poems
    React.useEffect(() => {
        
    }, [])
}

