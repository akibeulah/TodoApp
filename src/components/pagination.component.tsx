import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";
import {useDispatch, useSelector} from "react-redux";
import {updatePage} from "../store/taskReducer.ts";

export const PaginationComponent = () => {
    const state = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    const tasksPerPage = 8;
    const incrementPage = () => {
        if (state.page < Math.ceil(state.tasks.length / tasksPerPage) - 1) {
            dispatch(updatePage(state.page + 1));
        }
    };

    const decrementPage = () => {
        if (state.page > 0) {
            dispatch(updatePage(state.page - 1));
        }
    };

    return (
        <div className={""}>
            <div className="flex flex-row py-2 lg:pt-8 lg:pb-2.5 border-t-2 justify-between items-center ">
                <button
                    onClick={decrementPage}
                    className={"flex flex-row"}>
                    <ArrowLeftIcon className={"w-6 aspect-square"}/>
                    <h4 className={"ml-2"}>Previous</h4>
                </button>

                <button
                    onClick={incrementPage}
                    className={"flex flex-row-reverse"}>
                    <ArrowRightIcon className={"w-6 aspect-square"}/>
                    <h4 className={"mr-2"}>Next</h4>
                </button>
            </div>
        </div>
    )
}