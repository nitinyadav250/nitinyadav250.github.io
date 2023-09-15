import Head from 'next/head'
import Action from "../components/pageComponents/homePageComponents/Action";
import Card from "../components/pageComponents/homePageComponents/Card";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import {HOME_COURSES, SEARCH_COURSES, PERCENTAGE} from "../config/constants";
import {isLoggedin} from "../utility/Auth";
import {useRouter} from "next/router";
import Link from "next/link";
import Footer from "../components/Footer";


export default function Home() {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [count, setCount] = useState(0);
    const [attendance, setAttendance] = useState("");


    const router = useRouter();
    const {token, username} = router.query;

    if (token && username) {

        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        window.location.href = '/'

    }

    useEffect(() => {
        isLoggedin().then(res => {
            setIsLogged(res)
        })
    }, [])

    let branch;
    let semester;
    let rollNo;

    useEffect(() => {

        branch = localStorage.getItem('branch');
        semester = localStorage.getItem('semester');
        rollNo = localStorage.getItem('roll_no')

    }, [])

    useEffect(() => {

        console.log(rollNo);
        console.log('fetching attendance');
        async function fetchAttendance() {

            await axios.post(`${PERCENTAGE}`, {rollNo})
            .then(res => {

                console.log(res.data);
                setAttendance(res.data.percentage);


            })

        }

        fetchAttendance().then(() => setLoading(false));

    }, [])
    

    console.log(branch);
    console.log(semester);
    // according to branch and semester
    useEffect(() => {
        async function fetchData() {
            await axios.get(`${HOME_COURSES}${branch}/${semester}/`, {
  
            })
                .then(res => {
                    setCourseData(res.data);

                })

        }
        console.log(courseData)
    fetchData().then(() => setLoading(false));
    }, [])


    console.log(courseData);

    return  (
        <div>
          <Head>
            <title>AttendanceX</title>
            <meta name="description" content="cosb" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

            <h4 class="text-bold text-center py-10 bg-gray-200 rounded-lg shadow-lg">
                Your current Attendance is  
                <span class="text-blue font-bold text-2xl">
                     {attendance}% 
                    <svg class="inline-block w-8 h-8 ml-2" viewBox="0 0 24 24">
                    <path fill="#4B5563" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM8 14l-3-3 1.4-1.4L8 11.2l7.6-7.6L18 7l-10 10z"/>
                    </svg>
                </span>
            </h4>


            {loading ? (
                <div className={'flex justify-center  w-full h-screen'}>
                    <Box alignItems="center" justifyContent="center"><CircularProgress /></Box>
                    
                </div>
            ) : (

                    <div className='mt-20'>
                    {courseData.length > 0 ? (
                        courseData.map(course => (
                            <Card key={course.id}
                                  id={course.id}
                                  title={course.name}
                                  description={course.teacher}
                                  image={course.image}
                                  rating={course.overall_rating}
                                  platform={course.platform}
                                  price={course.price}
                                  isLogged={isLogged}
                            />))
                    ) : (
                        <div className={'h-screen'}>
                            <h1 className={'text-center text-3xl mt-20'}>Please Login to see your classes.</h1>
                        </div>
                    )}

                    </div>
 


            ) }


        <Footer className={'mt-20'}/>
        

        </div>

  )
}
