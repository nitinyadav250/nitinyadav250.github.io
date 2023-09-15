import {motion} from "framer-motion";
import Link from "next/link";
import {useState, useCallback} from "react";
import axios from "axios";
import {SIGNUP} from "../../config/constants";
import Head from "next/head";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import {ButtonLoading} from "../../components/LoadingComponents";
import GoogleButton from 'react-google-button';
import Footer from "../../components/Footer";
import {login} from "../../utility/Auth";



const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [branch, setBranch] = useState("");
    const [rollno, setRollNo] = useState("");
    const [sem, setSem] = useState("");
    const [collegename, setCollegeName] = useState("");

    const subject = "";

    const handleSubmit = async (e) => {
        setIsLoading(true);
        console.log(sem, branch, rollno, password, collegename, email);
        await axios.post(SIGNUP, {
            college_name: collegename,
            email: email,
            semester: sem,
            roll_no: rollno,
            class_field: branch,
            password: password,
        })
            .then((res) => {
                if(res.data) {
                    login(sem, branch, rollno, subject);
                    window.location.href = "/";
                    setSuccess(true);
                    setIsLoading(false);
                }

            })
            .catch((err) => {

                /*
                if(err.response.data.username) {
                    setError(err.response.data.username[0]);
                }
                else if(err.response.data.email) {
                    setError(err.response.data.email[0]);
                }
                else if(err.response.data.password) {
                    setError(err.response.data.password[0]);
                }
                setIsLoading(false);*/

                console.log(err);
            })
    }

    return (
        <>
        <div>
            <Head>
                <title>Sign up - AttendanceX</title>
            </Head>
            <div className={'fixed top-14 left-0 right-0'}>
                {success && (
                    <Alert severity="success" variant={'filled'} onClose={() => {
                        setSuccess(false);
                    }}>
                        <AlertTitle>Success</AlertTitle>
                        You have successfully signed up. Please login to continue.
                    </Alert>
                )}
            </div>
            <motion.div animate={{scale:[0.8,1]}} transition={{duration:0.3}} className={'flex flex-col mx-auto justify-center items-center mt-20 container py-20 lg:w-1/3 md:w-1/2 rounded-3xl shadow-2xl border-1 border-neutral-200'}>
                <h1 className={'font-bold text-3xl mb-5'}>Sign up to AttendanceX</h1>
                <div className={'flex flex-col mt-10'}>
                    <label className={'my-2'}>Roll Number</label>
                    <input type={'text'} className={'border-solid border-grey-300 border-1 rounded-lg p-2 outline-black'} onChange={(event) => {
                        setRollNo(event.target.value);
                    }} />

                    <label className={'my-2'}>College Name</label>
                    <input type={'text'} className={'border-solid border-grey-300 border-1 rounded-lg p-2 outline-black'} onChange={(event) => {
                        setCollegeName(event.target.value);
                    }} />

                    <label className={'my-2'}>Email</label>
                    <input type={'email'} className={'border-solid border-grey-300 border-1 rounded-lg p-2 outline-black'} onChange={(event) => {
                        setEmail(event.target.value);
                    }} />

                    <label className={'my-2'}>Branch</label>
                    <select className={'border-solid border-grey-300 border-1 rounded-lg p-2 outline-black'} onChange={(event) => {

                        setBranch(event.target.value);

                    }}>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="ME">ME</option>
                        <option value="CE">CE</option>
                        <option value="IT">IT</option>
                        <option value="ECS">ECS</option>

                    </select>


                    <label className={'my-2'}>Semester</label>
                    <select className={'border-solid border-grey-300 border-1 rounded-lg p-2 outline-black'} onChange={(event) => {
                        setSem(event.target.value);
                    }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>

                    </select>

                    <label className={'my-2'}>Password</label>
                    <input type={'password'} className={'border-solid border-grey-300 border-1 rounded-lg p-2 outline-black'} onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                </div>
                <span className={'text-red-500'}>{error}</span>

                <motion.button whileHover={{scale:1.1}} className={'py-2 w-28 bg-gray-800 hover:bg-black rounded-lg text-white mt-5'} onClick={handleSubmit} >
                    {isLoading ?
                        <ButtonLoading/>
                        : "Sign up"
                    }
                </motion.button>

                {/*
                <GoogleButton
                  onClick={openGoogleLoginPage}
                  label="Sign Up with Google"
                  
                />*/}

                <div className={'flex text-left  mt-5 '}>
                    <span className={'text-gray-700'}>Been here before?</span>
                    <Link href={'/login'}>
                        <span className={'cursor-pointer font-semibold hover:underline ml-4'}>Log in</span>
                    </Link>
                </div>
            </motion.div>

        </div>

        <Footer className={'mt-20'}/>

        </>
    );
}

export default Signup;