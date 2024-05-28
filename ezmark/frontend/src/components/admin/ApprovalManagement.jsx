import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
} from "@nextui-org/react";

import {
  getPendingApprovals,
  setPendingApprovals,
  markAttendance as markAttendanceAPI, // Importez la fonction pour marquer l'assistance depuis votre service
} from "../../services/get-service";

import toast from "react-hot-toast";

const ApprovalManagement = () => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectRow, setSelectRow] = useState([]);
  const [page, setPage] = useState(1);
  const [disable, setDisable] = useState(false);
  const [delDisable, setDelDisable] = useState(false);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const fetchTableData = async () => {
    const tableData = await getPendingApprovals();
    // Mise à jour des statuts de présence pour chaque utilisateur
    const updatedTableData = tableData.map(user => ({
      ...user,
      status: user.attendance ? "Present" : "Absent" // Mettez à jour le statut
    }));
    setUsers(updatedTableData);
    setLoading(false);
  };

  const approveRequest = async () => {
    if (selectRow.length != 0 && selectRow.size != 0) {
      setDisable(true);
      setResponse(await setPendingApprovals(selectRow.currentKey, "POST"));
    } else {
      toast.error("Select a row in Table");
    }
    setDisable(false);
  };

  const deleteRequest = async () => {
    if (selectRow.length != 0 && selectRow.size != 0) {
      setDelDisable(true);
      setResponse(await setPendingApprovals(selectRow.currentKey, "DELETE"));
    } else {
      toast.error("Select a row in Table");
    }
    setDelDisable(false)
  };

  const markAttendance = async (email) => {
    const updatedUsers = users.map(user => {
      if (user.email === email) {
        // Mettre à jour le statut de présence
        user.attendance = true;
        user.status = "Present";
      }
      return user;
    });
    setUsers(updatedUsers);
    // Appelez votre API pour marquer l'assistance
    await markAttendanceAPI(email);
  };

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  useEffect(() => {
    fetchTableData();
    setDisable(false);
    setDelDisable(false);
  }, [response]);

  return (
    <div className="w-full flex-col-reverse gap-y-5 md:flex-row flex md:justify-between  items-start">
      <div className="w-full md:w-[calc(100%-220px)] lg:w-[calc(100%-270px)] flex-center flex-col gap-8">
        <Table
          aria-label="Example table with client side pagination"
          selectionMode="single"
          selectedKeys={selectRow}
          onSelectionChange={setSelectRow}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
                classNames={{
                  cursor: "bg-primary-black shadow-none",
                }}
              />
            </div>
          }
          classNames={{
            base: "",
            wrapper: "min-h-[250px] bg-white shadow-lg rounded-md",
            th: "bg-primary-black text-primary-white rounded-none",
            td: "data-[selected=true]:before:bg-blue-400 data-[selected=true]:text-primary-white cursor-pointer ",
          }}
        >
          <TableHeader>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="email">EMAIL</TableColumn>
            <TableColumn key="mobile_number">MOBILE NO.</TableColumn>
            <TableColumn key="status">STATUS</TableColumn> {/* Ajoutez une colonne pour le statut */}
          </TableHeader>
          <TableBody
            emptyContent={loading ? "Loading..." : "No Pending Requests Found"}
            items={items}
          >
            {(item) => (
              <TableRow key={item.email}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "status" ? ( // Affiche le statut si la colonne est "status"
                      <span>{item.status}</span>
                    ) : (
                      <span>{getKeyValue(item, columnKey)}</span>
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-full bg-white rounded-md shadow-md flex-center md:flex-col p-4 gap-3 md:w-[200px] lg:w-[250px]">
        <h1 className="hidden md:block text-lg font-semibold">Action Centre</h1>
        <button
          disabled={disable || delDisable}
          onClick={approveRequest}
          className="md:w-full bg-green-400 px-5 py-2 rounded-md text-white font-medium border-2 border-transparent hover:border-green-400 hover:bg-transparent hover:text-green-400"
        >
          {disable ? "Approving..." : "Approve"}
        </button>
        <button
          disabled={delDisable || disable}
          onClick={deleteRequest}
          className="md:w-full bg-transparent text-red-400 border-2 border-red-400 px-5 py-2 rounded-md font-medium hover:bg-red-400 hover:text-white transition-effect"
        >
          {delDisable ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() => markAttendance(selectRow.email)} // Appel markAttendance avec l'email de l'utilisateur sélectionné
          className="md:w-full bg-blue-400 px-5 py-2 rounded-md text-white font-medium border-2 border-transparent hover:border-blue-400 hover:bg-transparent hover:text-blue-400"
        >
          Mark Attendance
        </button>
      </div>
    </div>
  );
};

export default ApprovalManagement;
