import {DateTileComponent} from "../components/dateTile.component.tsx";
import {TaskComponent} from "../components/task.component.tsx";
import {
    dateOptions,
    fetchData,
    formatDate,
    generateMonthArray,
    getAbbreviatedDayOfWeek,
    getDaysInMonthArray,
    getInputDate,
    getTodayMonthAndYear,
    greet,
    isDateToday
} from "../utils.ts";
import {useEffect, useRef} from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {
    addTask,
    deleteTask,
    replaceTaskAtIndex,
    updateMMS,
    updateSD,
    updateST,
    updateST_1,
    updateTasks,
    updateTT
} from "../store/taskReducer.ts";
import {PaginationComponent} from "../components/pagination.component.tsx";
import {BellIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {CalendarIcon, ClockIcon} from "@heroicons/react/24/outline";
import {CalenderDateTileComponent} from "../components/calenderDateTile.component.tsx";

export const Home = () => {
    const state = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const dateCardsRef = useRef(null)


    const mobileMenuContainerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const datePickerInputRef = useRef(null);

    const handleDatePickerClick = () => {
        if (datePickerInputRef.current) {
            console.log(datePickerInputRef.current)
            datePickerInputRef.current.click();
        }
    };

    useEffect(() => {
        fetchData()
            .then((todos: any) => {
                dispatch(updateTasks(
                    todos.slice(0, 10).map(i => {
                        return {...i, date: new Date().toLocaleDateString("en", dateOptions)}
                    })
                ))
            })
            .catch((error) => {
                toast.error("Error fetching data:", error);
            });
    }, [])

    useEffect(() => {
        if (dateCardsRef.current) {
            const scrollItem = dateCardsRef.current.children[new Date(state.selectedDate).getDate() - 2]; // Change the index to target the desired item
            scrollItem.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'start'});
        }
    }, [state.selectedDate]);



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

    return (
        <div className={"container mx-auto"}>
            <div className={"px-4 py-8 flex flex-row justify-between"}>
                <div className="">
                    <h4 className={"text-2xl font-bold"}>{greet()}</h4>
                    <h4>You got some task to do.</h4>
                </div>

                <div className="hidden lg:block">
                    <button
                        onClick={() => {
                            dispatch(updateMMS("add_task"))
                            dispatch(updateST_1({name: "id", value: state.tasks.length + 1}))
                        }}
                        className="flex flex-row items-center rounded-xl text-white py-2.5 text-sm px-4 font-medium bg-blue-600">
                        <PlusIcon className={"w-6 aspect-square"}/>
                        <h4>Create New Task</h4>
                    </button>
                </div>
            </div>

            <div className="lg:grid grid-cols-3 gap-5">
                <div className="col-span-2 lg:px-4 lg:border-r-2">
                    <div className="">
                        <div className="px-4 mb-3">
                            <h4 className={"font-medium"}>{getTodayMonthAndYear(state.selectedDate)}</h4>
                        </div>
                    </div>

                    <div className="w-full overflow-hidden pb-8">
                        <div
                            ref={dateCardsRef}
                            className="flex flex-row pl-4 overflow-x-scroll scrollbar scrollbar-thin">
                            {
                                getDaysInMonthArray(new Date(state.selectedDate).getMonth()).map((item, key) =>
                                        <span key={key} className={"mr-3"}>
                                    <DateTileComponent day={key + 1} weekday={getAbbreviatedDayOfWeek(item)}
                                                       active={new Date(state.selectedDate).getDate() === (key + 1)}/>
                                </span>
                                )
                            }
                        </div>
                    </div>

                    <div className="px-4 lg:px-0">
                        <div className="font-bold pb-4">
                            <h4>My Tasks</h4>
                        </div>

                        <div className="">
                        </div>
                        {
                            state.tasks
                                .filter(i => new Date(i.date).toLocaleDateString("en") === new Date(state.selectedDate).toLocaleDateString("en"))
                                .slice((state.page * 8), (state.page * 8) + 8)
                                .map((item, key) =>
                                        <span key={key} className={"block mb-4"}>
                                            <TaskComponent selected={false} title={item.title} index={item.id}
                                                           time={item.timeIn ? item.timeIn + "-" + item.timeOut : "10:30- 11:30"}
                                                           date={item.date || new Date().toLocaleDateString("en")}
                                                           completed={false}/>
                                </span>
                                )
                        }
                    </div>

                    <div className="px-4 lg:px-0">
                        <PaginationComponent/>
                    </div>
                </div>

                <div className="hidden lg:block pr-4">
                    {
                        state.mobileMenuState === "closed"
                            ?
                            <>
                                <div className="shadow-lg py-5 px-6">
                                    <div className="py-1.5 px-2 flex flex-row justify-between mb-3">
                                        <ChevronLeftIcon className={"w-6 aspect-square"}/>

                                        <h4 className={"font-medium"}>{getTodayMonthAndYear(state.selectedDate)}</h4>

                                        <ChevronRightIcon className={"w-6 aspect-square"}/>
                                    </div>

                                    <div className="flex flex-row space-x-3 mb-3">
                                        <input
                                            type="date"
                                            value={getInputDate(state.selectedDate)}
                                            onChange={e => dispatch(updateSD(new Date(e.target.value).toLocaleDateString("en")))}
                                            className={"py-2 px-4 w-3/4 border rounded-lg outline-none"}/>
                                        <button
                                            onClick={() => dispatch(updateSD(new Date().toLocaleDateString("en")))}
                                            className={"rounded-lg font-medium w1/4 border px-4 py-2.5"}>
                                            Today
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        <CalenderDateTileComponent active={false} header={true} text={"Mo"}/>
                                        <CalenderDateTileComponent active={false} header={true} text={"Tu"}/>
                                        <CalenderDateTileComponent active={false} header={true} text={"Wed"}/>
                                        <CalenderDateTileComponent active={false} header={true} text={"Th"}/>
                                        <CalenderDateTileComponent active={false} header={true} text={"Fr"}/>
                                        <CalenderDateTileComponent active={false} header={true} text={"Sat"}/>
                                        <CalenderDateTileComponent active={false} header={true} text={"Su"}/>

                                        {
                                            generateMonthArray(state.selectedDate)
                                                .map((item, key) =>
                                                    <CalenderDateTileComponent text={item} header={false} key={key} active={new Date(state.selectedDate).getDate() === item}/>)
                                        }
                                    </div>
                                </div>
                            </>
                            :
                            <div className="shadow-lg py-5 px-6">
                                <button className={"ml-auto block"} onClick={closeMenus}>
                                    <XMarkIcon className={"w-6 aspect-square"}/>
                                </button>

                                <div className="">
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
                                                                <CalendarIcon
                                                                    className={"w-5 aspect-square mr-2"}/> : null
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

                                                <div
                                                    className="text-[#667085] flex flex-row justify-between items-center">
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
                                                                    <input type="date" ref={datePickerInputRef}
                                                                           className={"hidden"}
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
                                                                            <CalendarIcon
                                                                                className={"w-5 aspect-square mr-2"}/> : null
                                                                    }
                                                                    <h4>{isDateToday(state.selectedTask.date) ? "Today" : state.selectedTask.date}</h4>
                                                                </div>

                                                                <div
                                                                    className={"text-sm flex flex-row items-center border rounded-xl px-2 sm:px-4 py-2.5"}>
                                                                    <input type="time" ref={datePickerInputRef}
                                                                           className={"hidden"}
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
                                                                    <input type="time" ref={datePickerInputRef}
                                                                           className={"hidden"}
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

                                                            <div
                                                                className="text-[#667085] flex flex-row justify-between items-center">
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
                    }
                </div>
            </div>
        </div>
    )
}