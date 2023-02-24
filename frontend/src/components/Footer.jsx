import React, { useState, useEffect } from 'react';


const Footer = () => {
    let time = new Date().toLocaleTimeString();
    const [ctime, setTime] = useState(time)
    const UpdateTime = () => {
        time = new Date().toLocaleTimeString()
        setTime(time)
    }
    setInterval(UpdateTime);

    const [db, setDb] = useState({});

    useEffect(() => {
        const dbName = JSON.parse(localStorage.getItem("dbName"));
        setDb(dbName);
    }, [])

    return (
        <div className='absolute left-0 bottom-0 right-0 bg-slate-800 px-2'>
            <ul className='flex divide-x gap-x-2'>
                <li className='text-white'>PORTAL v.1.0</li>
                <li className='text-white pl-2 w-[80px] text-center'>{ctime}</li>
                <li className='text-white pl-2'>Burak Çakır</li>
                <li className='text-white pl-2'>Database : {(db.db)?.toUpperCase()}</li>
            </ul>
        </div>
    )
}

export default Footer