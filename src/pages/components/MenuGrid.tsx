import { type NextPage } from "next";
import { useState } from "react";
import GridDetail from "./GridDetail";
import GridItem from "./GridItem";

import type { ImockData, ImockDataEntry } from "../../types";

interface Props {
    configHandler: (arg0: string) => void
}


const mockData: ImockData[] = [
    {
        group: 'alignment',
        members: [
            { key: 'justify-content', values: ['start', 'end', 'center', 'between', 'around', 'evenly'], twPrefix: 'justify' },
            { key: 'align-items', values: ['start', 'end', 'center', 'stretch', 'baseline'], twPrefix: 'items' }
        ]
    },
    {
        group: 'backgroundcolor',
        members: [
            { key: 'red', values: ['none', 'red'], twPrefix: 'bg-red-700' },
            { key: 'green', values: ['none', 'green'], twPrefix: 'bg-green-700' }
        ]
    },
    {
        group: 'not implemented',
        members: []
    }
]

const MenuGrid: NextPage<Props> = ({ configHandler }) => {

    const [selected, setSelected] = useState<string | null>()
    const [detailsProps, setDetailsProps] = useState<ImockDataEntry[]>()

    const handleSelected = (groupId: string) => {
        setSelected(groupId)
        const obj: ImockData = mockData.find(e => e.group === groupId) as ImockData
        setDetailsProps(obj.members)
    }

    return selected == null ? (
        <div className="flex flex-row flex-wrap gap-4 overflow-y-auto p-2">
            {mockData.map((element, index) => {
                return <GridItem key={index} title={element.group} clickHandler={() => handleSelected(element.group)} />
            })}

        </div>
    ) : (
        <div className="flex p-2">
            <div className="flex-[0.8] border-2 border-black ">
                <GridDetail configHandler={configHandler} details={detailsProps ?? []} />
            </div>
            <div className="flex-[0.2] border-2 border-black ">
                <button onClick={() => { setSelected(null) }}>Go back</button>
            </div>
        </div>
    )

}

export default MenuGrid