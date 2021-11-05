import React from 'react'

function CanalSideBar({nombreCanal}) {
    return (
        <div className='sidebarChannel'>
            <h4>
                <span className='sidebarChannel__hash'>#</span>
                {nombreCanal}
            </h4>
        </div>
    )
}

export default CanalSideBar
