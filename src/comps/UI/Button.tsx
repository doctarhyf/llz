export default function Button({
  title = "Title",
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className=" border-sky-500 py-1  border my-2 w-full  sm:w-52 text-sky-500 hover:text-white hover:bg-sky-500 "
    >
      {title}
    </button>
  );
}
