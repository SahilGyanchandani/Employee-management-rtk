import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteEmployee } from "../features/employee/employeeSlice";

export default function EmployeeListView() {

    const empList = useAppSelector(state => state.emp)
    const dispatch = useAppDispatch()

    // Function to handle delete action
    const handleDelete = (eId: string) => {
        return () => {
            // Confirm deletion with the user
            const confirmation = window.confirm('Are you sure you want to delete');

            // If user confirms, update the list and localStorage
            if (confirmation) {
                dispatch(deleteEmployee(eId))
                console.log(eId);

            }
        };
    }

    return (
        <div>
            <h2>Employee List</h2>
            {/* Link to navigate to the Add Employee page */}
            <Link to={"/add"}>
                <button>Add Employee</button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Birth Date</th>
                        <th>Department</th>
                        <th>Experience</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through the employeeList and render table rows */}
                    {empList.map((data) => (
                        <tr key={data.id}>
                            <td>{data.fullName}</td>
                            <td>{data.birthDate}</td>
                            <td>{data.department}</td>
                            <td>{data.experience}</td>
                            <td>
                                {/* Link to navigate to the Edit Employee page */}
                                <Link to={`/edit/${(data.id)}`}>
                                    <button className="btn btn-primary">Edit</button>
                                </Link>
                                {/* Button to handle delete action */}
                                <button className="btn btn-danger ms-2" onClick={handleDelete(data.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}