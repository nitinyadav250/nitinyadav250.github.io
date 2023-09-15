import {Rating} from "@mui/material";
import BookmarkIcon from "../../BookmarkIcon";
import {AddToListChip, MarkCompleteChip, WriteReviewChip} from "../../ActionChip";

export const TitleCard = ({title, platform, className, rating, desc, teacher}) => {
    return (
        <div className={'flex py-5 flex-col bg-white border-1 border-neutral-200 rounded-md pl-8 ' + className}>
            <span className={'font-bold text-4xl'}>{title}</span>
            <span className={'text-xl mt-2 cursor-pointer'}>Teacher <span className={'hover:underline'}>{teacher}</span></span>


            <span className={'mt-5 text-justify'}>{desc}</span>
            {/*<span className={'text-lg'}>{reviews} Reviews</span>*/}
            {/*<div className={'flex flex-row mt-5'}>
                <BookmarkIcon className={'-ml-1'}/>
                <AddToListChip />
                <MarkCompleteChip className={'ml-2'}/>
                <WriteReviewChip className={'ml-2'}/>
    </div>*/}
        </div>
    )
}

export default TitleCard;