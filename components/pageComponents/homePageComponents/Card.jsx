import {motion} from 'framer-motion'
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SpeedIcon from '@mui/icons-material/Speed';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import Image from 'next/image'
import {AddToListChip, QuickViewChip} from '../../ActionChip';
import {Rating} from "@mui/material";
import BookmarkIcon from "../../BookmarkIcon";
import cosb from '../../../public/cosb.jpeg'
import Link from "next/link";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from "react";
import axios from "axios";
import {COURSE_STATUS} from "../../../config/constants";
import {getToken} from "../../../utility/Auth";

const Card = ({ title, teacher, image, rating, platform, price, id, isLogged }) => {
    const [status, setStatus] = useState('');


    const handleChange = async (event) => {
        setStatus(event.target.value);

        await axios.post(COURSE_STATUS, {
            id,
            status: event.target.value,
            token: getToken(),
        })
    };

    const key = "classroom";
    const imageUrl = `https://source.unsplash.com/random/400x400/?${title}`;

    console.log(image);

  return (
    <motion.div whileHover={{scale: 1.03}} className="pl-10 border-neutral-200 border-1 pr-5 py-10 rounded-3xl shadow-md container md:w-2/3 flex md:flex-row flex-col mx-auto my-2 mb-6">
        <div className={'flex flex-col md:w-4/5 md:border-r-1 pr-4'}>
            <div className={'flex'}>
                <div className="md:w-1/6 w-1/2 flex flex-col flex-wrap overflow-hidden">

                    {/*<Image className={'w-full rounded-xl'} src={image ? image : cosb} alt={title} height={'70'} width={'50'} />*/}
                    <Image className={'w-full rounded-xl'} src={imageUrl} alt={title} height={'70'} width={'50'} />
                </div>
                <div className="ml-4 w-5/6">
                    <Link href={`/course/${title}`}><h3 className={'text-2xl font-bold hover:underline cursor-pointer'}>{title}</h3></Link>
                    <div className={'flex '}>
     
                        <span className={'ml-2 text-gray-600 text-xs my-auto'}>{teacher}</span>
                    </div>
                </div>

            </div>

        </div>

        <div className={'flex flex-col md:w-1/5 md:ml-5 mt-5 md:mt-0 justify-center'}>


            <div className={'border-b-1 p-2 flex'}>
                <CalendarTodayOutlinedIcon
                    fontSize={'small'}
                    sx={{
                        color: 'gray',
                    }}
                />
                <span className={'ml-1 text-sm text-gray-600'}><Link href ={`/course/${title}/`}>{'Attendance'}</Link></span>
            </div>

        </div>

    </motion.div>
  );
}

export default Card;