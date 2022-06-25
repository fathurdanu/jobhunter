import React, { useEffect } from 'react'
import { Header, Footer } from '../../components';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import { getJobById } from "../../actions/jobActions";
import { capitalize } from '../../helper/string_tools';
import DOMPurify from 'dompurify';

function Job() {
    const { action, status, data } = useSelector((state) => state.jobReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate('/login');
        } else {
            if (localStorage.getItem("type") !== "user") {
                navigate('/company/create-job');
            }
        };
        dispatch(getJobById(+id));
    }, []);

    return (
        <div className="">
            <div className="fixed w-full"><Header /></div>

            <div className="pt-6">
                <div className="mt-20 min-h-screen container p-5 mx-auto">

                    {
                        (action === "GET_JOB_BY_ID" && status === "data") ?
                            <div className="m-5 p-5  border-4 border-darkColor bg-stone-100 rounded-md">
                                <div className="p-5">
                                    <p className="text-xl">{data.isFullTime ? "Full Time" : "Part Time"} / {data.location.split(' ').map(capitalize).join(' ')}</p>
                                    <p className="text-3xl font-semibold">{data.jobName.split(' ').map(capitalize).join(' ')}</p>
                                </div>
                                <div className="px-5">
                                    <hr className="border-darkColor" />
                                </div>
                                <div className="grid grid-cols-12">
                                    <div className="col-span-8 p-5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }} >
                                    </div>
                                    <div className="col-span-4">

                                        {/* card company */}
                                        <div className="border-4 border-darkColor rounded-md mb-5 p-1 mt-5  bg-darkColor text-white shadow-md shadow-stone-500">
                                            <div className="border-2 p-5 rounded-sm">
                                                <div className="grid grid-cols-2 pb-2 mb-2 border-b-2 border-white">
                                                    <div className="text-xl font-bold">
                                                        {data.User.name}
                                                    </div>
                                                    <div>
                                                        {/* {data.User.name} */}
                                                    </div>
                                                </div>
                                                <div className="bg-white p-5 rounded-md">
                                                    <img alt="company logo" src={data.User.image} />
                                                </div>
                                                <div className="">
                                                    {data.officialWeb}
                                                </div>
                                            </div>
                                        </div>

                                        {/* card how to apply */}
                                        <div className="border-4 border-darkColor rounded-md min-h-40 p-1 bg-darkColor text-white shadow-md shadow-stone-500">
                                            <div className="border-2 p-5 rounded-sm">
                                                <div className="grid grid-cols-2 border-b-2 border-white pb-2">
                                                    <div className="text-xl font-bold">
                                                        How to apply
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <p>Email your resume to {data.cvSubmissionEmail} or apply directly at {data.applyAtPage}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
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

export default Job