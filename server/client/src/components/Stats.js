import React, { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

// To view the stats of the short Url
export default function Stats () {
  // state and ref
  const [shortUrl, setShortUrl] = useState('')
  const visit = useRef(0)
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
    visit.current.textContent = 0
  }

  // api call to view the short url stats
  const convertShortToOriginal = () => {
    return new Promise(resolve => {
      const body = { shortUrl }
      axios.post(`${process.env.REACT_APP_SERVER}/decode`, body).then((res) => resolve(res?.data))
    })
  }

  const { data, refetch } = useQuery('convertShortToOriginal', convertShortToOriginal, {
    refetchOnWindowFocus: false,
    enabled: false
  })

  // enable react query update when data is available and original url present and convert button is clicked
  if ((data !== undefined) && shortUrl && auto) {
    visit.current.textContent = data?.clicks || 0
  }

  return (
        <div className="bg-white p-10 rounded-lg shadow-md w-2/3">
            <h1 className="text-xl font-bold text-center">Stats</h1>
            <h3 className="text-l font-normal text-center">View the statistics of the Short URL</h3>
            <div className="mt-4 mb-10">
                <p className="text-gray-600">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={shortUrl}
                        onChange={(e) => setShortUrl(e.target.value)}
                        placeholder="Short URL" />
                </p>
            </div>
            <div>
                Number of Visits :{' '}
                <span ref={visit}></span>
            </div>
            <div className="flex justify-evenly">
                <button
                    className="bg-orange-400 py-3 px-8 mt-4 rounded text-sm font-semibold hover:bg-opacity-75 disabled:bg-opacity-20"
                    disabled={!shortUrl}
                    onClick={convert}
                    >
                    View
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
