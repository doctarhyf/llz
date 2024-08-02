export default function Button({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className=" border-sky-500  border my-2 w-52 text-sky-500 hover:text-white hover:bg-sky-500 "
    >
      Login
    </button>
  );
}
