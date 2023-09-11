interface CalenderDateTileComponentProps {
    text: string;
    active: boolean;
    header: boolean;
}

export const CalenderDateTileComponent = ({text, active, header}: CalenderDateTileComponentProps) => {
    return (
        <>
            <h4 className={"text-center text-sm p-2 aspect-square flex items-center justify-center rounded-full " + (active ? "bg-blue-600 text-white": "")}>
                {text === 0 ? " " : text}
            </h4>
        </>
    )
}