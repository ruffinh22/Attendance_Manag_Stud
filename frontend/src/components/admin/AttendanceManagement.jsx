import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { getManageAttendance, addAttendance } from "../../services/get-service";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AttendanceModal from "./AttendanceModal";

const AttendanceManagement = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [calDate, setCalDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const rowsPerPage = 10;

  const year = calDate.getFullYear();
  const month = String(calDate.getMonth() + 1).padStart(2, "0");
  const day = String(calDate.getDate()).padStart(2, "0");
  const dateString = [year, month, day].join("-");

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return users.slice(start, end);
  }, [page, users]);

  const fetchTableData = async () => {
    try {
      const tableData = await getManageAttendance(dateString);
      setUsers(tableData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching table data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setUsers([]);
    fetchTableData();
  }, [calDate]);

  const handleMarkAttendance = async (user) => {
    try {
      const { email } = user;
      const timestamp = Date.now();
  
      // Valeurs par défaut pour latitude et longitude
      const latitude = "37.7749";
      const longitude = "-122.4194";
  
      await addAttendance({
        qr_code_data: `${email}_${timestamp}`,
        latitude,
        longitude,
      });
      fetchTableData();
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };
  
  return (
    <div className="w-full flex-col-reverse gap-y-5 md:flex-row flex md:justify-between items-start">
      <div className="w-full md:w-[calc(100% - 290px)] lg:w-[calc(100% - 400px)] flex-center flex-col gap-10">
        <Table
          aria-label="Attendance table with client side pagination"
          isStriped
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
            wrapper: "min-h-[222px] bg-white shadow-lg rounded-md",
            th: "bg-primary-black text-primary-white rounded-none",
          }}
        >
          <TableHeader>
            <TableColumn key="roll_number">Roll No.</TableColumn>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="email">Email</TableColumn>
            <TableColumn key="status">Status</TableColumn>
            <TableColumn key="actions">Actions</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={loading ? "Searching..." : "No Attendance Data Found!"}
            items={items}
          >
            {(item) => (
              <TableRow key={item.roll_number}>
                <TableCell>{item.roll_number}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <button onClick={() => handleMarkAttendance(item)}>Mark Attendance</button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div id="calendar" className="w-full flex-center md:w-[280px] lg:w-[350px]">
        <Calendar onChange={setCalDate} value={calDate} />
      </div>
      {modalOpen && (
        <AttendanceModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          user={selectedUser}
          onSubmit={handleMarkAttendance} // Correction ici
          />
      )}
    </div>
  );
};

export default AttendanceManagement;
