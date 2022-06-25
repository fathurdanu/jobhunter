import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { dataToQuery } from '../helper/string_tools'

function Banner() {

    const navigate = useNavigate();

    const [searchForm, setSearchForm] = useState({
        jobDesc: "",
        location: "",
        isFullTime: false
    })

    // const [querySearch, setQuerySearch] = useState("")

    const searchHandling = () => {
        let querySearch = dataToQuery(searchForm);
        navigate("/main/" + querySearch);
    }

    return (
        <div className="relative h-full">
            <div className="z-[3] relative text-lightColor container mx-auto h-screen flex justify-center items-center">
                <div className="w-full">
                    <p className="text-center text-5xl mb-5">Search</p>
                    <div className="flex justify-center items-center w-10/12 mx-auto rounded-md lg:h-[88px] px-1">
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5px] rounded-md w-full h-20">
                            <input onChange={(e) => setSearchForm({ ...searchForm, jobDesc: e.target.value })} type="text" className="px-4 py-2 text-lg text-darkColor focus:border-darkColor rounded-md" placeholder="Filter by title, benefits, expertise" />
                            <input onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })} type="text" className="px-4 py-2 text-lg text-darkColor focus:border-darkColor rounded-md" placeholder="Filter by city, state, zip code, country" />
                            <div className="grid grid-cols-3 gap-[5px] items-center lg:h-full h-[35px]">
                                <div className="col-span-2 bg-white text-center h-full flex items-center justify-center rounded-md">
                                    <label className="inline-flex items-center">
                                        <input onChange={(e) => setSearchForm({ ...searchForm, isFullTime: !searchForm.isFullTime })} type="checkbox" className="w-6 h-6 rounded" />
                                        <span className="ml-2 text-darkColor font-semibold text-lg">Full Time Only</span>
                                    </label>
                                </div>
                                <button onClick={() => searchHandling()} className="flex items-center justify-center h-full bg-midColor text-darkColor text-3xl rounded-md">
                                    <FaSearch />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 opacity-60 bg-black z-[2]"></div>
            <div className="absolute inset-0 h-full z-[1]">
                <img className="h-full w-full object-cover" src="https://dpuk71x9wlmkf.cloudfront.net/assets/2018/05/15191844/Looking-for-a-job_social.jpg" />
            </div>
        </div>
    )
}

export default Banner