import { useState } from "react";
import SimpleMap from "../../map/Simple";
import PreviewModal from "../../modal/PreviewModal";
import { getDistance } from "geolib";
import { Navigate, useNavigate } from "react-router-dom";

function ListStation({ station }) {
  const { location, name, quantity = { petrol: { price: 0, quantity: 0 }, diesel: { price: 0, quantity: 0 } }, distance } = station;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  // Convert distance from meters to kilometers and round to 2 decimal places
  const distanceInKm = distance ? (distance / 1000).toFixed(2) : 0;
  
  return (
    <div className="shadow-lg gap-3  rounded m-8 p-8 flex bg-gray-800">
      <div className="w-full lg: md:2/3 flex flex-col gap-3 ">
        <h3 className="text-orange text-xl font-semibold text-white">{name}</h3>

        <p className="text-grey-dark font-thin text-sm leading-normal text-white">
          Fuel Rate : Rs : {quantity?.petrol?.price || 0}
          <br />
          Volume : {quantity?.petrol?.quantity || 0} ltr
        </p>
        <p className="text-grey-dark font-thin text-sm leading-normal text-white">
          Fuel Rate : Rs : {quantity?.diesel?.price || 0}
          <br />
          Volume : {quantity?.diesel?.quantity || 0}ltr
        </p>
        <p className="text-grey-dark font-thin text-sm leading-normal text-white">
              Distance : {distanceInKm} KM
        </p>
        <button className="bg-transparent hover:bg-[#fe6f2b] border-[#fe6f2b] font-bold text-white py-1  border  hover:border-transparent rounded" onClick={()=>{
            setShowModal(true)
        }}>
          View
        </button>
        {
            showModal?
            <PreviewModal content={station} setOnCancel={setShowModal} setOnSubmit={
              (id)=>{
                navigate(`/user/bookOrder/${id}`)
              }
            }/>
            :null
        }
      </div>
    </div>
  );
}
export default ListStation;
