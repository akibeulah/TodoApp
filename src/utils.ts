export const isDateToday = (inputDate: string): boolean => {
    const currentDate = new Date();
    const inputDateCopy = new Date(inputDate);

    currentDate.setHours(0, 0, 0, 0);
    inputDateCopy.setHours(0, 0, 0, 0);

    return currentDate.getTime() === inputDateCopy.getTime();
}

export const getDaysInMonthArray = (monthIndex: number) => {
    const currentDate = new Date();
    currentDate.setMonth(monthIndex, 1); // Set the month to the desired month
    const daysInMonth = [];

    while (currentDate.getMonth() === monthIndex) {
        daysInMonth.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return daysInMonth;
}

export const greet = (): string => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Good morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "Good afternoon!";
    } else {
        return "Good evening!";
    }
}

export const getAbbreviatedDayOfWeek = (date: Date) => {
    const abbreviatedDaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = date.getDay();
    return abbreviatedDaysOfWeek[dayIndex];
}

export const fetchData = () => {
    return new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export const dateOptions = {year: '2-digit', month: '2-digit', day: '2-digit'};

export const getTodayMonthAndYear = (dateString) => {
    const dateObj = new Date(dateString);
    const month = dateObj.toLocaleString('en', {month: 'long'});
    const year = dateObj.getFullYear();
    return `${month} ${year}`;
}

export const formatDate = (date) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);

    const day = new Date(date).getDate();
    const daySuffix =
        day === 1
            ? 'st'
            : day === 2
                ? 'nd'
                : day === 3
                    ? 'rd'
                    : 'th';

    return formattedDate.replace(/\d{1,2}/, day + daySuffix);
}

export const replaceTaskByIndex = (state, index, newTask) => {
    const updatedTasks = [...state.tasks];
    updatedTasks[index] = newTask;

    return {
        ...state,
        tasks: updatedTasks,
    };
};

export const generateMonthArray = (date) => {
    const startDate = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 1);
    const endDate = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 0); // Get the last day of the month

    const startDayOfWeek = startDate.getDay() - 1;
    const monthLength = endDate.getDate();
    const resultArray = Array(42).fill(0);

    for (let i = 0; i < monthLength - 1; i++) {
        resultArray[startDayOfWeek + i] = i + 1;
    }

    return resultArray;
}

export const getInputDate = (date) => {
    const today = new Date(date);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');

    // Combine the year, month, day, and hyphens
    return `${year}-${month}-${day}`;
}