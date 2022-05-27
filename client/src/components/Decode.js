import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

// Conversion of Short Url into an Original Url
export default function Decode () {
  // state and ref
  const [shortUrl, setShortUrl] = useState('')
  const origUrl = useRef('')
  const [auto, setAuto] = useState(false)

  // manual refresh
  const convert = () => {
    refetch()
    setAuto(true)
  }

  // manual clear
  const clear = () => {
    setShortUrl('')
    setAuto(false)
    origUrl.current.value = ''
  }

  // API request to server and return promise
  const convertShortToOriginal = () => {
    return new Promise(resolve => {
      const body = { shortUrl }
      axios.post(`${process.env.REACT_APP_SERVER}/decode`, body).then((res) => resolve(res?.data))
    })
  }

  // React query to handle API call
  const { data, refetch } = useQuery('convertShortToOriginal', convertShortToOriginal, {
    refetchOnWindowFocus: false,
    enabled: false
  })

  // enable react query update when data is available and original url present and convert button is clicked
  if ((data !== undefined) && shortUrl && auto) {
    origUrl.current.value = data?.origUrl || ''
  }

  return (
  <div className="bg-white p-10 rounded-lg shadow-md w-2/3">
        <h1 className="text-xl font-bold text-center">Decoder</h1>
        <h3 className="text-l font-normal text-center">Convert back Short URL into an Original URL</h3>
        <div className="mt-4 mb-10">
            <p className="text-gray-600">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => setShortUrl(e.target.value)}
                    value={shortUrl}
                    placeholder="Short URL" />
            </p>
        </div>
        <div className="mt-4 mb-10">
            <p className="text-gray-600">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    ref={origUrl}
                    placeholder="Original URL" />
            </p>
        </div>
        <div className="flex justify-evenly ">
            <button
                className="bg-orange-400 py-3 px-8 mt-4 rounded text-sm font-semibold hover:bg-opacity-75 disabled:bg-opacity-20"
                disabled={!shortUrl}
                onClick={convert}
                >
                Convert
            </button>
            <button
                className="bg-orange-400 py-3 px-8 mt-4 rounded text-sm font-semibold hover:bg-opacity-75 disabled:bg-opacity-20"
                disabled={!shortUrl}
                onClick={clear}
                >
                Clear
            </button>
        </div>
    </div>
  )
}
