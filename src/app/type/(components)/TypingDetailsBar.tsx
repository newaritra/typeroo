import { useTimer } from "@/hooks/useTimer";
import React, { useEffect, useState } from "react";

interface propTypes {
  typingText: string;
  inputStr: string;
  setDisableInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const TypingDetailsBar = ({
  typingText,
  inputStr,
  setDisableInput,
}: propTypes) => {
  //custom hook for updatimg timer time
  const timerTime = useTimer(120);
  const [typingMetrics, setTypingMetrics] = useState<{
    countIncorrectWords: number;
    countIncorrectCharacters: number;
    wpm: number;
  }>({ countIncorrectCharacters: 0, countIncorrectWords: 0, wpm: 0 });
  useEffect(() => {
    if (timerTime == 0) {
      // Calculate the words typed correctly
      // Calculate the characters typed correctly
      // Set these metrics in the context
      // use context to get the metrics and display them in the /dashboard page
      // Send metrics to backend to update the scores
      // The length of the input string we have to check against is not going to be longer than the typed string length
      // So we create the substring to check against our typed text
      setDisableInput(true);
    }
    setTypingMetrics((prev) => ({
      ...prev,
      wpm: Math.floor(
        (inputStr.substring(0, typingText.length).split(" ").length -
          typingMetrics.countIncorrectWords) /
          ((120 - timerTime) / 60)
      ),
    }));
  }, [timerTime]);

  useEffect(() => {
    const checkString = inputStr.substring(0, typingText.length);
    const inputWords = checkString.split(" ").filter((el) => el != "");
    let countMissedWhiteSpaces = 0;
    const validTypedString = typingText
      .split("")
      .map((char, index) => {
        //If the character in the typed text is an incorrect letter in the place of a whitespace replace it with a space
        // Count the missed white space
        if (char !== " " && checkString[index] == " ") {
          countMissedWhiteSpaces++;
          return " ";
        }
        return char;
      })
      .filter((char) => char != "")
      .join("")
      .trim();
    const validTypedWords = validTypedString
      .split(" ")
      .filter((char) => char != "");
    // If we have not typed a complete word length omit the last incomplete word from the valid words list
    // The last word is valid if the last or last+1 character is a whitespace
    // if (
    //   inputStr[checkString.length] !== " " ||
    //   inputStr[checkString.length - 1] !== " "
    // ) {
    //   validTypedWords.pop();
    //   inputWords.pop();
    // }
    const correctTypedWords = validTypedWords.filter(
      (word, index) => word == inputWords[index]
    );
    setTypingMetrics({
      countIncorrectWords: inputWords.length - correctTypedWords.length,
      countIncorrectCharacters: 0,
      wpm: Math.floor(validTypedWords.length / ((120 - timerTime) / 60)),
    });
    console.log(
      checkString,
      validTypedString,
      countMissedWhiteSpaces,
      validTypedWords,
      inputWords,
      correctTypedWords
    );
  }, [inputStr, typingText]);
  return (
    <div className="flex bg-gradient-radial from-cyan-50  bg-opacity-10 to-transparent to-90% py-3 justify-around w-full font-semibold text-lg mt-24 mb-16 rounded border-cyan-700 border-solid border-2 text-cyan-700 capitalize">
      <p>
        acc:{" "}
        {Math.floor(
          ((inputStr.substring(0, typingText.length).split(" ").length -
            typingMetrics.countIncorrectWords) /
            inputStr.substring(0, typingText.length).split(" ").length) *
            100
        )}
        %
      </p>
      <p>
        Time: {Math.floor(timerTime / 60) < 10 && "0"}
        {Math.floor(timerTime / 60)}:{Math.floor(timerTime % 60) < 10 && "0"}
        {timerTime % 60}
      </p>
      <p>wpm: {typingMetrics.wpm || "Start Typing"}</p>
    </div>
  );
};

export default TypingDetailsBar;
