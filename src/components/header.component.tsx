import React from "react";
import {Bars3CenterLeftIcon} from "@heroicons/react/20/solid";
import {bellIcon, cogIcon, logoSmall, user_icon, userIcon} from "../assets";
import {useSelector} from "react-redux";

export const HeaderComponent = () => {
    const state = useSelector(state => state.tasks)

    return (
        <>
            <nav
                className={"fixed z-40 bg-white  w-full pt-4 pb-2 px-4 text-2xl font-bold shadow-lg"}>
                <div className="container mx-auto flex flex-row justify-between w-full">
                    <div className="flex flex-row items-center">
                        <img  {...logoSmall} />
                        <h4 className={"pl-2"}>Todo</h4>
                    </div>
                    <div className="">
                        <div className="lg:hidden">
                            <Bars3CenterLeftIcon className={"w-6 aspect-square"}/>
                        </div>

                        <div className="hidden lg:flex flex-row items-center space-x-4">
                            <img {...cogIcon} className={"w-6"}/>
                            <img {...bellIcon} className={"w-6"}/>
                            <img {...userIcon}/>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="w-full h-[63px] content-[ ] "></div>
        </>
    )
}