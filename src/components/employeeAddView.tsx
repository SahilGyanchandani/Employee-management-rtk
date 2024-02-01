import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addEmployee } from "../features/employee/employeeSlice";
import { useNavigate } from "react-router-dom";


export default function EmployeeAddView() {
    // Access the dispatch and navigate functions from React hooks
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // State variables to manage employee data and error message
    const [employeeData, setEmployeeData] = useState({ id: "", fullName: "", birthDate: "", department: "", experience: 0 });
    const [error, setError] = useState('');

    // Function to handle the addition of a new employee
    function handleAddEmployee(e: React.FormEvent) {
        e.preventDefault()
        // Dispatch the addEmployee action with the current employeeData
        dispatch(addEmployee(employeeData));

        // Clear the form after submission
        setEmployeeData({
            id: "",
            fullName: "",
            birthDate: "",
            department: "",
            experience: 0,
        });
    }

    // Function to handle changes in the Full Name input
    function handleFullName(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target.value;

        // Regular expression to allow only letters A-Z and spaces in the input
        const onlyLetters = /^[A-Za-z ]+$/;

        // Regular expression to identify invalid characters
        const invalidCharacter = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

        // Validate input against regular expressions and update state
        if (onlyLetters.test(input) && !invalidCharacter.test(input) || input === '') {
            setEmployeeData({ ...employeeData, fullName: input });
            setError('');
        } else {
            setError('Allow only letters (A-Z)');
        }
    }
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add Employee</h2>
            <form>
                {/* Input field for Full Name */}
                <div className="mb-3">
                    <label className="form-label">Full Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        placeholder="Enter Full Name"
                        value={employeeData.fullName}
                        onInput={handleFullName}  // Use onInput event for real-time input validation
                    />
                </div>

                {/* Display error message if there is an error */}
                {error && <div className="text-danger">{error}</div>}

                {/* Additional input fields for Birth Date, Department, and Experience */}
                <div className="mb-3">
                    <label className="form-label">Birth Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="birthDate"
                        value={employeeData.birthDate}
                        onChange={(e) => setEmployeeData({ ...employeeData, birthDate: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Department:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="department"
                        placeholder="Enter Department Name"
                        value={employeeData.department}
                        onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Experience:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="experience"
                        placeholder="Enter Experience"
                        value={employeeData.experience}
                        onChange={(e) => setEmployeeData({ ...employeeData, experience: parseInt(e.target.value, 10) })}
                    />
                </div>

                {/* Button to add a new employee */}
                <button type="button" className="btn btn-primary" onClick={handleAddEmployee}>
                    Add Employee
                </button>

                <hr />

                {/* Button to navigate back to the employee list */}
                <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
                    Back
                </button>
            </form>
        </div>
    );
}