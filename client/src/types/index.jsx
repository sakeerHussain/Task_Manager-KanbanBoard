export const TaskT = {
    id: String,
    title: String,
    description: String,
    priority: String,
    deadline: Number,
    image: String, // Optional
    alt: String,   // Optional
    tags: Array,   // Array of tag objects
};
// Column Definition
export const Column = {
    name: String,
    items: Array,  // Array of TaskT objects
};

// Columns Definition
export const Columns = {
    [String]: Column,  // Key is a string (column name), and the value is a Column object
};
