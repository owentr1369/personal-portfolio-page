import React from 'react'
import HeroContent from '../sub/HeroContent'

const Hero = () => {

    return (
        <div className='relative flex flex-col h-full w-full' id="about-me">
            <video autoPlay muted loop className='rotate-180 absolute top-[-340px] left-0 z-[1] w-full h-full object-cover'>
                <source src='/blackhole.webm' type='video/webm' />
            </video>
            {/* Black hole gravitational lensing overlay */}
            <div
                className="absolute inset-0 z-[10] pointer-events-none md:hidden"
                style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 55%, transparent 0%, transparent 25%, rgba(3,0,20,0.35) 55%, rgba(3,0,20,0.75) 80%, rgba(3,0,20,0.97) 100%)",
                }}
            />
            <HeroContent />
        </div>
    )
}

export default Hero