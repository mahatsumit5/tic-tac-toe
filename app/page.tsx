"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
interface ShapeState {
  [key: string]: string;
  b1: "circle" | "cross";
  b2: "circle" | "cross";
  b3: "circle" | "cross";
  b4: "circle" | "cross";
  b5: "circle" | "cross";
  b6: "circle" | "cross";
  b7: "circle" | "cross";
  b8: "circle" | "cross";
  b9: "circle" | "cross";
}
type ComponentKeys = "player1" | "player2";
type shapeKeys = "circle" | "cross";
export default function Home() {
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [currentPlayer, setCurrentPlayer] = useState<string>("Player 1");
  const [currentInputField, setCurrentInputField] = useState<
    "player1" | "player2"
  >("player1");
  const [currentShape, setCurrentShape] = useState<string>("circle");
  const [winner, setWinner] = useState<string>("");
  // TODO: type this properly
  const Components: Record<ComponentKeys, JSX.Element> = {
    player1: (
      <InputFieldForPlayer1
        setPlayer1={setPlayer1}
        setCurrentInputField={setCurrentInputField}
      />
    ),
    player2: (
      <InputFieldForPlayer2
        setPlayer2={setPlayer2}
        setCurrentInputField={setCurrentInputField}
      />
    ),
  };
  const initalEmptyShape = {
    b1: "",
    b2: "",
    b3: "",
    b4: "",
    b5: "",
    b6: "",
    b7: "",
    b8: "",
    b9: "",
  };
  const [shapedFilledInbox, setShapeFilledInBox] = useState<ShapeState>(
    initalEmptyShape as ShapeState
  );
  const shape: Record<shapeKeys, JSX.Element> = {
    circle: <Circle />,
    cross: <Cross />,
  };
  function handleDrawShape(boxNumber: string) {
    if (!player1 || !player2) {
      window.alert("Enter player name first!");
      return;
    }
    if (shapedFilledInbox[boxNumber] || winner.length) {
      console.log("Stopping from drwaing");
      return;
      // stop executing drawing shape where already exist
    }
    if (currentPlayer === "Player 1") {
      setCurrentPlayer("Player 2");
      setCurrentShape("circle");
      setShapeFilledInBox({ ...shapedFilledInbox, [`${boxNumber}`]: "circle" });
    } else {
      setCurrentPlayer("Player 1");
      setCurrentShape("cross");
      setShapeFilledInBox({ ...shapedFilledInbox, [`${boxNumber}`]: "cross" });
    }
  }

  useEffect(() => {
    if (
      (shapedFilledInbox.b1 &&
        shapedFilledInbox.b1 === shapedFilledInbox.b2 &&
        shapedFilledInbox.b1 === shapedFilledInbox.b3) ||
      (shapedFilledInbox.b1 &&
        shapedFilledInbox.b1 === shapedFilledInbox.b4 &&
        shapedFilledInbox.b1 === shapedFilledInbox.b7) ||
      (shapedFilledInbox.b1 &&
        shapedFilledInbox.b1 === shapedFilledInbox.b5 &&
        shapedFilledInbox.b1 === shapedFilledInbox.b9) ||
      (shapedFilledInbox.b2 &&
        shapedFilledInbox.b2 === shapedFilledInbox.b5 &&
        shapedFilledInbox.b2 === shapedFilledInbox.b8) ||
      (shapedFilledInbox.b3 &&
        shapedFilledInbox.b3 === shapedFilledInbox.b6 &&
        shapedFilledInbox.b3 === shapedFilledInbox.b9) ||
      (shapedFilledInbox.b4 &&
        shapedFilledInbox.b4 === shapedFilledInbox.b5 &&
        shapedFilledInbox.b4 === shapedFilledInbox.b6) ||
      (shapedFilledInbox.b7 &&
        shapedFilledInbox.b7 === shapedFilledInbox.b8 &&
        shapedFilledInbox.b7 === shapedFilledInbox.b9) ||
      (shapedFilledInbox.b7 &&
        shapedFilledInbox.b7 === shapedFilledInbox.b5 &&
        shapedFilledInbox.b7 === shapedFilledInbox.b3)
    ) {
      console.log("Game over");
      if (currentPlayer === "Player 1") {
        setWinner(player2);
      } else {
        setWinner(player1);
      }
    }
  }, [shapedFilledInbox, currentPlayer, player1, player2]);

  useEffect(() => {
    setTimeout(() => {
      setShapeFilledInBox(initalEmptyShape as ShapeState);
    }, 2000);
  }, [winner]);
  return (
    <main className="flex h-screen flex-col items-center justify-start mt-7 gap-6 p-2 mx-auto w-full sm:max-w-xl">
      <h1 className="text-5xl font-bold">Tic Tac Toe</h1>
      <p>Current Player:{currentPlayer}</p>
      {Components[currentInputField]}
      {player1 && (
        <h1 className="text-3xl font-bold">
          {player1} V.S {player2}
        </h1>
      )}
      <div className=" p-2 w-full sm:w-[450px] sm:h-[49vh] rounded-md grid grid-cols-3 bg-slate-700">
        <span
          className=" relative text-center p-5 border-b border-r h-32 "
          onClick={() => {
            handleDrawShape("b1");
          }}
          id="box1"
        >
          {shapedFilledInbox.b1 && shape[shapedFilledInbox.b1]}
        </span>
        <span
          className=" relative text-center p-5 border-b border-r h-32"
          onClick={() => {
            handleDrawShape("b2");
          }}
          id="box2"
        >
          {shapedFilledInbox.b2 && shape[shapedFilledInbox.b2]}
        </span>
        <span
          className=" relative text-center p-5 border-b  h-32"
          onClick={() => {
            handleDrawShape("b3");
          }}
          id="box3"
        >
          {" "}
          {shapedFilledInbox.b3 && shape[shapedFilledInbox.b3]}
        </span>
        <span
          className=" relative text-center p-5 border-b border-r h-32"
          onClick={() => {
            handleDrawShape("b4");
          }}
          id="box4"
        >
          {" "}
          {shapedFilledInbox.b4 && shape[shapedFilledInbox.b4]}
        </span>
        <span
          className=" relative text-center p-5 border-b border-r h-32"
          onClick={() => {
            handleDrawShape("b5");
          }}
          id="box5"
        >
          {" "}
          {shapedFilledInbox.b5 && shape[shapedFilledInbox.b5]}
        </span>
        <span
          className=" relative text-center p-5 border-b h-32"
          onClick={() => {
            handleDrawShape("b6");
          }}
          id="box6"
        >
          {" "}
          {shapedFilledInbox.b6 && shape[shapedFilledInbox.b6]}
        </span>

        <span
          className=" relative text-center p-5  border-r h-32"
          onClick={() => {
            handleDrawShape("b7");
          }}
          id="box7"
        >
          {" "}
          {shapedFilledInbox.b7 && shape[shapedFilledInbox.b7]}
        </span>
        <span
          className=" relative text-center p-5  border-r h-32"
          onClick={() => {
            handleDrawShape("b8");
          }}
          id="box8"
        >
          {" "}
          {shapedFilledInbox.b8 && shape[shapedFilledInbox.b8]}
        </span>
        <span
          className=" relative text-center p-5   h-32"
          onClick={() => {
            handleDrawShape("b9");
          }}
          id="box9"
        >
          {" "}
          {shapedFilledInbox.b9 && shape[shapedFilledInbox.b9]}
        </span>
      </div>
      {winner && <p>{winner} wins</p>}
      {winner && (
        <button
          className="w-full sm:w-[450px] p-3 bg-green-800 rounded-md"
          onClick={() => {
            setWinner("");
          }}
        >
          Play Again
        </button>
      )}
    </main>
  );
}

const InputFieldForPlayer1 = ({
  setPlayer1,
  setCurrentInputField,
}: {
  setPlayer1: Dispatch<SetStateAction<string>>;
  setCurrentInputField: Dispatch<SetStateAction<"player1" | "player2">>;
}) => {
  const input1Ref = useRef<HTMLInputElement>(null);
  const handleSave = () => {
    if (input1Ref.current && typeof input1Ref.current.value === "string") {
      setPlayer1(input1Ref.current.value);
      setCurrentInputField("player2");
    }
  };
  return (
    <form action={handleSave} className="w-full">
      <input
        className="w-full p-4 bg-slate-700 rounded-md"
        placeholder="Enter player 1 name"
        ref={input1Ref}
      />
      <button type="submit"></button>
    </form>
  );
};
const InputFieldForPlayer2 = ({
  setPlayer2,
  setCurrentInputField,
}: {
  setPlayer2: Dispatch<SetStateAction<string>>;
  setCurrentInputField: Dispatch<SetStateAction<"player1" | "player2">>;
}) => {
  const input2Ref = useRef<HTMLInputElement>(null);
  const handleSave = () => {
    if (input2Ref.current && typeof input2Ref.current.value === "string") {
      setPlayer2(input2Ref.current.value);
      setCurrentInputField("player1");
    }
  };
  return (
    <form action={handleSave} className="w-full">
      <input
        className="w-full p-4 bg-slate-700 rounded-md"
        placeholder="Enter player 2"
        ref={input2Ref}
      />
      <button type="submit"></button>
    </form>
  );
};

const Circle = () => {
  return <div className="border-2 h-full rounded-full" />;
};

const Cross = () => {
  return <p className="text-7xl font-sans font-light">X</p>;
};
