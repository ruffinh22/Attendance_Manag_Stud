import axios from 'axios';

export const markAttendance = async (userId, isPresent) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const apiUrl = 'http://127.0.0.1:8000/api/student/MarkAttendanceDynamicQRView/';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    const data = {
      userId: userId,
      isPresent: isPresent
    };

    const response = await axios.post(apiUrl, data, config);

    if (response.status === 200) {
      console.log('Attendance marked successfully.');
    } else {
      console.error('Failed to mark attendance.');
    }
  } catch (error) {
    console.error('Error marking attendance:', error.message);
  }
};
