import React, { useState, useEffect } from "react";
import { link } from "react-router-dom";
import "../App.css";

function DisasterList() {

  useEffect(() => {
    fetchInfo();
  }, []);

  const [data, setData] = useState([]);

  const fetchInfo = async () => {
    const disasterData = await fetch("http://71.227.163.23:8082/api/openAPI");
    const data = await disasterData.json();
    console.log(data);
    setData(data);
  }


  return (
    <div className="DisasterList">
      <h1>Disaster List</h1>
      {/* {data.map(info => (
        <p>{info.create_date}, {info.location_name}, {info.msg}</p>
      ))} */}
      <table>
        <thead>
          <tr>
            <th>Create Date/Time</th>
            <th>Location ID</th>
            <th>Location Name</th>
            <th>Message</th>
            <th>Message ID</th>
            <th>Send Platform</th>
          </tr>
        </thead>
        <tbody>
          {data.map(info => (
            <tr key={info._id}>
              <td>{info.create_date}</td>
              <td>{info.location_id}</td>
              <td>{info.location_name}</td>
              <td>{info.msg}</td>
              <td>{info.md101_sn}</td>
              <td>{info.send_platform}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DisasterList
