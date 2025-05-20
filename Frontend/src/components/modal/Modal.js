import { useState } from "react";
import SimpleMap from "../map/Simple";

function Modal({ setOnCancel, setOnSubmit }) {
  const [pointer, setPointer] = useState({ lat: 28.6448, lng: 77.216721 });

  // Handle submitting the selected location
  const handleSubmit = () => {
    if (pointer) {
      setOnSubmit(pointer); // Pass the selected location back to the parent
      setOnCancel(false); // Optionally close the modal after submission
    }
  };

  return (
    <>
      <div className="h-screen justify-center flex lg:my-10 md:my-10 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full mx-auto max-w-3xl">
          {/* Modal content */}
          <div className="border-0 h-[100%] lg:h-[90%] md:h-[90%] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Modal body */}
            <div className="relative p-6 flex-auto h-[100%]">
              <SimpleMap pointer={pointer} setPointer={setPointer} />
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              {/* Cancel button */}
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOnCancel(false)} // Close modal
              >
                Cancel
              </button>

              {/* Set Location button */}
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit} // Submit selected location
              >
                Set Location
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Background overlay */}
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Modal;
