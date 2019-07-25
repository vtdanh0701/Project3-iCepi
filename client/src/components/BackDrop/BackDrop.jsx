import React from 'react';
import './BackDrop.css'

const BackDrop = props =>(
    <div onClick={props.click} className='backdrop'/>
)

export default BackDrop;