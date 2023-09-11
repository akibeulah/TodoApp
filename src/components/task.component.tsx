import {isDateToday} from "../utils.ts";
import {useDispatch} from "react-redux";
import {updateMMS, updateST, updateTT} from "../store/taskReducer.ts";

interface TaskComponentProps {
    selected: boolean;
    title: string;
    time: string;
    date: string;
    completed: boolean;
    index: number;
}

export const TaskComponent = ({selected, title, completed, date, time, index}: TaskComponentProps) => {
    const dispatch = useDispatch()

    return (
        <div
            className={"flex flex-row border-b-2 items-center px-6 py-3.5 bg-[#EAECF0]"}
            onClick={() => {
                dispatch(updateMMS(""))
                dispatch(updateST({
                    date: date,
                    timeIn: time.slice(0, 5),
                    timeOut: time.slice(6,12),
                    title: title,
                    completed: completed,
                    selected: selected
                }))
                dispatch(updateTT(index))
            }}
        >
            <div className="flex flex-row items-center">
                <input type="checkbox" name={title} className={"w-5 h-5"}/>
                <div className="px-3 text-sm w-full">
                    <div className="overflow-hidden w-full  overflow-ellipsis h-[24px]">
                        <h4 className="pb-1">{title}</h4>
                    </div>
                    <h4 className={"font-light"}>{time}</h4>
                </div>
            </div>

            <div className="text-sm text-center font-light ml-auto">
                {isDateToday(date) ? "Today" : "Today"}
            </div>
        </div>
    )
}