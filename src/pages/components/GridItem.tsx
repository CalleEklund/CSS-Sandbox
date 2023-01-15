import { type NextPage } from "next";

interface Props {
    title: string,
    clickHandler: () => void,
}

const btnClassName = "border-2 border-[#0a75ab] p-4 rounded bg-[#34aeeb] transition ease-in-out delay-150 hover:scale-110 duration-100"

const GridItem: NextPage<Props> = ({ title, clickHandler }) => {
    return (
        <button
            className={btnClassName}
            onClick={clickHandler}
        >
            {title}
        </button>
    )
}

export default GridItem