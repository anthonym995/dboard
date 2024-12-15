// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { fetchUsers } from "../../../api/users";
// import Loader from "../../../components/ui/Loader";
// import EditIcon from "../../../assets/EditIcon";
// import DeleteIcon from "../../../assets/DeleteIcon";
// import EmptyState from "../../../components/ui/EmptyState";

// export default function UserInfo({onSubmit}) {
//   const [list, setList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
 

//   const fetchPost = async () => {
//     try {
//       const response = await fetchUsers();
//       setList(response);
//     } catch (error) {
//       setIsError(error.messsage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="h-60 flex-center">
//         <Loader />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="h-60 flex-center w-full">
//         <ErrorState message={isError} />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="relative overflow-x-auto">
//         {list?.length === 0 ? (
//           <div className="flex-center h-60 w-full">
//             <EmptyState />
//           </div>
//         ) : (
//           <div className="w-full text-sm text-gray-500">
//             <div className="flex text-xs text-gray-700 uppercase bg-gray-100 border-b">
//               <div className="flex-1 px-6 py-3">Name</div>
//               <div className="flex-1 px-6 py-3">Email</div>
//               <div className="flex-1 px-6 py-3">Phone</div>
//               <div className="w-2/12 px-6 py-3">Role</div>
//               <div className="w-1/12 px-6 py-3">Actions</div>
//             </div>

//             {list?.map((user) => (
//               <div key={user.uuid} className="flex items-center bg-white border-b hover:bg-gray-50">
//                 <div className="flex-1 px-6 py-4">
//                   <Link to={`/users/${user.uuid}`} className="text-blue-500 hover:text-blue-700">
//                     {user.name}
//                   </Link>
//                 </div>
//                 <div className="flex-1 px-6 py-4">{user.email}</div>
//                 <div className="flex-1 px-6 py-4">{user.phone}</div>
//                 <div className="w-2/12 px-6 py-4">{user.role}</div>
//                 <div className="w-1/12 px-6 py-4 flex gap-2">
//                   <button type="button">
//                     <EditIcon />
//                   </button>
//                   {/* <button type="button">
//                     <DeleteIcon />
//                   </button> */}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
