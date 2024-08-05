import Loading from "./Loading";

export default function ButtonLoading({
  title = "Title",
  onClick,
  loading = true,
}: {
  title: string;
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className=" flex items-center justify-center   border-sky-500 py-1  border my-2 w-full  sm:w-52 text-sky-500 hover:text-white hover:bg-sky-500 "
    >
      {loading && <Loading />}
      <span className="   ">{title}</span>
    </button>
  );
}
