import React from 'react';
import '../styles/loading.css';

const LoadingCommon = () => {
    return (
        <div className='loading-container'>
            <div className='loading-bars'>
                <div className='loading-component'></div>
                <div className='loading-component'></div>
                <div className='loading-component'></div>
                <div className='loading-component'></div>
                <div className='loading-component'></div>
            </div>
        </div>
    );
}

export default LoadingCommon;
