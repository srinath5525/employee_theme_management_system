import { useEffect } from "react";
import { useState } from "react";

function Portal() {
  const [Employee, setEmployee] = useState([]);
  const [showOptions, setShowOptions] = useState(null);

  const changeTheme = (id, color) => {
    fetch(`http://localhost:3000/Employee/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        theme: color,
      }),
    })
      .then((response) => response.json())
      .then((updatedEmployee) => {
        const updatedEmployees = Employee.map((emp) => {
          if (emp.EmpId === id) {
            return updatedEmployee;
          }

          return emp;
        });

        setEmployee(updatedEmployees);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/Employee")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEmployee(data);
      })
      .catch((error) => {
        console.error("Error fetching Employee:", error);
      });
  }, [Employee]);

  return (
    <>
      <div className="row justify-content-center m-3">
        {Employee.map((emp) => (
          <div
            key={emp.id}
            className="mb-2 mx-2 card position-relative"
            style={{
              width: "18rem",
              background: emp.theme,
            }}
          >
            <div className="card-body">
              {/* Theme Button */}
              <button
                onClick={() =>
                  setShowOptions(showOptions === emp.id ? null : emp.id)
                }
                className="fa-solid fa-palette btn btn-sm position-absolute top-0 end-0 m-2"
              ></button>

              {/* Dropdown Menu */}
              {showOptions === emp.id && (
                <div
                  className="position-absolute border rounded"
                  style={{
                    top: "40px",
                    right: "10px",
                    zIndex: 10,
                  }}
                >
                  <button
                    className="dropdown-item"
                    onClick={() => [
                      changeTheme(emp.id, "beige"),
                      setShowOptions(null),
                    ]}
                    style={{
                      background: "beige",
                      width: "20px",
                      height: "20px",
                      border: "1px solid black",
                      borderRadius: "50%",
                      marginBottom: "5px",
                    }}
                  ></button>

                  <button
                    className="dropdown-item"
                    onClick={() => [
                      changeTheme(emp.id, "lightgray"),
                      setShowOptions(null),
                    ]}
                    style={{
                      background: "lightgray",
                      width: "20px",
                      height: "20px",
                      border: "1px solid black",
                      borderRadius: "50%",
                      marginBottom: "5px",
                    }}
                  ></button>

                  <button
                    className="dropdown-item"
                    onClick={() => [
                      changeTheme(emp.id, "lightgreen"),
                      setShowOptions(null),
                    ]}
                    style={{
                      background: "lightgreen",
                      width: "20px",
                      height: "20px",
                      border: "1px solid black",
                      borderRadius: "50%",
                    }}
                  ></button>
                </div>
              )}

              <h5 className="card-title">{emp.EmpName}</h5>

              <p className="card-text">{emp.Department}</p>

              <a href="#" className="btn btn-primary">
                Check Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Portal;
