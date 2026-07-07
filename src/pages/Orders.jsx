import React from "react";
import Sidebar from "../components/ui/SideBar";
import { NavLink } from "react-router-dom";


function Orders() {
  
  // const [orders, setOrders] = useState([
  //   {
  //     id: 1,
  //     orderNum:52525244,
  //     customer: "Ahmed",
  //     email: "ahmed@gmail.com",
  //     date: "03 Jul 2026",
  //     status: "Cancelled",
  //     paymentStatus: "Pending",
  //     paymentMethod: "Cash",
  //     total: 1368,
  //   },
  //   {
  //     id: 2,
  //     orderNum: 52626244,
  //     customer: "Sara",
  //     email: "sara@gmail.com",
  //     date: "04 Jul 2026",
  //     status: "Delivered",
  //     paymentStatus: "Paid",
  //     paymentMethod: "Stripe",
  //     total: 950,
  //   },
  //   {
  //     id: 3,
  //     orderNum: 52222244,
  //     customer: "Mohamed",
  //     email: "mohamed@gmail.com",
  //     date: "05 Jul 2026",
  //     status: "Processing",
  //     paymentStatus: "Paid",
  //     paymentMethod: "Cash",
  //     total: 720,
  //   },
  //   {
  //     id: 4,
  //     orderNum: 52335244,
  //     customer: "Haya",
  //     email: "haya@gmail.com",
  //     date: "06 Jul 2026",
  //     status: "Processing",
  //     paymentStatus: "Paid",
  //     paymentMethod: "Cash",
  //     total: 900,
  //   }
  // ])
  // const [error,setError]=useState("")

  // useEffect(() => {
  //   console.log("test")
  //   getOrders()
    
  // }
  // ,[])
  
  // async function getOrders() {
  //   try {
      
  //     const { data } = await api.get("/orders/admin?email=admin@gmail.com");
  
      
  //     setOrders(data.orders || []);
  //     console.log(orders)
  //   }catch (error) {
  //   setError(error.response?.data?.message || "Failed to load order status.");
  // }
  // }
  


  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>
    </div>
  );
}

export default Orders


