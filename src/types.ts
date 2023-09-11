export interface Task {
    id: number;
    date: string;
    timeIn: string;
    timeOut: string;
    title: string;
    completed: boolean;
    selected: boolean;
}

interface RootState {
    tasks: Tasks
}

export interface Tasks {
    tasks: Task[];
    targetTask: number;
    selectedTask: {
        id: number;
        date: string;
        timeIn: string;
        timeOut: string;
        title: string;
        completed: boolean;
        selected: boolean;
    };
    selectedDate: string;
    page: number;
    loading: boolean;
    mobileMenuState: string;
}

export default RootState;