import React from 'react'
import { ArrowRight, Camera, Vault, BarChart3 } from "lucide-react";
import {  useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {

    const navigate = useNavigate()

    const features = [
        {
            icon: <Camera/>,
            title: "Capture Your Technique",
            description: "Upload or record videos of your gymnastic skills for AI analysis"
          },
          {
            icon: <Vault/>,
            title: "Compare with Pros",
            description: "Side-by-side comparison with USA olympians from 2024"
          },
          {
            icon: <BarChart3/>,
            title: "Detailed Feedback",
            description: "Receive personalized insights and see how similar it is to your favourite athletes!"
          }
    ]

    const handleClick = () => {
        navigate('/upload');
    }

  return (
    <div className = 'home'>
        <h1>
            Welcome, to the Gymnastics Analyzer!
        </h1>
        <p>
            This application allows you to compare your your gymnastic skills to individuals like Suni Lee, Simone Biles and other US olympians.
        </p>
        <button onClick={handleClick}>
            Start Analysis
            <ArrowRight />
        </button>

        <div className='icons-container'>
            {features.map((feature, i) => (
                <div className='icons' key={i}>
                    <div className='icon'>
                    {feature.icon}
                    </div> 
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p> 
                </div>
            ))}
        </div>
        
        <div className='explanation'>
            <p>This application was made using Google's Mediapipe pose landmark detection for pose estimation</p>
        </div>
    </div>
  )
}

export default Home