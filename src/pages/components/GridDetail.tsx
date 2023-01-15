import { type NextPage } from "next";

interface ImockDataEntry {
    key: string,
    values: string[],
    twPrefix: string
}

interface Props {
    details: ImockDataEntry[]
}

/**
 * <label htmlFor="alignment" className="mr-2">justify-content</label>
    <select name="justify" id="alignment" value={justify} onChange={handleChange} className="border-2 border-black">
    <option value="">None</option>
    <option value="start">start</option>
    <option value="end">end</option>
    <option value="center">center</option>
    <option value="between">between</option>
    <option value="around">around</option>
    <option value="evenly">evenly</option>
    </select>
 */

const GridDetail: NextPage<Props> = ({ details }) => {
    console.log(details)
    return (
        <div className="flex flex-row flex-wrap gap-4">
            {
                details.map((elem, index) => {
                    return (
                        <div key={index}>
                            <label key={index} htmlFor={elem.key}>{elem.key + ":"}</label>
                            <select id={elem.key}>
                                {elem.values.map((option, index) => {
                                    return (<option key={index}>{option}</option>)
                                })}
                            </select>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GridDetail