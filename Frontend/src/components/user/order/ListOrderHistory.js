import { useEffect, useState } from "react";
import SimpleMap from "../../map/Simple";
import { getDistance } from "geolib";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../../../services/auth.service";
import OrderPreview from "../../modal/OrderPreview";

function ListOrderHistory({ order,setLoading }) {
  const { address, fuel = { petrol: null, diesel: null }, isAccepted = { status: false }, isCanceled = { status: false }, isDelivered = { status: false }, method = { cash: 0, online: { amount: 0 } }, userId, _id, stationId } = order;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [stationInfo, setStationInfo] = useState(null);

  useEffect(()=>{
    getUserInfo();
    getStationInfo();
  },[]);
  
  const [userInfo,setUserInfo] = useState(null);
  const getUserInfo = async () =>{
    try {
      await authService.getUserInfo(userId).then(
        (response) => {
            setUserInfo(response.data);
        },
        (error) => {
          console.log(error.response);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const getStationInfo = async () => {
    try {
      await authService.getFuelStationByID(stationId).then(
        (response) => {
          setStationInfo(response.data);
        },
        (error) => {
          console.log(error.response);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const cancelOrder = async () =>{
    try {
      await authService.cancelOrder(_id).then(
        (response) => {
            alert(response.data.message)
            setLoading(true);
        },
        (error) => {
          console.log(error.response);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const deliveryOrder = async () =>{
    try {
      await authService.deliveryOrder(_id).then(
        (response) => {
            alert(response.data.message)
            setLoading(true);

        },
        (error) => {
          console.log(error.response);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const acceptOrder = async () =>{
    try {
      await authService.acceptOrder(_id).then(
        (response) => {
            alert(response.data.message)
            setLoading(true);
        },
        (error) => {
          console.log(error.response);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const renderedUserInfo = (userInfo)?   
    <>
    <p className="text-grey-dark font-thin text-sm leading-normal text-white">
    Name : {userInfo.name}
  <br />
   Email : {userInfo.email}
  </p>
  <p className="text-grey-dark font-thin text-sm leading-normal text-white">
    <br />
    Mobile No : {userInfo.phone}
  </p>
  <p className="text-grey-dark font-thin text-sm leading-normal text-white">
  </p>
  </>
  :null

  const renderedOrderInfo = <>
<p className="text-grey-dark font-thin text-sm leading-normal text-white">
  {stationInfo && (
    <p className="text-grey-dark font-thin text-sm leading-normal text-white">
      Station Name: {stationInfo.name}
    </p>
  )}
  Fuel : <br/>
  {fuel?.petrol && <>
    Petrol : 
    Price  : {fuel.petrol.price}<br/>
    Quantity:{fuel.petrol.quantity}
  </>}
  {fuel?.diesel && <>
    Diesel   : 
    Price  : {fuel.diesel.price}<br/>
    Quantity:{fuel.diesel.quantity}
  </>}
  <br />
</p>
 <p className="text-grey-dark font-thin text-sm leading-normal text-white">
  Cost : Rs-{method?.cash || method?.online?.amount || 0}
<br />
</p>
<p className={` ${(!isAccepted?.status && !isDelivered?.status && !isCanceled?.status)? " text-yellow-500 font-bold ": "hidden" }`}>
                      Status : Pending
                  </p>
<p className={` ${(isAccepted?.status && !isDelivered?.status)? " text-[#32CD32] font-bold ": "hidden" }`}>
                      Status : On The Way
                  </p>
                  <p className={` ${(isCanceled?.status)? " text-red-900 font-bold ": "hidden" }`}>
                      Status : Canceled
                  </p>
                  <p className={` ${(isDelivered?.status)? " text-[#32CD32] font-bold ": "hidden" }`}>
                      Status : Delivered
</p>

<p className="text-grey-dark font-thin text-sm leading-normal text-white">
</p>
</>
  return (
    <div className="shadow-lg gap-3  rounded m-8 p-8 flex bg-gray-800">
      <div className="w-full lg: md: flex flex-col gap-3 ">
        <h3 className="text-orange text-xl font-semibold text-white">{""}</h3>
       {renderedUserInfo}
       {renderedOrderInfo}
       <button className="bg-transparent hover:bg-[#fe6f2b] border-[#fe6f2b] font-bold text-white py-1  border  hover:border-transparent rounded" onClick={()=>{
            setShowModal(true)
        }}>
          View
        </button>
        {
            showModal?
            <OrderPreview order={order} disable={true} userInfo={userInfo} setOnClose={setShowModal} setOnDelivery={()=>{
                deliveryOrder()
                setShowModal(false)
            }}  
            setOnCancel={()=>{
                cancelOrder()
                setShowModal(false)
            }} 
            setOnApply={
              ()=>{
                acceptOrder()
                setShowModal(false)
              }
            }/>
            :null
        }
      </div>
    </div>
  );
}
export default ListOrderHistory;
