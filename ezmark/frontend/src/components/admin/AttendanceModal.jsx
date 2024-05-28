import React, { useState, useEffect } from "react";
import { Modal, Input, Button } from "@nextui-org/react";

const AttendanceModal = ({ isOpen, onClose, user, onSubmit }) => {
  const [attendanceData, setAttendanceData] = useState({
    id: user ? user.id : null,
    roll_number: user ? user.roll_number : "",
    name: user ? user.name : "",
    email: user ? user.email : "",
    status: user ? user.status : "",
  });

  useEffect(() => {
    // Mettre à jour les données de présence lorsque l'utilisateur change
    if (user) {
      setAttendanceData({
        id: user.id,
        roll_number: user.roll_number,
        name: user.name,
        email: user.email,
        status: user.status,
      });
    } else {
      setAttendanceData({
        id: null,
        roll_number: "",
        name: "",
        email: "",
        status: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(attendanceData);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Modal.Header>Manage Attendance</Modal.Header>
      <Modal.Content>
        <div className="flex flex-col gap-4">
          <Input
            label="Roll Number"
            name="roll_number"
            value={attendanceData.roll_number}
            onChange={handleChange}
          />
          <Input
            label="Name"
            name="name"
            value={attendanceData.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={attendanceData.email}
            onChange={handleChange}
          />
          <Input
            label="Status"
            name="status"
            value={attendanceData.status}
            onChange={handleChange}
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={onClose} auto>
          Cancel
        </Button>
        <Button onClick={handleSubmit} auto>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceModal;
