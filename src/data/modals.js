

const modals = [
    {
        role: "invalidWord",
        visible: false,
        title: "Invalid Word",
        content: "This word does not exist in the list."
    },  
    {
        role: "incorrectWord",
        visible: false,
        title: "Incorrect",
        content: "The word does not match the row's given colors."
    },  
    {
        role: "success",
        visible: false,
        title: "Magnificent",
        content: "All 6 rows are correct"
    },
    {
        role: "statistics",
        visible: false,
        title: "Statistics"
    }

]

export default modals;