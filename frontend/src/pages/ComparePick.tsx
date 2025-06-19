import React, { useState } from 'react'
import './ComparePick.css'

const ComparePick = () => {
    const [athlete, setAthlete] = useState("")
    const [apparatus, setApparatus] = useState("")
    const [skill, setSkill] = useState("")

    const athleteData = {
        "Sunisa Lee": {
            Bars: ["Piked Jaeger", "Gienger", "Bhardwaj", "Van Leeuwen", "Nabieva", "Full Routine"],
            Beam: ["Layout step-out mount", "Mitchell", "Switch ring", "Full Routine"],
            Floor: ["Mitchell", "Double Layout", " Chusovitina", "Full Routine"],
            Vault: ["Baitova"],
        },
        "Simone Biles": {
            Bars: ["Piked Tkatchev", "Van Leeuwen", "Fabrichnova", "Full Routine"],
            Beam: ["Mitchell", "Full-in", "Full Routine"],
            Floor: ["Double Layout", "Biles", "Silivas", "Biles II", "Full Routine"],
            Vault: ["Cheng", "Biles II"]
        },
        "Jade Carey": {
            Bars: ["Bhardwaj", " Van Leeuwen", "Fabrichnova", "Full Routine"],
            Beam: ["Double Pike", "Full Routine"],
            Floor: ["Mukhina", "Double Layout", "Chusovitina", "Silivas", "Moors", "Full Routine"],
            Vault: ["Cheng", "Amanar", "Baitova"]
        },
        "Jordan Chiles": {
            Vault: ["Cheng"]
        },
        "Kayla Dicello": {
            Bars: ["Church", "Hindorff", "Piked Jaeger", "Van Leeuwen", "Full Routine"],
            Beam: ["Mitchell", "Split leap 1/1", "Full Routine"],
            Floor: ["Mitchell", "Silivas", "Full Routine"],
            Vault: ["Baitova"]
        }
        // More to be added
    }

    const apparatusOptions = athlete ? Object.keys(athleteData[athlete]) : [];
    const skillsOptions = athlete && apparatus ? athleteData[athlete][apparatus] : [];

    return (
        <div className='compare'>
            <h1>
                Pick who and what you want to compare to!
            </h1>
            <p>
                Note: This is based off the 2024 skills they performed
            </p>
            <select name='athlete'
                id='athlete'
                value={athlete}
                onChange={(e) => {
                    setAthlete(e.target.value);
                    setApparatus("");
                    setSkill("");
                }}>
                <option value="">Select Athlete</option>
                {Object.keys(athleteData).map((athlete) => (
                    <option key={athlete} value={athlete}>
                        {athlete}
                    </option>
                ))}
            </select>

            {athlete && <select
                name='apparatus'
                id='apparatus'
                value={apparatus}
                onChange={(e) => {
                    setApparatus(e.target.value);
                    setSkill("");
                }}>
                <option value="">Select Apparatus</option>
                {apparatusOptions.map((apparatus) => (
                    <option key={apparatus} value={apparatus}>
                        {apparatus}
                    </option>
                ))}
            </select>
            }

            {apparatus && (
                <select
                    name='skills'
                    id='skills'
                    value={skill}
                    onChange={(e) => {
                        setSkill(e.target.value);
                    }}>
                    <option value="">Select Skill</option>
                    {skillsOptions.map((skill) => (
                        <option key={skill} value={skill}>
                            {skill}
                        </option>
                    ))}
                </select>
            )}

            {athlete && apparatus && skill && (
                <button>
                    Analyze
                </button>
            )}
        </div>
    )
}

export default ComparePick