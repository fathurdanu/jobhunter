import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../../actions/jobActions";
import Swal from 'sweetalert2'

import { RichTextEditor } from '../../components'

function AddJob() {
    const { action, status, data } = useSelector((state) => state.jobReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        jobName: "",
        location: "",
        description: "",
        isFullTime: false,
        officialWeb: "",
        applyAtPage: "",
        cvSubmissionEmail: "",
    });

    useEffect(() => {
        console.log(form.description);
    }, [form.description])


    const addJobHandler = () => {
        dispatch(createJob(form));
    };

    useEffect(() => {
        if (action === "CREATE" && status === "data") {
            navigate("/cms/dashboard");
        }
    }, [data]);


    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate('/login');
        } else {
            if (localStorage.getItem("type") !== "company") {
                navigate('/home');
            }
        };
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="lg:w-10/12 md:w-3/5 w-full bg-white rounded-md max-h-screen py-5 sm:border-2 border-darkColor border-0">
                <div className="p-5">
                    <div className="grid grid-cols-2">
                        <div className="py-4 text-5xl font-bold text-darkColor text-center">
                            Add Job
                        </div>
                        <div className="flex justify-end pr-5">
                            <Link
                                to="/login"
                                className="h-12 text-xl text-white hover:text-midColor md:inline sm:block py-2 px-3 bg-darkColor rounded-md shadow-md shadow-stone-500 hover:shadow-none"
                                onClick={() => {
                                    Swal.fire("Logout Success!", "See you later!", "success");
                                    localStorage.clear();
                                }}
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                    <hr className="border-green-800 mx-5" />


                    <div className="grid grid-cols-12">

                        <div className="lg:col-span-8 col-span-12">
                            <div className="px-5 py-2">
                                <label className="block text-darkColor text-lg font-bold pb-2">
                                    Description
                                </label>

                                {/* <JoditEditor
                                    ref={editor}
                                    // value={content}
                                    config={config}
                                    tabIndex={1} // tabIndex of textarea
                                    // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={(e) => { setForm({ ...form, description: e }); console.log(form.description) }}
                                /> */}

                                <RichTextEditor value={form} setValue={setForm} />
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="px-5 py-2">
                                <label className="block text-darkColor text-lg font-bold pb-2">
                                    Job Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Software Developer"
                                    className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                                    onChange={(e) => setForm({ ...form, jobName: e.target.value })}
                                ></input>
                            </div>
                            <div className="px-5 py-2">
                                <label className="block text-darkColor text-lg font-bold pb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Jakarta Utara"
                                    className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                ></input>
                            </div>
                            <div className="px-5 py-2">
                                <label className="block text-darkColor text-lg font-bold pb-2">
                                    Job Type
                                </label>
                                <select
                                    className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
                                    name="category"
                                    id="category"
                                    value={form.isFullTime}
                                    onChange={(e) => setForm({ ...form, isFullTime: e.target.value })}
                                >
                                    <option value={false}>Part Time</option>
                                    <option value={true}>Full Time</option>
                                </select>
                            </div>
                            <div className="px-5 py-2">
                                <label className="block text-darkColor text-lg font-bold pb-2">
                                    {"Official Website"}
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: https://www.abc.com"
                                    className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                                    onChange={(e) => setForm({ ...form, officialWeb: e.target.value })}
                                ></input>
                            </div>
                            <div className="px-5 py-2">
                                <label className="block text-darkColor text-lg font-bold pb-2">
                                    {"Apply Directly at"}
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: https://www.abc.com/career"
                                    className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                                    onChange={(e) => setForm({ ...form, applyAtPage: e.target.value })}
                                ></input>
                            </div>
                            <div className="px-5 py-2">
                                <label className="block text-darkColor text-lg font-bold pb-2">
                                    {"Email (Resume submission)"}
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: career@abc.com"
                                    className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                                    onChange={(e) => setForm({ ...form, cvSubmissionEmail: e.target.value })}
                                ></input>
                            </div>
                        </div>
                    </div>


                    <div className="px-5 py-5">
                        <button
                            className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
                            name="condition"
                            id="condition"
                            onClick={() => {
                                addJobHandler();
                            }}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddJob