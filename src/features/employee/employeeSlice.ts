import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"

export type Employee = {
    id: string;
    fullName: string;
    birthDate: string;
    department: any;
    experience: number;
};

type InitialState = {
    emp: Employee[]
}

const initialEmployee: Employee = {
    id: '1',
    fullName: 'Sahil Gyanchandani',
    birthDate: '05/07/2002',
    department: 'I.T',
    experience: 1
}

const initialState: InitialState = {
    emp: [initialEmployee]
}


export const employeeSlice = createSlice({
    name: 'employeeAdd',
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<Employee>) => {
            const newEmployee: Employee = {
                id: nanoid(),
                fullName: action.payload.fullName,
                birthDate: action.payload.birthDate,
                department: action.payload.department,
                experience: action.payload.experience
            }
            state.emp.push(newEmployee)
            console.log();

        },
        deleteEmployee: (state, action) => {
            state.emp = state.emp.filter((data) => data.id !== action.payload)
            console.log(action.payload);

        },

        editEmployee: (state, action: PayloadAction<Employee>) => {
            const employeeToEdit = state.emp.find((employee) => employee.id === action.payload.id);

            if (employeeToEdit) {
                employeeToEdit.fullName = action.payload.fullName;
                employeeToEdit.birthDate = action.payload.birthDate;
                employeeToEdit.department = action.payload.department;
                employeeToEdit.experience = action.payload.experience;
            }
            console.log(state.emp);

        }

    }
});

export default employeeSlice.reducer
export const { addEmployee, deleteEmployee, editEmployee } = employeeSlice.actions