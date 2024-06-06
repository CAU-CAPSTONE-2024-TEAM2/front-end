import React from 'react';
import '../styles/loading.css';

const Loading = () => {
    return (
        <div className='loading-container'>
            <h3 className='loading-statement'>음성을 분석중입니다</h3>
            <div className='loading-component'></div>
            <div className='loading-component'></div>
            <div className='loading-component'></div>
            <div className='loading-component'></div>
            <div className='loading-component'></div>
        </div>
    );
}

export default Loading;
