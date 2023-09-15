import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import {TitleCard} from "../../components/pageComponents/coursePageComponents/TitleCard";
import {DescriptionCard} from "../../components/pageComponents/coursePageComponents/DescriptionCard";
import {InfoCard} from "../../components/pageComponents/coursePageComponents/InfoCard";
import TitleCardMobile
    from "../../components/pageComponents/coursePageComponents/smallScreenComponents/TitleCardMobile";
import NavigationCard from "../../components/pageComponents/coursePageComponents/smallScreenComponents/NavigationCard";
import InfoCardMobile from "../../components/pageComponents/coursePageComponents/smallScreenComponents/InfoCardMobile";
import RelatedCoursesMobile
    from "../../components/pageComponents/coursePageComponents/smallScreenComponents/RelatedCoursesMobile";
import ReviewsMobile from "../../components/pageComponents/coursePageComponents/smallScreenComponents/ReviewsMobile";
import BottomButton from "../../components/pageComponents/coursePageComponents/smallScreenComponents/BottomButton";
import {useState, useEffect} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import Footer from "../../components/Footer";
import {ALL_COURSES, COURSE_DETAILS, FORM, ATTENDANCE} from "../../config/constants";
import {IdContext} from "../../context/IdContext";
import {NextSeo} from "next-seo";
import Link from "next/link";
import {isLoggedin} from "../../utility/Auth";
import Head from 'next/head'
import { WriteReviewChip } from "../../components/ActionChip";



/*
export const getServerSideProps = async ({params}) => {
    let res = await axios.get(`${COURSE_DETAILS}${params.slug}`);
    return {
        props: {
            course: res.data,
        }
    }
}
*/

export default function CoursePage() {

    const router = useRouter();
    let { slug } = router.query;

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [platform, setPlatform] = useState("");
    const [language, setLanguage] = useState("");
    const [certificate, setCertificate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState("");
    const [rating, setRating] = useState(0);
    const [link, setLink] = useState("");
    const [desc, setDesc] = useState("");
    const [id, setId] = useState("");
    const [courseData, setCourseData] = useState([]);
    const [teacher, setTeacher] = useState("");
    const [showForm, setShowForm] = useState("");

    useEffect(() => {
        
        async function fetchData() {

            await axios.get(FORM, {})
            .then(res => {
                
                setShowForm(res.data.status);

            })
        
        
        }

        fetchData();

    }, [])

    useEffect(() => {
        async function fetchData() {

            if (slug){

                await axios.get(`${COURSE_DETAILS}${slug}/`, {
  
                })
                    .then(res => {
                        setCourseData(res.data);
    
                    })

            }


        }

        console.log(courseData)

    fetchData().then(() => setLoading(false));

    }, [slug])


    useEffect(() => {

        setTitle(courseData.name);
        setPrice(courseData.price);
        setPlatform(courseData.platform);
        setLanguage(courseData.language);
        setCertificate(courseData.certificate);
        setImage(courseData.image);
        setRating(courseData.overall_rating);
        setLink(courseData.link);
        setLoading(false);
        setDesc(courseData.description);
        setId(courseData.id);
        setTeacher(courseData.teacher);

    }, [courseData]);


    const imageUrl = `https://source.unsplash.com/random/400x400/?${title}`;


    // call attendance api



    return (
        <>

            <Head>
              <title>{title} - AttendanceX</title>
              <meta name="description" content={desc} />
              <link rel="icon" href="/favicon.ico" />


            </Head>

            {loading ?
        (
        <div className={'flex justify-center items-center w-full h-screen bg-gray-500'}>
            <div className={'bg-white p-5 rounded-lg border-gray-200 border-2'}>
                <Box alignItems="center" justifyContent="center"><CircularProgress /></Box>
            </div>
        </div>
    ) : (


        <div className={'bg-grey'}>
            <div className={'lg:px-20 flex md:flex-row flex-col pt-20'}>
                 {/*This is for Bigger Screens */}
                <div className={'hidden md:flex flex-col w-2/3'}>
                    <TitleCard title={title} platform={platform} rating={rating} teacher = {teacher}/>


                    {
                    
                        showForm ? 
                        
                        <WriteReviewChip slug = {slug} subject={title}/> :
                        
                        <DescriptionCard className={'mt-5'} desc = {'Attendance Form is not acticated currently 🙌.'} />
                        
                    }

                </div>
                <div className={'hidden md:flex flex-col w-1/3 ml-5 mb-5'}>
                    <InfoCard
                        image={imageUrl}
                        platform={platform}
                        price={price === '0' ? 'Free' : price}
                        language={language}
                        certificate={certificate ? 'Certificate Available' : 'Certificate Available'}
                        link={'https://www.youtube.com/watch?v=1Q8fG0TtVAY'}
                    />
                </div>



                 {/*This is for Smaller Screens*/}
                <div className={'flex md:hidden flex-col'}>

                    <IdContext.Provider value={slug}>
                        <TitleCardMobile
                        title={title}
                        platform={platform}
                        rating={rating}
                        image={image}
                        link={'https://www.youtube.com/watch?v=1Q8fG0TtVAY'}
                        desc = {desc}
                    />
                    </IdContext.Provider>

                    {/*<NavigationCard/>*/}
                    <InfoCardMobile
                        platform={platform}
                        price={price === '0' ? 'Free' : price}
                        language={language}
                        certificate={certificate ? 'Certificate Available' : 'Certificate Available'}
                    />
                    {/*<RelatedCoursesMobile/>*/}
                    <ReviewsMobile id={slug}/>
                    
                    
                    {/*<BottomButton/>*/}
                    <div class="sharethis-inline-share-buttons"></div>
                </div>

            </div>
        </div>
    )}

        <Footer className={'mt-20'}/>
        </>)
}