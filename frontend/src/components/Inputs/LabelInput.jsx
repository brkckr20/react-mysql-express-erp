import React, { useState } from 'react'

const LabelInput = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [inputValue, setInputValue] = useState("");


    const handleBlur = () => {
        if (!inputValue.length > 0) {
            setIsClicked(false)
        } else {
            setIsClicked(true)
        }
    }
    return (
        <div className='relative mb-1'>
            <label className={`absolute bg-white px-2 duration-150 ${isClicked ? 'left-2 -top-3' : 'left-2 top-2'}`}><small>Malzeme Kodu</small></label>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onClick={() => setIsClicked(true)} onBlur={handleBlur} type="text" name="" id="" />
        </div>
    )
}

export default LabelInput