import React from 'react'
import "/styles/RedirectLoading.css"

const RedirectLoading = () => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30">
            <svg className="pl" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                        <stop offset="0%" stop-color="hsl(45, 100%, 50%)" />
                        <stop offset="100%" stop-color="hsl(35, 100%, 40%)" />
                    </linearGradient>
                    <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="hsl(45, 100%, 50%)" />
                        <stop offset="100%" stop-color="hsl(35, 100%, 40%)" />
                    </linearGradient>
                </defs>
                <circle className="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round" transform="rotate(-90,100,100)" />
                <line className="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round" />
            </svg>
        </div>
    )
}

export default RedirectLoading