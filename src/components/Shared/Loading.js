import React from 'react';

const Loading = () => {
    return (
        <div className='h-64 flex justify-center items-center mx-auto'>
            <div className="flex items-center justify-center ">
                <div className="w-24 h-24 border-l-2 border-primary rounded-full animate-spin"></div>
            </div>

        </div>

    );
};

export default Loading;