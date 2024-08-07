export default function Button({
  title = "Title",
  onClick,

  small = false,
}: {
  title: string;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={` border-sky-500 py-1  border my-2 ${
        small ? "max-w-min px-2 text-xs " : "w-full"
      } sm:w-52 text-sky-500 hover:text-white hover:bg-sky-500 `}
    >
      {title}
    </button>
  );
}
