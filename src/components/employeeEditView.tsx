import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { editEmployee } from "../features/employee/employeeSlice";


export default function EmployeeEditView() {
    // Access the navigate function from React Router DOM
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const employees = useAppSelector((state) => state.emp)

    let isMounted: boolean = true;

    // Extract the employee ID parameter from the URL
    const { eId } = useParams();

    // State variables to manage employee data and not found status
    const [employeeEdit, setEmployeeEdit] = useState({ fullName: "", birthDate: "", department: "", experience: 0 });
    const [error, setError] = useState('');

    useEffect(() => {
        const employeeToEdit = employees.find((emp) => emp.id === eId);

        if (employeeToEdit && isMounted) {
            setEmployeeEdit({
                fullName: employeeToEdit.fullName,
                birthDate: employeeToEdit.birthDate,
                department: employeeToEdit.department,
                experience: employeeToEdit.experience
            });
        }
        else if (employeeToEdit?.id == null) {            
            setError("Employee not found");
        }

        return () => {
            isMounted = false;
        }
    }, [employees, eId])

    // Function to handle editing employee data and updating localStorage
    function handleEditEmployee() {
        // Dispatch the editEmployee action with the updated employee information
        dispatch(
            editEmployee({
                id: eId || "", // Assuming the ID is passed through the URL params
                fullName: employeeEdit.fullName,
                birthDate: employeeEdit.birthDate,
                department: employeeEdit.department,
                experience: employeeEdit.experience,
            })
        );
        alert('Employee updated successfully');
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
            setEmployeeEdit({ ...employeeEdit, fullName: input });
            setError('');
        } else {
            setError('Allow only letters (A-Z)');
        }
    }

    return (
        <>
            <div>
                <div className="container mt-5">
                    {/* Render the edit form if employee data is available */}
                    <h2 className="mb-4">Edit Employee</h2>
                    {employeeEdit ? (
                        <form>
                            {/* Form fields to edit employee details */}
                            <div className="mb-3">
                                <label className="form-label">Full Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    placeholder="Enter Full Name"
                                    value={employeeEdit.fullName}
                                    // onChange={(e) => setEmployeeEdit({ ...employeeEdit, fullName: e.target.value })}
                                    onInput={handleFullName}  // Use onInput event for real-time input validation

                                />
                            </div>

                            {/* Display error message if there is an error */}
                            {error && <div className="text-danger">{error}</div>}

                            {/* Additional form fields for birth date, department, and experience */}
                            <div className="mb-3">
                                <label className="form-label">Birth Date:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="birthDate"
                                    value={employeeEdit.birthDate}
                                    onChange={(e) => setEmployeeEdit({ ...employeeEdit, birthDate: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Department:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="department"
                                    placeholder="Enter Department Name"
                                    value={employeeEdit.department}
                                    onChange={(e) => setEmployeeEdit({ ...employeeEdit, department: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Experience:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="experience"
                                    placeholder="Enter Experience"
                                    value={employeeEdit.experience}
                                    onChange={(e) => setEmployeeEdit({ ...employeeEdit, experience: parseInt(e.target.value, 10) })}
                                />
                            </div>

                            {/* Button to trigger the editing process */}
                            <button type="button" className="btn btn-primary" onClick={handleEditEmployee}>
                                Edit Employee
                            </button>

                            <hr />

                            {/* Button to navigate back to the employee list */}
                            <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
                                Back
                            </button>
                        </form>
                    ) : (
                        // Loading message while employee data is being fetched
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    )
}