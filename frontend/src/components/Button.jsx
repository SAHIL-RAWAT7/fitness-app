function Button({ text, type = 'button' }) {
  return (
    <button
      type={type}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
}

export default Button;
