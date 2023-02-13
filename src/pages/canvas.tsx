import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import { api } from "../utils/api";
import MenuGrid from "./components/MenuGrid";

interface CanvasElement {
    id: number,
    config: string,
}
const MAIN_DEFAULT_CONFIG = "border-4 border-black h-screen flex "

const Canvas: NextPage = () => {
    const { data } = api.demo.getConfig.useQuery()

    const defaultConfig = "bg-blue-700 w-48 h-20"
    const [selectedElement, setSelectedElement] = useState<string>()
    const [content, setContent] = useState<CanvasElement[]>([])
    const [testConfig, setTestConfig] = useState<string>()
    const [config, setConfig] = useState<object[]>([])
    const [test, setTest] = useState<string>("")

    /**
     * Hur ska man veta vilket element som ska ändras style på när man har selectat det?
     */

    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const target = (event.target as HTMLInputElement)
        console.log(target.name + "-" + target.value)
        const inputValue = {
            key: target.name,
            value: target.value
        }


        //fixa så att samma kategori av attribut inte går att lägga på samma box
        setConfig([...config, inputValue])

    }

    const handleSelectedElement = (newSelected: string) => {
        selectedElement == newSelected ? setSelectedElement("") : setSelectedElement(newSelected)
    }

    const canvasConfigHandler = (input: string) => {
        setTest(input)
    }

    useEffect(() => {
        setTestConfig(MAIN_DEFAULT_CONFIG + test)
    }, [test])

    useEffect(() => {
        setTestConfig(MAIN_DEFAULT_CONFIG)
    }, [])

    return (
        <>
            <Head>
                <title>CSS Sandbox</title>
                <meta name="description" content="Generated by create-t3-app" />
            </Head>
            <main className="flex flex-col ">
                <section className="h-64 flex">
                    <div className="flex-1">
                        <MenuGrid configHandler={(input) => { canvasConfigHandler(input) }} />
                    </div>
                    {/** Canvas Menu */}
                    <div className="border-2 border-black flex-[0.25] flex flex-col gap-2 justify-center items-center">
                        <p>Selected element: {selectedElement}</p>
                        <button
                            className="border-2 bg-slate-600 w-40 p-2 rounded-md text-white transition ease-in-out delay-150 hover:scale-105 duration-100"
                            onClick={() => {
                                console.log('add box')
                                setContent([...content, { id: content.length + 1, config: defaultConfig }])
                            }}
                        >Add Element</button>
                        <button
                            className="border-2 bg-slate-600 w-40 p-2 rounded-md text-white transition ease-in-out delay-150 hover:scale-105 duration-100"
                            onClick={() => {
                                setContent(content.filter(e => e.id !== content.length))
                            }}
                        >Remove Element</button>
                        <button
                            className="border-2 bg-slate-600 w-40 p-2 rounded-md text-white transition ease-in-out delay-150 hover:scale-105 duration-100"
                            onClick={() => {
                                setContent([])
                            }}
                        >Clear Canvas</button>
                        <button
                            className="border-2 bg-slate-600 w-40 p-2 rounded-md text-white transition ease-in-out delay-150 hover:scale-105 duration-100"
                            onClick={() => {
                                void signOut()
                            }}
                        >Sign out</button>
                    </div>
                </section>
                {
                    //className={`border-4 border-black h-screen flex ${data.config}`}
                    <main className={testConfig} onClick={() => { handleSelectedElement("main") }}>
                        {content.map((element, index) => {
                            return <div className={`rounded-md z-10 ${element.config}`} key={index} onClick={(e) => { e.stopPropagation(); handleSelectedElement("box" + (index + 1).toString()) }}>Box {element.id}</div>
                        })}
                    </main>
                }
            </main>
        </>
    );
}

export default Canvas;