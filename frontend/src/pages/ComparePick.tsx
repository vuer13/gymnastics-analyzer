import React, { useState } from 'react'

const ComparePick = () => {
    const [athlete, setAthlete] = useState("")
    return (
        <div>
            <h1>
                Pick who and what you want to compare to!
            </h1>
            <label for="athlete">Choose a Athlete:</label>
            <select name='athlete'
                id='athlete'
                value={athlete}
                onChange={(e) => {
                    setAthlete(e.target.value);
                }}>
                <option value="suni">Sunisa Lee</option>
                <option value="simone">Simone Biles</option>
                <option value="jade">Jade Carey</option>
                <option value="jordan">Jordan Chiles</option>
                <option value="hez">Hezly Rivera</option>
            </select>
        </div>
    )
}

export default ComparePick