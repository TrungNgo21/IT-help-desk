import { FaCircleNotch } from "react-icons/fa"

function Spinner() {
  return (
    <div className="flex justify-center items-center flex-col mt-20">
        <FaCircleNotch className="text-9xl animate-spin mb-8" />
        <h3 className="text-6xl tracking-[6px]">Loading...</h3>
      </div>
  )
}

export default Spinner