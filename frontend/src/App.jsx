import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import VoteForm from "./components/VoteForm";

// const pollData = {
//   title: "Favorite Programming Language",
//   options: ["JavaScript", "Python", "Java", "C++", "Go"]
// };
const App = () => {
  const [socketIt, setSocketId] = useState("");
  const [voteResult, setVoteResult] = useState("");
  const [user, setUser] = useState("");
  const [userVote, setUserVote] = useState(null);
  const [pollData, setPollData] = useState([
    {
      title: "Favorite Programming Language",
      options: [
        { title: "JavaScript", votes: 0 },
        { title: "C++", votes: 0 },
        { title: "GO", votes: 0 },
        { title: "Python", votes: 0 }
      ]
    }
  ]);

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const handleUserVote = (vote) => {
    setUserVote(vote);
    setVoteResult(vote);
    const updatedPollData = [...pollData];
    const optionIndex = updatedPollData[0].options.findIndex(
      (opt) => opt.title === vote
    );
    if (optionIndex !== -1) {
      updatedPollData[0].options[optionIndex].votes += 1;
      socket.emit("vote", { updatedPollData, user: user });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://randomuser.me/api/");
        const { results } = await res.json();
        setUser(results[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    // socket.emit("vote", userVote);
    socket.on("vote", (data) => {
      setPollData(data.pollData);
      console.log("Hi there");
    });

    () => {
      socket.off("connect");
      socket.off("vote");
    };
  }, [userVote]);

  console.log(socketIt);
  return (
    <>
      <h3 className="text-3xl text-red-500 underline text-center py-10">
        {socketIt} connected
      </h3>
      <h3 className="text-blue-600 text-center">
        {voteResult ? voteResult : "Pending"}
      </h3>
      <div className=" w-full border flex items-center justify-center">
        <VoteForm
          onUserVote={handleUserVote}
          user={user}
          pollData={pollData[0]}
        />
      </div>
    </>
  );
};

export default App;
