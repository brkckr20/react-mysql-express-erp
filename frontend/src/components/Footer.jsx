import React, { useState } from 'react'

const Footer = () => {
    let time = new Date().toLocaleTimeString();
    const [ctime, setTime] = useState(time)
    const UpdateTime = () => {
        time = new Date().toLocaleTimeString()
        setTime(time)
    }
    setInterval(UpdateTime)
    return (
        <div className='absolute left-0 bottom-0 right-0 bg-slate-800 px-2'>
            <ul className='flex divide-x gap-x-2'>
                <li className='text-white'>PORTAL v.1.0</li>
                <li className='text-white pl-2'>{ctime}</li>
            </ul>
        </div>
    )
}

export default Footer