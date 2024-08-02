import { useState } from "react";

export default function Patients() {
  const [loading, setloading] = useState<boolean>(false);

  return (
    <div className="">
      <div className=" text-xl py-4 border-b w-full ">Patients</div>
      <div>
        <input type="search" />
        <div></div>
      </div>
    </div>
  );
}
