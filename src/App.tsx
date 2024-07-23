import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import tailwindLogo from './assets/tailwind.png'
import fontawesomeLogo from './assets/fontawesome.png'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className="flex justify-between">
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo size-40" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react size-40" alt="React logo" />
                </a>
                <a href="https://tailwindcss.com" target="_blank">
                    <img src={tailwindLogo} className="logo tailwind size-40" alt="Tailwind logo" />
                </a>
                <a href="https://fontawesome.com" target="_blank">
                    <img src={fontawesomeLogo} className="logo-jiggle fontawesome size-40" alt="FontAwesome logo" />
                </a>
            </div>
            <h1 className="text-3xl font-bold underline">
                <i className="fa-solid fa-hand-fist mx-5"></i>
                Vite + React + Tailwind + Font Awesome 6
                <i className="fa-solid fa-hand-fist mx-5"></i>
            </h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the logos to learn more about each framework piece.
            </p>
        </>
    )
}

export default App
