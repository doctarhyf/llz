import { SLIDES } from "../helpers/const";

export default function Home() {
  return (
    <div className="w-full ">
      <div className=" text-xl py-4 border-b w-full ">
        Welcome to &copy;LaLouise{" "}
      </div>
      <div className=" overflow-hidden w-full  h-60 bg-slate-200 rounded-md ">
        <img
          src={SLIDES[Math.floor(Math.random() * 3)]}
          className=" h-full sm:w-full object-cover  "
        />
      </div>
    </div>
  );
}
