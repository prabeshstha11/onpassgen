"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CheckBox from "../(components)/CheckBox";
import { FaRegClipboard } from "react-icons/fa";
import CopiedToast from "../(components)/CopiedToast";

export default function PasswordGenerator() {
    const [length, setLength] = useState<number>(16);
    const lowerRef = useRef<HTMLInputElement>(null);
    const upperRef = useRef<HTMLInputElement>(null);
    const numberRef = useRef<HTMLInputElement>(null);
    const symbolRef = useRef<HTMLInputElement>(null);

    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [copied]);

    let current: string = "abcdefghijklmnopqrstuvwxyz";
    const generatePassword = (str: string): string => {
        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * str.length);
            generatedPassword += str[randomIndex];
        }
        return generatedPassword;
    };

    const [password, setPassword] = useState<string>("");
    useLayoutEffect(() => {
        setPassword(generatePassword(current));
    }, []);

    const generatePasswordHandler = () => {
        let current: string = "abcdefghijklmnopqrstuvwxyz";
        if (upperRef.current && upperRef.current.checked) {
            current += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }
        if (numberRef.current && numberRef.current.checked) {
            current += "0123456789";
        }
        if (symbolRef.current && symbolRef.current.checked) {
            current += "!@#$%^&*()_+-=[]{}|";
        }
        setPassword(generatePassword(current));
        //console.log("this has been called");
    };

    useEffect(() => {
        generatePasswordHandler();
    }, [length]);

    const copyEventHandler = async () => {
        await navigator.clipboard.writeText(password);
        setCopied(true);
    };

    return (
        <div className="p-5 bg-mantle text-green select-none xl:px-[27rem] lg:px-[17rem] md:px-[7rem] px-[3rem] h-screen flex flex-col justify-center">
            <h1 className="text-3xl text-center font-bold mb-10">Password Generator</h1>
            <main className="flex flex-col gap-3 text-xl">
                <section className="flex justify-between">
                    <label>Password Length</label>
                    <span>{length}</span>
                </section>
                <section>
                    <input
                        type="range"
                        min={8}
                        max={64}
                        value={length}
                        className="w-full h-2 bg-green rounded-xl appearance-none cursor-pointer"
                        onChange={(event) => setLength(parseInt(event.target.value))}
                    />
                </section>
                <section className="flex justify-between">
                    <CheckBox checked readOnly ref={lowerRef} />
                    <label>Include Lowercase Letters</label>
                </section>
                <section className="flex justify-between">
                    <CheckBox ref={upperRef} onChange={generatePasswordHandler} />
                    <label>Include Uppercase Letters</label>
                </section>
                <section className="flex justify-between">
                    <CheckBox ref={numberRef} onChange={generatePasswordHandler} />
                    <label>Include Numbers</label>
                </section>
                <section className="flex justify-between">
                    <CheckBox ref={symbolRef} onChange={generatePasswordHandler} />
                    <label>Include Symbols</label>
                </section>

                <section className="flex flex-col">
                    <button className="bg-green text-base my-6 py-3 rounded-full" onClick={generatePasswordHandler}>
                        Generate
                    </button>
                    <div className="flex items-center bg-green text-base w-full">
                        <input
                            type="text"
                            disabled
                            className="bg-transparent text-xl border-none outline-none rounded cursor-pointer select-none flex-grow max-xs:w-[90%] max-xs:overflow-hidden"
                            value={password}
                            readOnly
                        />
                        <FaRegClipboard className="text-2xl mr-3 cursor-pointer max-xs:w-auto" onClick={copyEventHandler} />
                    </div>
                </section>
            </main>

            <CopiedToast isVisible={copied}>Copied to Clipboard!</CopiedToast>
        </div>
    );
}
