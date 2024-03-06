import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addEmployee, editEmployee } from "../features/employee/employeeSlice";
import { useNavigate, useParams } from "react-router-dom";


export default function EmployeeFormView() {
    // Access the dispatch and navigate functions from React hooks
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const employees = useAppSelector((state) => state.emp)

    // Extract the employee ID parameter from the URL
    const {eId} =useParams();

    const isEditing = !!eId;
    const initialEmployee=isEditing ? employees.find(emp => emp.id === eId) : null;

    // State variables to manage employee data and error message
    const [employeeData, setEmployeeData] = useState({
        fullName: initialEmployee ? initialEmployee.fullName : "",
        birthDate: initialEmployee ? initialEmployee.birthDate : "",
        department: initialEmployee ? initialEmployee.department : "",
        experience: initialEmployee ? initialEmployee.experience : 0,
    });
    const [error, setError] = useState('');
    const [formError,setFormError]=useState('');

    useEffect(()=>{
        if(isEditing && !initialEmployee){
            setFormError('Employee not Found');
        }
    },[isEditing,initialEmployee]);

    // Function to handle the addition of a new employee
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(isEditing){
            dispatch(editEmployee({id:eId,...employeeData}))
            alert('Employee updated successfully');
        }
        else{
            dispatch(addEmployee({id:'',...employeeData}));
            alert('Employee added successfully');
        }
        navigate('/');
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
            <h2 className="mb-4">{isEditing ? "Edit" : "Add"} Employee</h2>
            <form>
                {/* Display form error message if there is an error */}
                {formError && <div className="text-danger">{formError}</div>}
                
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
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    {isEditing ? "Edit":"Add" } Employee
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