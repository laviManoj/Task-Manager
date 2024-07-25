// pages/opened.js
import { useEffect } from 'react';

const OpenedPage = () => {
    useEffect(() => {
        // This will post a message to the opener window
        if (window.opener) {
            window.opener.postMessage('close', '*');
        }
    }, []);

    return <div>This window will close itself after sending a message.</div>;
};

export default OpenedPage;
