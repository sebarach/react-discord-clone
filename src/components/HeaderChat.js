import React from 'react'
import {Notifications,Room,PeopleAlt,Search,Send,Help} from '@material-ui/icons'




function HeaderChat({canalActivo}) {
    return (
        <div className='chatHeader'>
            
        <div className='chatHeader__left'>
            <h3>
                <span className='chatHeader__hash'>#</span>
                {canalActivo}
            </h3>
        </div>


        <div className='chatHeader__right'>
            <Notifications />
            <Room />
            <PeopleAlt />

            <div className='chatHeader__search'>
            <input placeholder='Buscar'/>
            <Search />
            </div>

            <Send />
            <Help />


        </div>

        </div>
    )
}

export default HeaderChat
