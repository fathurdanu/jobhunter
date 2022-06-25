import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Header, Footer } from '../../components'
import { getJobsByPage } from "../../actions/jobActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { capitalize, dataToQuery, queryToData } from '../../helper/string_tools';
import moment from 'moment';

function Search() {
    const { action, status, data } = useSelector((state) => state.jobReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { query } = useParams();
    const [page, setPage] = useState(1);
    const [jobList, setJobList] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate('/login');
        } else {
            if (localStorage.getItem("type") !== "user") {
                navigate('/company/create-job');
            }
        };
    }, []);

    const [searchForm, setSearchForm] = useState({
        jobDesc: "",
        location: "",
        isFullTime: false
    })

    useEffect(() => {
        if (query) {
            let keywords = queryToData(query)
            setSearchForm({
                ...searchForm,
                jobDesc: keywords['jobDesc'],
                location: keywords['location'],
                isFullTime: keywords['isFullTime']
            })
        }


    }, [query])

    useEffect(() => {
        query ? dispatch(getJobsByPage(page, query)) : dispatch(getJobsByPage(page));
    }, [page])

    useEffect(() => {
        if (action === "GET_JOBS_BY_PAGE" && status === "data") {
            setJobList([...jobList, ...data])
        }
    }, [status])




    const searchHandling = () => {
        let querySearch = dataToQuery(searchForm);
        navigate("/main/" + querySearch);
        navigate(0);
    }

    const loadMoreHandling = () => {
        setPage(page + 1);
    }

    const detailHandling = (id) => {
        navigate("/main/jobs/" + id);
    }


    return (
        <div>
            <div>
                <div className="fixed z-[5] w-full shadow-stone-700 shadow-md"><Header /></div>
            </div>

            <div className="flex justify-center items-center mx-auto rounded-md lg:h-[88px] h-[200px]">
                <div className="flex justify-center items-center w-full bg-midColor pt-60 pb-7">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5px] rounded-md w-10/12">
                        <input value={searchForm.jobDesc} onChange={(e) => setSearchForm({ ...searchForm, jobDesc: e.target.value })} type="text" className="px-4 py-2 text-lg text-darkColor focus:border-darkColor rounded-md" placeholder="Filter by title, benefits, expertise" />
                        <input value={searchForm.location} onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })} type="text" className="px-4 py-2 text-lg text-darkColor focus:border-darkColor rounded-md" placeholder="Filter by city, state, zip code, country" />
                        <div className="grid grid-cols-3 gap-[5px] items-center lg:h-full h-[35px]">
                            <div className="col-span-2 bg-white text-center h-full flex items-center justify-center rounded-md">
                                <label className="inline-flex items-center">
                                    <input checked={searchForm.isFullTime} onChange={(e) => setSearchForm({ ...searchForm, isFullTime: !searchForm.isFullTime })} type="checkbox" className="w-6 h-6 rounded" />
                                    <span className="ml-2 text-darkColor font-semibold text-lg">Full Time Only</span>
                                </label>
                            </div>
                            <button onClick={() => searchHandling()} className="flex items-center justify-center h-full text-midColor bg-darkColor text-3xl rounded-md">
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="min-h-screen container mx-auto pt-40 px-5">
                <p className="text-3xl font-bold pb-5">Job List</p>
                {
                    (jobList) ? jobList.map((job, index) => {
                        return (
                            <button key={index} className="block w-full my-3" onClick={() => detailHandling(job.id)}>
                                {/* <div className="border-t-2 border-darkColor"> */}
                                <div className=" bg-white rounded-md shadow-stone-500 shadow-sm">
                                    <div className="py-2 grid grid-cols-12">
                                        <div className="col-span-2 mx-auto">
                                            <img alt="logo" className="h-24 object-cover" src={job.User.image} />
                                        </div>
                                        <div className="col-span-5 flex items-center pl-5">
                                            <div>
                                                <p className="block font-bold text-xl">{job.jobName.split(' ').map(capitalize).join(' ')}</p>
                                                <div className="block">
                                                    <p className="inline">{job.User.name}</p>
                                                    <p className="inline">{" - "}</p>
                                                    <p className="inline text-lg font-semibold text-green-600">{job.isFullTime ? "Full Time" : "Part Time"}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-5 pr-5 flex justify-right items-center">
                                            <div className="w-full text-right">
                                                <p className="block text-xl">{job.location.split(' ').map(capitalize).join(' ')}</p>
                                                <div className="block">
                                                    <p className="">{moment(job.updatedAt).fromNow()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        )
                    }) : ""
                }
                <div className="py-10">
                    {
                        (action === "GET_JOBS_BY_PAGE" && status === "data" && data.length !== 0) ?
                            <button onClick={() => loadMoreHandling()} className="w-full bg-darkColor h-14 rounded-md text-lightColor mt-5 text-xl">More Job</button>
                            : ""
                    }
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Search