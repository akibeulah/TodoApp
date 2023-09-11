import React from "react";
import {MicrophoneIcon} from "@heroicons/react/20/solid";
import {useDispatch, useSelector} from "react-redux";
import {updateMMS, updateST_1} from "../store/taskReducer.ts";

export const FooterComponent = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.tasks)
    const deferFunc = () => {
        dispatch(updateST_1("id", state.tasks.length))
        dispatch(updateMMS("add_task"))
    }
    return (
        <>
            <div
                className={"fixed z-10 bg-white bottom-0 right-0 left-0 flex flex-row justify-between px-4 py-2 lg:hidden"}>

                <div className="relative w-full">
                    <input
                        type="text"
                        onClick={deferFunc}
                        onFocus={deferFunc}
                        onChange={deferFunc}
                        value={""}
                        className={"bg-[#D0D5DD] outline-none p-3 rounded-xl w-full text-[#475467]"}
                        placeholder={"Input task"}/>
                    <MicrophoneIcon
                        className={"absolute top-1/2 transform -translate-y-1/2 right-4 text-blue-600 w-6 aspect-square"}/>
                </div>
            </div>

            <div className="w-full h-[63px] content-[ ] lg:hidden"></div>
        </>
    )
}