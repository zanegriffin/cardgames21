import React from 'react'

const Component = (props) => {
    // console.log(props.image, 'HEY')
    return(
        <div className='playing-card'>
            <div><img src={props.image} ></img></div>
        </div>
    )
}

export default Component