import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

// Conversion of Original Url into an Short Url
export default function Encode () {
  // state and ref
  const short = useRef('')
  const [origUrl, setOrigUrl] = useState('')
  const [auto, setAuto] = useState(false)

  // api call to convert original url to short url
  const convertOriginalToShort = () => {
    return new Promise(resolve => {
      axios.post(`${process.env.REACT_APP_SERVER}/encode`, { origUrl }).then(res => resolve(res?.data))
    })
  }

  // manual refresh
  const convert = () => {
    refetch()
    setAuto(true)
  }

  // manual clear
  const clear = () => {
    setOrigUrl('')
    setAuto(false)
    short.current.value = ''
  }

  // React query to handle API call
  const { data, refetch } = useQuery('convertOriginalToShort', convertOriginalToShort, {
    refetchOnWindowFocus: false,
    enabled: false
  })

  // enable react query update when data is available and original url present and convert button is clicked
  if ((data !== undefined) && origUrl && auto) {
    short.current.value = data?.shortUrl || ''
  }

  return (
        <div className="bg-white p-10 rounded-lg shadow-md w-2/3">
            <h1 className="text-xl font-bold text-center">
                Encoder
            </h1>
            <h3 className="text-l font-normal text-center">
                Convert Original URL into an Short URL
            </h3>
            <div className="mt-4 mb-10">
                <p className="text-gray-600">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        onChange={(e) => setOrigUrl(e.target.value)}
                        value={origUrl}
                        placeholder="Original URL" />
                </p>
            </div>
            <div className="mt-4 mb-10">
                <p className="text-gray-600">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Short URL"
                        ref={short}
                    />
                </p>
            </div>
            <div className="flex justify-evenly ">
                <button
                    className="bg-orange-400 py-3 px-8 mt-4 rounded text-sm font-semibold hover:bg-opacity-75 disabled:bg-opacity-20"
                    disabled={!origUrl}
                    onClick={convert}
                    >
                    Convert
                </button>
                <button
                    className="bg-orange-400 py-3 px-8 mt-4 rounded text-sm font-semibold hover:bg-opacity-75 disabled:bg-opacity-20"
                    disabled={!origUrl}
                    onClick={clear}
                    >
                    Clear
                </button>
            </div>
        </div>
  )
}
