interface DateTileProps {
    weekday: string;
    day: string | number;
    active: boolean;
}

export const DateTileComponent = ({weekday, day, active}: DateTileProps) => {

    return (
        <div className={"w-[55px] py-2 rounded-lg duration-300 border flex flex-col text-center text-xs " + (active ? "bg-blue-600 text-white" : "")}>
            <h4 className={"pb-1.5"}>{weekday}</h4>
            <h4>{day}</h4>
        </div>
    )
}