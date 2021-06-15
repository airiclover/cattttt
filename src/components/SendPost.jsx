export const SendPost = (props) => {
  const { text, setText, addTodos } = props;

  return (
    <div>
      <div className="max-w-xl mx-auto fixed bottom-0 left-0 right-0 pb-2 flex">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-20 rounded-l-lg"
        />
        <button
          disabled={!text}
          onClick={addTodos}
          className="bg-gray-200 px-4 rounded-r-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
