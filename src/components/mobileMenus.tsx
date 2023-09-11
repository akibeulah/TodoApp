import {BellIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {
    addTask,
    deleteTask,
    replaceTaskAtIndex,
    updateMMS,
    updateST,
    updateST_1,
    updateTT
} from "../store/taskReducer.ts";
import {CalendarIcon, ClockIcon} from "@heroicons/react/24/outline";
import {dateOptions, formatDate, isDateToday} from "../utils.ts";
import "react-datepicker/dist/react-datepicker.css";

export const MobileMenus = () => {
    const state = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const mobileMenuContainerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const datePickerInputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                mobileMenuContainerRef.current &&
                mobileMenuContainerRef.current.contains(event.target) &&
                !mobileMenuRef.current.contains(event.target) &&
                state.mobileMenuState !== "closed"
            )
                closeMenus()
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [state.mobileMenuState]);

    const closeMenus = () => {
        dispatch(updateMMS("closed"))
        dispatch(updateST({
            date: new Date().toLocaleDateString("en", dateOptions),
            timeIn: "00:00",
            timeOut: "00:00",
            title: "",
            completed: false,
            selected: false
        }))
        dispatch(updateTT(-1))
    }
    const handleDatePickerClick = () => {
        if (datePickerInputRef.current) {
            console.log(datePickerInputRef.current)
            datePickerInputRef.current.click();
        }
    };

    return (
        <div ref={mobileMenuContainerRef}
             className={"lg:hidden fixed z-50 top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[#00000066] " + (state.mobileMenuState === "closed" ? "hidden" : "")}>

            <div ref={mobileMenuRef}
                 className="bg-white p-6 absolute bottom-0 left-0 right-0 rounded-t-3xl">
                <div className="flex flex-row justify-between mb-4">
                    <h4 className={"font-bold text-lg capitalize"}>{state.mobileMenuState.replace("_", " ")}</h4>
                    <button onClick={() => closeMenus()}>
                        <XMarkIcon className={"w-6 aspect-square"}/>
                    </button>
                </div>

                {
                    state.mobileMenuState === "add_task" ?
                        // Add Task
                        <div className={""}>
                    <textarea
                        onChange={(e) => dispatch(updateST_1({
                            name: "title",
                            value: e.target.value
                        }))}
                        className={"bg-[#D0D5DDaa] outline-none w-full rounded-lg p-2 text-sm h-[140px] mb-4"}
                        value={state.selectedTask.title}
                    />

                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div
                                    className={"text-xs flex flex-row items-center text-center border rounded-xl px-2 sm:px-4 py-2.5"}
                                    onClick={handleDatePickerClick}
                                >
                                    <input type="date" ref={datePickerInputRef} className={"hidden"}
                                           onChange={e => {
                                               dispatch(updateST_1(
                                                   {
                                                       name: "date",
                                                       value: new Date(e.target.value).toLocaleDateString("en", dateOptions)
                                                   }
                                               ))
                                           }}
                                    />
                                    {
                                        isDateToday(state.selectedTask.date) ?
                                            <CalendarIcon className={"w-5 aspect-square mr-2"}/> : null
                                    }
                                    <h4>{isDateToday(state.selectedTask.date) ? "Today" : state.selectedTask.date}</h4>
                                </div>

                                <div
                                    className={"text-sm flex flex-row items-center border rounded-xl px-2 sm:px-4 py-2.5"}>
                                    <input type="time" ref={datePickerInputRef} className={"hidden"}
                                           onChange={e => {
                                               dispatch(updateST_1(
                                                   {
                                                       name: "timeIn",
                                                       value: e.target.value
                                                   }
                                               ))
                                           }}
                                    />
                                    <ClockIcon className={"w-5 aspect-square mr-2"}/>
                                    <h4>{state.selectedTask.timeIn}</h4>
                                </div>

                                <div
                                    className={"text-sm flex flex-row items-center border rounded-xl px-2 sm:px-4 py-2.5"}>
                                    <input type="time" ref={datePickerInputRef} className={"hidden"}
                                           onChange={e => {
                                               dispatch(updateST_1(
                                                   {
                                                       name: "timeOut",
                                                       value: e.target.value
                                                   }
                                               ))
                                           }}
                                    />
                                    <ClockIcon className={"w-5 aspect-square mr-2"}/>
                                    <h4>{state.selectedTask.timeOut}</h4>
                                </div>
                            </div>

                            <div className="text-[#667085] flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center">
                                    <BellIcon className={"mr-2 w-4 aspect-square"}/>
                                    <h4>10 Minutes before</h4>
                                </div>

                                <XMarkIcon className={"w-4 aspect-square"}/>
                            </div>

                            <div className="pt-8 pb-3 grid grid-cols-2 gap-3">
                                <button
                                    className={"py-2.5 text-center font-medium border  rounded-lg"}
                                    onClick={() => closeMenus()}
                                >Cancel
                                </button>

                                <button onClick={() => {
                                    dispatch(addTask(state.selectedTask))
                                    dispatch(updateST({
                                        date: new Date().toLocaleDateString("en", dateOptions),
                                        timeIn: "00:00",
                                        timeOut: "00:00",
                                        title: "",
                                        completed: false,
                                        selected: false
                                    }))
                                }}
                                        className={"py-2.5 text-center font-medium border bg-blue-600 text-white rounded-lg"}>Add
                                </button>
                            </div>
                        </div>
                        : state.mobileMenuState === " " ?
                            <div className={""}>
                                <h4 className={"text-lg font-bold mb-8"}>{state.selectedTask.title}</h4>
                                <div className="relative flex flex-row mb-2">
                                    <CalendarIcon className={"w-6 mr-2 aspect-square text-blue-600"}/>
                                    <h4>{formatDate(state.selectedTask.date)}</h4>
                                </div>
                                <div className="relative flex flex-row">
                                    <ClockIcon className={"w-6 mr-2 aspect-square text-blue-600"}/>
                                    <h4>{state.selectedTask.timeIn}-{state.selectedTask.timeOut}</h4>
                                </div>

                                <div className="pt-8 pb-3 grid grid-cols-2 gap-3">
                                    <button
                                        className={"py-2.5 text-center font-medium border  rounded-lg"}
                                        onClick={() => dispatch(deleteTask(state.targetTask))}
                                    >Delete
                                    </button>

                                    <button
                                        onClick={() => dispatch(updateMMS("edit_task"))}
                                        className={"py-2.5 text-center font-medium border bg-blue-600 text-white rounded-lg"}>Edit
                                    </button>
                                </div>
                            </div>
                            : state.mobileMenuState === "edit_task" ?
                                <div className={""}>
                                    <div className={""}>
                                        <textarea
                                            onChange={(e) => dispatch(updateST_1({
                                                name: "title",
                                                value: e.target.value
                                            }))}
                                            className={"bg-[#D0D5DDaa] outline-none w-full rounded-lg p-2 text-sm h-[140px] mb-4"}
                                            value={state.selectedTask.title}
                                        />

                                        <div className="grid grid-cols-3 gap-3 mb-4">
                                            <div
                                                className={"text-xs flex flex-row items-center text-center border rounded-xl px-2 sm:px-4 py-2.5"}
                                                onClick={handleDatePickerClick}
                                            >
                                                <input type="date" ref={datePickerInputRef} className={"hidden"}
                                                       onChange={e => {
                                                           dispatch(updateST_1(
                                                               {
                                                                   name: "date",
                                                                   value: new Date(e.target.value).toLocaleDateString("en", dateOptions)
                                                               }
                                                           ))
                                                       }}
                                                />
                                                {
                                                    isDateToday(state.selectedTask.date) ?
                                                        <CalendarIcon className={"w-5 aspect-square mr-2"}/> : null
                                                }
                                                <h4>{isDateToday(state.selectedTask.date) ? "Today" : state.selectedTask.date}</h4>
                                            </div>

                                            <div
                                                className={"text-sm flex flex-row items-center border rounded-xl px-2 sm:px-4 py-2.5"}>
                                                <input type="time" ref={datePickerInputRef} className={"hidden"}
                                                       onChange={e => {
                                                           dispatch(updateST_1(
                                                               {
                                                                   name: "timeIn",
                                                                   value: e.target.value
                                                               }
                                                           ))
                                                       }}
                                                />
                                                <ClockIcon className={"w-5 aspect-square mr-2"}/>
                                                <h4>{state.selectedTask.timeIn}</h4>
                                            </div>

                                            <div
                                                className={"text-sm flex flex-row items-center border rounded-xl px-2 sm:px-4 py-2.5"}>
                                                <input type="time" ref={datePickerInputRef} className={"hidden"}
                                                       onChange={e => {
                                                           dispatch(updateST_1(
                                                               {
                                                                   name: "timeOut",
                                                                   value: e.target.value
                                                               }
                                                           ))
                                                       }}
                                                />
                                                <ClockIcon className={"w-5 aspect-square mr-2"}/>
                                                <h4>{state.selectedTask.timeOut}</h4>
                                            </div>
                                        </div>

                                        <div className="text-[#667085] flex flex-row justify-between items-center">
                                            <div className="flex flex-row items-center">
                                                <BellIcon className={"mr-2 w-4 aspect-square"}/>
                                                <h4>10 Minutes before</h4>
                                            </div>

                                            <XMarkIcon className={"w-4 aspect-square"}/>
                                        </div>

                                        <div className="pt-8 pb-3 grid grid-cols-2 gap-3">
                                            <button
                                                className={"py-2.5 text-center font-medium border  rounded-lg"}
                                                onClick={() => closeMenus()}
                                            >Cancel
                                            </button>

                                            <button onClick={() => {
                                                dispatch(replaceTaskAtIndex({
                                                    index: state.targetTask,
                                                    newTask: state.selectedTask
                                                }))
                                                dispatch(updateST({
                                                    date: new Date().toLocaleDateString("en", dateOptions),
                                                    timeIn: "00:00",
                                                    timeOut: "00:00",
                                                    title: "",
                                                    completed: false,
                                                    selected: false
                                                }))
                                                closeMenus()
                                            }}
                                                    className={"py-2.5 text-center font-medium border bg-blue-600 text-white rounded-lg"}>Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                : null
                }
            </div>
        </div>
    )
}