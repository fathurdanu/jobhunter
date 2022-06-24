import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Header, Footer } from '../../components'
import { getJobsByPage } from "../../actions/jobActions"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Search() {

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate('/login');
        };
    }, []);

    const { action, status, data } = useSelector((state) => state.jobReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { query } = useParams();

    const [page, setPage] = useState(1);
    // const [query, setQuery] = useState("");
    const [jobList, setJobList] = useState([]);
    let keywords = {
        jobDesc: "",
        location: "",
        isFullTime: ""
    };

    const [searchForm, setSearchForm] = useState({
        jobDesc: "",
        location: "",
        isFullTime: false
    })

    useEffect(() => {
        if (query) {

            let newQuery = query;
            if (newQuery.includes("fulltime")) {
                newQuery = (newQuery.length === 8) ? newQuery : newQuery.slice(0, newQuery.length - 9);
                keywords['isFullTime'] = true;
            } else if (newQuery.includes("parttime")) {
                newQuery = (newQuery.length === 8) ? newQuery : newQuery.slice(0, newQuery.length - 9);
                keywords['isFullTime'] = false;
            }

            if (newQuery.startsWith('jobs-in-')) {
                newQuery = newQuery.slice(8, newQuery.length)
                keywords['location'] = newQuery.replace("-", " ");
            } else if (newQuery.includes('-jobs-in-')) {
                newQuery = newQuery.split("-jobs-in-");
                keywords['jobDesc'] = newQuery[0].replace("-", " ");
                keywords['location'] = newQuery[1].replace("-", " ");
            } else if (!newQuery.includes("fulltime") && !newQuery.includes("parttime")) {
                keywords['jobDesc'] = newQuery.replace("-", " ");
            }

            // console.log(keywords);

            setSearchForm({
                ...searchForm,
                jobDesc: keywords['jobDesc'],
                location: keywords['location'],
                isFullTime: keywords['isFullTime']
            })

            // console.log(searchForm);
        }


    }, [query])


    useEffect(() => {
        console.log(searchForm);
    }, [searchForm])

    useEffect(() => {
        query ? dispatch(getJobsByPage(page, query)) : dispatch(getJobsByPage(page));
    }, [page])

    useEffect(() => {
        if (action === "GET_JOBS_BY_PAGE" && status === "data") {
            console.log(data)
            setJobList([...jobList, ...data])
        }
    }, [status])




    const searchHandling = () => {
        console.log(searchForm);


        let querySearch = ""
        // setQuerySearch("");

        if (searchForm["isFullTime"] === true || searchForm["isFullTime"] === false) {
            if (searchForm.isFullTime === true) {
                querySearch = querySearch + "fulltime"
            } else {
                querySearch = querySearch + "parttime"
            }

            if (searchForm.location !== "" || searchForm.jobDesc !== "") {
                querySearch = "-" + querySearch
            }
        }
        if (searchForm.location !== "") {
            querySearch = searchForm.location + querySearch
            if (searchForm.jobDesc !== "") {
                querySearch = "-jobs-in-" + querySearch.replace(" ", "-")
            } else {
                querySearch = "jobs-in-" + querySearch.replace(" ", "-")
            }
        }

        if (!searchForm.jobDesc !== "") {
            querySearch = searchForm.jobDesc + querySearch.replace(" ", "-")
        }

        navigate("/main/" + querySearch);
        navigate(0);
        // console.log(querySearch);

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
                <div className="fixed z-[5] w-full"><Header /></div>
            </div>

            <div className="flex justify-center items-center mx-auto rounded-md lg:h-[88px]">
                <div className="flex justify-center items-center w-full bg-midColor pt-60 pb-7">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-[5px] rounded-md w-10/12 h-14">
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
                            <button onClick={() => detailHandling(job.id)}>
                                <div key={index} className="border-t-2 border-darkColor">
                                    <div className="py-2 grid grid-cols-12">
                                        <div className="col-span-2 mx-auto">
                                            <img alt="logo" className="h-24 object-cover" src={job.User.image} />
                                        </div>
                                        <div className="col-span-5 flex items-center pl-5">
                                            <div>
                                                <p className="block font-bold text-xl">{job.jobName}</p>
                                                <div className="block">
                                                    <p className="inline">{job.User.name}</p>
                                                    <p className="inline">{" - "}</p>
                                                    <p className="inline text-lg font-semibold text-green-600">{job.isFullTime ? "Full Time" : "Part Time"}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-5 pr-2 flex justify-right items-center">
                                            <div className="w-full text-right">
                                                <p className="block text-xl">{job.location}</p>
                                                <div className="block">
                                                    <p className="">{ }</p>
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
                            <button onClick={() => loadMoreHandling()} className="w-full bg-darkColor h-14 rounded-md text-lightColor mt-5">More Job</button>
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