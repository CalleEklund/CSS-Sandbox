import { type NextPage } from "next";
import { useState } from "react";
import type { ImockDataEntry } from "../../types";

interface Props {
    details: ImockDataEntry[],
    configHandler: (arg0: string) => void
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

const GridDetail: NextPage<Props> = ({ details, configHandler }) => {
    //details.map(e => { return { key: e.twPrefix, value: "" } })
    const [config, setConfig] = useState({})

    const handleOptionChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const target = (event.target as HTMLInputElement)
        console.log('target', target.name, target.value)
        let output = ""
        if (details[0]?.key == "red") {
            output = target.name
        } else {
            output = target.name + "-" + target.value
        }

        configHandler(output)
    }

    return (
        <div className="flex flex-row flex-wrap gap-4">
            {
                details.map((elem, index) => {

                    return (
                        <div key={index}>
                            <label key={index} htmlFor={elem.key}>{elem.key + ":"}</label>
                            <select id={elem.key} name={elem.twPrefix} onChange={handleOptionChange}>
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