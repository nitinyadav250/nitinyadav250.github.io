import {motion} from "framer-motion";
import Link from "next/link";
import {useEffect, useState, useCallback} from "react";
import {LOGIN} from "../../config/constants";
import axios from "axios";
import {login} from "../../utility/Auth";
import {isLoggedin} from "../../utility/Auth";
import Head from "next/head";
import {ButtonLoading} from "../../components/LoadingComponents";
import GoogleButton from 'react-google-button';
import Footer from "../../components/Footer";


const Login = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(true);


    useEffect(() => {
        isLoggedin().then((res) => {
            setIsLogged(res);
        });
    }, []);

    if(isLogged) {
        window.location.href = "/";
    }


    const handleSubmit = async (e) => {
        setIsLoaded(false);
        await axios.post(LOGIN, {
            email,
            password,
        })
            .then((res) => {
                let roll_no = res.data.roll_no;
                let semester = res.data.semester;
                let branch = res.data.class_field;
                let subject = res.data.name;

                console.log(semester, branch, subject, roll_no);
                if(roll_no) {
                    login(semester, branch, roll_no, subject);
                    window.location.href = "/";
                    console.log("Logged in successfully")
                }
                else {
                    setError("Username or password is incorrect");
                    setIsLoaded(true);
                }
            }).catch((err) => {
                setError("Username or password is incorrect");
                setIsLoaded(true);
            });
    }


    return (

        <>
        <div>
            <Head>
                <title>Login - AttendanceX</title>
            </Head>
            <motion.div animate={{scale:[0.8,1]}} transition={{duration:0.3}} className={'flex flex-col mx-auto justify-center items-center mt-20 container py-20 lg:w-1/3 md:w-1/2 rounded-3xl shadow-2xl border-1 border-neutral-200'}>
                <h1 className={'font-bold text-3xl mb-5'}>Log in to AttendanceX</h1>
                <div className={'flex flex-col mt-10'}>
                    <label className={'my-2'}>Email</label>
                    <input type={'text'} className={'border-solid border-grey-300 border-1 rounded-lg p-2 outline-black'} onChange={(event) => {
                        setEmail(event.target.value);
                    }} />

                    <label className={'my-2'}>Password</label>
                    <input type={'password'} className={'border-solid border-grey-300 border-1 rounded-lg p-2 outline-black'} onChange={() => {
                        setPassword(event.target.value);
                    }} />
                </div>
                <motion.div whileHover={{scale:1.05}} className={'mt-2'}>
                    <span className={'cursor-pointer hover:underline text-left'}>Forgot Password?</span>
                </motion.div>

                <span className={'mt-1 text-red-500'}>{error}</span>

                <motion.button whileHover={{scale:1.1}} className={'py-2 w-24 bg-gray-800 hover:bg-black rounded-lg text-white mt-5'} onClick={() => {
                    handleSubmit();
                }}>{isLoaded ? 'Log in' : <ButtonLoading/>}</motion.button>

    

                <div className={'flex text-left  mt-5 '}>
                    <span className={'text-gray-700'}>New to cosb?</span>
                    <Link href={'/signup'}>
                        <span className={'cursor-pointer font-semibold hover:underline ml-4'}>Sign up now</span>
                    </Link>

   

                </div>

            </motion.div>

        </div>

            <Footer className={'mt-20'}/>

        </>
    )
}

export default Login;