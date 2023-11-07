"use client";
import { useTimer } from "@/hooks/useTimer";
import sanitizeString from "@/utils/sanitizeString";
import styles from "./Type.module.css";
import React, { useRef, useEffect, useState } from "react";
import TypingDetailsBar from "./(components)/TypingDetailsBar";
import useIntersectionObsever from "@/hooks/useIntersectionObsever";

const str = sanitizeString(
  `#Climate change is one of the most pressing challenges facing our world
today. As we grapple with the consequences of greenhouse gas emissions,
the need for sustainable solutions has become increasingly evident. In
this context, renewable energy sources play a pivotal role in mitigating
climate change. These energy sources, including solar, wind, and
hydropower, offer numerous advantages. Renewable energy is abundant and
widely available, making it a scalable and environmentally friendly
alternative to fossil fuels. The development of renewable technologies
has improved energy efficiency and reduced costs, making them more
accessible to a broader population. Moreover, renewable energy sources
have a minimal carbon footprint, significantly lowering emissions and
slowing down global warming. The integration of renewable energy into
our energy matrix has the potential to reduce our dependence on finite
fossil fuel reserves, increasing energy security and stability.
Transitioning to renewables also fosters economic growth, generating
jobs in manufacturing, installation, and maintenance of renewable energy
systems. Furthermore, investing in renewable energy fosters innovation,
driving research and development in the energy sector. Governments and
industries are recognizing the necessity of adopting these technologies,
resulting in a global shift towards cleaner energy. Countries are
setting ambitious renewable energy targets and implementing policies to
promote sustainable practices, which is crucial for addressing climate
change. However, challenges persist in fully transitioning to
renewables. Issues such as intermittency, energy storage, and
infrastructure development require ongoing research and investment.
Nevertheless, these challenges are surmountable with continued
dedication and collaboration among governments, industries, and
researchers. In conclusion, renewable energy sources are indispensable
in our fight against climate change. Their accessibility,
sustainability, and environmental benefits make them a viable solution
to reduce carbon emissions and secure a sustainable future.
Transitioning to renewables necessitates a collective effort and
investment, but the rewards in terms of environmental preservation,
energy security, and economic growth make it a worthwhile endeavor. As
we move forward, embracing renewable energy is not just an option; it is
an imperative step towards a more sustainable and resilient future for
all.`.toLowerCase()
);

const Page = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [typingText, setTypingText] = useState<string>("");
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [typingString, setTypingString] = useState<{
    typedString: string;
    remainingString: string;
  }>({ typedString: "", remainingString: str.substring(typingText.length) });
  const scrollRef = useRef<HTMLSpanElement>(null),
    rootRef = useRef<HTMLDivElement>(null);

  const intersecting = useIntersectionObsever(
    scrollRef.current,
    rootRef.current
  );

  useEffect(() => {
    inputRef.current?.focus();
    sanitizeString(str);
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (rootRef.current) console.log(scrollRef.current, rootRef.current);
    if (!intersecting) {
      scrollElement?.scrollIntoView({ behavior: "smooth" });
    }
  }, [intersecting]);

  useEffect(() => {
    const typingLetters = typingText.split("");
    setTypingString(() => {
      const validLetters = typingLetters.map((letter, index) => {
        const actualLetter = str[index];
        if (actualLetter == letter)
          return `<span key=${index} class="correct text-green-700">${actualLetter}</span>`;
        else if (actualLetter != letter && actualLetter == " ")
          return `<span key=${index} class="incorrect text-red-300">${letter}</span>`;
        else if (actualLetter != letter)
          return `<span key=${index} class="incorrect text-red-300">${actualLetter}</span>`;
      });
      return {
        typedString: validLetters.join(""),
        remainingString: str.substring(typingText.length),
      };
    });
  }, [typingText]);

  return (
    <div className="px-10">
      <TypingDetailsBar
        typingText={typingText}
        inputStr={str}
        setDisableInput={setDisableInput}
      />
      <div
        ref={rootRef}
        style={{ wordSpacing: "0.5rem" }}
        className={
          styles.card +
          "p-5 border-cyan-700 border-solid border-2 max-h-80 text-center whitespace-break-spaces overflow-y-scroll no-scrollbar rounded-lg text-lg font-semibold text-gray-500"
        }
      >
        <span
          dangerouslySetInnerHTML={{ __html: typingString.typedString }}
        ></span>
        <span
          ref={scrollRef}
          id="cursorScroll"
          className="cursor cursorScroll inline-block w-0.5 h-4 mb-[-2px] ml-[-1px] bg-purple-400"
        ></span>
        {typingString.remainingString}
      </div>
      <input
        onBlur={() => inputRef.current?.focus()}
        ref={inputRef}
        disabled={disableInput}
        className=" opacity-0"
        value={typingText}
        onChange={(e) => setTypingText(e.target.value.toLowerCase())}
      ></input>
    </div>
  );
};

export default Page;
