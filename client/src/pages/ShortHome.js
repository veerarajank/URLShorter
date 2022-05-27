import React from 'react'
import Encode from '../components/Encode'
import Decode from '../components/Decode'
import Stats from '../components/Stats'

// Home component for URL shortner
export default function ShortHome () {
  return (
        <>
          <h1 className="text-center py-10 font-bold ">URL Shortner</h1>
          <div className="bg-gray-300 h-auto grid grid-cols-1 lg:grid-cols-2 gap-16 py-16 place-items-center" role="main">
                <Encode />
                <Decode />
                <Stats />
          </div>
          <h1 className="text-center py-10 font-bold ">©
            <a href="https://github.com/veerarajank">Veerarajan Karunanithi</a>
          </h1>
        </>
  )
}
