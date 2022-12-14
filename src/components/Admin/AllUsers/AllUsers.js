import "./AllUsers.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../Data/DatatableSource";
import { Link, useLocation } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./AllUsers.css"
import axios from "axios";

const AllUsers = () => {
 
  const [list, setList] = useState([]);
  

 
  
   const { data,loading, error } = useFetch("http://localhost:9000/api/users/getallusers");  
 
   useEffect(() => {
    setList(data);
   
  }, [data]); 
   


  const handleDelete = async (id) => {
      try {
       await axios.delete(`http://localhost:9000/api/users/deleteuser/${id}`);
      setList(list.filter((item) => item._id !== id));
      
    } catch (err) {}   
   
  }; 

  const actionColumn = [
   
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
          
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
     
      <DataGrid
        className="datagrid"
        rows={list}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
         getRowId={(row) => row._id} 
      />
    </div>
  );
};

export default AllUsers;