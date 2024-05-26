/* eslint-disable react/prop-types */
import { useState } from "react";
import Avatar from "./Avatar";

function VoteForm({ onUserVote, pollData, user }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected option:", selectedOption);
    onUserVote(selectedOption);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow mt-4 rounded px-8 pt-8 pb-8 mb-4 border"
    >
      <h2 className="text-xl font-bold mb-4">{pollData?.title}</h2>

      {pollData?.options.map((option) => (
        <div
          key={option.title}
          className=" py-1.5 flex items-center justify-between"
        >
          <label
            htmlFor={option.title}
            className=" text-gray-700 text-sm font-bold flex items-center gap-5"
          >
            <input
              type="radio"
              id={option.title}
              name="language"
              value={option.title}
              checked={selectedOption === option.title}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5 text-blue-600 "
            />
            <div className="flex items-center justify-between">
              {option.title}
            </div>
          </label>
          <div className="space-x-2 flex items-center justify-between max-w-20l">
            <Avatar avatar={user?.picture?.medium} />
            <span className="text-[1.2rem]">{option.votes}</span>
          </div>
        </div>
      ))}

      <div className="flex justify-end py-2 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Vote
        </button>
      </div>
    </form>
  );
}

export default VoteForm;
